import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, PageHeader } from "@/components/site/page-shell";
import {
  CheckList,
  CtaButton,
  DrewChat,
  FaqBlock,
  FeatureGrid,
  PromptChips,
  Section,
  SimpleTable,
  Steps,
} from "@/components/site/blocks";
import { IntegrationLogo } from "@/components/site/integrations";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/site/structured-data";
import {
  getIntegrationCatalog,
  getIntegrationPage,
  integrationCtas,
  integrationPageSlugs,
  integrationPages,
  type IntegrationMetric,
} from "@/content/integration-pages";
import { stageLabel } from "@/content/integrations";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return integrationPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = getIntegrationPage((await params).slug);
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.metaDescription,
    alternates: { canonical: `https://${site.domain}/integrations/${page.slug}` },
  };
}

function Metric({ m }: { m: IntegrationMetric }) {
  const negative = m.delta?.startsWith("−") || m.delta?.startsWith("-");
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-border bg-card p-5">
      <span className="text-xs text-muted-foreground">{m.label}</span>
      <span className="flex items-baseline gap-2">
        <span className="font-mono text-2xl font-medium tracking-tight tabular-nums">{m.value}</span>
        {m.delta && (
          <span
            className={cn(
              "font-mono text-xs font-medium",
              negative ? "text-loss" : "text-brand"
            )}
          >
            {m.delta}
          </span>
        )}
      </span>
    </div>
  );
}

export default async function IntegrationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const page = getIntegrationPage((await params).slug);
  if (!page) notFound();
  const item = getIntegrationCatalog(page);
  const stage = stageLabel[item.stage];
  const primary = page.primaryCta ?? integrationCtas.connect;
  const others = integrationPages.filter((p) => p.slug !== page.slug).slice(0, 4);

  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Integrations", path: "/integrations" },
            { name: item.name, path: `/integrations/${page.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${page.title} - Datadrew`,
            description: page.metaDescription,
            url: `https://${site.domain}/integrations/${page.slug}`,
          },
          ...(page.faq ? [faqLd(page.faq)] : []),
        ]}
      />

      {/* Logo tile above the header, as on the live page. */}
      <div className="mx-auto mb-6 flex w-fit items-center gap-3 px-5">
        <span className="flex size-16 items-center justify-center rounded-2xl border border-border bg-white shadow-sm">
          <IntegrationLogo item={item} size="lg" />
        </span>
        {stage && (
          <span className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {stage}
          </span>
        )}
      </div>

      <PageHeader
        crumbs={[{ label: "Integrations", href: "/integrations" }, { label: item.name }]}
        align="center"
       
        eyebrow={page.category}
        headline={page.title}
        subhead={page.subhead}
      >
        <CtaButton href={primary.href}>{primary.label}</CtaButton>
        <CtaButton href={integrationCtas.demo.href} variant="outline">
          {integrationCtas.demo.label}
        </CtaButton>
      </PageHeader>

      {page.intro && (
        <Section>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="flex flex-col gap-4">
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">{page.intro.headline}</h2>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">{page.intro.body}</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-3">
                {page.intro.metrics.map((m) => (
                  <Metric key={m.label} m={m} />
                ))}
              </div>
              {page.intro.table && (
                <SimpleTable
                  caption={page.intro.table.caption}
                  head={page.intro.table.head}
                  rows={page.intro.table.rows}
                  className="[&_table]:min-w-0"
                />
              )}
              <p className="text-xs text-muted-foreground">Example data.</p>
            </div>
          </div>
        </Section>
      )}

      <Section headline={`What you get with ${item.name} + Datadrew`}>
        <FeatureGrid items={page.features} columns={page.features.length > 3 ? 3 : 3} />
      </Section>

      {page.synced && (
        <Section headline={page.synced.headline} subhead={page.synced.blurb} narrow>
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <CheckList items={page.synced.items} className="sm:grid sm:grid-cols-2 sm:gap-x-8" />
          </div>
        </Section>
      )}

      <Section headline={page.steps.headline} subhead={page.steps.blurb} narrow>
        <Steps steps={page.steps.items} />
      </Section>

      {page.drew && (
        <Section eyebrow="Drew" headline={page.drew.headline} subhead={page.drew.blurb}>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div className="flex flex-col gap-5">
              <PromptChips prompts={page.drew.prompts} />
              <Link href="/mcp" className="inline-flex w-fit items-center gap-1 text-sm font-medium hover:text-brand">
                Learn about Drew <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
            <DrewChat question={page.drew.chat.question} answer={page.drew.chat.answer} insight={page.drew.chat.insight} />
          </div>
        </Section>
      )}

      {page.faq && <FaqBlock items={page.faq} />}

      {page.privacy && (
        <Section headline={page.privacy.headline} subhead={page.privacy.blurb} narrow>
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <CheckList items={page.privacy.items} />
          </div>
        </Section>
      )}

      <Section>
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border px-6 py-10 text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">{page.closing.headline}</h2>
          <p className="max-w-xl text-sm text-muted-foreground md:text-base">{page.closing.body}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <CtaButton href={site.appUrl}>Get started for free</CtaButton>
            <Button asChild variant="ghost" className="rounded-lg">
              <Link href="/integrations">All integrations</Link>
            </Button>
          </div>
        </div>
        <nav aria-label="More integrations" className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">More integrations</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => {
              const oi = getIntegrationCatalog(o);
              return (
                <li key={o.slug}>
                  <Link
                    href={`/integrations/${o.slug}`}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/40"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-white">
                      <IntegrationLogo item={oi} />
                    </span>
                    {oi.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Section>
    </PageShell>
  );
}
