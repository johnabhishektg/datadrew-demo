import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/page-shell";
import { CheckList, CtaButton, FaqBlock, FeatureGrid, Section, SimpleTable, StatBand, Steps } from "@/components/site/blocks";
import { McpAgents } from "@/components/site/mcp-agents";
import { McpPromptLibrary, McpSetupTabs, McpUrlCopy } from "@/components/site/mcp-setup-tabs";
import { InlineAgentLogos } from "@/components/site/agent-logos";
import { DatadrewTile } from "@/components/site/icons";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/site/structured-data";
import { MCP_URL, mcpPage } from "@/content/mcp";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: "Connect Claude & ChatGPT to your Shopify data — Datadrew MCP" },
  description:
    "Connect Claude, ChatGPT, Cursor or any AI tool to your real Shopify store data. Blended ROAS, LTV and cohorts in seconds; read-only, OAuth, 2-minute setup.",
  alternates: { canonical: "/mcp" },
};

function HeroChat() {
  const c = mcpPage.heroChat;
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-[#F7F6F3] text-left shadow-[0_24px_64px_-24px_rgba(0,0,0,0.28)] dark:bg-[#1c1c1c]">
      <div className="flex items-center gap-2 border-b border-border/70 bg-card px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </span>
        <span className="ml-2 font-mono text-[11px] text-muted-foreground">Claude</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-medium text-brand">
          <span className="size-1.5 rounded-full bg-brand" /> Datadrew connected
        </span>
      </div>
      <div className="flex flex-col gap-4 p-4 text-sm md:p-5">
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-tr-md border border-border bg-card px-4 py-2.5 shadow-sm">{c.question}</div>
        </div>
        <div className="flex items-start gap-3">
          <DatadrewTile className="mt-0.5 size-6 shrink-0 rounded-md" />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <p className="font-mono text-[11px] text-muted-foreground">▸ {c.tool}</p>
            <div className="grid grid-cols-3 gap-2">
              {c.metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-border bg-card p-3">
                  <p className="text-[11px] text-muted-foreground">{m.label}</p>
                  <p className="flex items-baseline gap-1.5">
                    <span className="font-mono text-lg font-medium tabular-nums">{m.value}</span>
                    <span className={cn("font-mono text-[11px]", m.delta.startsWith("−") ? "text-loss" : "text-brand")}>{m.delta}</span>
                  </p>
                </div>
              ))}
            </div>
            <p className="leading-relaxed text-foreground/90">{c.answer}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-border/60 pt-3">
          {c.chips.map((ch) => (
            <span key={ch} className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground">
              {ch}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function McpPage() {
  const m = mcpPage;
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "MCP", path: "/mcp" }]),
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Connect Claude, ChatGPT or any AI tool to your store data with Datadrew MCP",
            description:
              "Enable Datadrew's public MCP server and query your Shopify, ads and analytics data from any MCP-compatible AI client in about two minutes.",
            totalTime: "PT2M",
            step: m.how.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.description })),
          },
          faqLd(m.faq),
        ]}
      />

      <PageHeader crumbs={[{ label: "MCP" }]} align="center" eyebrow={m.eyebrow} headline={m.headline} subhead={m.subhead}>
        <CtaButton href={m.primaryCta.href}>{m.primaryCta.label}</CtaButton>
        <CtaButton href={m.secondaryCta.href} variant="outline">
          {m.secondaryCta.label}
        </CtaButton>
      </PageHeader>
      <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-5 text-center text-sm text-muted-foreground">
        <span>Works with</span> <InlineAgentLogos /> <span>{m.worksWith.join(" · ")}</span>
      </p>

      <Section className="pt-10 md:pt-12">
        <div className="mx-auto max-w-2xl">
          <HeroChat />
        </div>
        <StatBand stats={m.stats} className="mt-12" />
      </Section>

      <Section headline={m.problem.headline} subhead={m.problem.subhead} align="center">
        <FeatureGrid items={m.problem.items} />
        <p className="mt-8 text-center text-base font-medium">{m.problem.punchline}</p>
      </Section>

      {/* The homepage "Drew for AI agents" window, reused as the product moment */}
      <McpAgents />

      <Section id="how" eyebrow={m.how.eyebrow} headline={m.how.headline} subhead={m.how.explainer} narrow>
        <Steps steps={m.how.steps} />
        <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Server endpoint</p>
            <McpUrlCopy />
            <p className="mt-3 text-xs text-muted-foreground">{m.how.endpointNote}</p>
          </div>
          <ul className="flex flex-col gap-1.5 rounded-xl border border-border bg-card p-4 font-mono text-[11px] text-muted-foreground md:w-64">
            {m.how.serverFacts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="setup" headline={m.setup.headline} subhead={m.setup.subhead} align="center">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Your MCP URL</p>
          <McpUrlCopy className="mb-6" />
          <McpSetupTabs />
          <p className="mt-4 text-center text-xs text-muted-foreground">{m.setup.note}</p>
        </div>
      </Section>

      <Section eyebrow={m.sources.eyebrow} headline={m.sources.headline} subhead={m.sources.subhead}>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {m.sources.groups.map((g) => (
            <li key={g.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold tracking-tight">{g.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {g.tools.map((t) => (
                  <span key={t} className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{g.prompt}&rdquo;</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section headline={m.prompts.headline} subhead={m.prompts.subhead} align="center">
        <McpPromptLibrary />
      </Section>

      <Section eyebrow={m.agencies.eyebrow} headline={m.agencies.headline} subhead={m.agencies.subhead}>
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <CheckList items={m.agencies.items} />
          <div className="rounded-2xl border border-border bg-card p-5">
            <ul className="flex flex-col gap-2">
              {m.agencies.stores.map((s) => (
                <li key={s} className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2 text-sm">
                  <span className="flex size-7 items-center justify-center rounded-md bg-muted font-mono text-xs font-semibold">{s[0]}</span>
                  <span className="font-medium">{s}</span>
                  <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-brand" /> connected
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-xl border border-brand/30 bg-brand/5 px-3 py-2 text-sm">&ldquo;{m.agencies.example}&rdquo;</p>
          </div>
        </div>
      </Section>

      <Section eyebrow={m.security.eyebrow} headline={m.security.headline} subhead={m.security.subhead} align="center">
        <FeatureGrid items={m.security.items} columns={2} />
      </Section>

      <Section headline={m.compare.headline} subhead={m.compare.subhead} align="center">
        <SimpleTable head={m.compare.head} rows={m.compare.rows} />
      </Section>

      <Section headline={m.surfaces.headline} subhead={m.surfaces.subhead} align="center">
        <ul className="grid gap-4 md:grid-cols-3">
          {m.surfaces.items.map((s) => (
            <li key={s.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
              <span className="w-fit rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{s.plan}</span>
              <h3 className="text-base font-semibold tracking-tight">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              <Link href={s.link.href} className="mt-auto inline-flex items-center gap-1 text-sm font-medium hover:text-brand">
                {s.link.label} <ArrowUpRight className="size-3.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section headline="Trusted by fast-growing Shopify brands" align="center">
        <ul className="grid gap-4 md:grid-cols-3">
          {m.testimonials.map((t) => (
            <li key={t.name} className="flex flex-col justify-between gap-5 rounded-2xl border border-border bg-card p-6">
              <div>
                <div className="flex gap-0.5 text-brand" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              </div>
              <p className="text-sm">
                <span className="block font-medium">{t.name}</span>
                <span className="text-muted-foreground">{t.role}</span>
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <FaqBlock items={m.faq} />

      <Section className="pt-0">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border px-6 py-10 text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">{m.closing.headline}</h2>
          <p className="max-w-xl text-sm text-muted-foreground md:text-base">{m.closing.body}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <CtaButton href={m.primaryCta.href}>{m.primaryCta.label}</CtaButton>
            <CtaButton href="https://calendly.com/sumit-growth/discussion" variant="outline">Book a demo</CtaButton>
          </div>
          <p className="text-xs text-muted-foreground">{m.closing.note} · <code className="font-mono">{MCP_URL}</code></p>
        </div>
      </Section>
    </PageShell>
  );
}
