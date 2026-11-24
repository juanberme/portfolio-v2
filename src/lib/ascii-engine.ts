/*
 * ASCII field engine, ported from the design canvas (Home v6 / Concept Grouping).
 *
 * Performance rules agreed for "lightweight":
 *  - nothing starts until the page has loaded and the browser is idle
 *  - one shared animation loop for every field on the page
 *  - fields off screen are skipped
 *  - ~15 fps on desktop, ~10 fps on narrow screens
 *  - prefers-reduced-motion: a single still frame
 *  - each field moves for MOVE_FOR seconds of being on screen, then slows to a stop over
 *    SLOW_FOR seconds (WCAG 2.2.2: no endless motion). The pointer glow still reacts on hover.
 */

const MOVE_FOR = 5;
const SLOW_FOR = 4;

export type AsciiMode = "aurora" | "fade" | "rise" | "pulse" | "drift" | "horizon" | "flow";

export interface AsciiOptions {
  mode: AsciiMode;
  px: number;
  fg: string;
  /** background colour, or "none" for transparent */
  bg: string;
  tint?: boolean;
  flip?: boolean;
  light?: boolean;
}

type RGB = [number, number, number];

interface Field {
  c: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  opts: AsciiOptions;
  cw: number;
  ch: number;
  cx: number;
  cy: number;
  cols: number;
  rows: number;
  mx: number;
  my: number;
  tx: number;
  ty: number;
  aim: number;
  lv: number;
  s: number;
  vis: boolean;
  /** seconds this field has animated while on screen */
  age: number;
  /** the field's own clock, which slows down and stops */
  vt: number;
  cleanup: () => void;
}

const RAMP = " .·:-=+*%#@";
const AR = " .:-=+xX0S8#@";

const hx = (h: string): RGB => {
  const s = h.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(s.substr(i, 2), 16)) as RGB;
};
const mixc = (c0: RGB, c1: RGB, k: number): RGB =>
  [0, 1, 2].map((j) => Math.round(c0[j] + (c1[j] - c0[j]) * k)) as RGB;
const ramp3 = (st: [number, RGB][], x: number): RGB => {
  x = Math.min(1, Math.max(0, x));
  for (let i = 1; i < st.length; i++)
    if (x <= st[i][0]) return mixc(st[i - 1][1], st[i][1], (x - st[i - 1][0]) / (st[i][0] - st[i - 1][0]));
  return st[st.length - 1][1];
};

const AUR: [number, RGB][] = [
  [0, hx("#120F17")],
  [0.28, hx("#2A35B8")],
  [0.55, hx("#4F67F2")],
  [0.8, hx("#8FC4FF")],
  [1, hx("#EAF3FF")],
];
const AURL: [number, RGB][] = [
  [0, hx("#F4F2EF")],
  [0.3, hx("#C9D3FF")],
  [0.6, hx("#7F95FE")],
  [0.85, hx("#4F67F2")],
  [1, hx("#3D55E0")],
];

const fields: Field[] = [];
const auroraBuf: Record<string, { c: HTMLCanvasElement; x: CanvasRenderingContext2D; img: ImageData }> = {};
let raf = 0;
let started = false;
let io: IntersectionObserver | null = null;
let ro: ResizeObserver | null = null;

const isBrowser = () => typeof window !== "undefined";
const reduced = () => isBrowser() && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const narrow = () => isBrowser() && window.matchMedia("(max-width: 760px)").matches;
const dpr = () => Math.min(2, (isBrowser() && window.devicePixelRatio) || 1);

function fit(o: Field) {
  const cw = o.c.clientWidth;
  const ch = o.c.clientHeight;
  if (cw < 8 || ch < 8 || (cw === o.cw && ch === o.ch)) return;
  const d = dpr();
  o.cw = cw;
  o.ch = ch;
  o.c.width = Math.round(cw * d);
  o.c.height = Math.round(ch * d);
  o.cols = Math.ceil(cw / o.cx);
  o.rows = Math.ceil(ch / o.cy);
}

function density(o: Field, p: number, v: number, t: number) {
  const a = o.cw / o.ch;
  const pd = Math.hypot((p - o.mx) * a, v - o.my);
  const lv = o.lv;
  switch (o.opts.mode) {
    case "fade":
      return (1 - v) * 1.15 - 0.1 + 0.12 * Math.sin(p * 7 + t + o.s) + Math.max(0, 0.35 - pd) * 1.2 * lv;
    case "rise":
      return v * 1.15 - 0.1 + 0.12 * Math.sin(p * 7 + t + o.s) + Math.max(0, 0.35 - pd) * 1.2 * lv;
    case "pulse": {
      const r = Math.hypot((p - 0.5) * a, v - 0.5);
      return 0.14 + 0.56 * Math.sin(r * 6.5 - t * 1.5) * (1 - Math.min(1, r * 0.34)) + Math.max(0, 0.3 - pd) * 0.5 * lv;
    }
    case "drift":
      return (
        0.5 +
        0.38 * Math.sin(p * 4.2 + t * 0.31) +
        0.32 * Math.sin(v * 3.1 - t * 0.24) +
        0.26 * Math.sin((p * a + v) * 3.6 + t * 0.43) +
        Math.max(0, 0.3 - pd) * 0.5 * lv
      );
    case "horizon":
      return (v - 0.5) * 2.6 - 0.02 + 0.12 * v * Math.sin(p * 7 + t + o.s) + Math.max(0, 0.35 - pd) * 1.2 * lv;
    default:
      return 0.5 + 0.28 * Math.sin(p * 9 - t * 0.8 + o.s) + 0.2 * Math.sin(v * 6 - t * 0.7) + Math.max(0, 0.3 - pd) * 0.6 * lv;
  }
}

