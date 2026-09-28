"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import {
  DEFAULT_BAND,
  gmvBands,
  planCards,
  planCredits,
  pricingPage,
  yearlyPerMonth,
  type PlanId,
} from "@/content/pricing-page";
import { cn } from "@/lib/utils";

/* GMV-banded pricing cards with a monthly/yearly toggle. Same ladder and
 * credit formula as the live pricing page (pricing.js v5.1); the yearly
 * price is the per-month equivalent with two months free. AI Ads CoPilot
 * has no checkout: its CTA always goes to the access request. */
export function PricingGmv() {
  const [band, setBand] = useState(DEFAULT_BAND);
  const [yearly, setYearly] = useState(false);
  const b = gmvBands[band];

  const monthlyFor = (id: PlanId) => (id === "free" ? 0 : b[id]);

  return (
    <div>
      {/* Controls */}
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4 sm:flex-row">
        <label className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
          <span className="text-muted-foreground">{pricingPage.gmvLabel}:</span>
          <span className="relative inline-flex items-center">
            <select
              aria-label={pricingPage.gmvLabel}
              value={band}
              onChange={(e) => setBand(Number(e.target.value))}
              className="appearance-none bg-transparent pr-6 font-medium outline-none"
            >
              {gmvBands.map((g, i) => (
                <option key={g.label} value={i}>
                  {g.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 size-4 text-muted-foreground" />
          </span>
        </label>
        <div role="group" aria-label="Billing period" className="flex items-center rounded-full border border-border bg-card p-1 text-sm">
          {(["monthly", "yearly"] as const).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={yearly === (k === "yearly")}
              onClick={() => setYearly(k === "yearly")}
              className={cn(
                "rounded-full px-4 py-1.5 font-medium transition-colors",
                yearly === (k === "yearly") ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {pricingPage.billing[k]}
              {k === "yearly" && (
                <span className={cn("ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-semibold", yearly ? "bg-background/20" : "bg-brand-soft text-brand")}>
                  {pricingPage.billing.save}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-3 max-w-2xl text-center text-xs text-muted-foreground">{pricingPage.gmvHelp}</p>

      {/* Cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {planCards.map((p) => {
          const monthly = monthlyFor(p.id);
          const shown = yearly ? yearlyPerMonth(monthly) : monthly;
          const credits = planCredits(p.id, monthly);
          const custom = monthly === null;
          const ctaHref = custom ? "https://calendly.com/sumit-growth/discussion" : p.cta.href;
          const ctaLabel = custom ? (p.customLabel ?? "Talk to us") : p.cta.label;
          return (
            <div
              key={p.id}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8",
                p.popular && "border-brand/40 shadow-[0_20px_60px_-30px_color-mix(in_oklch,var(--brand)_60%,transparent)]"
              )}
            >
              {p.popular && <BorderBeam size={160} duration={8} colorFrom="var(--brand)" colorTo="transparent" />}
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{p.kicker}</p>
              <div className="mt-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {p.popular && (
                  <span className="rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-semibold text-brand-foreground">Popular</span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
              <p className="mt-5 flex items-baseline gap-1">
                {custom ? (
                  <span className="text-3xl font-semibold tracking-tight">{p.customLabel ?? "Custom"}</span>
                ) : (
                  <>
                    <span className="text-4xl font-semibold tracking-tight tabular-nums">
                      {`$${(shown ?? 0).toLocaleString("en-US")}`}
                    </span>
                    <span className="text-sm text-muted-foreground">{p.id === "free" ? "free forever" : "/month"}</span>
                  </>
                )}
              </p>
              {custom && p.customNote && <p className="mt-1 text-xs text-muted-foreground">{p.customNote}</p>}
              {p.id !== "free" && !custom && yearly && (
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {`$${((shown ?? 0) * 12).toLocaleString("en-US")} billed yearly · 2 months free`}
                </p>
              )}
              {credits !== null && (
                <p className="mt-3 inline-flex w-fit items-center rounded-md bg-brand-soft px-2 py-1 font-mono text-xs font-medium text-brand">
                  {p.creditsLabel(credits.toLocaleString("en-US"))}
                </p>
              )}
              <Button
                asChild
                variant={p.popular ? "default" : "outline"}
                className={cn("mt-6 w-full rounded-lg", p.popular && "bg-brand text-brand-foreground hover:bg-brand/90")}
              >
                {ctaHref.startsWith("/") ? <Link href={ctaHref}>{ctaLabel}</Link> : <a href={ctaHref}>{ctaLabel}</a>}
              </Button>
              {p.ctaNote && <p className="mt-2 text-center text-xs text-muted-foreground">{p.ctaNote}</p>}
              <div className="mt-6 flex flex-col gap-5 border-t border-border pt-6">
                {p.lead && <p className="text-sm font-medium">{p.lead}</p>}
                {p.groups.map((g, gi) => (
                  <div key={gi}>
                    {g.title && (
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{g.title}</p>
                    )}
                    <ul className="space-y-2.5">
                      {g.items.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm">
                          <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <p className="border-t border-border pt-4 font-mono text-xs text-muted-foreground">{p.footer}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">{pricingPage.cardsNote}</p>
    </div>
  );
}
