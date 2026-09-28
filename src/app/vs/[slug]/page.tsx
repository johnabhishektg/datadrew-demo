import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader, PageShell } from "@/components/site/page-shell";
import { CtaButton, FaqBlock, FeatureGrid, Section, SimpleTable } from "@/components/site/blocks";
import {
  ApproachCards,
  BetterBuy,
  ContrastTiles,
  FeatureTable,
  FitColumns,
  KeepComparing,
  ReviewCards,
} from "@/components/site/compare-blocks";
import { JsonLd, OG_IMAGE_PATH, ORG_ID, SITE_ID, breadcrumbLd, faqLd, softwareApplicationLd } from "@/components/site/structured-data";
import { appStoreUrl, comparisons, getComparison, trustLine } from "@/content/comparisons";
import { site } from "@/content/site";
import { BrandLabel, BrandMark, DATADREW_MARK } from "@/components/site/brand-mark";
import { ShopifyBadge } from "@/components/site/shopify-badge";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  return {
    title: { absolute: c.title },
    description: c.metaDescription,
    alternates: { canonical: `/vs/${c.slug}` },
    openGraph: { title: c.title, description: c.metaDescription, url: `/vs/${c.slug}`, images: [{ url: OG_IMAGE_PATH, alt: c.title }] },
  };
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  const name = `Datadrew vs ${c.competitor}`;
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `https://${site.domain}/vs/${c.slug}/#webpage`,
      name: `${name} Comparison`,
      headline: c.title,
      description: c.metaDescription,
      url: `https://${site.domain}/vs/${c.slug}/`,
      dateModified: c.updated,
      isPartOf: { "@id": SITE_ID },
      about: { "@id": ORG_ID },
      inLanguage: "en",
    },
    softwareApplicationLd(),
    breadcrumbLd([{ name, path: `/vs/${c.slug}` }]),
    faqLd(c.faq),
  ];

  return (
    <PageShell>
      <JsonLd data={ld} />
      <PageHeader
        eyebrow="Comparison"
        headline={
          <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-2">
            <BrandLabel logo={DATADREW_MARK} name="Datadrew" size="lg" />
            <span className="text-muted-foreground">vs</span>
            <BrandLabel logo={c.logo} name={c.competitor} size="lg" />
          </span>
        }
        subhead={c.intro}
        crumbs={[{ label: name }]}
      >
        <ShopifyBadge height={36} />
        <CtaButton href="https://calendly.com/sumit-growth/discussion" variant="outline">
          Book a demo
        </CtaButton>
      </PageHeader>

      {/* Quick answer: the verdict in the first 200 words, as plain HTML. */}
      <div className="mx-auto mt-10 w-full max-w-6xl px-5 md:px-8">
        <div className="rounded-3xl border border-brand/30 bg-brand-soft/40 p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Quick answer</p>
          <p className="mt-3 text-pretty text-base font-medium leading-relaxed md:text-lg">{c.quickAnswer.verdict}</p>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground md:grid-cols-3 md:gap-4">
            {c.quickAnswer.points.map((pt) => (
              <li key={pt} className="flex gap-2">
                <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-brand" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-xs text-muted-foreground">
            Page reviewed <time dateTime={c.updated}>{new Date(`${c.updated}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}</time> · prices as noted in each table
          </p>
        </div>
      </div>
      <div className="mx-auto mt-10 w-full max-w-6xl px-5 md:px-8">
        <ContrastTiles c={c} />
      </div>

      {c.pricingLadder && (
        <Section eyebrow="Pricing" headline={c.pricingLadder.headline} subhead={c.pricingLadder.subhead} narrow>
          <SimpleTable
            head={c.pricingLadder.head.map((h, i) =>
              i === 1 ? (
                <span key={h} className="inline-flex items-center gap-2"><BrandMark logo={DATADREW_MARK} name="Datadrew" size="sm" />{h}</span>
              ) : i === 2 ? (
                <span key={h} className="inline-flex items-center gap-2"><BrandMark logo={c.logo} name={c.competitor} size="sm" />{h}</span>
              ) : (
                h
              )
            )}
            rows={c.pricingLadder.rows}
          />
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-muted-foreground">{c.pricingLadder.note}</p>
        </Section>
      )}

      <Section eyebrow="Feature by feature" headline={c.features.headline} subhead={c.features.subhead} narrow>
        <FeatureTable groups={c.features.groups} competitor={c.competitor} logo={c.logo} />
      </Section>

      <Section eyebrow="Fit" headline={c.fit.headline} subhead={c.fit.subhead || undefined} narrow>
        <FitColumns c={c} />
      </Section>

      <ApproachCards c={c} />

      <Section eyebrow="What arrives" headline={c.delivered.headline} subhead={c.delivered.subhead} narrow>
        <FeatureGrid items={c.delivered.items} />
        <p className="mt-6 text-sm text-muted-foreground">{trustLine}</p>
      </Section>

      <ReviewCards />

      <BetterBuy c={c} />

      <FaqBlock items={c.faq} subhead={c.faqSubhead || undefined} />

      <KeepComparing c={c} />

      <Section align="center" className="pb-0">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">{c.finalCta.headline}</h2>
          <p className="text-pretty text-base text-muted-foreground md:text-lg">{c.finalCta.subhead}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <CtaButton href={appStoreUrl}>Start for free</CtaButton>
            <CtaButton href="https://calendly.com/sumit-growth/discussion" variant="outline">
              Book a demo
            </CtaButton>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
