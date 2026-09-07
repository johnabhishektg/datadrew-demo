"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Check, Link2, Sparkles } from "lucide-react";
import { howItWorks } from "@/content/site";
import { cn } from "@/lib/utils";
import { Container, SectionHeader } from "./section-header";
import { DrewMark, GA4Mark, GoogleMark, KlaviyoMark, MetaMark, ShopifyMark, SlackMark } from "./icons";

/* Long enough to read the body copy and take in the panel. */
const INTERVAL = 9000;

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const steps = howItWorks.steps;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), INTERVAL);
    return () => clearInterval(t);
  }, [active, steps.length]);

  return (
    <Container id="how-it-works" className="py-16 md:py-24">
      <SectionHeader
        eyebrow={howItWorks.eyebrow}
        headline={howItWorks.headline}
        subhead={howItWorks.subhead}
      />
      <div className="mt-12 grid items-center gap-8 md:mt-16 md:grid-cols-2 md:gap-12">
        <ol className="flex flex-col">
          {steps.map((s, i) => {
            const isActive = i === active;
            return (
              <li key={s.id} className="relative">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={isActive}
                  className={cn(
                    "w-full rounded-xl px-4 py-4 text-left transition-colors",
                    isActive ? "bg-muted/60" : "hover:bg-muted/40"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={cn(
                        "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                        isActive ? "border-brand bg-brand text-brand-foreground" : "border-border text-muted-foreground"
                      )}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{s.title}</p>
                      {/* Body stays in the DOM for every step (pre-rendered copy);
                          the grid-rows trick animates it open without unmounting. */}
                      <div
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                          isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        )}
                      >
                        <p className="overflow-hidden text-sm text-muted-foreground">
                          <span className="block pt-1.5">{s.body}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <motion.span
                      key={`bar-${active}`}
                      className="absolute bottom-0 left-4 h-0.5 rounded-full bg-brand"
                      initial={{ width: 0 }}
                      animate={{ width: "calc(100% - 2rem)" }}
                      transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ol>

        {/* Panels cross-fade (no blank frame between steps). */}
        <div className="relative h-[24rem] overflow-hidden rounded-2xl border border-border bg-muted/30">
          <AnimatePresence initial={false}>
            <motion.div
              key={steps[active].id}
              className="absolute inset-0 p-5 md:p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <StepVisual id={steps[active].id} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Container>
  );
}

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-4 shadow-sm", className)}>
      {children}
    </div>
  );
}

function Stagger({ i, children, className }: { i: number; children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 + i * 0.1, duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
}

/* 01 — the sources, connecting one by one */
const sources = [
  { Mark: ShopifyMark, name: "Shopify", sub: "Orders · products · margins · inventory", status: "Connected" },
  { Mark: MetaMark, name: "Meta Ads", sub: "Campaigns · ad sets · creatives", status: "Connected" },
  { Mark: GoogleMark, name: "Google Ads", sub: "Search · Shopping · PMax", status: "Connected" },
  { Mark: KlaviyoMark, name: "Klaviyo", sub: "Flows · campaigns · segments", status: "Connected" },
  { Mark: GA4Mark, name: "Google Analytics 4", sub: "Sessions · channels · CVR", status: "Connecting…" },
];

/* 02 — the products Drew learns, with the economics behind each */
const products = [
  { img: "/creatives/serum.jpg", name: "Hero Bundle", stat: "62% margin", sub: "11 wks stock", tone: "brand" },
  { img: "/creatives/bottle.jpg", name: "Starter Kit", stat: "21% margin", sub: "repeat 1.1×", tone: "loss" },
  { img: "/creatives/sneaker.jpg", name: "Refill Pack", stat: "repeat 3.2×", sub: "LTV $184", tone: "brand" },
] as const;

/* 03 — 7-day ROAS with the dip annotated */
const roas = [3.9, 4.1, 4.0, 4.2, 3.4, 3.5, 3.6];

function RoasChart() {
  const w = 320, h = 96, pad = 8;
  const min = 3, max = 4.5;
  const x = (i: number) => pad + (i * (w - pad * 2)) / (roas.length - 1);
  const y = (v: number) => h - pad - ((v - min) / (max - min)) * (h - pad * 2);
  const d = roas.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");
  const area = `${d} L${x(roas.length - 1)},${h} L${x(0)},${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full" role="img" aria-label="ROAS over the last 7 days, dipping on Tuesday">
      <defs>
        <linearGradient id="roasFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#roasFill)" />
      <motion.path
        d={d}
        fill="none"
        stroke="var(--brand)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
      {/* Tuesday marker */}
      <line x1={x(4)} x2={x(4)} y1={pad} y2={h - pad} stroke="var(--loss)" strokeDasharray="3 3" strokeWidth="1" />
      <circle cx={x(4)} cy={y(roas[4])} r="4" fill="var(--loss)" />
      <text x={x(4) + 6} y={pad + 10} className="fill-[var(--loss)] font-mono text-[9px]">
        budget +40%
      </text>
    </svg>
  );
}

function StepVisual({ id }: { id: string }) {
  if (id === "connect") {
    return (
      <div className="flex h-full flex-col justify-center gap-2">
        {sources.map((r, i) => (
          <Stagger key={r.name} i={i}>
            <Panel className="flex items-center gap-3 py-2.5">
              <r.Mark className="size-9" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{r.name}</p>
                <p className="truncate text-xs text-muted-foreground">{r.sub}</p>
              </div>
              <span className={cn("inline-flex shrink-0 items-center gap-1 text-xs font-medium", r.status === "Connected" ? "text-brand" : "text-muted-foreground")}>
                {r.status === "Connected" ? <Check className="size-3.5" /> : <Link2 className="size-3.5" />}
                {r.status}
              </span>
            </Panel>
          </Stagger>
        ))}
      </div>
    );
  }

  if (id === "learn") {
    return (
      <div className="flex h-full flex-col justify-center gap-3">
        <div className="grid grid-cols-3 gap-2.5">
          {products.map((p, i) => (
            <Stagger key={p.name} i={i}>
              <Panel className="overflow-hidden p-0">
                <div className="relative aspect-[4/3]">
                  <Image src={p.img} alt="" fill sizes="160px" className="object-cover" />
                </div>
                <div className="p-2.5">
                  <p className="truncate text-xs font-medium">{p.name}</p>
                  <p className={cn("mt-0.5 text-sm font-semibold tabular", p.tone === "brand" ? "text-brand" : "text-loss")}>{p.stat}</p>
                  <p className="text-[11px] text-muted-foreground">{p.sub}</p>
                </div>
              </Panel>
            </Stagger>
          ))}
        </div>
        <Stagger i={3}>
          <div className="grid grid-cols-2 gap-2.5">
            <Panel className="py-2.5">
              <p className="text-[11px] text-muted-foreground">Promo calendar</p>
              <p className="text-sm font-medium">Labor Day sale · Sep 5–8</p>
            </Panel>
            <Panel className="py-2.5">
              <p className="text-[11px] text-muted-foreground">Your rules</p>
              <p className="text-sm font-medium">Max +20%/day · protect Brand</p>
            </Panel>
          </div>
        </Stagger>
      </div>
    );
  }

  if (id === "decide") {
    return (
      <div className="flex h-full flex-col justify-center">
        <Panel>
          <div className="flex items-center gap-2">
            <DrewMark className="size-7" />
            <p className="text-sm font-semibold">Why did ROAS drop 18% yesterday?</p>
          </div>
          <Stagger i={0} className="mt-3">
            <RoasChart />
          </Stagger>
          <Stagger i={1}>
            <div className="mt-2 space-y-1.5 text-[13px] text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Cause:</span>{" "}Tuesday&apos;s +40% budget on
                Prospecting-Broad reset learning. CPM +22%, CVR flat.
              </p>
              <p>
                <span className="font-medium text-foreground">Not the cause:</span>{" "}creative fatigue
                (frequency 1.9) or site CVR (2.4% vs 2.5% avg).
              </p>
            </div>
          </Stagger>
          <Stagger i={2}>
            <p className="mt-3 flex items-start gap-2 rounded-lg bg-brand-soft/70 p-2.5 text-[13px] text-foreground">
              <Sparkles className="mt-0.5 size-3.5 shrink-0 text-brand" />
              Hold budget 48h and let learning settle. Revisit Thursday.
            </p>
          </Stagger>
        </Panel>
      </div>
    );
  }

  /* execute */
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <Stagger i={0}>
        <Panel>
          <div className="flex items-center gap-3">
            <MetaMark className="size-9" />
            <div className="flex-1">
              <p className="text-sm font-semibold">Hero Bundle · +15% budget</p>
              <p className="font-mono text-xs text-muted-foreground">$410 → $472 / day</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-semibold uppercase text-brand">
              <Check className="size-3" /> Approved
            </span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-brand"
              initial={{ width: "62%" }}
              animate={{ width: "72%" }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="mt-1.5 flex justify-between font-mono text-[10px] text-muted-foreground">
            <span>guardrail: max +20%/day</span>
            <span>executed 09:14</span>
          </div>
        </Panel>
      </Stagger>
      <Stagger i={1}>
        <Panel>
          <div className="flex items-center gap-3">
            <GoogleMark className="size-9" />
            <div className="flex-1">
              <p className="text-sm font-semibold">Brand campaign · within variance</p>
              <p className="font-mono text-xs text-muted-foreground">protected · no change</p>
            </div>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">Hold</span>
          </div>
        </Panel>
      </Stagger>
      <Stagger i={2}>
        <Panel className="flex items-center gap-3 py-2.5">
          <SlackMark className="size-8" />
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">#ads-brief</span> · Drew posted the change log with reasoning · 09:15
          </p>
        </Panel>
      </Stagger>
    </div>
  );
}
