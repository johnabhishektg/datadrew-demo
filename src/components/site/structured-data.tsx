import { faq, pricing, site } from "@/content/site";
import { links } from "@/content/company";
import type { PostMeta } from "@/content/blog";

/* JSON-LD for search + AI answer engines. Rendered inline; content derives
 * from the same content modules as the visible page, so it can't drift.
 * Entity ids are stable so every page's graph points at the same Organization
 * and WebSite nodes (Searchable: "Organization schema reference missing"). */

export const ORIGIN = `https://${site.domain}`;
export const ORG_ID = `${ORIGIN}/#organization`;
export const SITE_ID = `${ORIGIN}/#website`;
export const APP_ID = `${ORIGIN}/#software`;
export const OG_IMAGE_PATH = "/brand/datadrew-square.png";
export const LOGO_URL = `${ORIGIN}${OG_IMAGE_PATH}`;
export const DEFAULT_OG_IMAGE = LOGO_URL;

export const AUTHOR_PROFILES: Record<string, { sameAs: string[]; jobTitle?: string }> = {
  "Sumit Bansal": { sameAs: ["https://www.linkedin.com/in/sumit-bansal/"], jobTitle: "Co-founder, Datadrew" },
  "Datadrew Team": { sameAs: [links.linkedin] },
};

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: `${ORIGIN}/`,
    logo: { "@type": "ImageObject", url: LOGO_URL, width: 1200, height: 1200 },
    description: site.description,
    sameAs: [links.linkedin, links.x, "https://apps.shopify.com/customer-lifetime-value"],
    founders: [
      { "@type": "Person", name: "Sumit Bansal", sameAs: "https://www.linkedin.com/in/sumit-bansal/" },
      { "@type": "Person", name: "Vikas Bansal", sameAs: "https://www.linkedin.com/in/vikas-bansal/" },
    ],
    contactPoint: [
      { "@type": "ContactPoint", contactType: "customer support", email: "support@datadrew.io" },
      { "@type": "ContactPoint", contactType: "sales", email: "hello@datadrew.io" },
    ],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: site.name,
    url: `${ORIGIN}/`,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function softwareApplicationLd(extra: object = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": APP_ID,
    name: site.name,
    url: `${ORIGIN}/`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: site.description,
    publisher: { "@id": ORG_ID },
    offers: pricing.tiers.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      price: tier.price.replace("$", ""),
      priceCurrency: "USD",
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "35",
    },
    ...extra,
  };
}

/* Organization + WebSite: emitted once from the root layout on every page. */
export function SiteStructuredData() {
  return <JsonLd data={[organizationLd(), websiteLd()]} />;
}

export function HomeStructuredData() {
  const data = [
    softwareApplicationLd(),
    faqLd(faq),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${ORIGIN}/#webpage`,
      url: `${ORIGIN}/`,
      name: `${site.name} — ${site.tagline}`,
      description: site.metaDescription,
      isPartOf: { "@id": SITE_ID },
      about: { "@id": ORG_ID },
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#faq"] },
    },
  ];
  return <JsonLd data={data} />;
}

export function ArticleStructuredData({ post }: { post: PostMeta }) {
  const url = `${ORIGIN}/blog/${post.slug}/`;
  const profile = AUTHOR_PROFILES[post.author.name];
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.metaDescription,
      datePublished: post.date,
      dateModified: post.updated,
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      isPartOf: { "@id": SITE_ID },
      image: [post.cover ?? DEFAULT_OG_IMAGE],
      inLanguage: "en",
      articleSection: post.category,
      author: {
        "@type": "Person",
        name: post.author.name,
        ...(profile?.jobTitle ? { jobTitle: profile.jobTitle } : post.author.role ? { jobTitle: post.author.role } : {}),
        ...(profile?.sameAs ? { sameAs: profile.sameAs } : {}),
        worksFor: { "@id": ORG_ID },
      },
      publisher: {
        "@type": "Organization",
        "@id": ORG_ID,
        name: site.name,
        logo: { "@type": "ImageObject", url: LOGO_URL },
      },
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".article-body p:first-of-type"] },
    },
    breadcrumbLd([
      { name: "Blog", path: "/blog" },
      { name: post.cardTitle, path: `/blog/${post.slug}` },
    ]),
  ];
  return <JsonLd data={data} />;
}

export function collectionPageLd({ name, path, description }: { name: string; path: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${ORIGIN}${path}/#webpage`,
    url: `${ORIGIN}${path}/`,
    name,
    description,
    isPartOf: { "@id": SITE_ID },
    publisher: { "@id": ORG_ID },
  };
}

/** Service schema for /integrations/<slug> (Searchable flags it missing on all 24 live integration pages). */
export function serviceLd({ name, path, description }: { name: string; path: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${ORIGIN}${path}/#service`,
    name: `${name} integration for Datadrew`,
    serviceType: "Data integration",
    description,
    url: `${ORIGIN}${path}/`,
    provider: { "@id": ORG_ID },
    isRelatedTo: { "@id": APP_ID },
    areaServed: "Worldwide",
    audience: { "@type": "BusinessAudience", audienceType: "Shopify brands and ecommerce agencies" },
  };
}

/* Generic JSON-LD emitter for secondary pages. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${ORIGIN}${it.path}/`,
    })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
