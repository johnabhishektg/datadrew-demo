import type { Metadata } from "next";
import { CheckList, CtaButton, FeatureGrid, Section, StatBand, Steps } from "@/components/site/blocks";
import { PageShell, PageHeader } from "@/components/site/page-shell";
import { JsonLd, breadcrumbLd } from "@/components/site/structured-data";
import { becomePartner, partnerCalendly } from "@/content/partners";

export const metadata: Metadata = {
  title: becomePartner.meta.title,
  description: becomePartner.meta.description,
  alternates: { canonical: "/partners/become-a-partner" },
};

export default function BecomePartnerPage() {
  const p = becomePartner;
  return (
    <PageShell cta={false}>
      <JsonLd
        data={breadcrumbLd([
          { name: "Partners", path: "/partners" },
          { name: "Become a Partner", path: "/partners/become-a-partner" },
        ])}
      />
      <PageHeader eyebrow={p.eyebrow} headline={p.headline} subhead={p.subhead} crumbs={[{ label: "Partners", href: "/partners" }, { label: "Become a Partner" }]}>
        <CtaButton href="#paths">Explore partnership types</CtaButton>
        <CtaButton href={partnerCalendly} variant="outline">
          Talk to us
        </CtaButton>
      </PageHeader>

      <div className="mx-auto w-full max-w-6xl px-5 pt-10 md:px-8 md:pt-14">
        <StatBand stats={p.stats} />
      </div>

      <Section id="paths" headline={p.paths.headline} subhead={p.paths.subhead} align="center">
        <ul className="grid gap-4 md:grid-cols-2">
          {p.paths.items.map((path) => (
            <li key={path.title} className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 md:p-8">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">{path.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{path.body}</p>
              </div>
              <CheckList items={path.perks} />
              <p className="text-xs leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">Ideal for:</span> {path.idealFor}
              </p>
              <CtaButton href={partnerCalendly} className="mt-auto w-fit">
                {path.cta}
              </CtaButton>
            </li>
          ))}
        </ul>
      </Section>

      <Section headline={p.why.headline} subhead={p.why.subhead} align="center" className="border-t border-border">
        <FeatureGrid
          items={p.why.items.map((it, i) => ({ title: it.title, description: it.body, tag: `0${i + 1}` }))}
        />
      </Section>

      <Section headline={p.how.headline} subhead={p.how.subhead} align="center" className="border-t border-border">
        <Steps steps={p.how.steps} />
      </Section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-16 md:px-8 md:pb-24">
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-brand/30 bg-brand/5 px-6 py-12 text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">{p.cta.headline}</h2>
          <p className="max-w-xl text-sm text-muted-foreground md:text-base">{p.cta.body}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <CtaButton href={p.cta.primary.href}>{p.cta.primary.label}</CtaButton>
            <CtaButton href={p.cta.secondary.href} variant="outline">
              {p.cta.secondary.label}
            </CtaButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
