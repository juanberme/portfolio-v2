import Image from "next/image";
import AsciiField from "@/components/AsciiField";
import TrackedLink from "@/components/TrackedLink";
import { SecondaryButton } from "@/components/ui/Button";
import { PLATFORM, type Case } from "@/content/cases";
import { work } from "@/content/home";
import { Tx, Val } from "@/lib/i18n";
import s from "./CaseSlab.module.css";

/** One case on the home page: a full-width slab that stacks over the previous one. */
export default function CaseSlab({ c, index, total }: { c: Case; index: number; total: number }) {
  const [a, b] = c.shots;
  return (
    <TrackedLink
      href={`/work/${c.slug}`}
      event="case_open"
      eventProps={{ case: c.slug, from: "home" }}
      className={s.slab}
      data-slab=""
      data-first={index === 0 ? "" : undefined}
      data-last={index === total - 1 ? "" : undefined}
      style={
        {
          "--i": index,
          "--n": total,
          zIndex: index + 1,
          background: c.slab.bg,
          color: c.slab.ink,
          "--btn-ink": c.slab.ink,
          "--btn-bg": c.slab.bg,
        } as React.CSSProperties
      }
    >
      <AsciiField className={s.field} mode={c.slab.ascii.mode} px={6} fg={c.slab.ascii.fg} bg={c.slab.bg} tint />
      {/* the tab: stays visible at the top when the next case stacks over this one.
          Hidden from screen readers: the same number, title and org are read from the card below. */}
      <div className={s.tab} aria-hidden="true">
        <span className="lbl">
          {c.num} · <Tx t={c.title} />
        </span>
        <span className={`lbl ${s.tabMeta}`}>
          <Tx t={c.org} /> · {c.year}
        </span>
      </div>
      <div className={s.inner}>
        <div className={s.copy}>
          <span className="lbl">
            <Tx t={c.org} /> · {c.year} · <Tx t={PLATFORM[c.platform]} />
          </span>
          <h3 className={s.title}>
            <Tx t={c.title} />
          </h3>
          <p className={s.summary}>
            <Tx t={c.summary} />
          </p>
          {c.metric && (
            <span className={s.metric}>
              <span className={s.metricValue}>
                <Val v={c.metric.value} />
              </span>
              <span className={s.metricLabel}>
                <Tx t={c.metric.label} />
              </span>
            </span>
          )}
          <SecondaryButton href={`/work/${c.slug}`} label={work.cta} asSpan className={s.cta} />
        </div>
        <div aria-hidden="true" className={s.media}>
          {c.platform === "Web" ? (
            <>
              <Image
                data-par=".07"
                src={a.src}
                width={a.w}
                height={a.h}
                alt=""
                sizes="(max-width: 900px) 92vw, 480px"
                className={s.webMain}
              />
              <Image
                data-par=".2"
                src={b.src}
                width={b.w}
                height={b.h}
                alt=""
                sizes="220px"
                className={s.webSecond}
              />
            </>
          ) : (
            <div className={s.phones}>
              <Image data-par=".08" src={a.src} width={a.w} height={a.h} alt="" sizes="150px" className={s.phone} />
              <Image data-par=".2" src={b.src} width={b.w} height={b.h} alt="" sizes="150px" className={s.phone} />
            </div>
          )}
        </div>
      </div>
    </TrackedLink>
  );
}
