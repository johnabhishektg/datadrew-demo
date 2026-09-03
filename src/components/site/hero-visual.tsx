"use client";

import {
  Aperture,
  Check,
  ChevronDown,
  Clock3,
  Coins,
  Database,
  Home,
  LayoutGrid,
  Plus,
  RefreshCw,
  Settings2,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  SquarePen,
  TrendingUp,
  Zap,
} from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { sampleBrief } from "@/content/site";
import { cn } from "@/lib/utils";
import { DatadrewMark, DrewMark, GA4Mark, GoogleMark, KlaviyoMark, MetaMark, ShopifyMark } from "./icons";

const marks = { shopify: ShopifyMark, meta: MetaMark, google: GoogleMark, klaviyo: KlaviyoMark, ga4: GA4Mark } as const;
type Platform = keyof typeof marks;
const platformLabel: Record<Platform, string> = {
  shopify: "Shopify", meta: "Meta Ads", google: "Google Ads", klaviyo: "Klaviyo", ga4: "GA4",
};

/* Mirrors the real app shell (context/datadrew/app-ui-reference.md): dark sidebar,
 * warm canvas, chat thread with a skill run, composer with source chips. */

function SideItem({ icon: Icon, label, active, chevron }: { icon: React.ElementType; label: string; active?: boolean; chevron?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[12.5px]",
        active ? "bg-brand/15 text-brand" : "text-white/75"
      )}
    >
      <Icon className="size-3.5 shrink-0" />
      <span className="truncate">{label}</span>
      {chevron && <ChevronDown className="ml-auto size-3 -rotate-90 text-white/35" />}
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="hidden w-[196px] shrink-0 flex-col bg-[#141414] text-white md:flex">
      <div className="flex items-center gap-2 px-4 py-4">
        <span className="flex size-6 items-center justify-center rounded-md bg-white text-[#161616]">
          <DatadrewMark className="size-3.5" />
        </span>
        <span className="text-sm font-semibold">Datadrew</span>
      </div>
      <div className="space-y-0.5 px-2">
        <SideItem icon={SquarePen} label="New chat" />
        <SideItem icon={SlidersHorizontal} label="Context" />
        <SideItem icon={Zap} label="Automations" />
      </div>
      <p className="mt-4 px-4 text-[10.5px] font-medium text-white/40">Dashboards</p>
      <div className="mt-1 space-y-0.5 px-2">
        <SideItem icon={Home} label="Overview" />
        <SideItem icon={Aperture} label="Creative Intelligence" chevron />
        <SideItem icon={TrendingUp} label="Paid Ads" active chevron />
        <SideItem icon={RefreshCw} label="Retention" chevron />
        <SideItem icon={ShoppingBag} label="Products" chevron />
      </div>
      <p className="mt-4 px-4 text-[10.5px] font-medium text-white/40">Recent</p>
      <div className="mt-1 space-y-1 px-4 text-[12px] text-white/55">
        <p className="truncate">/daily-ads-brief</p>
        <p className="truncate">Why did ROAS drop yesterday?</p>
        <p className="truncate">Show me last 7 days creative i…</p>
      </div>
      <p className="mt-4 px-4 text-[10.5px] font-medium text-white/40">MCP</p>
      <div className="mt-1 space-y-0.5 px-2">
        <SideItem icon={Sparkles} label="Prompt library" />
        <SideItem icon={LayoutGrid} label="All integrations" />
      </div>
      <div className="mt-auto flex items-center gap-2 border-t border-white/10 px-4 py-3">
        <span className="flex size-6 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">S</span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[12px] font-medium">your-store</p>
          <p className="truncate text-[10px] text-white/45">you@your-store.com</p>
        </div>
      </div>
    </aside>
  );
}

