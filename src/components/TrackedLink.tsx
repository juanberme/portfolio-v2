"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  /** analytics event name; only sent when custom events are enabled (src/lib/analytics.ts) */
  event: string;
  eventProps?: Record<string, string>;
};

/** A link that reports a click event. Internal hrefs use Next's <Link>. */
export default function TrackedLink({ href, event, eventProps, onClick, children, ...rest }: Props) {
  const handle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    track(event, eventProps);
    onClick?.(e);
  };
  // Files (e.g. the CV PDF) skip <Link> so the browser loads them directly.
  const isFile = /\.[a-z0-9]+$/i.test(href.split(/[?#]/)[0]);
  if ((href.startsWith("/") || href.startsWith("#")) && !isFile) {
    return (
      <Link href={href} onClick={handle} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
