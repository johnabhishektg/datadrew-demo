import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: React.ReactNode };

/* FAQ rendered with native <details>/<summary> so every answer is in the
 * pre-rendered HTML (Radix Accordion unmounts closed content, which hid all
 * FAQ answers from crawlers and AI engines — parity-audit item 8). `name`
 * makes the group exclusive: opening one item closes the others. */
export function FaqList({ items, name = "faq", className }: { items: FaqItem[]; name?: string; className?: string }) {
  return (
    <div className={cn("mx-auto max-w-3xl", className)}>
      {items.map((item) => (
        <details key={item.q} name={name} className="group border-b border-border last:border-b-0">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-md py-4 text-left text-base font-medium outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="pb-4 text-sm leading-relaxed text-muted-foreground motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1 motion-safe:duration-200">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}
