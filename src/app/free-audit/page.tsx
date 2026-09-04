import type { Metadata } from "next";
import { Eyebrow, CtaButton, FeatureGrid, Section, Steps } from "@/components/site/blocks";
import { HealthReportCard } from "@/components/site/audit-blocks";
import { PageShell } from "@/components/site/page-shell";
import { JsonLd, breadcrumbLd } from "@/components/site/structured-data";
import { freeAudit as a } from "@/content/free-audit";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${a.title} | ${site.name}` },
  description: a.metaDescription,
  alternates: { canonical: "/free-audit" },
  openGraph: { title: a.title, description: a.metaDescription, url: `https://${site.domain}/free-audit` },
};

export default function FreeAuditPage() {
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Free AI Store Health Check",
      description:
        "Get a free AI-powered health check of your Shopify store analyzing LTV, retention, product performance, and ad spend.",
      url: `https://${site.domain}/free-audit`,
    },
    breadcrumbLd([{ name: "Free store health check", path: "/free-audit" }]),
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

      <Section align="center" className="pb-0">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">{a.finalCta.headline}</h2>
          <p className="text-pretty text-base text-muted-foreground md:text-lg">{a.finalCta.subhead}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <CtaButton href={a.hero.primaryCta.href}>{a.hero.primaryCta.label}</CtaButton>
            <CtaButton href="/book" variant="outline">
              Book a demo
            </CtaButton>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
