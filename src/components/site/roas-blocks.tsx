import { Clock } from "lucide-react";
import { DatadrewTile } from "./icons";
import { roasDrop } from "@/content/roas-drop";
import { cn } from "@/lib/utils";

/* Blocks specific to /why-did-my-roas-drop. */

/* The seven "tabs" an operator opens by hand. */
export function ManualTabs() {
  const m = roasDrop.manual;
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <ol className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-card">
        {m.tabs.map((t, i) => (
          <li key={i} className="flex items-start gap-4 px-5 py-4">
            <span className="mt-0.5 shrink-0 rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Tab {i + 1}
            </span>
            <p className="text-sm leading-relaxed text-foreground/90">{t}</p>
          </li>
        ))}
        <li className="flex items-start gap-4 bg-muted/40 px-5 py-4">
          <span className="mt-0.5 shrink-0 rounded-md bg-loss/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-loss">
            And
          </span>
          <p className="text-sm leading-relaxed">{m.missing}</p>
        </li>
      </ol>
      <p className="self-end text-pretty text-lg leading-snug tracking-tight text-muted-foreground lg:text-xl">
        {m.coda}
      </p>
    </div>
  );
}

/* The 8-rung diagnostic ladder, numbered top to bottom. */
export function DiagnosticLadder() {
  return (
    <ol className="relative flex flex-col gap-3">
      {roasDrop.ladder.rungs.map((r, i) => (
        <li
          key={r.title}
          className="grid gap-3 rounded-2xl border border-border bg-card p-5 md:grid-cols-[3rem_16rem_1fr] md:gap-6 md:p-6"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-foreground font-mono text-xs font-semibold text-background">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-base font-semibold tracking-tight">{r.title}</h3>
            <p className="mt-1 text-sm font-medium text-brand">{r.question}</p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{r.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* Sample Daily Ads Brief, rendered as an app-style card. Illustrative data. */
export function SampleBrief({ className }: { className?: string }) {
  const b = roasDrop.brief;
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_64px_-24px_rgba(0,0,0,0.28)]", className)}>
      <div className="flex items-center gap-3 border-b border-border px-5 py-3">
        <DatadrewTile className="size-7 rounded-md" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{b.title}</p>
        </div>
        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
          <Clock className="size-3" />
          {b.time}
        </span>
      </div>
      <div className="flex flex-col gap-4 p-5">
        {b.blocks.map((blk) => (
          <div
            key={blk.label}
            className={cn(
              "rounded-xl border p-4",
              blk.highlight ? "border-brand/30 bg-brand/5" : "border-border bg-background/60"
            )}
          >
            <p
              className={cn(
                "text-[10px] font-semibold uppercase tracking-[0.14em]",
                blk.highlight ? "text-brand" : "text-muted-foreground"
              )}
            >
              {blk.label}
            </p>
            {blk.lines.map((line, i) => (
              <p key={i} className={cn("text-sm leading-relaxed", i > 0 && "mt-2")}>
                {line}
              </p>
            ))}
          </div>
        ))}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="inline-flex items-center rounded-lg bg-brand px-3.5 py-2 text-sm font-medium text-brand-foreground">
            {b.approve}
          </span>
          <span className="inline-flex items-center rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-muted-foreground">
            {b.dismiss}
          </span>
        </div>
      </div>
    </div>
  );
}
