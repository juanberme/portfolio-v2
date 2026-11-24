import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseMeta, CaseSection } from "@/components/case/CaseBody";
import CaseCover from "@/components/case/CaseCover";
import NextCase from "@/components/case/NextCase";
import ContactBlock, { SiteFooter } from "@/components/ContactBlock";
import { CASES, getCase, nextCase, prevCase } from "@/content/cases";

type Params = { slug: string };

/* every case page is generated as static HTML at build time */
export const dynamicParams = false;
export function generateStaticParams(): Params[] {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  const description = c.tease.en.replace(/\[\[|\]\]|\*\*/g, "");
  return {
    title: c.title.en,
    description,
    openGraph: { title: `${c.title.en} · Camilo Bermeo`, description, type: "article" },
  };
}

export default async function CasePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  /* landmarks: header (nav + cover) · main · footer */
  return (
    <>
      <CaseCover c={c} />
      <main>
        <CaseMeta c={c} />
        {c.sections.map((section) => (
          <CaseSection key={section.label.en} section={section} />
        ))}
        <NextCase prev={prevCase(c.slug)} next={nextCase(c.slug)} />
        <ContactBlock />
      </main>
      <SiteFooter />
    </>
  );
}
