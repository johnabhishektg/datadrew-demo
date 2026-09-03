import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { coverGradients } from "@/content/blog";
import { site } from "@/content/site";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return caseStudies.filter((c) => c.published).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const c = getCaseStudy((await params).slug);
  if (!c) return {};
  return {
    title: `${c.brand} — customer story`,
    description: c.headline.join(""),
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const c = getCaseStudy((await params).slug);
  if (!c) notFound();
  const gradient = coverGradients[c.gradient] ?? coverGradients["card-grad-1"];

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-5 pt-32 md:px-8 md:pt-36">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/customers" className="transition-colors hover:text-foreground">
            Customers
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground/80">{c.brand}</span>
        </nav>

        {/* Hero */}
        <header className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold uppercase tracking-[0.18em]">{c.brand}</span>
              <span className="rounded-full border border-border bg-muted/60 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {c.category}
              </span>
            </div>
            <h1 className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              {c.headline[0]}
              <span className="text-brand">{c.headline[1]}</span>
              {c.headline[2]}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {c.summary}
            </p>
          </div>
          <aside className="self-start rounded-2xl border border-border bg-muted/30 p-6">
            <dl className="flex flex-col gap-4 text-sm">
              {c.facts.map((f) => (
                <div key={f.label}>
                  <dt className="label-mono text-muted-foreground">{f.label}</dt>
                  <dd className="mt-1 leading-snug">{f.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </header>

        {/* Metrics band */}
        <section
          aria-label="Results"
          className={cn("mt-12 overflow-hidden rounded-3xl border border-border bg-gradient-to-br", gradient)}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-grid-fade opacity-60" />
            <dl className="relative grid gap-px sm:grid-cols-2 lg:grid-cols-4">
              {c.metrics.map((m) => (
                <div key={m.label} className="bg-background/70 p-6 backdrop-blur-sm md:p-8">
                  <dd className="font-mono text-3xl font-medium tracking-tight tabular md:text-4xl">
                    {m.value}
                  </dd>
                  <dt className="mt-2 text-sm leading-snug text-muted-foreground">{m.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Story */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,42rem)_1fr] lg:gap-16">
          <article className="flex flex-col gap-10">
            {c.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-2xl font-semibold tracking-tight">{s.heading}</h2>
                <div className="mt-4 flex flex-col gap-4 text-[1.0625rem] leading-[1.75] text-foreground/85">
                  {s.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {s.bullets && (
                    <ul className="flex flex-col gap-2.5">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-[0.72em] size-1.5 shrink-0 rounded-full bg-brand" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}

            {c.roles && (
              <section>
                <h2 className="text-2xl font-semibold tracking-tight">How the team uses it</h2>
                <div className="mt-5 overflow-hidden rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <tbody>
                      {c.roles.map((r) => (
                        <tr key={r.role} className="border-b border-border/60 last:border-0">
                          <th scope="row" className="w-36 px-4 py-3 text-left align-top font-medium">
                            {r.role}
                          </th>
                          <td className="px-4 py-3 text-foreground/85">{r.uses}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-6">
              {c.askDrew && (
                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="label-mono text-brand">What they ask Drew</p>
                  <p className="mt-1 text-xs text-muted-foreground">Paraphrased from real conversations.</p>
                  <ul className="mt-4 flex flex-col gap-3">
                    {c.askDrew.map((q) => (
                      <li key={q} className="rounded-xl bg-muted/50 px-3.5 py-3 text-sm leading-snug">
                        “{q}”
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="rounded-2xl border border-border bg-muted/30 p-5">
                <p className="text-sm font-medium leading-snug">Run the same daily check on your store.</p>
                <Button asChild size="sm" className="mt-4 w-full rounded-lg">
                  <a href={site.appUrl}>Start free</a>
                </Button>
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile "ask Drew" */}
        {c.askDrew && (
          <section className="mt-12 rounded-2xl border border-border bg-card p-5 lg:hidden">
            <p className="label-mono text-brand">What they ask Drew</p>
            <ul className="mt-4 flex flex-col gap-3">
              {c.askDrew.map((q) => (
                <li key={q} className="rounded-xl bg-muted/50 px-3.5 py-3 text-sm leading-snug">
                  “{q}”
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="mt-16 max-w-[42rem]">
          <div className="rounded-2xl border border-border bg-card p-7">
            <p className="label-mono text-brand">From the product</p>
            <p className="mt-3 text-xl font-semibold leading-snug tracking-tight">
              One prompt across Meta, Google, GA4, Shopify and inventory.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Drew answers &ldquo;why is revenue down?&rdquo; with the join, not five tabs. Free to
              start.
            </p>
            <div className="mt-5 flex gap-3">
              <Button asChild className="rounded-lg">
                <a href={site.appUrl}>Start free</a>
              </Button>
              <Button asChild variant="outline" className="rounded-lg">
                <Link href="/customers">All stories</Link>
              </Button>
            </div>
          </div>
        </footer>
        <div className="h-16" />
      </main>
      <Footer />
    </>
  );
}
