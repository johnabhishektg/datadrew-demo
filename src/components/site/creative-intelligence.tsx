import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, TrendingUp, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { creativeIntelligence } from "@/content/site";
import { cn } from "@/lib/utils";

type Card = (typeof creativeIntelligence.cards)[number];

const verdictStyle: Record<string, string> = {
  Scale: "bg-brand-soft text-brand border-brand/30",
  Iterate: "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-400/15 dark:text-amber-300 dark:border-amber-400/30",
  Kill: "bg-destructive/10 text-destructive border-destructive/30",
  Wait: "bg-muted text-muted-foreground border-border",
};

function VerdictTag({ verdict, className }: { verdict: string; className?: string }) {
  const Icon = verdict === "Iterate" ? RefreshCw : TrendingUp;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-sm font-semibold shadow-sm",
        verdictStyle[verdict] ?? verdictStyle.Wait,
        className
      )}
    >
      {verdict}
      <Icon className="size-3.5" />
    </span>
  );
}

function CreativeCard({ card, className, style }: { card: Card; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={cn(
        "absolute w-[50%] max-w-[260px] overflow-visible rounded-2xl border border-border bg-card shadow-[0_18px_50px_-18px_rgba(0,0,0,0.35)]",
        className
      )}
      style={style}
    >
      <VerdictTag verdict={card.verdict} className="absolute -left-4 -top-3 z-10 -rotate-6" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-2xl">
        <Image src={card.image} alt={card.alt} fill sizes="260px" className="object-cover" loading="eager" />
      </div>
      <div className="p-3.5 sm:p-4">
        <p className="text-sm font-semibold tracking-tight sm:text-base">{card.name}</p>
        <dl className="mt-2.5 space-y-1.5 text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Spend</dt>
            <dd className="font-medium tabular text-brand">{card.spend}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">ROAS</dt>
            <dd className="font-medium tabular text-brand">{card.roas}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">CPA</dt>
            <dd className="font-medium tabular text-brand">{card.cpa}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="whitespace-nowrap text-muted-foreground">Convert Score</dt>
            <dd className="flex items-center gap-2">
              <span className="h-1 w-10 overflow-hidden rounded-full bg-muted sm:w-16">
                <span className="block h-full rounded-full bg-brand" style={{ width: `${card.score}%` }} />
              </span>
              <span className="font-semibold tabular">{card.score}</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export function CreativeIntelligence() {
  const c = creativeIntelligence;
  const [a, b, d] = c.cards;
  return (
    <section id="creative-intelligence" className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-10">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-brand" />
            {c.eyebrow}
            <span className="ml-1 rounded-full bg-brand px-1.5 py-px text-[10px] font-semibold text-brand-foreground">New</span>
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            {c.headline[0]}
            <br />
            <span className="text-muted-foreground">{c.headline[1]}</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">{c.subhead}</p>
          <ul className="mt-6 space-y-3">
            {c.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm md:text-[15px]">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="mt-8 rounded-lg">
            <Link href={c.cta.href}>
              {c.cta.label}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Fanned creative cards */}
        <div className="relative mx-auto h-[36rem] w-full max-w-[560px] sm:h-[40rem]">
          <div
            aria-hidden
            className="absolute inset-0 rounded-3xl"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 45%, color-mix(in oklch, var(--brand) 14%, transparent), transparent 75%)",
            }}
          />
          <CreativeCard card={b} className="left-[25%] top-0 -rotate-3 opacity-95" />
          <CreativeCard card={a} className="left-0 top-[12%] -rotate-[5deg]" />
          <CreativeCard card={d} className="right-0 top-[24%] rotate-[4deg]" />
          <span className="absolute bottom-2 left-0 rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            example data
          </span>
        </div>
      </div>
    </section>
  );
}
