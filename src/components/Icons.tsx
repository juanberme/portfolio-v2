/* Inline stroke/fill icons from the canvas. All decorative (aria-hidden). */

const common = { "aria-hidden": true, viewBox: "0 0 24 24" } as const;

export function GitHubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg {...common} width={size} height={size} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export function ToolIcon({ name }: { name: string }) {
  switch (name) {
    case "react":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.3">
          <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        </svg>
      );
    case "heatmap":
      return (
        <svg {...common}>
          <rect x="2.4" y="4" width="19.2" height="16" rx="2.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="9" cy="11" r="4.4" fill="currentColor" opacity=".22" />
          <circle cx="9" cy="11" r="2.2" fill="currentColor" opacity=".55" />
          <circle cx="16" cy="15" r="2.8" fill="currentColor" opacity=".22" />
          <circle cx="16" cy="15" r="1.3" fill="currentColor" opacity=".55" />
        </svg>
      );
    case "code":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 7 3 12l5 5M16 7l5 5-5 5M13.5 5l-3 14" />
        </svg>
      );
    default:
      return null;
  }
}
