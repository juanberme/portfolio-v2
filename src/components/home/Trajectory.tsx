import Image from "next/image";
import DecodeText from "@/components/ui/DecodeText";
import { trajectory as t } from "@/content/home";
import { ORGS } from "@/content/orgs";
import { Tx, type T } from "@/lib/i18n";
import HoverCard from "./HoverCard";
import s from "./Trajectory.module.css";
import { COLOR } from "@/lib/tokens";

/* the year of each stage decodes when its card is hovered (canvas: "Trayectoria · combinada") */
const Year = ({ t: y }: { t: T | string }) =>
  typeof y === "string" ? (
    <DecodeText text={y} />
  ) : (
    <>
      <DecodeText text={y.en} lang="en" className="l-en" />
      <DecodeText text={y.es} lang="es" className="l-es" />
    </>
  );

/* glyph colours for the hover ASCII: project blue on navy, an earth tone on the beige cards */
const ON_NAVY = COLOR.blue;
const ON_BEIGE = COLOR.asciiEarth;

export default function Trajectory() {
  return (
    <section className={`wrap ${s.section}`}>
      <div className={s.head}>
        <h2 className="d1">
          <Tx t={t.title} />
        </h2>
        <p className="lbl dim" style={{ marginTop: "var(--s100)" }}>
          <Tx t={t.total} />
        </p>
      </div>
      <div className={s.wall}>
        <HoverCard tone="navy" fg={ON_NAVY} className={s.current}>
          <Image src={ORGS.alegra.logo} alt="" width={48} height={48} className={s.logoLg} />
          <div>
            <p className="lbl dim">
              <Year t={t.current.years} />
            </p>
            <h3 className="d2" style={{ marginTop: "var(--s75)" }}>
              <Tx t={t.current.role} />
            </h3>
            <p className="t2" style={{ marginTop: "var(--s50)" }}>
              {t.current.org}
            </p>
            <p className="b6 dim" style={{ marginTop: "var(--s200)", maxWidth: "34ch" }}>
              <Tx t={t.current.body} />
            </p>
          </div>
          <p className="b6 dim" style={{ display: "inline-flex", alignItems: "center", gap: "var(--s75)" }}>
            <span className="dot" />
            <Tx t={t.current.badge} />
          </p>
        </HoverCard>

        {t.past.map((p) => (
          <HoverCard key={p.org} fg={ON_BEIGE} className={s.past}>
            <Image src={p.logo} alt="" width={40} height={40} className={s.logo} />
            <div>
              <p className="lbl dim">
                <Year t={p.year} />
              </p>
              <h3 className="d3" style={{ marginTop: "var(--s50)" }}>
                {p.org}
              </h3>
              <p className="b6 dim" style={{ marginTop: "var(--s75)" }}>
                <Tx t={p.body} />
              </p>
            </div>
          </HoverCard>
        ))}

        <HoverCard fg={ON_BEIGE} className={s.past}>
          <img src={t.education.logo} alt="" width={40} height={40} className={s.logo} />
          <div>
            <p className="lbl dim">
              <Year t={t.education.year} />
            </p>
            <h3 className="d3" style={{ marginTop: "var(--s50)" }}>
              <Tx t={t.education.title} />
            </h3>
            <p className="b6 dim" style={{ marginTop: "var(--s75)" }}>
              <Tx t={t.education.body} />
            </p>
          </div>
        </HoverCard>
      </div>
    </section>
  );
}
