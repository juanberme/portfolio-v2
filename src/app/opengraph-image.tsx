import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Camilo Bermeo · Product Designer";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    kicker: "Product Designer · Alegra",
    title: "I find the real problem, then build the proof.",
    metric: "6% → 25%",
    metricLabel: "bank reconciliation adoption in four months",
  });
}
