import { Fragment, type ReactNode } from "react";

/** A piece of copy in both languages. */
export type T = { en: string; es: string };
export type Lang = keyof T;

/**
 * How the language switch works
 * ------------------------------
 * Both languages are rendered into the HTML; CSS shows one (see globals.css, `.l-en` / `.l-es`).
 * A tiny script in <head> (LANG_SCRIPT) picks the language before the first paint:
 *   1. `?lang=es` or `?lang=en` in the URL (and remembers it)
 *   2. the visitor's previous choice (localStorage)
 *   3. the browser language (Spanish browsers get Spanish)
 *   4. otherwise English
 * No flash, no layout shift, and the page works without JavaScript.
 */
export const LANG_SCRIPT = `(function(){try{var d=document.documentElement,k='lang',q=new URLSearchParams(location.search).get(k),l=null;
if(q==='es'||q==='en'){l=q;localStorage.setItem(k,q)}else{var s=localStorage.getItem(k);if(s==='es'||s==='en')l=s}
if(!l){l=((navigator.languages&&navigator.languages[0])||navigator.language||'en').toLowerCase().indexOf('es')===0?'es':'en'}
d.setAttribute('data-lang',l);d.setAttribute('lang',l)}catch(e){}})();`;

/**
 * Inline rich text:
 *   **bold**
 *   [[still to write]]  -> the dashed orange "to fill in" marker from the design
 */
function rich(s: string): ReactNode {
  const parts = s.split(/(\*\*[^*]+\*\*|\[\[[^\]]+\]\])/g).filter(Boolean);
  return parts.map((p, i) => {
    if (p.startsWith("**")) return <b key={i}>{p.slice(2, -2)}</b>;
    if (p.startsWith("[[")) return <em key={i} className="tbd">{p.slice(2, -2)}</em>;
    return <Fragment key={i}>{p}</Fragment>;
  });
}

/** Renders a bilingual string; CSS decides which one is visible. */
export function Tx({ t }: { t: T }) {
  return (
    <>
      <span className="l-en" lang="en">
        {rich(t.en)}
      </span>
      <span className="l-es" lang="es">
        {rich(t.es)}
      </span>
    </>
  );
}

/** A value that may be the same in both languages (a plain string) or differ (T). */
export function Val({ v }: { v: string | T }) {
  return typeof v === "string" ? <>{v}</> : <Tx t={v} />;
}

/*
 * Attributes can't hold two languages, so alt texts and aria-labels ship in English with the
 * Spanish version in a data attribute; <LangAttrs /> swaps them when the language changes.
 */
export const biAlt = (t: T) => ({ alt: t.en, "data-alt-en": t.en, "data-alt-es": t.es });
export const biLabel = (t: T) => ({ "aria-label": t.en, "data-label-en": t.en, "data-label-es": t.es });

/** Small helper to write copy inline: tr("Hello", "Hola"). */
export const tr = (en: string, es: string): T => ({ en, es });
