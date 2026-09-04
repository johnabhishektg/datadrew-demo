import Image from "next/image";
import { logoWall, wallBrands } from "@/content/brand-wall";
import { Container } from "./section-header";

/* Customer logo wall: monochrome marks that return to full colour on hover. */
export function LogoWall() {
  const brands = wallBrands.filter((b) => b.show);
  return (
    <Container id="customers" className="py-16 md:py-24">
      <p className="flex flex-wrap items-center justify-center gap-x-2 text-center text-base font-medium text-foreground md:text-lg">
        <span>{logoWall.lead}</span>
        <Image
          src="/integrations/shopify-logo.svg"
          alt="Shopify"
          width={28}
          height={28}
          className="size-7 md:size-8"
        />
        <span>{logoWall.trail}</span>
      </p>

      <ul
        aria-label="Brands using Datadrew"
        className="mx-auto mt-12 grid max-w-6xl grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-4 md:mt-16 md:gap-x-10 lg:grid-cols-7"
      >
        {brands.map((b) => (
          <li key={b.slug} className="flex items-center justify-center">
            <Image
              src={b.logo}
              alt={b.name}
              title={b.name}
              width={b.width}
              height={b.height}
              className="h-7 w-auto max-w-[120px] object-contain brightness-0 transition-[filter,opacity] duration-300 hover:brightness-100 dark:invert dark:hover:invert-0 md:h-8 md:max-w-[136px]"
            />
          </li>
        ))}
      </ul>
    </Container>
  );
}
