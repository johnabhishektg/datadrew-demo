"use client";

import { useRef } from "react";
import { ShieldCheck, SlidersHorizontal } from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { Switch } from "@/components/ui/switch";
import { guardrails } from "@/content/site";
import { Container, SectionHeader } from "./section-header";
import { ChatGPTMark, ClaudeMark, DrewMark, SlackMark } from "./icons";

export function Guardrails() {
  return (
    <Container id="surfaces" className="py-16 md:py-24">
      <SectionHeader
        eyebrow={guardrails.eyebrow}
        headline={guardrails.headline}
        subhead={guardrails.subhead}
      />
      <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
        <MagicCard className="rounded-2xl border border-border" gradientColor="color-mix(in oklch, var(--brand) 18%, transparent)">
          <div className="flex h-full flex-col p-6 md:p-8">
            <GuardrailPanel />
            <div className="mt-6 flex items-center gap-2 text-brand">
              <ShieldCheck className="size-5" />
              <h3 className="text-lg font-semibold text-foreground">{guardrails.cards[0].title}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{guardrails.cards[0].body}</p>
          </div>
        </MagicCard>

        <MagicCard className="rounded-2xl border border-border" gradientColor="color-mix(in oklch, var(--brand) 18%, transparent)">
          <div className="flex h-full flex-col p-6 md:p-8">
            <SurfacesBeam />
            <div className="mt-6 flex items-center gap-2 text-brand">
              <SlidersHorizontal className="size-5" />
              <h3 className="text-lg font-semibold text-foreground">{guardrails.cards[1].title}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{guardrails.cards[1].body}</p>
          </div>
        </MagicCard>
      </div>
    </Container>
  );
}

function GuardrailPanel() {
  const rows = [
    { label: "Require approval before any change", on: true },
    { label: "Max budget change per day", value: "20%" },
    { label: "Protected campaigns", value: "Brand, Retargeting" },
    { label: "Daily spend ceiling", value: "$8,000" },
    { label: "Log every action with reasoning", on: true, locked: true },
  ];
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Execution guardrails</p>
      <ul className="mt-3 divide-y divide-border">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center justify-between gap-4 py-2.5 text-sm">
            <span>{r.label}</span>
            {"value" in r ? (
              <span className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs">{r.value}</span>
            ) : (
              <Switch checked={r.on} disabled={r.locked} aria-label={r.label} className="data-[state=checked]:bg-brand" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Node({ r, children, label }: { r: React.RefObject<HTMLDivElement | null>; children: React.ReactNode; label: string }) {
  return (
    <div className="z-10 flex flex-col items-center gap-1.5">
      <div ref={r}>{children}</div>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}

function SurfacesBeam() {
  const container = useRef<HTMLDivElement>(null);
  const drew = useRef<HTMLDivElement>(null);
  const slack = useRef<HTMLDivElement>(null);
  const claude = useRef<HTMLDivElement>(null);
  const gpt = useRef<HTMLDivElement>(null);
  const app = useRef<HTMLDivElement>(null);

  return (
    <div ref={container} className="relative flex h-[15.5rem] items-center justify-between rounded-xl border border-border bg-muted/30 px-6">
      <Node r={drew} label="Drew">
        <DrewMark className="size-12" />
      </Node>
      <div className="flex flex-col gap-3">
        <Node r={app} label="Datadrew app">
          <span className="flex size-10 items-center justify-center rounded-full border border-border bg-card font-mono text-[10px] font-semibold shadow-sm">app</span>
        </Node>
        <Node r={slack} label="Slack">
          <SlackMark className="size-10" />
        </Node>
      </div>
      <div className="flex flex-col gap-3">
        <Node r={claude} label="Claude · MCP">
          <ClaudeMark className="size-10" />
        </Node>
        <Node r={gpt} label="ChatGPT · MCP">
          <ChatGPTMark className="size-10" />
        </Node>
      </div>
      <AnimatedBeam containerRef={container} fromRef={drew} toRef={app} gradientStartColor="var(--brand)" gradientStopColor="var(--brand)" curvature={-30} duration={4} />
      <AnimatedBeam containerRef={container} fromRef={drew} toRef={slack} gradientStartColor="var(--brand)" gradientStopColor="#E01E5A" curvature={30} duration={4} delay={0.6} />
      <AnimatedBeam containerRef={container} fromRef={drew} toRef={claude} gradientStartColor="var(--brand)" gradientStopColor="#D97757" curvature={-60} duration={5} delay={1.2} />
      <AnimatedBeam containerRef={container} fromRef={drew} toRef={gpt} gradientStartColor="var(--brand)" gradientStopColor="#10A37F" curvature={60} duration={5} delay={1.8} />
    </div>
  );
}
