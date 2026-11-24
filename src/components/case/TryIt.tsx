import Image from "next/image";
import AsciiField from "@/components/AsciiField";
import { PrimaryButton } from "@/components/ui/Button";
import type { Block } from "@/content/cases";
import { Tx, biAlt, tr } from "@/lib/i18n";
import s from "./TryIt.module.css";

type TryItBlock = Extract<Block, { type: "tryit" }>;

const QR_HINT = tr("Scan it with your phone", "Escanéalo con tu celular");
const QR_LINK = tr("or open it in the browser", "o ábrelo en el navegador");

/**
 * The closing call to action of a case: a card in the project's colour, with ASCII glyphs drifting
 * behind it, the live work's screen leaning out of one side, one primary button and, for work made
 * for a phone, a QR code (shown only on large screens: on a phone the button is enough).
 */
export default function TryIt({ b }: { b: TryItBlock }) {
  const phone = b.shot.h > b.shot.w;
  return (
    <div
      className={`${s.card} ${phone ? s.phone : s.wide}`}
      style={{ background: b.tone.bg, color: b.tone.ink, "--btn-ink": b.tone.ink, "--btn-bg": b.tone.bg } as React.CSSProperties}
    >
      <AsciiField mode="drift" px={7} fg={b.tone.fg} className={s.fx} />
      <div className={s.copy}>
        <p className={`lbl ${s.kicker}`}>
          <Tx t={b.kicker} />
        </p>
        <h3 className={s.title}>
          <Tx t={b.title} />
        </h3>
        <p className={s.body}>
          <Tx t={b.body} />
        </p>
        <div className={s.actions}>
          {/* with a QR, the button is only for phones: on a laptop the QR is the way in */}
          <PrimaryButton href={b.href} label={b.cta} event="tryit_open" eventProps={{ href: b.href }} className={b.qr ? s.phoneOnly : undefined} />
          {b.qr && (
            <figure className={s.qr}>
              <img src={b.qr} alt="" width={176} height={176} />
              <figcaption className="lbl">
                <Tx t={QR_HINT} />
                {/* for a reviewer on a laptop with no phone at hand */}
                <a href={b.href} target="_blank" rel="noopener noreferrer" className={s.qrLink}>
                  <Tx t={QR_LINK} />
                  <span aria-hidden="true"> ↗</span>
                </a>
              </figcaption>
            </figure>
          )}
        </div>
      </div>
      <div className={s.shot}>
        <Image src={b.shot.src} width={b.shot.w} height={b.shot.h} {...biAlt(b.shot.alt)} sizes={phone ? "260px" : "(max-width: 760px) 92vw, 640px"} />
      </div>
    </div>
  );
}
