import type { Metadata } from "next";
import { OG_IMAGE_PATH } from "@/components/site/structured-data";
import { PageHeader, PageShell } from "@/components/site/page-shell";
import { CtaButton, FaqBlock, FeatureGrid, Section, SimpleTable } from "@/components/site/blocks";
import { DiagnosticLadder, ManualTabs, SampleBrief } from "@/components/site/roas-blocks";
import { AUTHOR_PROFILES, JsonLd, LOGO_URL, ORG_ID, SITE_ID, breadcrumbLd, faqLd } from "@/components/site/structured-data";
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

const fmt = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${iso}T00:00:00Z`));

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
  const url = `https://${site.domain}/why-did-my-roas-drop/`;
  const profile = AUTHOR_PROFILES[r.author.name];
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      headline: r.title,
      description: r.metaDescription,
      datePublished: r.published,
      dateModified: r.updated,
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      isPartOf: { "@id": SITE_ID },
      image: [OG_IMAGE_PATH.startsWith("http") ? OG_IMAGE_PATH : `https://${site.domain}${OG_IMAGE_PATH}`],
      inLanguage: "en",
      author: {
        "@type": "Person",
        name: r.author.name,
        jobTitle: profile?.jobTitle ?? r.author.role,
        ...(profile?.sameAs ? { sameAs: profile.sameAs } : {}),
        worksFor: { "@id": ORG_ID },
      },
      publisher: { "@type": "Organization", "@id": ORG_ID, name: site.name, logo: { "@type": "ImageObject", url: LOGO_URL } },
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "#ladder-table"] },
    },
    breadcrumbLd([{ name: "Why did my ROAS drop?", path: "/why-did-my-roas-drop" }]),
    faqLd(r.faq.items),
  ];

  return (
    <PageShell>
      <JsonLd data={ld} />
      <PageHeader eyebrow={r.hero.eyebrow} headline={r.hero.headline} subhead={r.hero.subhead} align="center">
        <CtaButton href="https://app.datadrew.io/register">Get started for free</CtaButton>
        <CtaButton href="https://calendly.com/sumit-growth/discussion" variant="outline">
          Book a demo
        </CtaButton>
      </PageHeader>
      <p className="mx-auto mt-6 flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-2 px-5 text-center text-sm text-muted-foreground md:px-8">
        <span>
          By <span className="font-medium text-foreground">{r.author.name}</span>, {r.author.role}
        </span>
        <span aria-hidden>·</span>
        <span>
          Published <time dateTime={r.published}>{fmt(r.published)}</time>
        </span>
        <span aria-hidden>·</span>
        <span>
          Updated <time dateTime={r.updated}>{fmt(r.updated)}</time>
        </span>
      </p>
      <div className="mx-auto mt-6 flex w-full max-w-6xl justify-center px-5 md:px-8">
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
        <div id="ladder-table" className="mt-10">
          <SimpleTable caption={r.ladderTable.caption} head={r.ladderTable.head} rows={r.ladderTable.rows} />
        </div>
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
