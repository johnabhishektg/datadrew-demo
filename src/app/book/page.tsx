import type { Metadata } from "next";
import { Check, Star } from "lucide-react";
import { BookForm } from "@/components/site/book-form";
import { CtaButton, Section } from "@/components/site/blocks";
import { PageShell, PageHeader } from "@/components/site/page-shell";
import { JsonLd, breadcrumbLd } from "@/components/site/structured-data";
import { book } from "@/content/company";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: book.meta.title,
  description: book.meta.description,
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <PageShell cta={false}>
      <JsonLd data={breadcrumbLd([{ name: "Book a Demo", path: "/book" }])} />
      <PageHeader eyebrow={book.eyebrow} headline={book.headline} subhead={book.subhead}>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {book.badges.map((b) => (
            <li key={b} className="inline-flex items-center gap-1.5">
              <Check className="size-3.5 text-brand" strokeWidth={3} /> {b}
            </li>
          ))}
        </ul>
      </PageHeader>

      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 pt-12 md:grid-cols-[1.4fr_1fr] md:px-8 md:pt-16">
        <section className="rounded-3xl border border-border bg-card p-6 md:p-8" aria-labelledby="book-form-title">
          <h2 id="book-form-title" className="text-2xl font-semibold tracking-tight">
            {book.form.headline}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{book.form.lead}</p>
          <div className="mt-6">
            <BookForm />
          </div>
        </section>

        <aside className="flex flex-col gap-4">
          <section className="rounded-3xl border border-border bg-card p-6 md:p-8" aria-labelledby="book-expect-title">
            <h3 id="book-expect-title" className="text-lg font-semibold tracking-tight">
              {book.expect.headline}
            </h3>
            <ol className="mt-5 flex flex-col gap-4">
              {book.expect.items.map((it, i) => (
                <li key={it.title} className="flex gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground font-mono text-[11px] font-semibold text-background">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{it.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <ul className="flex flex-col gap-4">
            {book.quotes.map((q) => (
              <li key={q.name} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex gap-0.5 text-brand" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed">&ldquo;{q.quote}&rdquo;</p>
                <p className="mt-3 text-sm font-medium">{q.name}</p>
                <p className="text-xs text-muted-foreground">{q.role}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <Section headline={book.selfServe.headline} subhead={book.selfServe.body} align="center" className="mt-8 border-t border-border">
        <div className="flex flex-wrap justify-center gap-3">
          <CtaButton href={site.appUrl}>{book.selfServe.primary}</CtaButton>
          <CtaButton href="/pricing" variant="outline">
            {book.selfServe.secondary}
          </CtaButton>
        </div>
      </Section>
    </PageShell>
  );
}
