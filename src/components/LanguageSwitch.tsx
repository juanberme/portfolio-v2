"use client";

import { track } from "@/lib/analytics";
import styles from "./LanguageSwitch.module.css";

/**
 * Option B from the canvas references: a text link to the other language, written in that
 * language ("Español" on the English site, "English" on the Spanish one).
 */
export default function LanguageSwitch({ tone = "light" }: { tone?: "light" | "dark" }) {
  const toggle = () => {
    const d = document.documentElement;
    const next = d.getAttribute("data-lang") === "es" ? "en" : "es";
    d.setAttribute("data-lang", next);
    d.setAttribute("lang", next);
    try {
      localStorage.setItem("lang", next);
    } catch {}
    track("language_switch", { to: next });
  };
  return (
    <button type="button" onClick={toggle} className={`${styles.switch} ${tone === "dark" ? styles.dark : ""}`}>
      <span className="l-en" lang="es">
        Español
      </span>
      <span className="l-es" lang="en">
        English
      </span>
    </button>
  );
}
