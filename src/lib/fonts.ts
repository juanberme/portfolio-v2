import localFont from "next/font/local";

/*
 * IBM Plex, self-hosted from @fontsource (no request to Google at runtime, preloaded,
 * no layout shift). Each family exposes a CSS variable used by the tokens in globals.css.
 */

export const plexSerif = localFont({
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "serif"],
  src: [
    { path: "../../node_modules/@fontsource/ibm-plex-serif/files/ibm-plex-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/ibm-plex-serif/files/ibm-plex-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../../node_modules/@fontsource/ibm-plex-serif/files/ibm-plex-serif-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../node_modules/@fontsource/ibm-plex-serif/files/ibm-plex-serif-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

export const plexSans = localFont({
  variable: "--font-sans",
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
  src: [
    { path: "../../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
});

export const plexMono = localFont({
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "Menlo", "monospace"],
  src: [
    { path: "../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
});
