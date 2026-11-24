import { CASES } from "@/content/cases";
import { work } from "@/content/home";
import { Tx } from "@/lib/i18n";
import CaseSlab from "./CaseSlab";
import Parallax from "./Parallax";
import s from "./SelectedWork.module.css";

export default function SelectedWork() {
  return (
    <section id="work" className={s.section}>
      <Parallax>
        {/* pinned above the first project; leaves upward as the second one arrives (see Parallax.tsx) */}
        <div className={`wrap ${s.pin}`}>
          <div className={s.head}>
            <h2 className="d1">
              <Tx t={work.title} />
            </h2>
            <p className="lbl dim">
              <Tx t={work.count} />
            </p>
          </div>
        </div>
        {CASES.map((c, i) => (
          <CaseSlab key={c.slug} c={c} index={i} total={CASES.length} />
        ))}
        {/* keeps the full stack (all tabs + last card) on screen for a moment before it scrolls away */}
        <div aria-hidden="true" className={s.hold} />
      </Parallax>
    </section>
  );
}
