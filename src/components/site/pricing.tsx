import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { pricing } from "@/content/site";
import { cn } from "@/lib/utils";
import { Container, SectionHeader } from "./section-header";

export function Pricing() {
  return (
    <Container id="pricing" className="py-16 md:py-24">
      <SectionHeader eyebrow={pricing.eyebrow} headline={pricing.headline} subhead={pricing.subhead} />
      <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
        {pricing.tiers.map((t) => (
          <div
            key={t.name}
            className={cn(
              "relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8",
              t.highlight && "border-brand/40 shadow-[0_20px_60px_-30px_color-mix(in_oklch,var(--brand)_60%,transparent)]"
            )}
          >
            {t.highlight && <BorderBeam size={160} duration={8} colorFrom="var(--brand)" colorTo="transparent" />}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{t.name}</h3>
              {t.highlight && (
                <span className="rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-semibold text-brand-foreground">
                  Popular
                </span>
              )}
            </div>
            <p className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight tabular">{t.price}</span>
              <span className="text-sm text-muted-foreground">{t.period}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
            <Button
              asChild
              variant={t.highlight ? "default" : "outline"}
              className={cn("mt-6 w-full rounded-lg", t.highlight && "bg-brand text-brand-foreground hover:bg-brand/90")}
            >
              {t.href.startsWith("/") ? <Link href={t.href}>{t.cta}</Link> : <a href={t.href}>{t.cta}</a>}
            </Button>
            <ul className="mt-6 space-y-3 border-t border-border pt-6">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground">{pricing.finePrint}</p>
    </Container>
  );
}
