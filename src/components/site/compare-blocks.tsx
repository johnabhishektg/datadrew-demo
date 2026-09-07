import Link from "next/link";
import { ArrowUpRight, Check, Minus, Star } from "lucide-react";
import { CheckList, Eyebrow, Section } from "./blocks";
import type { Cell, Comparison, FeatureGroup } from "@/content/comparisons";
import { competitorLogo, comparisonReviews, reviewsLine } from "@/content/comparisons";
import { BrandLabel, BrandMark, DATADREW_MARK } from "./brand-mark";
import { cn } from "@/lib/utils";

/* Building blocks specific to the /vs/<competitor> pages. */

/* The three "X vs Y" quick-contrast tiles under the hero. */
export function ContrastTiles({ c }: { c: Comparison }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {c.tiles.map((t) => (
        <li key={t.label} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t.label}</p>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 truncate text-[11px] font-medium text-brand">
                <BrandMark logo={DATADREW_MARK} name="Datadrew" size="sm" />
                {t.datadrewLabel ?? "Datadrew"}
              </p>
              <p className="text-lg font-semibold leading-tight tracking-tight">{t.datadrew}</p>
            </div>
            <span className="font-mono text-[11px] uppercase text-muted-foreground/70">vs</span>
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 truncate text-[11px] font-medium text-muted-foreground">
                <BrandMark logo={c.logo} name={c.competitor} size="sm" />
                {t.competitorLabel ?? c.competitor}
              </p>
              <p className="text-lg font-semibold leading-tight tracking-tight text-muted-foreground">{t.competitor}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function CellContent({ cell, highlight }: { cell: Cell; highlight?: boolean }) {
  if (cell.dash && !cell.text) {
    return (
      <span className="inline-flex items-center text-muted-foreground/50" aria-label="Not offered">
        <Minus className="size-4" />
      </span>
    );
  }
  const text = cell.href ? (
    <Link href={cell.href} className="underline decoration-border underline-offset-4 hover:text-brand">
      {cell.text}
    </Link>
  ) : (
    cell.text
  );
  return (
    <span className={cn("inline-flex items-start gap-1.5", highlight ? "text-foreground" : "text-muted-foreground")}>
      {cell.check && (
        <span
          className={cn(
            "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
            highlight ? "bg-brand-soft text-brand" : "bg-muted text-foreground/70"
          )}
          aria-label="Yes"
        >
          <Check className="size-2.5" strokeWidth={3} />
        </span>
      )}
      {text && <span>{text}</span>}
    </span>
  );
}

/* Feature-by-feature table grouped by section, Datadrew column highlighted. */
export function FeatureTable({ groups, competitor, logo }: { groups: FeatureGroup[]; competitor: string; logo: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full min-w-[40rem] text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
            <th className="px-5 py-3 font-medium">Feature</th>
            <th className="bg-brand-soft/40 px-5 py-3 font-semibold text-brand">
              <BrandLabel logo={DATADREW_MARK} name="Datadrew" size="sm" />
            </th>
            <th className="px-5 py-3 font-medium">
              <BrandLabel logo={logo} name={competitor} size="sm" />
            </th>
          </tr>
        </thead>
        <tbody>
          {groups.map((g) => (
            <GroupRows key={g.title} group={g} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GroupRows({ group }: { group: FeatureGroup }) {
  return (
    <>
      <tr className="border-y border-border bg-muted/50">
        <th
          colSpan={3}
          scope="colgroup"
          className="px-5 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
        >
          {group.title}
        </th>
      </tr>
      {group.rows.map((r) => (
        <tr key={r.feature} className="border-b border-border/60 last:border-0">
          <td className="w-[36%] px-5 py-3.5 align-top">
            <span className="font-medium">{r.feature}</span>
            {r.desc && <span className="mt-0.5 block text-xs text-muted-foreground">{r.desc}</span>}
          </td>
          <td className="bg-brand-soft/20 px-5 py-3.5 align-top">
            <CellContent cell={r.datadrew} highlight />
          </td>
          <td className="px-5 py-3.5 align-top">
            <CellContent cell={r.competitor} />
          </td>
        </tr>
      ))}
    </>
  );
}

/* "Choose Datadrew if / Choose X if" two-column lists. */
export function FitColumns({ c }: { c: Comparison }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-brand/30 bg-brand/5 p-6">
        <h3 className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <BrandMark logo={DATADREW_MARK} name="Datadrew" size="md" />
          Choose Datadrew if
        </h3>
        <CheckList items={c.fit.datadrew} className="mt-4" />
      </div>
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <BrandMark logo={c.logo} name={c.competitor} size="md" />
          Choose {c.competitor} if
        </h3>
        <ul className="mt-4 flex flex-col gap-2.5">
          {c.fit.competitor.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-foreground/70">
                <Check className="size-3" strokeWidth={3} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* Two-card "approach" contrast (only Triple Whale has it). */
export function ApproachCards({ c }: { c: Comparison }) {
  if (!c.approach) return null;
  const a = c.approach;
  return (
    <Section eyebrow={a.eyebrow} headline={a.headline} subhead={a.subhead} align="center">
      <div className="grid gap-4 md:grid-cols-2">
        {a.cards.map((card, i) => {
          const ours = i === a.cards.length - 1;
          return (
            <div
              key={card.step}
              className={cn(
                "flex flex-col gap-3 rounded-2xl border p-6",
                ours ? "border-brand/30 bg-brand/5" : "border-border bg-card"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">{card.step}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {card.kicker}
                </span>
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{card.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{card.body}</p>
              <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                <span
                  className={cn(
                    "rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider",
                    ours ? "bg-brand-soft text-brand" : "bg-muted text-muted-foreground"
                  )}
                >
                  {card.footer}
                </span>
                {card.href && card.linkLabel && (
                  <Link href={card.href} className="inline-flex items-center gap-1 text-sm font-medium hover:text-brand">
                    {card.linkLabel}
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* Real Shopify App Store reviews, rendered as plain quote cards. */
export function ReviewCards({ headline = "What merchants say after switching" }: { headline?: string }) {
  return (
    <Section eyebrow="Reviews" headline={headline} subhead={reviewsLine} align="center">
      <ul className="grid gap-4 md:grid-cols-3">
        {comparisonReviews.map((r) => (
          <li key={r.name} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
            <span className="flex gap-0.5 text-brand" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </span>
            <blockquote className="text-balance text-base leading-relaxed">&ldquo;{r.quote}&rdquo;</blockquote>
            <figcaption className="mt-auto text-sm">
              <span className="font-medium">{r.name}</span>
              <span className="block text-xs text-muted-foreground">{r.role}</span>
            </figcaption>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* Honest "where X is the better buy" list. */
export function BetterBuy({ c }: { c: Comparison }) {
  if (!c.betterBuy) return null;
  const b = c.betterBuy;
  return (
    <Section eyebrow="The honest part" headline={b.headline} subhead={b.subhead} narrow>
      <ol className="grid gap-4 md:grid-cols-3">
        {b.items.map((item, i) => (
          <li key={item.title} className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-6">
            <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* Cross-links to the other comparisons + the alternatives guide. */
export function KeepComparing({ c }: { c: Comparison }) {
  return (
    <Section
      eyebrow="Keep comparing"
      headline="Still shortlisting?"
      subhead="These go deeper on the wider market and the other tools brands weigh against Datadrew."
      narrow
    >
      <ul className="grid gap-4 md:grid-cols-3">
        {c.keepComparing.map((k) => (
          <li key={k.href}>
            <Link
              href={k.href}
              className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-muted/40"
            >
              <div className="flex items-center justify-between">
                <Eyebrow className="text-muted-foreground">{k.kind}</Eyebrow>
                {k.kind === "Comparison" && competitorLogo(k.href) && (
                  <BrandMark logo={competitorLogo(k.href)!} name={k.title.replace(/^Datadrew vs /, "")} size="lg" />
                )}
              </div>
              <h3 className="text-base font-semibold tracking-tight">{k.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{k.body}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium group-hover:text-brand">
                Read
                <ArrowUpRight className="size-3.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
