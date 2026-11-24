"use client";

import { useEffect, useRef } from "react";
import w from "@/components/Widget.module.css";
import s from "./HoverCard.module.css";

/*
 * A Trajectory card with the hover micro-interaction (canvas: "Trayectoria · combinada"):
 *  - a faint ASCII field comes down from the top edge, where the card has the least content,
 *    and fades out when the mouse leaves;
 *  - any <DecodeText> inside decodes, because the card is marked [data-decode-host].
 * Only on devices with a real hover; nothing animates with reduced motion.
 */

const RAMP = " .:-=+*%#@";

interface Props {
  tone?: "card" | "navy";
  /** glyph colour */
  fg: string;
  className?: string;
  children: React.ReactNode;
}

export default function HoverCard({ tone = "card", fg, className = "", children }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = host.current;
    const c = cv.current;
    if (!el || !c) return;
    const mq = window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;
    let aim = 0;
    let lv = 0;
    let raf = 0;
    let last = 0;
    const draw = (ms: number) => {
      raf = 0;
      if (ms - last < 50) {
        raf = requestAnimationFrame(draw);
        return;
      }
      last = ms;
      lv += (aim - lv) * 0.12;
      const g = c.getContext("2d");
      if (!g) return;
      const wd = c.clientWidth;
      const ht = c.clientHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (c.width !== Math.round(wd * dpr)) {
        c.width = Math.round(wd * dpr);
        c.height = Math.round(ht * dpr);
      }
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, wd, ht);
      if (aim === 0 && lv < 0.004) {
        lv = 0;
        return; // faded out: stop the loop until the next hover
      }
      const t = ms / 1000;
      g.font = "500 13px 'IBM Plex Mono', ui-monospace, monospace";
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillStyle = fg;
      const cx = 11;
      const cy = 17;
      const cols = Math.ceil(wd / cx);
      const rows = Math.ceil(ht / cy);
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
          const p = (x + 0.5) / cols;
          const v = (y + 0.5) / rows;
          let f = (0.62 * lv - v) * 2.4 + 0.1 * Math.sin(p * 9 + t * 1.2) + 0.08 * Math.sin(p * 17 - v * 5 - t);
          f = Math.min(1, f);
          if (f <= 0.06) continue;
          /* kept faint (max ~32%) so the card's text stays easy to read */
          g.globalAlpha = Math.min(1, f * 1.1) * lv * 0.32;
          g.fillText(RAMP[Math.max(1, Math.round(f * (RAMP.length - 1)))], x * cx + cx / 2, y * cy + cy / 2);
        }
      g.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const enter = () => {
      aim = 1;
      start();
    };
    const leave = () => {
      aim = 0;
      start();
    };
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [fg]);

  return (
    <div ref={host} data-decode-host="" className={`${w.w} ${w[tone]} ${s.card} ${className}`}>
      <canvas ref={cv} className={s.fx} aria-hidden="true" />
      {children}
    </div>
  );
}
