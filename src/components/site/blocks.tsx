import Link from "next/link";
import { Check } from "lucide-react";
import { FaqList, type FaqItem } from "./faq-list";
import { Button } from "@/components/ui/button";
import { DatadrewTile } from "./icons";
import { cn } from "@/lib/utils";

/* Reusable building blocks for secondary pages. Every block inherits the
 * homepage tokens (border-border cards, brand eyebrows, mono numbers) so
 * ported pages read as the same site. Keep these presentational; copy
 * lives in src/content/. */

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex w-fit items-center text-xs font-semibold uppercase tracking-[0.14em] text-brand", className)}>
      {children}
    </span>
  );
}

/* Section with optional eyebrow / headline / subhead, left- or center-aligned. */
export function Section({
  id,
  eyebrow,
  headline,
  subhead,
  align = "left",
  className,
  children,
  narrow = false,
}: {
  id?: string;
  eyebrow?: string;
  headline?: React.ReactNode;
  subhead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
  narrow?: boolean;
}) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-6xl scroll-mt-28 px-5 py-14 md:px-8 md:py-20", className)}>
      {(eyebrow || headline || subhead) && (
        <div
          className={cn(
            "flex flex-col gap-3",
            align === "center" ? "mx-auto max-w-2xl items-center text-center" : narrow ? "max-w-2xl" : "max-w-3xl"
          )}
        >
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {headline && (
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">{headline}</h2>
          )}
          {subhead && <p className="text-pretty text-base text-muted-foreground md:text-lg">{subhead}</p>}
        </div>
      )}
      {children && <div className={cn((eyebrow || headline || subhead) && "mt-8 md:mt-12")}>{children}</div>}
    </section>
  );
}

export type Stat = { value: string; label: string; sub?: string };

export function StatBand({ stats, className, columns }: { stats: Stat[]; className?: string; columns?: 3 | 4 }) {
  const cols = columns ?? (stats.length >= 4 ? 4 : 3);
  return (
    <dl
      className={cn(
        "grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2",
        cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        className
      )}
    >
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1 bg-card px-6 py-6">
          <dd className="font-mono text-3xl font-medium tracking-tight tabular-nums text-foreground md:text-4xl">
            {s.value}
          </dd>
          <dt className="text-sm text-muted-foreground">{s.label}</dt>
          {s.sub && <dt className="text-xs text-muted-foreground/80">{s.sub}</dt>}
        </div>
      ))}
    </dl>
  );
}

export type Feature = { title: string; description: React.ReactNode; icon?: React.ReactNode; tag?: string };

export function FeatureGrid({ items, columns = 3, className }: { items: Feature[]; columns?: 2 | 3; className?: string }) {
  return (
    <ul className={cn("grid gap-4", columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2", className)}>
      {items.map((f) => (
        <li key={f.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
          {(f.icon || f.tag) && (
            <div className="flex items-center justify-between">
              {f.icon ? (
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand [&_svg]:size-5">
                  {f.icon}
                </span>
              ) : (
                <span />
              )}
              {f.tag && (
                <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {f.tag}
                </span>
              )}
            </div>
          )}
          <h3 className="text-base font-semibold tracking-tight">{f.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
        </li>
      ))}
    </ul>
  );
}

export type Step = { title: string; description: React.ReactNode };

export function Steps({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <ol className={cn("grid gap-4 md:grid-cols-3", className)}>
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
          <span className="flex size-8 items-center justify-center rounded-full bg-foreground font-mono text-xs font-semibold text-background">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="text-base font-semibold tracking-tight">{s.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{s.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function CheckList({ items, className }: { items: React.ReactNode[]; className?: string }) {
  return (
    <ul className={cn("flex flex-col gap-2.5", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
            <Check className="size-3" strokeWidth={3} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export type { FaqItem };

export function FaqBlock({
  items,
  eyebrow = "FAQ",
  headline = "Frequently asked questions",
  subhead,
  id = "faq",
}: {
  items: FaqItem[];
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  id?: string;
}) {
  return (
    <Section id={id} eyebrow={eyebrow} headline={headline} subhead={subhead} align="center">
      <FaqList items={items} name={id} />
    </Section>
  );
}

/* Pair of CTA buttons. `href` starting with "/" renders a Next Link. */
export function CtaButton({
  href,
  children,
  variant = "default",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost" | "secondary";
  className?: string;
}) {
  const cls = cn("rounded-lg", className);
  return (
    <Button asChild variant={variant} className={cls}>
      {href.startsWith("/") ? <Link href={href}>{children}</Link> : <a href={href}>{children}</a>}
    </Button>
  );
}

/* A mock Drew conversation: one user question, Drew's answer as lines,
 * optional highlighted insight. Same chrome as the hero app frame. */
export function DrewChat({
  question,
  answer,
  insight,
  title = "Drew · Ads agent",
  className,
}: {
  question: string;
  answer: React.ReactNode[];
  insight?: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-[#F7F6F3] text-left shadow-[0_24px_64px_-24px_rgba(0,0,0,0.28)] dark:bg-[#1c1c1c]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/70 bg-card px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </span>
        <span className="ml-2 font-mono text-[11px] text-muted-foreground">{title}</span>
      </div>
      <div className="flex flex-col gap-4 p-4 text-sm md:p-5">
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-tr-md border border-border bg-card px-4 py-2.5 shadow-sm">
            {question}
          </div>
        </div>
        <div className="flex items-start gap-3">
          <DatadrewTile className="mt-0.5 size-6 shrink-0 rounded-md" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {answer.map((line, i) => (
              <p key={i} className="leading-relaxed text-foreground/90">
                {line}
              </p>
            ))}
            {insight && (
              <div className="mt-1 rounded-xl border border-brand/30 bg-brand/5 p-3.5 text-sm leading-relaxed">
                <span className="mr-1.5 rounded-md bg-brand-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand">
                  Insight
                </span>
                {insight}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small "prompt chips" list — the example questions a page suggests. */
export function PromptChips({ prompts, className }: { prompts: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {prompts.map((p) => (
        <li
          key={p}
          className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground"
        >
          &ldquo;{p}&rdquo;
        </li>
      ))}
    </ul>
  );
}

/* Themeable data table (matches the .article-body table styling). */
export function SimpleTable({
  head,
  rows,
  caption,
  className,
}: {
  head: React.ReactNode[];
  rows: React.ReactNode[][];
  caption?: string;
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto rounded-2xl border border-border bg-card", className)}>
      <table className="w-full min-w-[32rem] text-sm">
        {caption && <caption className="px-5 pt-4 text-left text-xs text-muted-foreground">{caption}</caption>}
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
            {head.map((h, i) => (
              <th key={i} className="px-5 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border/60 last:border-0">
              {r.map((c, j) => (
                <td key={j} className={cn("px-5 py-3 align-top", j === 0 ? "font-medium" : "text-muted-foreground")}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
