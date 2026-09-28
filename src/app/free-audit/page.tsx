import type { Metadata } from "next";
import { OG_IMAGE_PATH } from "@/components/site/structured-data";
import { Eyebrow, CtaButton, FaqBlock, FeatureGrid, Section, Steps } from "@/components/site/blocks";
import { HealthReportCard } from "@/components/site/audit-blocks";
import { PageShell } from "@/components/site/page-shell";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/site/structured-data";
import { freeAudit as a } from "@/content/free-audit";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${a.title} | ${site.name}` },
  description: a.metaDescription,
  alternates: { canonical: "/free-audit" },
  openGraph: { title: a.title, description: a.metaDescription, url: "/free-audit", images: [{ url: OG_IMAGE_PATH, alt: a.title }] },
};

export default function FreeAuditPage() {
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: a.title,
      description: a.metaDescription,
      url: `https://${site.domain}/free-audit/`,
    },
    breadcrumbLd([{ name: "Free ad spend leakage check", path: "/free-audit" }]),
    faqLd(a.faq),
  ];

  return (
    <PageShell>
      <JsonLd data={ld} />
      {/* Hero: copy left, mock report right */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div className="flex flex-col gap-4">
          <Eyebrow>{a.hero.eyebrow}</Eyebrow>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            {a.hero.headline[0]}
            <br />
            {a.hero.headline[1]}
          </h1>
          <p className="max-w-xl text-pretty text-base text-muted-foreground md:text-lg">{a.hero.subhead}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <CtaButton href={a.hero.primaryCta.href}>{a.hero.primaryCta.label}</CtaButton>
            <CtaButton href={a.hero.secondaryCta.href} variant="outline">
              {a.hero.secondaryCta.label}
            </CtaButton>
          </div>
          <p className="text-xs text-muted-foreground">{a.hero.trust}</p>
        </div>
        <HealthReportCard />
      </section>

      <Section eyebrow={a.includes.eyebrow} headline={a.includes.headline} subhead={a.includes.subhead} align="center">
        <FeatureGrid items={a.includes.items} />
      </Section>

      <Section eyebrow={a.steps.eyebrow} headline={a.steps.headline} align="center">
        <Steps steps={a.steps.items} />
      </Section>

      <FaqBlock items={a.faq} eyebrow="Common questions" headline="Before you connect" />

      <Section align="center" className="pb-0">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">{a.finalCta.headline}</h2>
          <p className="text-pretty text-base text-muted-foreground md:text-lg">{a.finalCta.subhead}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <CtaButton href={a.hero.primaryCta.href}>{a.hero.primaryCta.label}</CtaButton>
            <CtaButton href="https://calendly.com/sumit-growth/discussion" variant="outline">
              Book a demo
            </CtaButton>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