/* Aurora: light pouring from the top through the project blues, a dark hill rising from the
   bottom. A soft glow is painted first (cell-sized, scaled up smooth), glyphs on top. */
function drawAurora(o: Field, g: CanvasRenderingContext2D, t0: number) {
  const a = o.cw / o.ch;
  const { cols, rows } = o;
  const L = !!o.opts.light;
  const t = t0 * (L ? 2.6 : 1);
  const PAL = L ? AURL : AUR;
  const key = cols + "x" + rows;
  let b = auroraBuf[key];
  if (!b) {
    const c = document.createElement("canvas");
    c.width = cols;
    c.height = rows;
    const x = c.getContext("2d")!;
    b = auroraBuf[key] = { c, x, img: x.createImageData(cols, rows) };
  }
  const lv = new Float32Array(cols * rows);
  const d = b.img.data;
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      const p = (x + 0.5) / cols;
      const v = o.opts.flip ? Math.min(1, (1 - (y + 0.5) / rows) * 1.8) : (y + 0.5) / rows;
      let f = 0.84 - v * 1.1 + 0.42 * Math.exp(-Math.pow((p - 0.55 - 0.05 * Math.sin(t * 0.2)) / 0.28, 2)) * (1 - v);
      const crest = 0.48 + 0.06 * Math.sin(t * 0.35) - 0.28 * Math.exp(-Math.pow((p - 0.58 - 0.06 * Math.sin(t * 0.27)) / 0.32, 2));
      f -= Math.max(0, v - crest) * 2.4;
      f += 0.06 * Math.sin(p * 9 + v * 4 - t * 0.6) + (L ? 0.09 * Math.sin(p * 6 - t * 0.9) + 0.05 * Math.sin(p * 13 + v * 6 + t * 1.1) : 0);
      f = Math.min(1, Math.max(0, f));
      lv[y * cols + x] = f;
      const c = ramp3(PAL, f);
      const i = (y * cols + x) * 4;
      d[i] = c[0];
      d[i + 1] = c[1];
      d[i + 2] = c[2];
      d[i + 3] = L ? Math.round(Math.min(1, f * 1.4) * 255) : 255;
    }
  b.x.putImageData(b.img, 0, 0);
  g.imageSmoothingEnabled = true;
  g.imageSmoothingQuality = "high";
  g.globalAlpha = 0.92;
  g.drawImage(b.c, 0, 0, o.cw, o.ch);
  g.globalAlpha = 1;
  const n = AR.length - 1;
  const deep = hx("#2A35B8");
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      const f = lv[y * cols + x];
      if (f < 0.12) continue;
      const p = (x + 0.5) / cols;
      const v = (y + 0.5) / rows;
      const pd = Math.hypot((p - o.mx) * a, v - o.my);
      const scr = o.lv > 0.05 && pd < 0.1;
      const h = (((Math.imul(x, 73856093) ^ Math.imul(y, 19349663)) >>> 0) % 1000) / 1000;
      if (!scr && h < 0.12) continue;
      const ch = scr ? AR[1 + ((Math.random() * n) | 0)] : AR[Math.max(1, Math.min(n, Math.round(f * n + (h - 0.5) * 1.4)))];
      const c = L
        ? mixc(ramp3(PAL, f), f > 0.55 ? [255, 255, 255] : deep, f > 0.55 ? 0.7 : 0.45)
        : mixc(ramp3(AUR, Math.min(1, f + 0.18)), [255, 255, 255], f > 0.8 ? 0.35 : 0);
      g.fillStyle = "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
      g.fillText(ch, x * o.cx + o.cx / 2, y * o.cy + o.cy / 2);
    }
}

