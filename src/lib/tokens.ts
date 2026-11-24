/*
 * The colour tokens from globals.css, for places CSS variables can't reach:
 * canvas drawing (ASCII fields, GitHub graph) and the per-case card colours.
 * Keep these in sync with :root in src/app/globals.css.
 */
export const COLOR = {
  paper: "#F4F2EF",
  page: "#E8E5E1",
  card: "#DDD8D0",
  ink: "#0D0D0D",
  navy: "#16162E",
  navy2: "#2E3A7A",
  blue: "#7F95FE",
  blueInk: "#4E63D9",
  blueSoft: "#C3CDFF",
  orange: "#FF5E3C",
  /* tints used only by the ASCII fields */
  asciiBlue: "#A4B4FF",
  asciiNavy: "#3B4590",
  asciiOrange: "#FF8C70",
  asciiBeige: "#CEC8BF",
  /* hover-card glyphs on the beige cards */
  asciiEarth: "#B0A898",
} as const;

/** the GitHub heatmap scale, from no contributions to many */
export const GITHUB_SCALE = ["rgba(244,242,239,.12)", COLOR.navy2, COLOR.blueInk, COLOR.blue, COLOR.blueSoft];
