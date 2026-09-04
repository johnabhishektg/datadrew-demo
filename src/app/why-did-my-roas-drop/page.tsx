import type { Metadata } from "next";
import { OG_IMAGE_PATH } from "@/components/site/structured-data";
import { PageHeader, PageShell } from "@/components/site/page-shell";
import { CtaButton, FaqBlock, FeatureGrid, Section } from "@/components/site/blocks";
import { DiagnosticLadder, ManualTabs, SampleBrief } from "@/components/site/roas-blocks";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/site/structured-data";
import { roasDrop as r } from "@/content/roas-drop";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${r.title} | ${site.name}` },
  description: r.metaDescription,
  alternates: { canonical: "/why-did-my-roas-drop" },
  openGraph: {
    title: r.title,
    description: r.metaDescription,
    url: "/why-did-my-roas-drop",
    images: [{ url: OG_IMAGE_PATH, alt: r.title }],
  },
};

function Ctas() {
  return (
    <>
      {r.finalCta.ctas.map((c) => (
        <CtaButton key={c.label} href={c.href} variant={"variant" in c ? c.variant : "default"}>
          {c.label}
        </CtaButton>
      ))}
    </>
  );
}

export default function RoasDropPage() {
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Why Did My ROAS Drop?",
      description:
        "The eight checks an experienced media buyer runs when ROAS falls, in the order that finds the cause — and how Datadrew's AI ads agent runs them daily.",
      url: `https://${site.domain}/why-did-my-roas-drop`,
    },
    breadcrumbLd([{ name: "Why did my ROAS drop?", path: "/why-did-my-roas-drop" }]),
    faqLd(r.faq.items),
  ];

  return (
    <PageShell>
      <JsonLd data={ld} />
      <PageHeader eyebrow={r.hero.eyebrow} headline={r.hero.headline} subhead={r.hero.subhead} align="center">
        <CtaButton href="https://app.datadrew.io/register">Get started for free</CtaButton>
        <CtaButton href="/book" variant="outline">
          Book a demo
        </CtaButton>
      </PageHeader>
      <div className="mx-auto mt-8 flex w-full max-w-6xl justify-center px-5 md:px-8">
        <p className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-border bg-card px-4 py-2 text-center text-sm text-muted-foreground">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-brand">
            {r.hero.promise.kicker}
          </span>
          <span>{r.hero.promise.text}</span>
        </p>
      </div>

      <Section eyebrow={r.manual.eyebrow} headline={r.manual.headline} subhead={r.manual.subhead} narrow>
        <ManualTabs />
      </Section>

      <Section eyebrow={r.ladder.eyebrow} headline={r.ladder.headline} subhead={r.ladder.subhead} narrow>
        <DiagnosticLadder />
      </Section>

      <Section eyebrow={r.brief.eyebrow} headline={r.brief.headline} subhead={r.brief.subhead} align="center">
        <SampleBrief className="mx-auto max-w-2xl" />
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          {r.brief.note}
        </p>
      </Section>

      <Section
        eyebrow={r.nothingWrong.eyebrow}
        headline={r.nothingWrong.headline}
        subhead={r.nothingWrong.subhead}
        narrow
      >
        <FeatureGrid items={r.nothingWrong.cases} />
      </Section>

      <FaqBlock
        items={r.faq.items}
        eyebrow={r.faq.eyebrow}
        headline={r.faq.headline}
        subhead={r.faq.subhead}
      />

      <Section align="center" className="pb-0">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">{r.finalCta.headline}</h2>
          <p className="text-pretty text-base text-muted-foreground md:text-lg">{r.finalCta.subhead}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Ctas />
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
