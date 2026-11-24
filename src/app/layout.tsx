import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { plexMono, plexSans, plexSerif } from "@/lib/fonts";
import LangAttrs from "@/components/LangAttrs";
import { LANG_SCRIPT } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import "./globals.css";
import { COLOR } from "@/lib/tokens";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Camilo Bermeo · Product Designer",
    template: "%s · Camilo Bermeo",
  },
  description:
    "Product Designer at Alegra. I design the banking and payments side of a SaaS used across Latin America, and I prototype in code.",
  icons: { icon: "/images/logo.svg" },
  openGraph: { type: "website", siteName: SITE.name },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: COLOR.page,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-lang="en"
      suppressHydrationWarning
      className={`${plexSerif.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <head>
        {/* picks the language before first paint; see src/lib/i18n.tsx */}
        <script dangerouslySetInnerHTML={{ __html: LANG_SCRIPT }} />
      </head>
      <body>
        {children}
        <LangAttrs />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
