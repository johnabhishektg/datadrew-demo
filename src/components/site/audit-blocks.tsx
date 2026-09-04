import { TrendingDown, TrendingUp } from "lucide-react";
import { DatadrewTile } from "./icons";
import { freeAudit } from "@/content/free-audit";
import { cn } from "@/lib/utils";

/* Mock "Store Health Report" card for /free-audit. Illustrative numbers. */
export function HealthReportCard({ className }: { className?: string }) {
  const r = freeAudit.report;
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_64px_-24px_rgba(0,0,0,0.28)]",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-border px-5 py-3">
        <DatadrewTile className="size-7 rounded-md" />
        <p className="text-sm font-semibold">{r.title}</p>
        <span className="ml-auto rounded-md bg-brand-soft px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-brand">
          Free
        </span>
      </div>
      <div className="p-5">
        <dl className="grid grid-cols-2 gap-3">
          {r.stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-background/60 p-4">
              <dt className="text-xs text-muted-foreground">{s.label}</dt>
              <dd className="mt-1 flex items-baseline gap-2">
                <span className="font-mono text-2xl font-medium tracking-tight tabular-nums">{s.value}</span>
                {s.delta && (
                  <span
                    className={cn(
                      "inline-flex items-center gap-0.5 font-mono text-xs",
                      s.up ? "text-brand" : "text-loss"
                    )}
                  >
                    {s.up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                    {s.delta}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 rounded-xl border border-brand/30 bg-brand/5 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">{r.insightLabel}</p>
          <p className="mt-1.5 text-sm leading-relaxed">{r.insight}</p>
        </div>
      </div>
    </div>
  );
}
