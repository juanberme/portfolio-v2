"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "01<>/\\|{}[]#%&@$*+=-:;!?";

/**
 * Text that "decodes" when its host is hovered or focused: every letter or digit turns into a
 * random ASCII glyph, then the word resolves left to right (~0.6 s). Punctuation, arrows and spaces
 * stay put. The host is the nearest link, button or element marked [data-decode-host].
 * Screen readers always get the real text; with reduced motion nothing animates.
 */
export default function DecodeText({ text, className, lang }: { text: string; className?: string; lang?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(text);

  useEffect(() => {
    setShown(text);
    const el = ref.current;
    const host = el?.closest("[data-decode-host], a, button");
    if (!el || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    /* on touch screens a tap would show the scrambled word for a moment, which reads as a bug */
    if (window.matchMedia("(hover: none)").matches) return;
    let timer = 0;
    let running = false;
    const run = () => {
      if (running) return;
      running = true;
      const total = 16;
      let frame = 0;
      const tick = () => {
        frame++;
        const done = Math.floor((frame / total) * text.length);
        setShown(
          frame >= total
            ? text
            : text
                .split("")
                .map((c, k) => (!/[A-Za-z0-9]/.test(c) || k < done ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
                .join(""),
        );
        if (frame < total) timer = window.setTimeout(tick, 38);
        else running = false;
      };
      tick();
    };
    host.addEventListener("mouseenter", run);
    host.addEventListener("focus", run);
    return () => {
      host.removeEventListener("mouseenter", run);
      host.removeEventListener("focus", run);
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <span ref={ref} className={className} lang={lang}>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