function drawField(o: Field, t: number) {
  if (!o.cols) return;
  o.mx += (o.tx - o.mx) * 0.08;
  o.my += (o.ty - o.my) * 0.08;
  o.lv += (o.aim - o.lv) * 0.07;
  const g = o.ctx;
  const d = dpr();
  g.setTransform(d, 0, 0, d, 0, 0);
  if (o.opts.bg && o.opts.bg !== "none") {
    g.fillStyle = o.opts.bg;
    g.fillRect(0, 0, o.cw, o.ch);
  } else g.clearRect(0, 0, o.cw, o.ch);
  g.fillStyle = o.opts.fg;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = "500 " + Math.round(o.cy * 0.82) + "px 'IBM Plex Mono', ui-monospace, Menlo, monospace";
  if (o.opts.mode === "aurora") {
    drawAurora(o, g, t);
    return;
  }
  const n = RAMP.length - 1;
  for (let y = 0; y < o.rows; y++)
    for (let x = 0; x < o.cols; x++) {
      let f = density(o, (x + 0.5) / o.cols, (y + 0.5) / o.rows, t);
      f += ((((Math.imul(x, 73856093) ^ Math.imul(y, 19349663)) >>> 0) % 1000) / 1000 - 0.5) * 0.12;
      const fc = Math.min(1, Math.max(0, f));
      const k = Math.round(fc * n);
      if (o.opts.tint && fc > 0.05) {
        g.globalAlpha = Math.min(1, fc * 1.1);
        g.fillStyle = o.opts.fg;
        g.fillRect(x * o.cx, y * o.cy, o.cx + 0.5, o.cy + 0.5);
        g.globalAlpha = 1;
        g.fillStyle = fc > 0.5 ? "#E3E8FF" : o.opts.fg;
      }
      if (k > 0) g.fillText(RAMP[k], x * o.cx + o.cx / 2, y * o.cy + o.cy / 2);
      if (o.opts.tint) g.fillStyle = o.opts.fg;
    }
}

/** 1 while moving, then eases to 0 (ease-in-out cosine) */
const speedAt = (age: number) =>
  age <= MOVE_FOR ? 1 : age >= MOVE_FOR + SLOW_FOR ? 0 : 0.5 + 0.5 * Math.cos(((age - MOVE_FOR) / SLOW_FOR) * Math.PI);

/** a field still needs frames while it moves or while its hover glow is fading */
const busy = (o: Field) => speedAt(o.age) > 0 || o.aim > 0 || o.lv > 0.004;

function loop() {
  if (raf) return;
  let last = -1;
  const tick = (ms: number) => {
    raf = requestAnimationFrame(tick);
    const step = narrow() ? 100 : 66;
    if (last >= 0 && ms - last < step) return;
    const dt = last < 0 ? 0 : Math.min(0.25, (ms - last) / 1000);
    last = ms;
    let any = false;
    for (const o of fields) {
      if (!o.vis) continue;
      const v = speedAt(o.age);
      o.age += dt;
      o.vt += dt * v;
      if (busy(o)) {
        drawField(o, o.vt);
        any = true;
      }
    }
    /* everything on screen has settled: sleep until a field comes into view or is hovered */
    if (!any) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
  raf = requestAnimationFrame(tick);
}

const wake = () => {
  if (started && !reduced()) loop();
};

function start() {
  if (started) return;
  started = true;
  for (const o of fields) {
    fit(o);
    drawField(o, 0.35);
  }
  if (!reduced()) loop();
}

/** Starts the shared loop once the page has loaded and the browser is idle. */
function scheduleStart() {
  if (started) return;
  const go = () => {
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void })
      .requestIdleCallback;
    if (ric) ric(start, { timeout: 1200 });
    else setTimeout(start, 200);
  };
  if (document.readyState === "complete") go();
  else window.addEventListener("load", go, { once: true });
}

export function registerField(c: HTMLCanvasElement, opts: AsciiOptions): () => void {
  const ctx = c.getContext("2d");
  if (!ctx) return () => {};
  const cx = Math.round(opts.px * 1.4 + 2.4);
  const o: Field = {
    c,
    ctx,
    opts,
    cw: 0,
    ch: 0,
    cx,
    cy: Math.round(cx * 1.6),
    cols: 0,
    rows: 0,
    mx: 0.5,
    my: 0.5,
    tx: 0.5,
    ty: 0.5,
    aim: 0,
    lv: 0,
    s: Math.random() * 10,
    vis: true,
    age: 0,
    vt: 0.35,
    cleanup: () => {},
  };
  const host = c.parentElement || c;
  const onMove = (e: PointerEvent) => {
    const r = c.getBoundingClientRect();
    if (!r.width) return;
    o.tx = (e.clientX - r.left) / r.width;
    o.ty = (e.clientY - r.top) / r.height;
    o.aim = 1;
    wake();
  };
  const onLeave = () => {
    o.aim = 0;
  };
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", onLeave);

  if (!io && "IntersectionObserver" in window) {
    io = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          const f = fields.find((i) => i.c === e.target);
          if (f) f.vis = e.isIntersecting;
        }
        wake();
      },
      { rootMargin: "160px" },
    );
  }
  if (!ro && "ResizeObserver" in window) {
    ro = new ResizeObserver((es) => {
      for (const e of es) {
        const f = fields.find((i) => i.c === e.target);
        if (f) {
          fit(f);
          if (started) drawField(f, f.vt);
        }
      }
    });
  }
  io?.observe(c);
  ro?.observe(c);
  fields.push(o);
  fit(o);
  if (started) drawField(o, 0.35);
  else scheduleStart();

  o.cleanup = () => {
    host.removeEventListener("pointermove", onMove);
    host.removeEventListener("pointerleave", onLeave);
    io?.unobserve(c);
    ro?.unobserve(c);
    const i = fields.indexOf(o);
    if (i >= 0) fields.splice(i, 1);
    if (!fields.length && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
      started = false;
    }
  };
  return o.cleanup;
}
