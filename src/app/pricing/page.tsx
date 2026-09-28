import type { Metadata } from "next";
import { Fragment } from "react";
import { Check, Minus, Shield, Star } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/page-shell";
import { CtaButton, FaqBlock, Section } from "@/components/site/blocks";
import { PricingGmv } from "@/components/site/pricing-gmv";
import { LogoWall } from "@/components/site/logo-wall";
import { JsonLd, breadcrumbLd, faqLd, softwareApplicationLd } from "@/components/site/structured-data";
import { compareColumns, compareTable, pricingFaq, pricingPage } from "@/content/pricing-page";

export const metadata: Metadata = {
  title: { absolute: "Datadrew Pricing — Free, AI Intelligence & AI Ads CoPilot" },
  description:
    "Datadrew pricing for Shopify brands: free to put your data in your AI, AI Intelligence from $99/mo, AI Ads CoPilot from $249/mo. Flat fee by GMV, 7-day trial.",
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

      {/* Which plan — three one-line answers, then the honest cost frame. */}
      <Section className="py-0">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{p.help.headline}</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {p.help.items.map((it) => (
                <li key={it.plan} className="flex gap-3 text-sm leading-relaxed md:text-base">
                  <Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
                  <span>
                    <span className="font-semibold">{it.plan}</span> {it.body}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <CtaButton href={p.help.primary.href}>{p.help.primary.label}</CtaButton>
              <CtaButton href={p.help.secondary.href} variant="outline">
                {p.help.secondary.label}
              </CtaButton>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border bg-brand-soft/60 p-8 md:p-10">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">{p.roi.headline}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{p.roi.body}</p>
            </div>
            <p className="font-mono text-xs text-muted-foreground">Flat monthly fee · banded by GMV, not ad spend · no per-seat charges</p>
          </div>
        </div>
      </Section>

      <Section id="compare" headline="Compare every plan" subhead="Every capability behind the cards, grouped the way your team works." align="center">
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[40rem] text-sm">
            <thead className="sticky top-0">
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 text-left font-medium">What&rsquo;s included</th>
                {compareColumns.map((c, i) => (
                  <th key={c} className={i === 1 ? "px-5 py-3 text-center font-medium text-brand" : "px-5 py-3 text-center font-medium"}>
                    {c}
                  </th>
                ))}
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

      <Section className="py-0">
        <div className="grid gap-6 rounded-3xl border border-border bg-card p-8 md:grid-cols-[1.4fr_1fr] md:items-center md:p-10">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">For agencies</p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{p.agencies.headline}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{p.agencies.body}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <CtaButton href={p.agencies.primary.href}>{p.agencies.primary.label}</CtaButton>
            <CtaButton href={p.agencies.secondary.href} variant="outline">
              {p.agencies.secondary.label}
            </CtaButton>
          </div>
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
        headline="A few things you might be wondering"
        subhead="Plans, billing, credits and getting started. Anything else — support@datadrew.io."
      />
    </PageShell>
  );
}
