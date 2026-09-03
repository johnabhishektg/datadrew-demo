"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Check, Pause, TrendingUp } from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { AnimatedList } from "@/components/ui/animated-list";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { cn } from "@/lib/utils";
import {
  AmazonMark,
  DrewMark,
  GA4Mark,
  GoogleMark,
  KlaviyoMark,
  MetaMark,
  ShopifyMark,
} from "./icons";

/* 01 Context — the business data orbiting Drew */
export function ContextOrbit() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <DrewMark className="size-12" />
      <OrbitingCircles radius={70} iconSize={36} duration={24}>
        <ShopifyMark className="size-9" />
        <MetaMark className="size-9" />
        <GoogleMark className="size-9" />
      </OrbitingCircles>
      <OrbitingCircles radius={120} iconSize={34} duration={36} reverse>
        <KlaviyoMark className="size-8" />
        <GA4Mark className="size-8" />
        <AmazonMark className="size-8" />
      </OrbitingCircles>
    </div>
  );
}

/* 02 Judgment — findings arriving like a live feed */
const findings = [
  { tag: "Signal", text: "ROAS dip = Tuesday's budget change landing, not demand", tone: "muted" },
  { tag: "Scale", text: "Hero Bundle: 62% margin, 11 wks stock → +15% budget", tone: "brand" },
  { tag: "Fatigue", text: "Summer-Hero-V3 frequency 4.2, CTR −38% → rotate", tone: "loss" },
  { tag: "Hold", text: "Google Brand within variance → leave it alone", tone: "muted" },
  { tag: "Leak", text: "40% of spend on a 21%-margin SKU → rebalance", tone: "loss" },
];

export function FindingsFeed() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden p-4">
      <AnimatedList delay={1600} className="gap-2">
        {findings.map((f) => (
          <div
            key={f.text}
            className="flex w-full items-start gap-2 rounded-lg border border-border bg-background/90 p-2.5 text-xs shadow-sm backdrop-blur"
          >
            <span
              className={cn(
                "shrink-0 rounded-md px-1.5 py-0.5 font-semibold",
                f.tone === "brand" && "bg-brand-soft text-brand",
                f.tone === "loss" && "bg-destructive/10 text-destructive",
                f.tone === "muted" && "bg-muted text-muted-foreground"
              )}
            >
              {f.tag}
            </span>
            <span className="leading-snug text-foreground/90">{f.text}</span>
          </div>
        ))}
      </AnimatedList>
    </div>
  );
}

/* 03 Execution — approved change flows from Drew to the ad platforms */
export function ExecutionBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const drewRef = useRef<HTMLDivElement>(null);
  const approveRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const googleRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative flex h-full w-full items-center justify-between overflow-hidden px-6 py-8">
      <div ref={drewRef} className="z-10">
        <DrewMark className="size-11" />
      </div>
      <div
        ref={approveRef}
        className="z-10 flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium shadow-sm"
      >
        <Check className="size-3.5 text-brand" /> Approved
      </div>
      <div className="z-10 flex flex-col gap-4">
        <div ref={metaRef}>
          <MetaMark className="size-10" />
        </div>
        <div ref={googleRef}>
          <GoogleMark className="size-10" />
        </div>
      </div>
      <AnimatedBeam containerRef={containerRef} fromRef={drewRef} toRef={approveRef} gradientStartColor="var(--brand)" gradientStopColor="var(--brand)" duration={4} />
      <AnimatedBeam containerRef={containerRef} fromRef={approveRef} toRef={metaRef} gradientStartColor="var(--brand)" gradientStopColor="#0866FF" duration={4} delay={1} curvature={-20} />
      <AnimatedBeam containerRef={containerRef} fromRef={approveRef} toRef={googleRef} gradientStartColor="var(--brand)" gradientStopColor="#34A853" duration={4} delay={1.5} curvature={20} />
    </div>
  );
}

/* 04 Memory — the brain compounding: bars that grow over "months with Drew" */
const bars = [22, 30, 38, 45, 55, 62, 74, 86];

export function MemoryChart() {
  return (
    <div className="flex h-full w-full flex-col p-4">
      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>Brand context Drew holds</span>
        <span className="inline-flex items-center gap-1 font-medium text-brand">
          <TrendingUp className="size-3.5" /> compounding
        </span>
      </div>
      <div className="flex h-16 items-end gap-2">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md bg-brand/80"
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground">
        <span>month 1</span>
        <span>month 8</span>
      </div>
    </div>
  );
}

export { Pause };
