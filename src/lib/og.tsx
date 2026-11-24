import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/*
 * Link-preview images (LinkedIn, WhatsApp, Slack…), generated at build time in the site's
 * palette and type. Previews are in English (agreed: one language for previews).
 */

export const OG_SIZE = { width: 1200, height: 630 };

const font = (pkg: string, file: string) => readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

async function fonts() {
  const [serif, mono] = await Promise.all([
    font("ibm-plex-serif", "ibm-plex-serif-latin-700-normal.woff"),
    font("ibm-plex-mono", "ibm-plex-mono-latin-500-normal.woff"),
  ]);
  return [
    { name: "Plex Serif", data: serif, weight: 700 as const, style: "normal" as const },
    { name: "Plex Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ];
}

/** A field of ASCII glyphs rising from the bottom, as a static backdrop. */
function Field({ color }: { color: string }) {
  const RAMP = " .·:-=+*%#@";
  const rows: string[] = [];
  for (let y = 0; y < 22; y++) {
    let line = "";
    for (let x = 0; x < 92; x++) {
      const v = y / 21;
      const f = (v - 0.45) * 1.9 + 0.14 * Math.sin(x * 0.18) + 0.1 * Math.sin(x * 0.41 - v * 4);
      line += RAMP[Math.max(0, Math.min(RAMP.length - 1, Math.round(f * (RAMP.length - 1))))];
    }
    rows.push(line);
  }
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", fontFamily: "Plex Mono", fontSize: 22, lineHeight: "29px", color, whiteSpace: "pre", opacity: 0.55 }}>
      {rows.map((r, i) => (
        <div key={i}>{r}</div>
      ))}
    </div>
  );
}

export async function ogImage(o: { kicker: string; title: string; metric?: string; metricLabel?: string; line?: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#16162E", color: "#F4F2EF", padding: 72 }}>
        <Field color="#7F95FE" />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", fontFamily: "Plex Mono", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "rgba(244,242,239,.75)" }}>
            {o.kicker}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", fontFamily: "Plex Serif", fontSize: o.title.length > 28 ? 76 : 110, lineHeight: 0.95, letterSpacing: -4 }}>{o.title}</div>
            {o.metric ? (
              <div style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
                <div style={{ display: "flex", alignItems: "baseline", fontFamily: "Plex Serif", fontSize: 72, color: "#7F95FE", letterSpacing: -2 }}>
                  {/* the serif subset has no arrow glyph: draw it in mono */}
                  {o.metric.split("→").map((part, i, all) => (
                    <div key={i} style={{ display: "flex", alignItems: "baseline" }}>
                      {part.trim()}
                      {i < all.length - 1 && <span style={{ fontFamily: "Plex Mono", fontSize: 52, margin: "0 18px", letterSpacing: 0 }}>{"->"}</span>}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", fontFamily: "Plex Mono", fontSize: 20, letterSpacing: 2, textTransform: "uppercase", color: "rgba(244,242,239,.8)", maxWidth: 520 }}>
                  {o.metricLabel}
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", fontFamily: "Plex Mono", fontSize: 24, color: "rgba(244,242,239,.8)", maxWidth: 900 }}>{o.line}</div>
            )}
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", fontFamily: "Plex Mono", fontSize: 20, color: "#F4F2EF", background: "#16162E", padding: "8px 14px", borderRadius: 999 }}>
              Camilo Bermeo · Product Designer
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  );
}
