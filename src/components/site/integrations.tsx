import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  featuredIntegrations,
  integrationsSection,
  type Integration,
} from "@/content/integrations";
import { cn } from "@/lib/utils";
import { Container } from "./section-header";

/* One brand mark. Square marks fill a fixed box; wide lockups get more width. */
export function IntegrationLogo({
  item,
  size = "md",
  className,
}: {
  item: Integration;
  size?: "md" | "lg";
  className?: string;
}) {
  const box = size === "lg" ? 40 : 32;
  return (
    <Image
      src={item.logo}
      alt={`${item.name} logo`}
      width={item.wide ? box * 2 : box}
      height={box}
      className={cn(
        "object-contain",
        size === "lg" ? "h-10" : "h-8",
        item.wide ? (size === "lg" ? "w-20" : "w-16") : size === "lg" ? "w-10 rounded-lg" : "w-8 rounded-md",
        className
      )}
    />
  );
}

/* Homepage section — text left, 3×2 logo grid right (Magic UI "Agent" pattern). */
export function Integrations() {
  const s = integrationsSection;
  return (
    <Container id="integrations" className="py-16 md:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <BlurFade inView>
          <div className="flex flex-col items-start gap-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              {s.eyebrow}
            </span>
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              {s.headline[0]}
              <br className="hidden sm:block" /> {s.headline[1]}
            </h2>
            <p className="max-w-md text-pretty text-base text-muted-foreground md:text-lg">{s.subhead}</p>
            <Link
              href={s.cta.href}
              className="group inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-brand"
            >
              {s.cta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.1}>
          <ul
            aria-label="Featured integrations"
            className="grid grid-cols-3 overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
          >
            {featuredIntegrations.slice(0, 6).map((item, i) => (
              <li
                key={item.slug}
                className={cn(
                  "border-border",
                  i % 3 !== 2 && "border-r",
                  i < 3 && "border-b"
                )}
              >
                <Link
                  href={`/integrations#${item.slug}`}
                  title={item.name}
                  className="group flex aspect-square flex-col items-center justify-center gap-3 transition-colors hover:bg-muted/50 sm:aspect-[4/3]"
                >
                  <span className="flex size-16 items-center justify-center rounded-2xl bg-white">
                    <IntegrationLogo item={item} size="lg" />
                  </span>
                  <span className="text-xs font-medium text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </BlurFade>
      </div>
    </Container>
  );
}
