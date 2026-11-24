"use client";

import Image from "next/image";
import { useState } from "react";
import type { Shot } from "@/content/cases";
import { Tx, biAlt, tr } from "@/lib/i18n";
import Lightbox from "./Lightbox";
import s from "./ZoomImage.module.css";

const ENLARGE = tr("Enlarge image", "Ampliar imagen");

/** the alt text in the visible language, for content rendered only in the browser */
export const altNow = (shot: Shot) =>
  typeof document !== "undefined" && document.documentElement.getAttribute("data-lang") === "es" ? shot.alt.es : shot.alt.en;

/** A case screenshot that opens full size on click (or Enter / Space). */
export default function ZoomImage({ shot, sizes, className }: { shot: Shot; sizes: string; className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={s.thumb} onClick={() => setOpen(true)}>
        <Image src={shot.src} width={shot.w} height={shot.h} {...biAlt(shot.alt)} sizes={sizes} className={className} />
        <span className={s.hint} aria-hidden="true">
          ⤢
        </span>
        <span className="sr-only">
          <Tx t={ENLARGE} />
        </span>
      </button>
      <Lightbox open={open} onClose={() => setOpen(false)} aspect={shot.w / shot.h}>
        <Image src={shot.src} width={shot.w} height={shot.h} alt={altNow(shot)} sizes="100vw" quality={90} className={s.full} />
      </Lightbox>
    </>
  );
}
