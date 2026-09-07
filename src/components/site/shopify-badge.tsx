import Image from "next/image";
import { appStore } from "@/content/site";
import { cn } from "@/lib/utils";

/* Official "Available on Shopify App Store" badge, per
 * shopify.dev/docs/apps/launch/marketing/shopify-brand-assets: unaltered
 * artwork, ≥30px tall, clear space of half its height, links to the listing.
 * Light theme shows the black-on-white variant, dark theme the white-on-black
 * (Shopify's preferred) one. Native artwork is 166×44. */
export function ShopifyBadge({ height = 44, className }: { height?: number; className?: string }) {
  const width = Math.round((height * 166) / 44);
  const pad = Math.round(height / 2);
  return (
    <a
      href={appStore.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Available on the Shopify App Store"
      className={cn("inline-flex shrink-0", className)}
      style={{ padding: pad }}
    >
      <Image
        src="/badges/shopify-app-store-light.svg"
        alt="Available on Shopify App Store"
        width={width}
        height={height}
        className="block dark:hidden"
        style={{ height, width }}
      />
      <Image
        src="/badges/shopify-app-store-dark.svg"
        alt="Available on Shopify App Store"
        width={width}
        height={height}
        className="hidden dark:block"
        style={{ height, width }}
      />
    </a>
  );
}
