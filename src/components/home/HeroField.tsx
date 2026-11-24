"use client";

import { useEffect, useRef } from "react";
import AsciiField from "@/components/AsciiField";
import { COLOR } from "@/lib/tokens";
import s from "./HomeHero.module.css";

/*
 * The hero's ASCII, behind everything:
 *  - a soft field that fills the whole hero and reacts to the pointer;
 *  - the blue aurora band along the bottom, as before.
 * Both sit under one mask with a clear "hole" around the copy, sized from the copy's real box
 * (measured here and kept up to date on resize), so the text and the buttons always read cleanly.
 */
export default function HeroField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fx = ref.current;
    const header = fx?.parentElement;
    const copy = header?.querySelector<HTMLElement>("[data-hero-copy]");
    if (!fx || !header || !copy) return;
    const update = () => {
      const h = header.getBoundingClientRect();
      const c = copy.getBoundingClientRect();
      /* the hole is an ellipse ~45% larger than the copy box; fully clear up to 72% of it */
      fx.style.setProperty("--hole-x", `${(c.left + c.width / 2 - h.left).toFixed(0)}px`);
      fx.style.setProperty("--hole-y", `${(c.top + c.height / 2 - h.top).toFixed(0)}px`);
      fx.style.setProperty("--hole-rx", `${(c.width * 0.72).toFixed(0)}px`);
      fx.style.setProperty("--hole-ry", `${(c.height * 0.72).toFixed(0)}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(header);
    ro.observe(copy);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={s.fx} aria-hidden="true">
      <AsciiField mode="drift" px={7} fg={COLOR.blueSoft} bg="none" />
      <AsciiField mode="aurora" flip light px={8} fg={COLOR.blue} bg="none" style={{ top: "auto", height: "var(--ascii-band, 100%)" }} />
    </div>
  );
}
