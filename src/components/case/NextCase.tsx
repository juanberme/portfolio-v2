import TrackedLink from "@/components/TrackedLink";
import { SecondaryButton } from "@/components/ui/Button";
import type { Case } from "@/content/cases";
import { work } from "@/content/home";
import { Tx, tr } from "@/lib/i18n";
import s from "./NextCase.module.css";

/** The end of a case: the previous case (narrow, outlined) beside the next one (wider, navy). */
export default function NextCase({ prev, next }: { prev: Case; next: Case }) {
  return (
    <section className={s.section}>
      <TrackedLink href={`/work/${prev.slug}`} event="case_open" eventProps={{ case: prev.slug, from: "prev_case" }} className={s.prev}>
        <span className="lbl dim">
          <Tx t={tr(`← Previous case · ${prev.num}`, `← Caso anterior · ${prev.num}`)} />
        </span>
        <span className={s.prevTitle}>
          <Tx t={prev.title} />
        </span>
      </TrackedLink>
      <TrackedLink href={`/work/${next.slug}`} event="case_open" eventProps={{ case: next.slug, from: "next_case" }} className={`on-dark ${s.card}`}
        style={{ "--btn-ink": "var(--paper)", "--btn-bg": "var(--navy)" } as React.CSSProperties}
      >
        <span className={s.copy}>
          <span className={`lbl ${s.kicker}`}>
            <Tx t={tr(`Next case · ${next.num}`, `Siguiente caso · ${next.num}`)} />
          </span>
          <span className={s.title}><Tx t={next.title} /></span>
          <span className={s.summary}>
            <Tx t={next.summary} />
          </span>
        </span>
        <SecondaryButton href={`/work/${next.slug}`} label={work.cta} asSpan />
      </TrackedLink>
    </section>
  );
}
