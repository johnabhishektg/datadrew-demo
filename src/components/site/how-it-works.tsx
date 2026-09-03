"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Link2, Sparkles } from "lucide-react";
import { howItWorks } from "@/content/site";
import { cn } from "@/lib/utils";
import { Container, SectionHeader } from "./section-header";
import { DrewMark, GoogleMark, MetaMark, ShopifyMark } from "./icons";

const INTERVAL = 5000;

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
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden text-sm text-muted-foreground"
                          >
                            <span className="block pt-1.5">{s.body}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
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

        <div className="relative h-[22rem] overflow-hidden rounded-2xl border border-border bg-muted/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={steps[active].id}
              className="absolute inset-0 p-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
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
    <div className={cn("rounded-xl border border-border bg-background p-4 shadow-sm", className)}>
      {children}
    </div>
  );
}

function StepVisual({ id }: { id: string }) {
  if (id === "connect") {
    return (
      <div className="flex h-full flex-col justify-center gap-3">
        {[
          { Mark: ShopifyMark, name: "Shopify", status: "Connected" },
          { Mark: MetaMark, name: "Meta Ads", status: "Connected" },
          { Mark: GoogleMark, name: "Google Ads", status: "Connecting…" },
        ].map((r) => (
          <Panel key={r.name} className="flex items-center gap-3">
            <r.Mark className="size-9" />
            <div className="flex-1">
              <p className="text-sm font-medium">{r.name}</p>
              <p className="text-xs text-muted-foreground">OAuth · read + managed actions</p>
            </div>
            <span className={cn("inline-flex items-center gap-1 text-xs font-medium", r.status === "Connected" ? "text-brand" : "text-muted-foreground")}>
              {r.status === "Connected" ? <Check className="size-3.5" /> : <Link2 className="size-3.5" />}
              {r.status}
            </span>
          </Panel>
        ))}
      </div>
    );
  }
  if (id === "learn") {
    const facts = [
      ["Hero Bundle", "62% margin · 11 wks stock"],
      ["Starter Kit", "21% margin · repeat 1.1x"],
      ["Refill Pack", "repeat 3.2x · LTV $184"],
      ["Promo calendar", "Labor Day sale · Sep 5–8"],
      ["Team preference", "max +20%/day, protect Brand"],
    ];
    return (
      <div className="flex h-full flex-col justify-center gap-2">
        {facts.map(([k, v], i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.12 }}
          >
            <Panel className="flex items-center justify-between py-2.5">
              <span className="text-sm font-medium">{k}</span>
              <span className="font-mono text-xs text-muted-foreground">{v}</span>
            </Panel>
          </motion.div>
        ))}
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
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Cause:</span> Tuesday&apos;s +40% budget on
              Prospecting-Broad reset learning; CPM +22%, CVR flat.
            </p>
            <p>
              <span className="font-medium text-foreground">Not the cause:</span> creative fatigue
              (frequency 1.9), site CVR (2.4% vs 2.5% avg).
            </p>
            <p className="flex items-start gap-2 rounded-lg bg-brand-soft/60 p-2 text-foreground">
              <Sparkles className="mt-0.5 size-3.5 shrink-0 text-brand" />
              Recommendation: hold budget 48h, let learning settle. Revisit Thursday.
            </p>
          </div>
        </Panel>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <Panel>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Hero Bundle · +15% budget</p>
          <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-semibold uppercase text-brand">Approved</span>
        </div>
        <p className="mt-1 font-mono text-xs text-muted-foreground">$410 → $472 / day · executed 09:14</p>
      </Panel>
      <Panel>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Summer-Hero-V3 · rotate creatives</p>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">Awaiting</span>
        </div>
        <p className="mt-1 font-mono text-xs text-muted-foreground">2 variants queued · expires in 6h</p>
      </Panel>
      <p className="px-1 text-xs text-muted-foreground">
        Guardrails: max +20%/day · Brand campaigns protected · every action logged with reasoning.
      </p>
    </div>
  );
}
