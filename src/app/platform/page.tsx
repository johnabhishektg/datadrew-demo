import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader, PageShell } from "@/components/site/page-shell";
import { CtaButton } from "@/components/site/blocks";
import { JsonLd, breadcrumbLd } from "@/components/site/structured-data";
import { platformCtas, platformIndex, platformPages } from "@/content/platform";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Drew AI, Automations, Acquisition, Retention, Product Intelligence and Creative Strategy — the intelligence behind every ad-spend decision Drew makes for Shopify brands.",
};

export default function PlatformIndex() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbLd([{ name: "Platform", path: "/platform" }])} />
      <PageHeader
        crumbs={[{ label: "Platform" }]}
        eyebrow={platformIndex.eyebrow}
        headline={platformIndex.headline}
        subhead={platformIndex.subhead}
      >
        <CtaButton href={platformCtas.startFree.href}>{platformCtas.startFree.label}</CtaButton>
        <CtaButton href={platformCtas.bookDemo.href} variant="outline">
          {platformCtas.bookDemo.label}
        </CtaButton>
      </PageHeader>
      <section className="mx-auto mt-12 w-full max-w-6xl px-5 md:px-8" aria-label="Platform pages">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platformPages.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/platform/${p.slug}`}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-muted/40"
              >
                <span className="inline-flex w-fit items-center text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                  {p.eyebrow}
                </span>
                <span className="flex items-start justify-between gap-3 text-lg font-semibold leading-snug tracking-tight">
                  {p.headline}
                  <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" />
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">{p.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
