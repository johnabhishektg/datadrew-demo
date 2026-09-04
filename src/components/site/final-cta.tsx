import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { appStore, finalCta } from "@/content/site";

/* Closing CTA: soft brand-tinted card, trust line (rating · Shopify App Store ·
 * reviews · brands), one big headline, two pill buttons. */
function Dot() {
  return <span aria-hidden className="text-muted-foreground/60">•</span>;
}

export function FinalCta() {
  const t = finalCta.trust;
  return (
    <section className="px-5 py-16 md:px-8 md:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0B0B0B] text-white">
        <FlickeringGrid
          className="absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
          squareSize={4}
          gridGap={6}
          color="oklch(0.82 0.17 155)"
          maxOpacity={0.5}
          flickerChance={0.08}
        />
        <div className="relative z-10 flex flex-col items-center px-6 py-16 text-center md:py-24">
          <p className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-sm text-white/70 md:text-[15px]">
            <span>{t.lead}</span>
            <Dot />
            <a
              href={appStore.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white"
              aria-label={`Rated ${appStore.rating.toFixed(0)} out of 5 on the Shopify App Store`}
            >
              <span className="font-medium">{appStore.rating.toFixed(0)}/5</span>
              <Star className="size-3.5 fill-current text-white" aria-hidden />
              <span>on</span>
              <Image
                src="/integrations/shopify-logo.svg"
                alt=""
                width={18}
                height={18}
                className="size-[18px]"
              />
              <span>
                <span className="font-semibold tracking-tight text-white">shopify</span>{" "}
                <span className="italic text-white/60">app store</span>
              </span>
            </a>
            <Dot />
            <span>
              {appStore.reviews} {t.reviewsLabel}
            </span>
            <Dot />
            <span>{t.trailing}</span>
          </p>

          <h2 className="mt-6 max-w-3xl text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            {finalCta.headline}
          </h2>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full bg-[oklch(0.72_0.16_155)] px-10 text-base font-medium text-white shadow-[0_8px_28px_-8px_oklch(0.72_0.16_155)] hover:bg-[oklch(0.76_0.16_155)]"
            >
              <a href={appStore.url} target="_blank" rel="noopener noreferrer">
                {finalCta.primaryCta}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-full border-white/20 bg-white/5 px-10 text-base font-medium text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/#how-it-works">{finalCta.secondaryCta}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
