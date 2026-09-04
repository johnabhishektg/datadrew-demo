import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader, PageShell } from "@/components/site/page-shell";
import { CtaButton } from "@/components/site/blocks";
import { JsonLd, OG_IMAGE_PATH, breadcrumbLd, faqLd } from "@/components/site/structured-data";
import {
  PlatformClosing,
  PlatformFaq,
  PlatformHeroVisual,
  PlatformSectionView,
} from "@/components/site/platform-sections";
import { getPlatformPage, platformCtas, platformPages } from "@/content/platform";
import { site } from "@/content/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return platformPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPlatformPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/platform/${page.slug}` },
    openGraph: { title: `${page.title} — ${site.name}`, description: page.description, url: `/platform/${page.slug}`, images: [{ url: OG_IMAGE_PATH, alt: page.title }] },
  };
}

export default async function PlatformPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getPlatformPage(slug);
  if (!page) notFound();

  const ld = [
    breadcrumbLd([
      { name: "Platform", path: "/platform" },
      { name: page.nav, path: `/platform/${page.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.title,
      description: page.description,
      url: `https://${site.domain}/platform/${page.slug}`,
      provider: { "@type": "Organization", name: site.name, url: `https://${site.domain}` },
      serviceType: "Ecommerce analytics and AI ads agent",
    },
    faqLd(page.faq),
  ];

  return (
    <PageShell>
      <JsonLd data={ld} />
      <PageHeader
        crumbs={[
          { label: "Platform", href: "/platform" },
          { label: page.nav },
        ]}
        eyebrow={page.eyebrow}
        headline={page.headline}
        subhead={page.subhead}
        align="center"
      >
        <CtaButton href={platformCtas.startFree.href}>{platformCtas.startFree.label}</CtaButton>
        <CtaButton href={platformCtas.bookDemo.href} variant="outline">
          {platformCtas.bookDemo.label}
        </CtaButton>
      </PageHeader>
      {page.note && (
        <p className="mx-auto mt-4 max-w-3xl px-5 text-center font-mono text-[11px] uppercase tracking-wider text-muted-foreground md:px-8">
          {page.note}
        </p>
      )}
      {page.heroVisual && (
        <div className="mx-auto mt-10 w-full max-w-6xl px-5 md:mt-14 md:px-8">
          <PlatformHeroVisual page={page} />
        </div>
      )}
      <div className="mt-6 md:mt-10">
        {page.sections.map((s, i) => (
          <PlatformSectionView key={i} s={s} />
        ))}
      </div>
      <PlatformClosing page={page} />
      <PlatformFaq page={page} />
    </PageShell>
  );
}
