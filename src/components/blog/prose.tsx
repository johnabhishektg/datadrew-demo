import { cn } from "@/lib/utils";

/* Article primitives for the Journal. Every post is composed from these, so
 * typography stays consistent and new posts need zero styling decisions.
 * Measure: ~65ch. Numbers always mono + tabular. */

export function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-2xl leading-relaxed text-foreground/90">
      {children}
    </p>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="leading-[1.75] text-foreground/85">{children}</p>;
}

export function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-6 scroll-mt-24 border-t border-rule pt-8">
      <span className="font-display text-3xl leading-tight">{children}</span>
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-2 font-display text-2xl leading-snug">{children}</h3>;
}

export function UL({ children }: { children: React.ReactNode }) {
  return <ul className="flex flex-col gap-2.5">{children}</ul>;
}

export function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 leading-[1.7] text-foreground/85">
      <span className="mt-[0.72em] size-1 shrink-0 rounded-full bg-verdict" />
      <span>{children}</span>
    </li>
  );
}

/** Big margin-breaking quote — the editorial exhale. */
export function PullQuote({
  children,
  attribution,
}: {
  children: React.ReactNode;
  attribution?: string;
}) {
  return (
    <figure className="my-4 border-y border-rule py-8 md:-mx-10">
      <blockquote className="text-center font-display text-3xl leading-snug text-balance md:text-4xl">
        “{children}”
      </blockquote>
      {attribution && (
        <figcaption className="label-mono mt-4 text-center text-muted-foreground">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}

export function Callout({
  label = "Note",
  tone = "verdict",
  children,
}: {
  label?: string;
  tone?: "verdict" | "loss";
  children: React.ReactNode;
}) {
  return (
    <aside
      className={cn(
        "border p-5",
        tone === "verdict" ? "border-verdict/35 bg-accent/60" : "border-loss/35 bg-loss/5"
      )}
    >
      <p className={cn("label-mono", tone === "verdict" ? "text-verdict" : "text-loss")}>
        {label}
      </p>
      <div className="mt-2 text-[0.95rem] leading-relaxed text-foreground/85">
        {children}
      </div>
    </aside>
  );
}

export function CodeBlock({
  title,
  code,
}: {
  title?: string;
  code: string;
}) {
  return (
    <figure className="overflow-hidden border border-night-border bg-night text-night-foreground">
      {title && (
        <figcaption className="border-b border-night-border px-4 py-2 font-mono text-xs text-night-muted">
          {title}
        </figcaption>
      )}
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-[0.82rem] leading-relaxed">{code}</code>
      </pre>
    </figure>
  );
}

export function Figure({
  children,
  caption,
  bleed = false,
}: {
  children: React.ReactNode;
  caption?: string;
  bleed?: boolean;
}) {
  return (
    <figure className={cn("my-2", bleed && "md:-mx-16")}>
      <div className="overflow-hidden border border-border bg-card">{children}</div>
      {caption && (
        <figcaption className="mt-3 border-l-2 border-verdict pl-3 font-mono text-xs leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Simple on-brand horizontal bar chart, rendered in DOM (crawlable, themable). */
export function BarChart({
  data,
  unit = "",
  maxValue,
}: {
  data: { label: string; value: number; highlight?: boolean }[];
  unit?: string;
  maxValue?: number;
}) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value));
  return (
    <div className="flex flex-col gap-3 p-5">
      {data.map((d) => (
        <div key={d.label} className="grid grid-cols-[7.5rem_1fr_3.5rem] items-center gap-3">
          <span className="truncate text-xs text-muted-foreground">{d.label}</span>
          <div className="h-5 bg-muted">
            <div
              className={cn("h-full", d.highlight ? "bg-verdict" : "bg-foreground/25")}
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </div>
          <span className="text-right font-mono text-xs tabular">
            {d.value}
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}

export function DataTable({
  headers,
  rows,
  caption,
}: {
  headers: string[];
  rows: (string | number)[][];
  caption?: string;
}) {
  return (
    <figure className="my-2 overflow-x-auto">
      <table className="w-full border border-border text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            {headers.map((h, i) => (
              <th
                key={h}
                className={cn(
                  "px-4 py-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground",
                  i === 0 ? "text-left" : "text-right"
                )}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-border/60 last:border-0">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={cn(
                    "px-4 py-2.5",
                    ci === 0 ? "text-left font-medium" : "text-right font-mono text-xs tabular"
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && (
        <figcaption className="mt-3 border-l-2 border-verdict pl-3 font-mono text-xs leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
