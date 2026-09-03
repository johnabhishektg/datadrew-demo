import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { finalCta, site } from "@/content/site";

export function FinalCta() {
  return (
    <section className="px-5 py-16 md:px-8 md:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-muted/30">
        <FlickeringGrid
          className="absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
          squareSize={4}
          gridGap={6}
          color="oklch(0.56 0.15 155)"
          maxOpacity={0.35}
          flickerChance={0.08}
        />
        <div className="relative z-10 flex flex-col items-center px-6 py-20 text-center md:py-28">
          <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            {finalCta.headline}
          </h2>
          <p className="mt-4 max-w-xl text-balance text-muted-foreground md:text-lg">{finalCta.subhead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 rounded-lg px-6 text-base">
              <a href={site.appUrl}>
                {finalCta.primaryCta}
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 rounded-lg px-6 text-base">
              <Link href="/#product">{finalCta.secondaryCta}</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Cancel anytime, no questions asked.</p>
        </div>
      </div>
    </section>
  );
}
