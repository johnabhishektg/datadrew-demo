import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { adsLoop } from "@/content/site";
import { Container, SectionHeader } from "./section-header";

/* Server-rendered: the five daily workflows as real DOM (parity-audit item 8). */
export function AdsLoop() {
  return (
    <Container id="ads-loop" className="py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:gap-16">
        <div className="md:sticky md:top-28 md:self-start">
          <SectionHeader
            eyebrow={adsLoop.eyebrow}
            headline={adsLoop.headline}
            subhead={adsLoop.subhead}
            align="left"
          />
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{adsLoop.coda}</p>
        </div>
        <ol className="divide-y divide-border border-y border-border">
          {adsLoop.steps.map((s, i) => (
            <li key={s.title} className="flex gap-5 py-6 md:gap-8">
              <span className="pt-0.5 font-mono text-sm font-medium tabular-nums text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{s.body}</p>
                <Link
                  href={s.href}
                  className="mt-1 inline-flex w-fit items-center gap-1 text-sm font-medium text-brand hover:underline"
                >
                  {adsLoop.linkLabel}
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Container>
  );
}
