import { appStore, finalCta } from "@/content/site";
import { DarkCta } from "./dark-cta";

/* Homepage closing CTA — the shared DarkCta card with the site-wide copy. */
export function FinalCta() {
  return (
    <DarkCta
      headline={finalCta.headline}
      primary={{ label: finalCta.primaryCta, href: appStore.url }}
      secondary={{ label: finalCta.secondaryCta, href: "/#how-it-works" }}
    />
  );
}
