import type { Metadata } from "next";
import { Fragment } from "react";
import { Check, Minus, Shield, Star } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/page-shell";
import { CtaButton, FaqBlock, Section } from "@/components/site/blocks";
import { PricingGmv } from "@/components/site/pricing-gmv";
import { LogoWall } from "@/components/site/logo-wall";
import { JsonLd, breadcrumbLd, faqLd, softwareApplicationLd } from "@/components/site/structured-data";
import { compareTable, pricingFaq, pricingPage } from "@/content/pricing-page";

export const metadata: Metadata = {
  title: { absolute: "Datadrew Pricing — GMV-based plans for Shopify brands, from free" },
  description:
    "Simple, transparent pricing for Datadrew — the AI ads agent for Shopify brands, from free to Pro. No hidden fees, 7-day free trial on paid plans.",
  alternates: { canonical: "/pricing" },
};

function Cell({ v }: { v: string }) {
  if (v === "✓") return <Check className="mx-auto size-4 text-brand" aria-label="Included" />;
  if (v === "—") return <Minus className="mx-auto size-4 text-muted-foreground/50" aria-label="Not included" />;
  return <span>{v}</span>;
}

export default function PricingPage() {
  const p = pricingPage;
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Pricing", path: "/pricing" }]),
          faqLd(pricingFaq),
          softwareApplicationLd(),
        ]}
      />

      <PageHeader align="center" eyebrow={p.eyebrow} headline={p.headline} subhead={p.subhead}>
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {p.trust.map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5">
              <Shield className="size-3.5 text-brand" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      </PageHeader>
      <p className="mt-4 text-center font-mono text-xs text-muted-foreground">{p.updated}</p>

      <Section id="plans" headline={p.plansHeadline} align="center" className="pt-8 md:pt-10">
        <PricingGmv />
      </Section>

      <Section className="py-0">
        <div className="grid gap-6 rounded-3xl border border-border bg-card p-8 md:grid-cols-[1.4fr_1fr] md:items-center md:p-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{p.help.headline}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{p.help.body}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <CtaButton href={p.help.primary.href}>{p.help.primary.label}</CtaButton>
            <CtaButton href={p.help.secondary.href} variant="outline">
              {p.help.secondary.label}
            </CtaButton>
          </div>
        </div>
      </Section>

      <Section id="compare" headline="Compare all features" align="center">
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[40rem] text-sm">
            <thead className="sticky top-0">
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 text-left font-medium">Features</th>
                <th className="px-5 py-3 text-center font-medium">Free</th>
                <th className="px-5 py-3 text-center font-medium text-brand">Essentials</th>
                <th className="px-5 py-3 text-center font-medium">Pro</th>
              </tr>
            </thead>
            <tbody>
              {compareTable.map((g) => (
                <Fragment key={g.group}>
                  <tr className="border-b border-border bg-muted/40">
                    <th colSpan={4} className="px-5 py-2 text-left text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {g.group}
                    </th>
                  </tr>
                  {g.rows.map((r) => (
                    <tr key={r.label} className="border-b border-border/60 last:border-0">
                      <td className="px-5 py-3 align-top font-medium">
                        {r.label}
                        {r.note && <span className="mt-0.5 block text-xs font-normal text-muted-foreground">{r.note}</span>}
                      </td>
                      {r.cells.map((c, i) => (
                        <td key={i} className="px-5 py-3 text-center align-top text-muted-foreground">
                          <Cell v={c} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <LogoWall />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <figure className="flex flex-col justify-between gap-6 rounded-3xl border border-border bg-card p-8">
            <div>
              <div className="flex gap-0.5 text-brand" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-pretty text-base leading-relaxed md:text-lg">&ldquo;{p.testimonial.quote}&rdquo;</blockquote>
            </div>
            <figcaption className="flex items-center gap-3 text-sm">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-soft font-mono text-xs font-semibold text-brand">
                {p.testimonial.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <span>
                <span className="block font-medium">{p.testimonial.name}</span>
                <span className="text-muted-foreground">{p.testimonial.role}</span>
              </span>
            </figcaption>
          </figure>
          <div className="flex flex-col justify-between gap-6 rounded-3xl border border-border bg-brand-soft/60 p-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">{p.experts.headline}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{p.experts.body}</p>
            </div>
            <CtaButton href={p.experts.cta.href} className="w-fit">
              {p.experts.cta.label}
            </CtaButton>
          </div>
        </div>
      </Section>

      <FaqBlock
        items={pricingFaq}
        headline="Frequently asked questions about pricing"
        subhead="We're here to answer all your questions. Anything else — support@datadrew.io."
      />
    </PageShell>
  );
}
