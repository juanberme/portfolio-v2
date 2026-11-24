"use client";

import { useId, useState } from "react";
import type { Shot } from "@/content/cases";
import { Tx, biLabel, tr, type T } from "@/lib/i18n";
import ZoomImage from "./ZoomImage";
import s from "./CompareTabs.module.css";

const LABELS = { before: tr("Before", "Antes"), after: tr("After", "Después") };
const GROUP = tr("Compare before and after", "Comparar antes y después");

type Side = { shot: Shot; caption: T };

/**
 * Before / after of the same screen as two tabs. Each image is shown whole, so rows from the two
 * screens never mix. It opens on "after": the result is what people see first.
 */
export default function CompareTabs({ before, after }: { before: Side; after: Side }) {
  const [tab, setTab] = useState<"before" | "after">("after");
  const id = useId();
  const sides = { before, after };
  const current = sides[tab];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = tab === "before" ? "after" : "before";
      setTab(next);
      document.getElementById(`${id}-${next}`)?.focus();
    }
  };

  return (
    <figure className={s.figure}>
      <div className={s.tabs} role="tablist" {...biLabel(GROUP)} onKeyDown={onKey}>
        {(["before", "after"] as const).map((k) => (
          <button
            key={k}
            id={`${id}-${k}`}
            type="button"
            role="tab"
            aria-selected={tab === k}
            aria-controls={`${id}-panel`}
            tabIndex={tab === k ? 0 : -1}
            className={s.tab}
            onClick={() => setTab(k)}
          >
            <Tx t={LABELS[k]} />
          </button>
        ))}
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${tab}`}>
        <ZoomImage key={tab} shot={current.shot} sizes="(max-width: 760px) 92vw, 1000px" className={s.shot} />
        <figcaption className="lbl dim" style={{ marginTop: "var(--s100)" }}>
          <Tx t={current.caption} />
        </figcaption>
      </div>
    </figure>
  );
}