export function HeroVisual() {
  const q = sampleBrief.queued;
  const QueuedMark = marks[q.platform as Platform];
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-[#F7F6F3] text-left shadow-[0_24px_64px_-24px_rgba(0,0,0,0.28)] dark:bg-[#1c1c1c]">
        <BorderBeam size={220} duration={9} colorFrom="var(--brand)" colorTo="transparent" />

        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-border/70 bg-background px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-3 rounded-md border border-border/60 bg-muted/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
            app.datadrew.io
          </span>
          <span className="ml-auto rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            example data
          </span>
        </div>

        <div className="flex">
          <Sidebar />

          {/* Main canvas */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <SquarePen className="size-3.5" />
                <span className="font-medium text-foreground">/daily-ads-brief</span>
                <ChevronDown className="size-3" />
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                <Coins className="size-3.5" /> 17,000
              </span>
            </div>

            {/* Thread */}
            <div className="flex-1 space-y-4 px-5 pb-3 md:px-8">
              {/* User turn */}
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-tr-md border border-border bg-background px-4 py-2.5 text-sm shadow-sm">
                  <span className="font-mono text-brand">/daily-ads-brief</span> for {sampleBrief.meta.date}
                </div>
              </div>

              {/* Drew turn */}
              <div className="flex gap-3">
                <DrewMark className="mt-0.5 size-7 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold leading-snug tracking-tight md:text-base">
                    {sampleBrief.headline}
                  </p>

                  <ol className="mt-3 space-y-2">
                    {sampleBrief.findings.map((f, i) => {
                      const Mark = marks[f.platform as Platform];
                      return (
                        <li key={f.title} className="rounded-xl border border-border bg-background p-3.5 shadow-sm">
                          <div className="flex items-start gap-3">
                            <Mark className="mt-0.5 size-8 shrink-0" />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <p className="text-sm font-semibold leading-snug">
                                  {i + 1}. {f.title}
                                  <span className="ml-2 text-[11px] font-normal text-muted-foreground">
                                    {platformLabel[f.platform as Platform]}
                                  </span>
                                </p>
                                <span
                                  className={cn(
                                    "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                                    f.severity === "high" ? "bg-brand-soft text-brand" : "bg-muted text-muted-foreground"
                                  )}
                                >
                                  {f.severity === "high" ? "Act" : "Hold"}
                                </span>
                              </div>
                              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{f.detail}</p>
                              {f.action && (
                                <p className="mt-2 flex items-start gap-2 text-[13px]">
                                  <span className="mt-0.5 shrink-0 rounded-md bg-brand-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand">
                                    Do
                                  </span>
                                  <span>{f.action}</span>
                                </p>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>

                  {/* Approval card, as Drew proposes it in chat */}
                  <div className="mt-3 flex flex-col gap-3 rounded-xl border border-brand/30 bg-brand/5 p-3.5 sm:flex-row sm:items-center">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                    <QueuedMark className="size-8 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">
                        Queued: {q.name} · <span className="font-mono text-xs tabular">{q.from} → {q.to} {q.unit}</span>
                      </p>
                      <p className="mt-0.5 flex flex-wrap gap-x-3 text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Check className="size-3 text-brand" /> Within 20%/day guardrail</span>
                        <span className="inline-flex items-center gap-1"><Clock3 className="size-3" /> Expires in 6h</span>
                      </p>
                    </div>
                    </div>
                    <div className="flex gap-2 sm:shrink-0">
                      <span className="inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground sm:flex-none">
                        <Check className="size-3" /> Approve
                      </span>
                      <span className="inline-flex flex-1 items-center justify-center rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium sm:flex-none">
                        Edit
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Composer */}
            <div className="px-5 pb-5 pt-2 md:px-8">
              <div className="rounded-2xl border border-border bg-background p-3 shadow-sm">
                <div className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2 py-1">
                  <Database className="size-3.5 text-muted-foreground" />
                  <span className="flex -space-x-1">
                    {sampleBrief.sources.slice(0, 4).map((s) => {
                      const M = marks[s as Platform];
                      return <M key={s} className="size-5 ring-2 ring-background" />;
                    })}
                  </span>
                  <span className="pl-1 text-[11px] text-muted-foreground">+3</span>
                </div>
                <p className="px-1 pt-3 pb-2 text-sm text-muted-foreground">Ask anything, or type / for skills</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Plus className="size-4" />
                  <span className="inline-flex items-center gap-1">Sonnet 5 <ChevronDown className="size-3" /></span>
                  <Settings2 className="size-3.5" />
                  <span className="ml-auto rounded-lg bg-muted px-3 py-1.5 font-medium text-muted-foreground">Send</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
