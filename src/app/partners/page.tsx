import type { Metadata } from "next";
import { CtaButton, StatBand } from "@/components/site/blocks";
import { DarkCta } from "@/components/site/dark-cta";
import { PageShell, PageHeader } from "@/components/site/page-shell";
import { PartnerDirectory } from "@/components/site/partner-directory";
import { JsonLd, breadcrumbLd } from "@/components/site/structured-data";
import { partnersDirectory } from "@/content/partners";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: partnersDirectory.meta.title,
  description: partnersDirectory.meta.description,
  alternates: { canonical: "/partners" },
};

const pageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Agency Partners - Datadrew",
  description:
    "Directory of Datadrew certified agency partners specializing in e-commerce growth, performance marketing, Shopify development, and retention strategies across 25+ countries.",
  url: `https://${site.domain}/partners`,
};

export default function PartnersPage() {
  const p = partnersDirectory;
  return (
    <PageShell cta={false}>
      <JsonLd data={[breadcrumbLd([{ name: "Partners", path: "/partners" }]), pageLd]} />
      <PageHeader eyebrow={p.eyebrow} headline={p.headline} subhead={p.subhead}>
        <CtaButton href={p.cta.primary.href} variant="outline">
          {p.cta.primary.label}
        </CtaButton>
        <CtaButton href="/partners/tech" variant="ghost">
          Tech partners
        </CtaButton>
      </PageHeader>

      <div className="mx-auto w-full max-w-6xl px-5 pt-10 md:px-8 md:pt-14">
        <StatBand stats={p.stats} columns={3} />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 pt-10 md:px-8 md:pt-14">
        <PartnerDirectory />
      </div>

      <DarkCta headline={p.cta.headline} subhead={p.cta.body} primary={p.cta.primary} secondary={p.cta.secondary} />
    </PageShell>
  );
}
