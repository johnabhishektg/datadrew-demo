import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { contextEngine } from "@/content/site";
import { Container, SectionHeader } from "./section-header";

/* Server-rendered: the four intelligence areas Drew reasons from, each with
 * its deliverables in the HTML and a link to the /platform page. */
export function ContextEngine() {
  return (
    <Container id="context" className="py-16 md:py-24">
      <SectionHeader
        eyebrow={contextEngine.eyebrow}
        headline={contextEngine.headline}
        subhead={contextEngine.subhead}
      />
      <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
        {contextEngine.pillars.map((p) => (
          <article key={p.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 md:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{p.name}</span>
            <h3 className="text-balance text-xl font-semibold tracking-tight">{p.title}</h3>
            <ul className="flex flex-col gap-2.5">
              {p.items.map((it) => (
                <li key={it.k} className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">{it.k}:</span> {it.v}
                </li>
              ))}
            </ul>
            <Link
              href={p.href}
              className="mt-auto inline-flex w-fit items-center gap-1 pt-2 text-sm font-medium text-brand hover:underline"
            >
              {contextEngine.learnMore} {p.name}
              <ArrowRight className="size-3.5" />
            </Link>
          </article>
        ))}
      </div>
    </Container>
  );
}
