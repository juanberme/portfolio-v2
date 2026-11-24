"use client";

import { useEffect, useRef, useState } from "react";
import { about } from "@/content/home";
import { Tx, biLabel } from "@/lib/i18n";
import { GITHUB_SCALE } from "@/lib/tokens";
import s from "./About.module.css";

/*
 * GitHub contributions, live: fetched after load and every 10 minutes from a public
 * contributions endpoint, drawn as the usual heatmap in the project's blues.
 *
 * States
 *  - loading: an empty grid and "Loading contributions…"
 *  - live:    the real year, the total and the "Live" badge
 *  - error:   an empty grid, a short message and a link to the profile. No made-up data.
 */

type Day = { date: Date; level: number };
type State = "loading" | "live" | "error";
const SCALE = GITHUB_SCALE;

/** a year of empty days, so the grid keeps its shape while loading or after an error */
function emptyYear(): Day[] {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  return Array.from({ length: 371 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - 370 + i);
    return { date, level: 0 };
  });
}

const isEs = () => document.documentElement.getAttribute("data-lang") === "es";

function draw(cv: HTMLCanvasElement, days: Day[]) {
  const w = cv.clientWidth;
  const h = cv.clientHeight;
  if (w < 20 || h < 20 || !days.length) return;
  const es = isEs();
  const months = (es ? about.github.months.es : about.github.months.en).split(" ");
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  cv.width = w * dpr;
  cv.height = h * dpr;
  const g = cv.getContext("2d")!;
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.clearRect(0, 0, w, h);
  const left = 32;
  const top = 20;
  const gap = 3;
  const cell = Math.max(6, Math.floor((h - top - gap * 6) / 7));
  const weeks = Math.max(1, Math.floor((w - left + gap) / (cell + gap)));
  const endDow = days[days.length - 1].date.getDay();
  const X = (col: number) => left + col * (cell + gap);
  const Y = (row: number) => top + row * (cell + gap);
  const colTop: Record<number, Date> = {};
  for (let i = 0; i < days.length; i++) {
    const d = days[days.length - 1 - i];
    const off = i + (6 - endDow);
    const col = weeks - 1 - Math.floor(off / 7);
    if (col < 0) break;
    const row = d.date.getDay();
    if (row === 0 || colTop[col] == null) colTop[col] = d.date;
    g.fillStyle = SCALE[Math.min(4, d.level)];
    g.beginPath();
    if (g.roundRect) g.roundRect(X(col), Y(row), cell, cell, 2);
    else g.rect(X(col), Y(row), cell, cell);
    g.fill();
  }
  g.fillStyle = "rgba(244,242,239,.7)";
  g.font = "500 12px 'IBM Plex Mono', ui-monospace, monospace";
  g.textBaseline = "middle";
  [1, 3, 5].forEach((r, k) => g.fillText(es ? about.github.days[k].es : about.github.days[k].en, 0, Y(r) + cell / 2));
  g.textBaseline = "top";
  let last = -1;
  let lastX = -99;
  for (let col = 0; col < weeks; col++) {
    const d = colTop[col];
    if (!d) continue;
    const m = d.getMonth();
    if (m !== last && X(col) - lastX > 32) {
      g.fillText(months[m], X(col), 0);
      lastX = X(col);
    }
    last = m;
  }
}

export default function GitHubGraph({ user, profile }: { user: string; profile: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const days = useRef<Day[]>([]);
  const [total, setTotal] = useState<string | null>(null);
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    days.current = emptyYear();
    draw(cv, days.current);

    const load = () => {
      const ctl = new AbortController();
      const to = setTimeout(() => ctl.abort(), 6000);
      fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`, { signal: ctl.signal })
        .then((r) => {
          if (!r.ok) throw new Error(String(r.status));
          return r.json();
        })
        .then((j: { contributions?: { date: string; level?: number }[]; total?: Record<string, number> }) => {
          const list = (j.contributions || []).map((d) => ({ date: new Date(d.date + "T12:00:00"), level: d.level || 0 }));
          if (!list.length) throw new Error("empty");
          days.current = list;
          const t = j.total && (j.total.lastYear != null ? j.total.lastYear : Object.values(j.total)[0]);
          setTotal(t != null ? String(t) : null);
          setState("live");
          draw(cv, days.current);
        })
        /* keep the last good data if a refresh fails */
        .catch(() => setState((st) => (st === "live" ? st : "error")))
        .finally(() => clearTimeout(to));
    };
    /* wait for the page to settle; the graph is below the fold */
    const start = setTimeout(load, 1500);
    const every = setInterval(load, 600000);
    const ro = new ResizeObserver(() => draw(cv, days.current));
    ro.observe(cv);
    /* month and day names follow the language switch */
    const mo = new MutationObserver(() => draw(cv, days.current));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang"] });
    return () => {
      clearTimeout(start);
      clearInterval(every);
      ro.disconnect();
      mo.disconnect();
    };
  }, [user]);

  return (
    <>
      <div className={`${s.graph} ${state === "live" ? "" : s.graphIdle}`}>
        <canvas ref={ref} role="img" {...biLabel(about.github.aria)} className={s.graphCanvas} />
      </div>
      <div className={s.graphFoot} aria-live="polite">
        {state === "live" && (
          <>
            <p className="b6">
              {total && <span className={s.total}>{total} </span>}
              <span className={s.onNavyDim}>
                <Tx t={about.github.total} />
              </span>
            </p>
            <span className={s.live}>
              <span className="dot" />
              <Tx t={about.github.live} />
            </span>
          </>
        )}
        {state === "loading" && (
          <p className={`b6 ${s.onNavyDim}`}>
            <Tx t={about.github.loading} />
          </p>
        )}
        {state === "error" && (
          <p className={`b6 ${s.onNavyDim}`}>
            <Tx t={about.github.error} />{" "}
            <a href={profile} className={s.inlineLink}>
              <Tx t={{ en: "See it on GitHub", es: "Verlas en GitHub" }} /> <span aria-hidden="true">↗</span>
            </a>
          </p>
        )}
      </div>
    </>
  );
}
