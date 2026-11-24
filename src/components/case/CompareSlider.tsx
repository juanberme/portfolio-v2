"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { Shot } from "@/content/cases";
import { Tx, biAlt, tr, type T } from "@/lib/i18n";
import Lightbox from "./Lightbox";
import { altNow } from "./ZoomImage";
import s from "./CompareSlider.module.css";

const BEFORE = tr("Before", "Antes");
const AFTER = tr("After", "Después");
const HOW = tr("Drag to compare before and after", "Desliza para comparar el antes y el después");
const ENLARGE = tr("Enlarge comparison", "Ampliar comparación");

type Side = { shot: Shot; caption: T };

/**
 * Before / after of the same screen, one over the other, with a vertical divider the visitor drags.
 * Left of the divider is "before", right is "after". The control is a native range input stretched
 * over the image, so it works with mouse, touch and the keyboard (arrow keys) and is announced by
 * screen readers. The enlarge button opens the same comparison full screen.
 */
function Stage({ before, after, large, onEnlarge }: { before: Side; after: Side; large?: boolean; onEnlarge?: () => void }) {
  /* starts with two thirds of the image on "after", so the result is what people see first */
  const [pos, setPos] = useState(33);
  const id = useId();
  const sizes = large ? "100vw" : "(max-width: 760px) 92vw, 720px";
  const alt = (sh: Shot) => (large ? { alt: altNow(sh) } : biAlt(sh.alt));

  return (
    <div className={s.stage} style={{ aspectRatio: `${before.shot.w} / ${before.shot.h}` }}>
      <Image src={before.shot.src} width={before.shot.w} height={before.shot.h} {...alt(before.shot)} sizes={sizes} className={s.img} />
      <div className={s.afterWrap} style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Image src={after.shot.src} width={after.shot.w} height={after.shot.h} {...alt(after.shot)} sizes={sizes} className={s.img} />
      </div>

      <span className={`${s.tag} ${s.tagBefore}`} aria-hidden="true">
        <Tx t={BEFORE} />
      </span>
      <span className={`${s.tag} ${s.tagAfter}`} aria-hidden="true">
        <Tx t={AFTER} />
      </span>

      <span id={id} className="sr-only">
        <Tx t={HOW} />
      </span>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-labelledby={id}
        aria-valuetext={`${100 - pos}%`}
        className={s.range}
      />
      <div className={s.handle} style={{ left: `${pos}%` }} aria-hidden="true">
        <span className={s.knob}>↔</span>
      </div>

      {onEnlarge && (
        <button type="button" className={s.enlarge} onClick={onEnlarge}>
          <span aria-hidden="true">⤢</span>
          <span className="sr-only">
            <Tx t={ENLARGE} />
          </span>
        </button>
      )}
    </div>
  );
}

export default function CompareSlider({ before, after }: { before: Side; after: Side }) {
  const [open, setOpen] = useState(false);
  return (
    <figure className={s.figure}>
      <Stage before={before} after={after} onEnlarge={() => setOpen(true)} />
      <figcaption className={`lbl dim ${s.caption}`}>
        <span>
          <Tx t={before.caption} />
        </span>
        <span>
          <Tx t={after.caption} />
        </span>
      </figcaption>
      <Lightbox open={open} onClose={() => setOpen(false)} aspect={before.shot.w / before.shot.h}>
        <Stage before={before} after={after} large />
      </Lightbox>
    </figure>
  );
}
