/* the two Atelier typefaces: their @font-face rules live in Typefaces.module.css */
import "./Typefaces.module.css";
import type { Block } from "@/content/cases";
import s from "./CaseBody.module.css";

type TypefacesBlock = Extract<Block, { type: "typefaces" }>;

/** Each typeface shown in itself: a big "Aa", a sample line and its weights. */
export default function Typefaces({ b }: { b: TypefacesBlock }) {
  return (
    <div className={s.faces}>
      {b.items.map((f) => (
        <div key={f.name} className={s.face}>
          <p className={s.faceAa} style={{ fontFamily: f.css }} aria-hidden="true">
            Aa
          </p>
          <div>
            <p className={s.faceName} style={{ fontFamily: f.css }}>
              {f.name}
            </p>
            <p className={s.faceSample} style={{ fontFamily: f.css }}>
              {f.sample}
            </p>
            <p className="lbl dim">{f.weights}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
