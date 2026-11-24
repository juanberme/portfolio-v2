import { TextLink } from "@/components/ui/Button";
import type { Block, Case, Section } from "@/content/cases";
import { tr, Tx, Val } from "@/lib/i18n";
import CompareTabs from "./CompareTabs";
import TryIt from "./TryIt";
import Typefaces from "./Typefaces";
import ZoomImage from "./ZoomImage";
import s from "./CaseBody.module.css";

const QR_HINT = tr("Scan to open it on your phone", "Escanea para abrirlo en tu celular");

/** Role / Team / Timeline / Platform / Tools row under the cover. */
export function CaseMeta({ c }: { c: Case }) {
  return (
    <div className={s.meta}>
      {c.meta.map((m) => (
        <div key={m.label.en}>
          <p className={`lbl dim ${s.metaLabel}`}>
            <Tx t={m.label} />
          </p>
          <p className={s.metaValue}>
            <Tx t={m.value} />
          </p>
        </div>
      ))}
    </div>
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "p":
      return (
        <p>
          <Tx t={b.text} />
        </p>
      );
    case "figure":
      return (
        <figure className={s.figure}>
          <ZoomImage shot={b.shot} sizes="(max-width: 760px) 92vw, 1000px" className={s.shot} />
          <figcaption className="lbl dim">
            <Tx t={b.caption} />
          </figcaption>
        </figure>
      );
    case "pair":
      return (
        <div className={s.pair}>
          {b.items.map((it) => (
            <figure key={it.shot.src} className={s.figure}>
              <ZoomImage shot={it.shot} sizes="(max-width: 760px) 46vw, 360px" className={s.shot} />
              <figcaption className="lbl dim">
                <Tx t={it.caption} />
              </figcaption>
            </figure>
          ))}
        </div>
      );
    case "compare":
      return <CompareTabs before={b.before} after={b.after} />;
    case "quote":
      return (
        <figure className={s.quoteWrap}>
          <blockquote className={s.quote}>
            “<Tx t={b.text} />”
          </blockquote>
          {b.source && (
            <figcaption className="lbl dim">
              <Tx t={b.source} />
            </figcaption>
          )}
        </figure>
      );
    case "link":
      return (
        <div className={s.linkWrap}>
          <TextLink href={b.href} label={b.label} arrow="out" className={s.link} />
          {b.qr && (
            <figure className={s.qr}>
              <img src={b.qr} alt="" width={120} height={120} />
              <figcaption className="lbl dim">
                <Tx t={QR_HINT} />
              </figcaption>
            </figure>
          )}
        </div>
      );
    case "list":
      return (
        <ol className={s.list}>
          {b.items.map((it) => (
            <li key={it.en}>
              <Tx t={it} />
            </li>
          ))}
        </ol>
      );
    case "swatches":
      return (
        <ul className={s.swatches}>
          {b.items.map((c) => (
            <li key={c.hex} className={s.swatch}>
              <span className={s.swatchFill} style={{ background: c.hex }} aria-hidden="true" />
              <span className={s.swatchHex}>{c.hex}</span>
              <span className="lbl dim">
                <Tx t={c.name} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "typefaces":
      return <Typefaces b={b} />;
    case "tryit":
      return <TryIt b={b} />;
    case "metric":
      return (
        <div className={s.metric}>
          <p className={s.metricValue}>
            <Val v={b.value} />
          </p>
          <p className="lbl dim">
            <Tx t={b.label} />
          </p>
        </div>
      );
  }
}

/** One numbered section: label in the left rail, title and blocks on the right. */
/** Screens wider than they are tall (web pages, spreads) get the section's full width, rail included, so they can be read. */
const isWide = (b: Block) => (b.type === "figure" && b.shot.w / b.shot.h > 1.2) || b.type === "compare";

export function CaseSection({ section }: { section: Section }) {
  return (
    <>
      <section className={s.section}>
        <p className={`lbl dim ${s.label}`}>
          <Tx t={section.label} />
        </p>
        <h2 className={`${s.title} ${s.cell}`}>
          <Tx t={section.title} />
        </h2>
        {section.body.map((b, i) =>
          b.type === "tryit" ? null : (
            <div key={i} className={isWide(b) ? s.wideCell : s.cell}>
              <BlockView b={b} />
            </div>
          ),
        )}
      </section>
      {/* the try-it card takes the site's full width, the same edges as the next-case and contact cards */}
      {section.body.map((b, i) =>
        b.type === "tryit" ? (
          <div key={i} className={`wrap ${s.wide}`}>
            <BlockView b={b} />
          </div>
        ) : null,
      )}
    </>
  );
}
