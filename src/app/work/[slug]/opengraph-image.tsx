import { CASES, getCase } from "@/content/cases";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Case study · Camilo Bermeo";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

const clean = (s: string) => s.replace(/\[\[|\]\]|\*\*/g, "");

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase(slug)!;
  return ogImage({
    kicker: `Case ${c.num} · ${c.org.en} · ${c.year}`,
    title: c.title.en,
    metric: typeof c.metric?.value === "object" ? c.metric.value.en : c.metric?.value,
    metricLabel: c.metric?.label.en,
    line: clean(c.summary.en),
  });
}
