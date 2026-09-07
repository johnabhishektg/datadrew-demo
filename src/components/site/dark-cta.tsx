import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { appStore, finalCta } from "@/content/site";
import { cn } from "@/lib/utils";

/* The dark closing-CTA card from the homepage, reusable on secondary pages:
 * flickering brand grid, optional trust line (rating · Shopify App Store ·
 * reviews · brands), one big headline, optional subhead, two pill buttons. */

export type CtaLink = { label: string; href: string };

function Dot() {
  return <span aria-hidden className="text-white/40">•</span>;
}

function CtaAnchor({ link, children, className }: { link: CtaLink; children: React.ReactNode; className?: string }) {
  const external = /^https?:\/\//.test(link.href);
  return external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {children}
    </Link>
  );
}

export function TrustLine() {
  const t = finalCta.trust;
  return (
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
        <Image src="/integrations/shopify-logo.svg" alt="" width={18} height={18} className="size-[18px]" />
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
  );
}

export function DarkCta({
  headline,
  subhead,
  primary,
  secondary,
  trust = true,
  className,
}: {
  headline: string;
  subhead?: string;
  primary: CtaLink;
  secondary?: CtaLink;
  trust?: boolean;
  className?: string;
}) {
  return (
    <section className={cn("px-5 py-16 md:px-8 md:py-24", className)}>
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
          {trust && <TrustLine />}

          <h2
            className={cn(
              "max-w-3xl text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl lg:text-[3.5rem] lg:leading-[1.1]",
              trust && "mt-6"
            )}
          >
            {headline}
          </h2>
          {subhead && (
            <p className="mt-5 max-w-2xl text-balance text-base text-white/70 md:text-lg">{subhead}</p>
          )}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full bg-[oklch(0.72_0.16_155)] px-10 text-base font-medium text-white shadow-[0_8px_28px_-8px_oklch(0.72_0.16_155)] hover:bg-[oklch(0.76_0.16_155)]"
            >
              <CtaAnchor link={primary}>{primary.label}</CtaAnchor>
            </Button>
            {secondary && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-white/20 bg-white/5 px-10 text-base font-medium text-white hover:bg-white/10 hover:text-white"
              >
                <CtaAnchor link={secondary}>{secondary.label}</CtaAnchor>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
