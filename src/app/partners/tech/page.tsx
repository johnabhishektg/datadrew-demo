import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CtaButton } from "@/components/site/blocks";
import { DarkCta } from "@/components/site/dark-cta";
import { PageShell, PageHeader } from "@/components/site/page-shell";
import { JsonLd, breadcrumbLd } from "@/components/site/structured-data";
import { techPartners } from "@/content/partners";

export const metadata: Metadata = {
  title: techPartners.meta.title,
  description: techPartners.meta.description,
  alternates: { canonical: "/partners/tech" },
};

export default function TechPartnersPage() {
  const p = techPartners;
  return (
    <PageShell cta={false}>
      <JsonLd
        data={breadcrumbLd([
          { name: "Partners", path: "/partners" },
          { name: "Tech Partners", path: "/partners/tech" },
        ])}
      />
      <PageHeader eyebrow={p.eyebrow} headline={p.headline} subhead={p.subhead} crumbs={[{ label: "Partners", href: "/partners" }, { label: "Tech Partners" }]} />

      {/* Matchmaking */}
      <div className="mx-auto w-full max-w-6xl px-5 pt-10 md:px-8 md:pt-14">
        <div className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex items-center gap-4">
            <span className="relative size-14 shrink-0 overflow-hidden rounded-full bg-muted">
              <Image src={p.matchmaking.photo} alt={p.matchmaking.name} fill sizes="56px" className="object-cover" />
            </span>
            <div>
              <h2 className="text-lg font-semibold tracking-tight">{p.matchmaking.headline}</h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">{p.matchmaking.body}</p>
            </div>
          </div>
          <CtaButton href={p.matchmaking.href} className="shrink-0">
            {p.matchmaking.cta}
          </CtaButton>
        </div>
      </div>

      {/* Partner grid */}
      <div className="mx-auto w-full max-w-6xl px-5 pt-10 md:px-8 md:pt-14">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.items.map((t) => {
            const inner = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white">
                    <Image src={t.logo} alt={`${t.name} logo`} width={48} height={48} className="size-10 object-contain" />
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-semibold tracking-tight">{t.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                </div>
                <span className="mt-auto w-fit rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{t.tag}</span>
              </>
            );
            const cls = "group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-muted/40";
            return (
              <li key={t.name}>
                {t.external ? (
                  <a href={t.href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {inner}
                  </a>
                ) : (
                  <Link href={t.href} className={cls}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <DarkCta headline={p.cta.headline} subhead={p.cta.body} primary={p.cta.primary} secondary={p.cta.secondary} />
    </PageShell>
  );
}
