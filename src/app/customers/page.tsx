import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/content/case-studies";
import { coverGradients } from "@/content/blog";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FinalCta } from "@/components/site/final-cta";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Customer stories",
  description: "How Shopify brands and agencies run their daily numbers through Drew.",
};

export default function CustomersIndex() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-5 pt-32 md:px-8 md:pt-40">
        <header className="flex flex-col gap-4 md:max-w-2xl">
          <span className="inline-flex w-fit items-center text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            Customer stories
          </span>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Brands that run on the numbers.
          </h1>
          <p className="text-pretty text-base text-muted-foreground md:text-lg">
            Real usage, real findings. Every number below comes from the merchant's own Drew
            conversations.
          </p>
        </header>

        <section aria-label="Stories" className="mt-12 grid gap-6 md:grid-cols-2">
          {caseStudies.map((c) => {
            const gradient = coverGradients[c.gradient] ?? coverGradients["card-grad-1"];
            const className = cn(
              "group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-colors",
              c.published && "hover:bg-muted/40"
            );
            const inner = (
              <>
                <div className={cn("relative aspect-[16/7] bg-gradient-to-br", gradient)}>
                  <div className="absolute inset-0 bg-grid-fade opacity-70" />
                  <div className="absolute inset-x-6 bottom-5 flex items-end justify-between">
                    <div>
                      <p className="text-lg font-bold uppercase tracking-[0.18em]">{c.brand}</p>
                      <p className="text-xs text-muted-foreground">{c.descriptor}</p>
                    </div>
                    <span className="rounded-full border border-border bg-background/80 px-2.5 py-1 text-xs font-medium backdrop-blur">
                      {c.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-balance text-xl leading-snug tracking-tight text-muted-foreground md:text-2xl">
                    {c.headline[0]}
                    <span className="font-semibold text-foreground">{c.headline[1]}</span>
                    {c.headline[2]}
                  </p>
                  <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
                    {c.metrics.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <dd className="font-mono text-2xl font-medium tracking-tight tabular text-foreground">
                          {m.value}
                        </dd>
                        <dt className="mt-1 text-xs leading-snug text-muted-foreground">{m.label}</dt>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-7 flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {c.published ? "Read the full story" : "Full story coming soon"}
                    </span>
                    {c.published && (
                      <span className="flex size-10 items-center justify-center rounded-full border border-border bg-background transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        <ArrowUpRight className="size-4" />
                      </span>
                    )}
                  </div>
                </div>
              </>
            );
            return c.published ? (
              <Link key={c.slug} href={`/customers/${c.slug}`} className={className}>
                {inner}
              </Link>
            ) : (
              <div key={c.slug} className={className}>
                {inner}
              </div>
            );
          })}
        </section>
      </main>
      <div className="mt-8">
        <FinalCta />
      </div>
      <Footer />
    </>
  );
}
