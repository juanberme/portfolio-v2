"use client";

import { useEffect, useRef } from "react";

/**
 * Moves every [data-par] element inside it a little as the page scrolls (the screens in the
 * case slabs). Runs only while scrolling, off on phones and with reduced motion.
 */
export default function Parallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 760px)");
    if (mq.matches) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-par]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight || 800;
      for (const el of els) {
        const box = (el.closest("a") || el.parentElement)!.getBoundingClientRect();
        if (box.bottom < -200 || box.top > vh + 200) continue;
        const dy = Math.max(-70, Math.min(70, -(box.top + box.height / 2 - vh / 2) * Number(el.dataset.par)));
        el.style.transform = `translate3d(0,${dy.toFixed(1)}px,0)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  /*
   * Stack offset. While only the first project is on screen, the "Selected work" title sits
   * pinned above it (--offset = title height). As the second project slides up, --offset eases
   * to 0: the title leaves upward and the whole stack moves up with it, so the first project's
   * tab ends up at the very top, above the others.
   */
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const slabs = Array.from(root.querySelectorAll<HTMLElement>("[data-slab]"));
    const second = slabs[1];
    if (!second) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const cs = getComputedStyle(root);
      const head = parseFloat(cs.getPropertyValue("--head")) || 0;
      const peek = parseFloat(getComputedStyle(second).getPropertyValue("--peek")) || 0;
      const vh = window.innerHeight || 800;
      const top = second.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, (top - peek) / Math.max(1, vh - peek)));
      root.style.setProperty("--offset", `${(head * p).toFixed(1)}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  /*
   * Keyboard focus on a stacked card: the browser scrolls the card into view, but the sticky
   * stack can leave it under the next card (WCAG 2.4.11). Scroll to the point where the focused
   * card has just pinned, so its tab and copy are in full view.
   */
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const onFocus = (e: FocusEvent) => {
      const slab = (e.target as HTMLElement).closest<HTMLElement>("[data-slab]");
      if (!slab || !slab.matches(":focus-visible")) return;
      requestAnimationFrame(() => {
        const prev = slab.style.position;
        slab.style.position = "relative"; // measure where the card sits in the page flow
        const natural = slab.getBoundingClientRect().top + window.scrollY;
        slab.style.position = prev;
        const stick = parseFloat(getComputedStyle(slab).top) || 0;
        window.scrollTo({ top: Math.max(0, natural - stick), behavior: "auto" });
      });
    };
    root.addEventListener("focusin", onFocus);
    return () => root.removeEventListener("focusin", onFocus);
  }, []);

  return (
    <div ref={ref} style={{ "--offset": "var(--head, 0px)" } as React.CSSProperties}>
      {children}
    </div>
  );
}
