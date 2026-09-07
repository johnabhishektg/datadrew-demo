import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { appStore, hero, site } from "@/content/site";
import { HeroVisual } from "./hero-visual";
import { ShopifyBadge } from "./shopify-badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-12 md:pt-44 md:pb-20">
      {/* Backdrop: faint grid + brand glow, in the template's idiom */}
      <div aria-hidden className="bg-grid-fade pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl dark:opacity-25"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--brand) 40%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-5 text-center md:px-8">
        <BlurFade delay={0.05}>
          <a
            href={appStore.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Rated ${appStore.rating.toFixed(1)} out of 5 from ${appStore.reviews} reviews on the Shopify App Store`}
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/70 py-1.5 px-3.5 text-sm shadow-sm backdrop-blur transition-colors hover:bg-muted"
          >
            <span aria-hidden className="flex items-center gap-0.5 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </span>
            <span className="font-medium">{appStore.rating.toFixed(1)}</span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              · {appStore.reviews} reviews on
              <Image
                src="/integrations/shopify-logo.svg"
                alt=""
                width={18}
                height={18}
                className="size-[18px] shrink-0"
              />
              <span className="font-medium text-foreground">Shopify App Store</span>
            </span>
          </a>
        </BlurFade>

        <BlurFade delay={0.15}>
          <h1 className="mx-auto mt-8 max-w-4xl text-balance text-5xl font-semibold tracking-tighter md:text-6xl lg:text-7xl">
            {hero.headline[0]}{" "}
            <span className="text-gradient-brand">{hero.headline[1]}</span>
          </h1>
        </BlurFade>

        <BlurFade delay={0.25}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
            {hero.subhead}
          </p>
        </BlurFade>

        <BlurFade delay={0.35}>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 rounded-lg px-6 text-base">
              <a href={site.appUrl}>
                {hero.primaryCta.label}
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 rounded-lg px-6 text-base">
              <Link href="/#product">{hero.secondaryCta.label}</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{hero.finePrint}</p>
          <div className="mt-2 flex justify-center">
            <ShopifyBadge height={40} />
          </div>
        </BlurFade>

        <div className="mt-14 w-full animate-in fade-in slide-in-from-bottom-8 fill-mode-both duration-1000 delay-500 md:mt-20">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
