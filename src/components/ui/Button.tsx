import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";
import { Tx, type T } from "@/lib/i18n";
import DecodeText from "./DecodeText";
import s from "./Button.module.css";

/*
 * The two buttons of the site. See Button.module.css for when to use each one.
 * Colours follow --btn-ink / --btn-bg from the nearest container.
 */

type Arrow = "down" | "next" | "out";
const ARROW: Record<Arrow, string> = { down: "↓", next: "→", out: "↗" };

interface Common {
  href: string;
  label: T;
  /** analytics event name (sent only when custom events are on) */
  event?: string;
  eventProps?: Record<string, string>;
  className?: string;
}

function Anchor({ href, event, eventProps, className, children }: Omit<Common, "label"> & { children: React.ReactNode }) {
  const external = /^(https?:|mailto:)/.test(href);
  const extra = href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
  if (event) {
    return (
      <TrackedLink href={href} event={event} eventProps={eventProps} className={className} {...extra}>
        {children}
      </TrackedLink>
    );
  }
  if (external) {
    return (
      <a href={href} className={className} {...extra}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/**
 * 1 · Button: outlined pill with a circle arrow; the label decodes into ASCII on hover.
 * `asSpan` renders it as decoration inside a bigger link (a whole card), so links never nest;
 * then it reacts to that link's hover.
 */
export function SecondaryButton({ label, asSpan, ...rest }: Common & { asSpan?: boolean }) {
  const inner = (
    <>
      <DecodeText text={label.en} lang="en" className={`l-en ${s.label}`} />
      <DecodeText text={label.es} lang="es" className={`l-es ${s.label}`} />
      <span className={s.circle} aria-hidden="true">
        →
      </span>
    </>
  );
  if (asSpan) return <span className={`${s.secondary} ${rest.className ?? ""}`}>{inner}</span>;
  return (
    <Anchor {...rest} className={`${s.secondary} ${rest.className ?? ""}`}>
      {inner}
    </Anchor>
  );
}

/**
 * 0 · Primary: a filled pill with the circle arrow. Only for the one action a section exists for
 * (open a prototype, visit a live site). Same decode-on-hover label as the secondary.
 */
export function PrimaryButton({ label, ...rest }: Common) {
  return (
    <Anchor {...rest} className={`${s.primary} ${rest.className ?? ""}`}>
      <DecodeText text={label.en} lang="en" className={`l-en ${s.label}`} />
      <DecodeText text={label.es} lang="es" className={`l-es ${s.label}`} />
      <span className={s.circle} aria-hidden="true">
        ↗
      </span>
    </Anchor>
  );
}

/** 2 · Link: mono text + arrow. ↓ same page · → another page · ↗ another site. */
export function TextLink({ label, arrow, ...rest }: Common & { arrow: Arrow }) {
  return (
    <Anchor {...rest} className={`${s.link} ${rest.className ?? ""}`}>
      <Tx t={label} />
      <span className={`${s.arrow} ${s[arrow]}`} aria-hidden="true">
        {ARROW[arrow]}
      </span>
    </Anchor>
  );
}
