import type { Metadata } from "next";
import Link from "next/link";
import { ArticleBody } from "@/components/blog/article-body";
import { PageShell, PageHeader } from "./page-shell";
import { JsonLd, breadcrumbLd } from "./structured-data";
import { legalPages, type LegalPage } from "@/content/legal";
import { cn } from "@/lib/utils";

/* One layout for every legal page: header, a sticky "other policies" rail
 * on desktop, verbatim body in .article-body. Copy lives in content/legal.ts. */

export function legalMetadata(slug: string): Metadata {
  const p = legalPages[slug];
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/${slug}` },
  };
}

export function LegalPage({ slug }: { slug: string }) {
  const page: LegalPage = legalPages[slug];
  const others = Object.values(legalPages).filter((p) => p.slug !== slug);
  return (
    <PageShell cta={false}>
      <JsonLd data={breadcrumbLd([{ name: page.h1, path: `/${slug}` }])} />
      <PageHeader
        eyebrow="Legal"
        headline={page.h1}
        subhead={page.updated ? `Last updated: ${page.updated}` : undefined}
        crumbs={[{ label: page.nav }]}
        size="md"
      />
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 pb-20 pt-10 md:grid-cols-[1fr_16rem] md:px-8 md:pb-28 md:pt-14">
        <ArticleBody html={page.body} className="max-w-3xl" />
        <aside className="md:sticky md:top-28 md:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Other policies</p>
          <ul className="mt-3 flex flex-col gap-1 border-l border-border">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}`}
                  className={cn(
                    "-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                  )}
                >
                  {p.nav}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            Questions about any of these?{" "}
            <a href="mailto:support@datadrew.io" className="text-foreground hover:text-brand">
              support@datadrew.io
            </a>
          </p>
        </aside>
      </div>
    </PageShell>
  );
}
