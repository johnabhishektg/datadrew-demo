import { faq, pricing, site } from "@/content/site";
import type { PostMeta } from "@/content/blog";

/* JSON-LD for search + AI answer engines. Rendered inline; content derives
 * from the same content modules as the visible page, so it can't drift. */

export function HomeStructuredData() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: site.name,
      url: `https://${site.domain}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: site.description,
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
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArticleStructuredData({ post }: { post: PostMeta }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.updated,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: { "@type": "Organization", name: site.name, url: `https://${site.domain}` },
    mainEntityOfPage: `https://${site.domain}/blog/${post.slug}`,
    ...(post.cover ? { image: [post.cover] } : {}),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
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
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `https://${site.domain}${it.path}`,
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
