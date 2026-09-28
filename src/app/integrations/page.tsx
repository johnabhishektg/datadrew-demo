import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FinalCta } from "@/components/site/final-cta";
import { IntegrationLogo } from "@/components/site/integrations";
import {
  integrationCategories,
  integrationCount,
  integrationsPage,
  stageLabel,
  type Integration,
} from "@/content/integrations";
import { getIntegrationPage, integrationRoute } from "@/content/integration-pages";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: "Datadrew Integrations — Shopify, Meta, Google, GA4, Klaviyo" },
  alternates: { canonical: "/integrations" },
  description:
    "Datadrew connects to Shopify, Meta Ads, Google Ads, GA4, Klaviyo, Amazon and 25+ more tools, so Drew's ad decisions reason from your whole business.",
};

function StageBadge({ stage }: { stage: Integration["stage"] }) {
  const label = stageLabel[stage];
  if (!label) return null;
  return (
    <span
      className={cn(
        "rounded-md border px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider",
        stage === "alpha"
          ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400"
          : "border-border bg-muted text-muted-foreground"
      )}
    >
      {label}
    </span>
  );
}

function IntegrationCard({ item }: { item: Integration }) {
  const isSurface = item.slug === "slack" || item.slug === "datadrew-mcp";
  const detail = getIntegrationPage(item.slug);
  const href = detail ? `/integrations/${integrationRoute(detail)}` : isSurface ? "/#mcp" : integrationsPage.connectCta.href;
  return (
    <li
      id={item.slug}
      className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-muted/40"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-white">
          <IntegrationLogo item={item} size="md" />
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <span className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold tracking-tight">{item.name}</h3>
            <StageBadge stage={item.stage} />
          </span>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      <a
        href={href}
        className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-brand"
      >
        {detail ? "Learn more" : isSurface ? "See how it works" : "Connect in the app"}
        <ArrowUpRight className="size-3.5" />
        {/* Stretch the link over the whole card */}
        <span aria-hidden className="absolute inset-0 rounded-2xl" />
      </a>
    </li>
  );
}

export default function IntegrationsIndex() {
  const p = integrationsPage;
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-5 pt-32 md:px-8 md:pt-40">
        <header className="flex flex-col gap-4 md:max-w-2xl">
          <span className="inline-flex w-fit items-center text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            {p.eyebrow} · {integrationCount}
          </span>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            {p.headline}
          </h1>
          <p className="text-pretty text-base text-muted-foreground md:text-lg">{p.subhead}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Button asChild className="rounded-lg">
              <a href={p.connectCta.href}>{p.connectCta.label}</a>
            </Button>
            <Button asChild variant="outline" className="rounded-lg">
              <a href={p.requestCta.href}>{p.requestCta.label}</a>
            </Button>
          </div>
        </header>

        {/* Category jump links */}
        <nav aria-label="Integration categories" className="mt-12 -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <ul className="flex w-max gap-2 md:w-auto md:flex-wrap">
            {integrationCategories.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {c.title}
                  <span className="font-mono text-xs text-muted-foreground/70">{c.items.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 flex flex-col gap-16 md:mt-10">
          {integrationCategories.map((c) => (
            <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="scroll-mt-28">
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <h2 id={`${c.id}-title`} className="text-2xl font-semibold tracking-tight">
                  {c.title}
                </h2>
                <p className="text-sm text-muted-foreground md:max-w-md md:text-right">{c.blurb}</p>
              </div>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {c.items.map((item) => (
                  <IntegrationCard key={item.slug} item={item} />
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border px-6 py-10 text-center">
          <p className="text-lg font-semibold tracking-tight">Can&apos;t find your tool?</p>
          <p className="max-w-md text-sm text-muted-foreground">
            Tell us what you run on. We build connectors in the order merchants ask for them.
          </p>
          <Button asChild variant="outline" className="mt-2 rounded-lg">
            <a href={p.requestCta.href}>{p.requestCta.label}</a>
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">{p.finePrint}</p>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already connected?{" "}
          <Link href="/#mcp" className="font-medium text-foreground hover:text-brand">
            Bring Drew into Claude or ChatGPT
          </Link>
          .
        </p>
      </main>
      <div className="mt-8">
        <FinalCta />
      </div>
      <Footer />
    </>
  );
}
