import { DrewChat } from "./blocks";
import type { Kpi, PlatformVisual } from "@/content/platform";
import { cn } from "@/lib/utils";

/* Sample-data mock visuals for /platform pages. Same chrome as the hero app
 * frame: rounded-2xl, border-border, bg-card, mono numbers. No real accounts. */

function Frame({
  title,
  caption,
  children,
  footer,
  className,
}: {
  title?: string;
  caption?: string;
  children: React.ReactNode;
  footer?: string;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-card shadow-sm", className)}>
      {(title || caption) && (
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-border/70 px-4 py-3">
          {title && <span className="text-sm font-semibold tracking-tight">{title}</span>}
          {caption && <span className="font-mono text-[11px] text-muted-foreground">{caption}</span>}
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer && (
        <div className="border-t border-border/70 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  );
}

const verbTone: Record<string, string> = {
  SCALE: "bg-brand-soft text-brand",
  Scaling: "bg-brand-soft text-brand",
  ITERATE: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Fatiguing: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  KILL: "bg-loss/10 text-loss",
  Dead: "bg-loss/10 text-loss",
  WAIT: "bg-muted text-muted-foreground",
  Testing: "bg-muted text-muted-foreground",
  Healthy: "bg-muted text-foreground/80",
};

function Cell({ value, first }: { value: string; first: boolean }) {
  const tone = verbTone[value];
  if (tone) {
    return (
      <span className={cn("rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider", tone)}>
        {value}
      </span>
    );
  }
  return <span className={cn(first ? "font-medium" : "font-mono tabular-nums text-muted-foreground")}>{value}</span>;
}

function MiniTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
            {head.map((h, i) => (
              <th key={i} className={cn("pb-2 font-medium", i > 0 && "pl-3")}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border/60">
              {r.map((c, j) => (
                <td key={j} className={cn("py-2 align-middle", j > 0 && "pl-3")}>
                  <Cell value={c} first={j === 0} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KpiRow({ items }: { items: Kpi[] }) {
  return (
    <dl className={cn("grid gap-3", items.length >= 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3")}>
      {items.map((k) => (
        <div key={k.label} className="rounded-xl border border-border/70 bg-background/60 px-3 py-2.5">
          <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{k.label}</dt>
          <dd className="mt-1 flex items-baseline gap-1.5">
            <span className={cn("font-mono text-lg font-medium tabular-nums", k.down && "text-loss")}>{k.value}</span>
            {k.delta && (
              <span
                className={cn(
                  "font-mono text-[11px]",
                  k.delta.startsWith("-") ? "text-loss" : "text-brand"
                )}
              >
                {k.delta}
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function heat(v: number | null) {
  if (v === null) return "bg-muted/40 text-muted-foreground/50";
  if (v >= 100) return "bg-brand text-brand-foreground";
  if (v >= 40) return "bg-brand/70 text-brand-foreground";
  if (v >= 30) return "bg-brand/45 text-foreground";
  if (v >= 20) return "bg-brand/25 text-foreground";
  return "bg-brand/10 text-foreground";
}

const toneCls: Record<string, string> = {
  scale: "bg-brand-soft text-brand",
  iterate: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  kill: "bg-loss/10 text-loss",
  wait: "bg-muted text-muted-foreground",
  neutral: "bg-muted text-foreground/80",
  alert: "bg-loss/10 text-loss",
  rec: "bg-brand-soft text-brand",
};

export function PlatformVisualView({ visual, className }: { visual: PlatformVisual; className?: string }) {
  switch (visual.kind) {
    case "chat":
      return <DrewChat question={visual.question} answer={visual.answer} insight={visual.insight} className={className} />;

    case "table":
      return (
        <Frame title={visual.title} caption={visual.caption} className={className}>
          <MiniTable head={visual.head} rows={visual.rows} />
          {visual.note && (
            <p className="mt-3 rounded-xl border border-brand/30 bg-brand/5 px-3 py-2 text-xs leading-relaxed">{visual.note}</p>
          )}
        </Frame>
      );

    case "kpis":
      return (
        <Frame title={visual.title} caption={visual.caption} className={className}>
          <KpiRow items={visual.items} />
          {visual.table && (
            <div className="mt-4">
              <MiniTable head={visual.table.head} rows={visual.table.rows} />
            </div>
          )}
        </Frame>
      );

    case "heatmap":
      return (
        <Frame title={visual.title} caption={visual.caption} className={className}>
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-1 text-xs">
              <thead>
                <tr>
                  <th className="pb-1 text-left font-medium text-muted-foreground">Cohort</th>
                  {visual.cols.map((c) => (
                    <th key={c} className="pb-1 text-center font-medium text-muted-foreground">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visual.rows.map((r) => (
                  <tr key={r.label}>
                    <td className="whitespace-nowrap pr-2 font-medium">{r.label}</td>
                    {r.cells.map((v, i) => (
                      <td
                        key={i}
                        className={cn("rounded-md px-2 py-1.5 text-center font-mono tabular-nums", heat(v))}
                      >
                        {v === null ? "·" : `${v}%`}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Frame>
      );

    case "bars": {
      const max = Math.max(...visual.items.map((i) => i.value));
      return (
        <Frame title={visual.title} caption={visual.caption} className={className}>
          <ul className="flex flex-col gap-3">
            {visual.items.map((it) => (
              <li key={it.label} className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="truncate font-medium">{it.label}</span>
                  <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                    <span className="text-foreground">{it.display}</span>
                    {it.sub && <span className="ml-2">{it.sub}</span>}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${(it.value / max) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
          {visual.note && <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{visual.note}</p>}
        </Frame>
      );
    }

    case "segments":
      return (
        <Frame title={visual.title} caption={visual.caption} footer={visual.footer} className={className}>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {visual.items.map((s, i) => (
              <li key={s.name} className="rounded-xl border border-border/70 bg-background/60 p-3">
                <p className="flex items-center gap-1.5 text-xs font-medium">
                  <span
                    className="size-2 rounded-full bg-brand"
                    style={{ opacity: 1 - i * 0.14 }}
                    aria-hidden
                  />
                  {s.name}
                </p>
                <p className="mt-1.5 font-mono text-lg font-medium tabular-nums">{s.count}</p>
                <p className="font-mono text-[11px] text-muted-foreground">{s.share}</p>
              </li>
            ))}
          </ul>
        </Frame>
      );

    case "bundles":
      return (
        <Frame title={visual.title} caption={visual.caption} className={className}>
          <ul className="grid gap-2 sm:grid-cols-2">
            {visual.items.map((b) => (
              <li key={b.name} className="rounded-xl border border-border/70 bg-background/60 p-3">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{b.name}</p>
                <p className="mt-1 text-sm font-medium leading-snug">{b.products.join(" + ")}</p>
                <dl className="mt-2.5 flex gap-4 font-mono text-xs tabular-nums">
                  <div>
                    <dt className="text-muted-foreground">Frequency</dt>
                    <dd>{b.frequency}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Avg AOV</dt>
                    <dd>{b.aov}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </Frame>
      );

    case "cards":
      return (
        <Frame title={visual.title} caption={visual.caption} footer={visual.footer} className={className}>
          <ul className="flex flex-col gap-2">
            {visual.items.map((c) => (
              <li key={c.title} className="flex flex-col gap-1.5 rounded-xl border border-border/70 bg-background/60 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider",
                      toneCls[c.tone ?? "neutral"]
                    )}
                  >
                    {c.tag}
                  </span>
                  {c.meta && <span className="font-mono text-xs tabular-nums text-muted-foreground">{c.meta}</span>}
                </div>
                <p className="text-sm font-medium leading-snug">{c.title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{c.body}</p>
              </li>
            ))}
          </ul>
        </Frame>
      );

    case "keyvals":
      return (
        <Frame title={visual.title} caption={visual.caption} className={className}>
          {visual.table && <MiniTable head={visual.table.head} rows={visual.table.rows} />}
          <dl className={cn("grid gap-2 sm:grid-cols-2", visual.table && "mt-4 border-t border-border/60 pt-4")}>
            {visual.items.map((kv) => (
              <div key={kv.k} className="rounded-xl border border-border/70 bg-background/60 p-3">
                <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{kv.k}</dt>
                <dd className="mt-1 text-sm leading-snug">{kv.v}</dd>
              </div>
            ))}
          </dl>
        </Frame>
      );

    case "timeline":
      return (
        <Frame title={visual.title} caption={visual.caption} footer={visual.footer} className={className}>
          <ol className="relative flex flex-col gap-3 border-l border-border/70 pl-4">
            {visual.items.map((t) => (
              <li key={t.time + t.title} className="relative">
                <span
                  className={cn(
                    "absolute -left-[21px] top-1.5 size-2.5 rounded-full border-2 border-card",
                    t.tone === "alert" ? "bg-loss" : t.tone === "rec" ? "bg-brand" : "bg-muted-foreground"
                  )}
                  aria-hidden
                />
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{t.time}</span>
                  <span
                    className={cn(
                      "rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider",
                      toneCls[t.tone ?? "neutral"]
                    )}
                  >
                    {t.tag}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium leading-snug">{t.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{t.body}</p>
                {t.kpis && (
                  <div className="mt-2">
                    <KpiRow items={t.kpis} />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </Frame>
      );

    case "recommendation":
      return (
        <Frame title={visual.title} caption={visual.source} footer={visual.footer} className={className}>
          <p className="text-base font-semibold leading-snug tracking-tight">{visual.headline}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{visual.body}</p>
          <div className="mt-4">
            <KpiRow items={visual.kpis} />
          </div>
          <div className="mt-4 flex gap-2">
            <span className="inline-flex items-center rounded-md bg-brand px-3 py-1.5 text-xs font-medium text-brand-foreground">
              Approve &amp; execute
            </span>
            <span className="inline-flex items-center rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium">
              View evidence
            </span>
            <span className="inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground">
              Dismiss
            </span>
          </div>
        </Frame>
      );

    case "velocity":
      return (
        <Frame title={visual.title} caption={visual.caption} className={className}>
          <ul className="flex flex-col gap-3">
            {visual.items.map((it) => (
              <li key={it.label} className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between text-sm">
                  <span className={cn(it.you ? "font-semibold" : "font-medium")}>{it.label}</span>
                  <span className="font-mono text-xs tabular-nums">{it.display}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn("h-full rounded-full", it.you ? "bg-foreground" : "bg-brand/60")}
                    style={{ width: `${(it.value / visual.max) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-xl border border-brand/30 bg-brand/5 px-3 py-2 text-xs leading-relaxed">{visual.note}</p>
        </Frame>
      );
  }
}
