"use client";

import { useEffect } from "react";

/**
 * Keeps alt texts and aria-labels in the visible language (see biAlt / biLabel in lib/i18n).
 * Runs after hydration and whenever html[data-lang] changes.
 */
export default function LangAttrs() {
  useEffect(() => {
    const html = document.documentElement;
    const apply = () => {
      const es = html.getAttribute("data-lang") === "es";
      document.querySelectorAll<HTMLElement>("[data-alt-en]").forEach((el) => {
        el.setAttribute("alt", (es ? el.dataset.altEs : el.dataset.altEn) || "");
      });
      document.querySelectorAll<HTMLElement>("[data-label-en]").forEach((el) => {
        el.setAttribute("aria-label", (es ? el.dataset.labelEs : el.dataset.labelEn) || "");
      });
    };
    apply();
    const mo = new MutationObserver(apply);
    mo.observe(html, { attributes: true, attributeFilter: ["data-lang"] });
    return () => mo.disconnect();
  }, []);
  return null;
}
