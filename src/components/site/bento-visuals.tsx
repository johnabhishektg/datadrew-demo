"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Brain, Check } from "lucide-react";
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
      <DrewMark className="size-14" />
      <OrbitingCircles radius={78} iconSize={40} duration={24}>
        <ShopifyMark className="size-10" />
        <MetaMark className="size-10" />
        <GoogleMark className="size-10" />
      </OrbitingCircles>
      <OrbitingCircles radius={136} iconSize={38} duration={36} reverse>
        <KlaviyoMark className="size-9" />
        <GA4Mark className="size-9" />
        <AmazonMark className="size-9" />
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
        className="z-10 flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium shadow-sm"
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

/* 04 Memory — the brain filling up with brand context.
   Chips sit in the four corners; the brain and rings stay in the clear
   centre band so nothing overlaps at the bento's narrowest cell. */
const memories = [
  { text: "62% margin · Hero Bundle", className: "left-[4%] top-[8%]", delay: 0.1 },
  { text: "Labor Day sale · Sep 5–8", className: "right-[4%] top-[8%]", delay: 0.35 },
  { text: "Max +20%/day", className: "left-[4%] top-[56%]", delay: 0.6 },
  { text: "Brand: protected", className: "right-[4%] top-[56%]", delay: 0.85 },
];

export function MemoryBrain() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* soft rings */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute left-1/2 top-1/2 rounded-full border border-brand/30"
          style={{ width: 44 + i * 26, height: 44 + i * 26, x: "-50%", y: "-50%" }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: [0, 0.45, 0], scale: [0.7, 1.1, 1.25] }}
          transition={{ duration: 3.6, delay: i * 1.2, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      {/* the brain */}
      <motion.div
        className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-brand-soft text-brand shadow-[0_10px_30px_-12px_var(--brand)]"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Brain className="size-6" strokeWidth={1.6} />
      </motion.div>
      {/* memories flying in */}
      {memories.map((m) => (
        <motion.span
          key={m.text}
          className={cn(
            "absolute z-10 whitespace-nowrap rounded-md bg-card px-2 py-0.5 text-[10px] font-medium leading-5 text-foreground/85 shadow-sm ring-1 ring-border",
            m.className
          )}
          initial={{ opacity: 0, y: 6, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: m.delay }}
        >
          {m.text}
        </motion.span>
      ))}
    </div>
  );
}
