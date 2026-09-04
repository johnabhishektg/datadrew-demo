import Link from "next/link";
import { ArrowUpRight, Bell, FileText } from "lucide-react";
import { CheckList, CtaButton, FaqBlock, FeatureGrid, Section, StatBand, Steps } from "./blocks";
import { PlatformDrewDemo } from "./platform-drew-demo";
import { PlatformVisualView } from "./platform-visuals";
import { platformCtas, type PlatformPage, type PlatformSection } from "@/content/platform";
import { cn } from "@/lib/utils";

function SplitSection({ s }: { s: Extract<PlatformSection, { type: "split" }> }) {
  return (
    <Section className="py-10 md:py-14">
      <div className={cn("grid items-center gap-8 md:grid-cols-2 md:gap-12", s.flip && "md:[&>*:first-child]:order-2")}>
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            {s.eyebrow}
          </span>
          <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">{s.headline}</h2>
          {s.body && <p className="text-pretty text-base leading-relaxed text-muted-foreground">{s.body}</p>}
          {s.bullets && <CheckList items={s.bullets} className="mt-1" />}
        </div>
        <PlatformVisualView visual={s.visual} />
      </div>
    </Section>
  );
}

function CalloutSection({ s }: { s: Extract<PlatformSection, { type: "callout" }> }) {
  return (
    <Section eyebrow={s.eyebrow} headline={s.headline} subhead={s.body}>
      <div className={cn("grid gap-8", s.visual && "lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start")}>
        <div className="flex flex-col gap-4">
          <ul className={cn("grid gap-4", s.cards.length === 4 ? "sm:grid-cols-2" : "md:grid-cols-3")}>
            {s.cards.map((c) => (
              <li key={c.title} className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold tracking-tight">{c.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </li>
            ))}
          </ul>
          {s.checklist && (
            <div className="rounded-2xl border border-border bg-muted/40 p-5">
              <CheckList items={s.checklist} />
            </div>
          )}
        </div>
        {s.visual && <PlatformVisualView visual={s.visual} />}
      </div>
    </Section>
  );
}

function GroupsSection({ s }: { s: Extract<PlatformSection, { type: "groups" }> }) {
  return (
    <Section eyebrow={s.eyebrow} headline={s.headline} subhead={s.subhead} align="center">
      <div className="grid gap-4 md:grid-cols-3">
        {s.groups.map((g) => (
          <div key={g.title} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold tracking-tight">{g.title}</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {g.items.map((q) => (
                <li key={q} className="rounded-xl border border-border/70 bg-background/60 px-3 py-2 text-sm text-muted-foreground">
                  &ldquo;{q}&rdquo;
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function TemplatesSection({ s }: { s: Extract<PlatformSection, { type: "templates" }> }) {
  return (
    <Section id="templates" eyebrow={s.eyebrow} headline={s.headline} subhead={s.subhead}>
      <div className="flex flex-col gap-10">
        {s.groups.map((g) => (
          <div key={g.title}>
            <div className="flex items-baseline gap-2">
              <h3 className="text-lg font-semibold tracking-tight">{g.title}</h3>
              <span className="font-mono text-xs text-muted-foreground">{String(g.items.length).padStart(2, "0")}</span>
            </div>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {g.items.map((t) => (
                <li key={t.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-semibold",
                        t.kind === "Alert" ? "bg-loss/10 text-loss" : "bg-brand-soft text-brand"
                      )}
                    >
                      {t.kind === "Alert" ? <Bell className="size-3" /> : <FileText className="size-3" />}
                      {t.kind}
                    </span>
                    <span>{t.schedule}</span>
                  </div>
                  <h4 className="text-base font-semibold tracking-tight">{t.title}</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                  <div className="mt-auto flex items-center justify-between pt-1 text-xs">
                    <span className="text-muted-foreground">Email · Slack</span>
                    <a href={platformCtas.startFree.href} className="inline-flex items-center gap-1 font-medium hover:text-brand">
                      Set it up in Drew <ArrowUpRight className="size-3" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {s.note && <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{s.note}</p>}
    </Section>
  );
}

function LinksSection({ s }: { s: Extract<PlatformSection, { type: "links" }> }) {
  return (
    <Section className="py-10 md:py-14">
      <h2 className="text-xl font-semibold tracking-tight">{s.headline}</h2>
      <ul className="mt-5 grid gap-4 md:grid-cols-3">
        {s.items.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="group flex h-full flex-col gap-2 rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-muted/40"
            >
              {l.kicker && (
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{l.kicker}</span>
              )}
              <span className="flex items-start justify-between gap-3 text-sm font-medium">
                {l.label}
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function PlatformSectionView({ s }: { s: PlatformSection }) {
  switch (s.type) {
    case "split":
      return <SplitSection s={s} />;
    case "features":
      return (
        <Section eyebrow={s.eyebrow} headline={s.headline} subhead={s.subhead}>
          <FeatureGrid items={s.items} columns={s.columns ?? 3} />
        </Section>
      );
    case "steps":
      return (
        <Section eyebrow={s.eyebrow} headline={s.headline} subhead={s.subhead}>
          <Steps steps={s.steps} />
          {s.note && <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">{s.note}</p>}
        </Section>
      );
    case "stats":
      return (
        <Section eyebrow={s.eyebrow} headline={s.headline} align="center">
          <StatBand stats={s.stats} columns={3} />
        </Section>
      );
    case "drew":
      return (
        <Section id="drew" eyebrow={s.eyebrow} headline={s.headline} subhead={s.subhead}>
          <PlatformDrewDemo prompts={s.prompts} />
          <p className="mt-6 text-sm text-muted-foreground">
            <Link href="/platform/drewai" className="font-medium text-foreground hover:text-brand">
              Learn about Drew AI
            </Link>
          </p>
        </Section>
      );
    case "callout":
      return <CalloutSection s={s} />;
    case "groups":
      return <GroupsSection s={s} />;
    case "templates":
      return <TemplatesSection s={s} />;
    case "links":
      return <LinksSection s={s} />;
  }
}

export function PlatformHeroVisual({ page }: { page: PlatformPage }) {
  const v = page.heroVisual;
  if (!v) return null;
  if (v.kind === "demo") {
    return <PlatformDrewDemo prompts={v.prompts} layout="stack" className="mx-auto w-full max-w-3xl" />;
  }
  return <PlatformVisualView visual={v} className="mx-auto w-full max-w-3xl" />;
}

export function PlatformClosing({ page }: { page: PlatformPage }) {
  return (
    <Section className="py-10 md:py-14">
      <div className="flex flex-col items-start gap-4 rounded-3xl border border-border bg-muted/40 p-8 md:flex-row md:items-center md:justify-between md:p-10">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight">{page.closing.headline}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{page.closing.body}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <CtaButton href={platformCtas.startFree.href}>{platformCtas.startFree.label}</CtaButton>
          <CtaButton href={platformCtas.bookDemo.href} variant="outline">
            {platformCtas.bookDemo.label}
          </CtaButton>
        </div>
      </div>
    </Section>
  );
}

export function PlatformFaq({ page }: { page: PlatformPage }) {
  return <FaqBlock items={page.faq} />;
}
