import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { customerStories } from "@/content/site";
import { cn } from "@/lib/utils";
import { Container } from "./section-header";

function Wordmark({ brand }: { brand: string }) {
  // Text wordmarks until licensed logos are supplied.
  return (
    <p className="text-lg font-bold uppercase tracking-[0.18em] text-foreground">
      {brand}
    </p>
  );
}

export function CustomerStories() {
  const { headline, stories } = customerStories;
  return (
    <Container id="stories" className="py-16 md:py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5 text-brand" />
          {customerStories.eyebrow}
        </span>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          {headline[0]}
          <br className="hidden md:block" /> {headline[1]}
        </h2>
      </div>

      {/* Category chips + "all stories" */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {customerStories.categories.map((c, i) => (
          <span
            key={c}
            className={cn(
              "rounded-lg px-3.5 py-2 text-sm",
              i === 0
                ? "border border-border bg-background font-medium shadow-sm"
                : "text-muted-foreground"
            )}
          >
            {c}
          </span>
        ))}
        <span className="mx-2 hidden h-6 w-px bg-border sm:block" />
        <Button asChild size="sm" className="rounded-lg bg-brand text-brand-foreground hover:bg-brand/90">
          <Link href={customerStories.allHref}>{customerStories.allLabel}</Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {stories.map((s) => (
          <Link
            key={s.id}
            href={s.href}
            className="group flex flex-col justify-between rounded-3xl border border-border bg-muted/30 p-7 transition-colors hover:bg-muted/60 md:p-9"
          >
            <div>
              <Wordmark brand={s.brand} />
              <p className="mt-1.5 text-xs text-muted-foreground">{s.descriptor}</p>
            </div>
            <p className="mt-16 text-balance text-2xl leading-snug tracking-tight text-muted-foreground md:mt-24 md:text-[1.7rem]">
              {s.headline[0]}
              <span className="font-semibold text-foreground">{s.headline[1]}</span>
              {s.headline[2]}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.proof}</p>
            <div className="mt-10 flex items-center justify-between">
              <span className="text-sm font-medium">Read the full story</span>
              <span className="flex size-11 items-center justify-center rounded-full border border-border bg-background transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
