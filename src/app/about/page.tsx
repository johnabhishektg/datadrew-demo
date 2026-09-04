import type { Metadata } from "next";
import Image from "next/image";
import { Section, StatBand, CheckList, CtaButton, Eyebrow } from "@/components/site/blocks";
import { PageShell, PageHeader } from "@/components/site/page-shell";
import { JsonLd, breadcrumbLd } from "@/components/site/structured-data";
import { LinkedInIcon, XIcon } from "@/components/site/social-icons";
import { about, links } from "@/content/company";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: about.meta.title },
  description: about.meta.description,
  alternates: { canonical: "/about" },
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: `https://${site.domain}`,
  logo: `https://${site.domain}/brand/datadrew-square.png`,
  description: about.meta.description,
  founders: about.team.founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role, sameAs: f.linkedin })),
  sameAs: [links.linkedin, links.x],
};

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd data={[breadcrumbLd([{ name: "About", path: "/about" }]), orgLd]} />
      <PageHeader eyebrow={about.eyebrow} headline={about.headline} subhead={about.subhead} />

      {/* Vision */}
      <div className="mx-auto mt-10 w-full max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-2 rounded-3xl border border-border bg-card px-6 py-8 md:flex-row md:items-center md:gap-8 md:px-10 md:py-10">
          <Eyebrow>{about.vision.label}</Eyebrow>
          <p className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">{about.vision.text}</p>
        </div>
      </div>

      {/* Problem + mission */}
      <Section headline={about.problem.headline} narrow>
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {about.problem.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-brand/30 bg-brand/5 p-6">
            <Eyebrow>{about.problem.mission.label}</Eyebrow>
            <p className="text-lg font-medium leading-snug tracking-tight">{about.problem.mission.text}</p>
          </div>
        </div>
      </Section>

      {/* Story */}
      <Section eyebrow={about.story.eyebrow} headline={about.story.headline} narrow className="border-t border-border">
        <div className="max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {about.story.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      {/* Journey */}
      <Section eyebrow={about.journey.eyebrow} headline={about.journey.headline} className="border-t border-border">
        <ol className="grid gap-4 md:grid-cols-3">
          {about.journey.steps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <span className="font-mono text-xs font-medium uppercase tracking-wider text-brand">{s.when}</span>
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              <span className="mt-auto w-fit rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">{s.tag}</span>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{about.journey.coda}</p>
      </Section>

      {/* Focus */}
      <Section headline={about.focus.headline} narrow className="border-t border-border">
        <div className="max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {about.focus.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section eyebrow={about.team.eyebrow} headline={about.team.headline} className="border-t border-border">
        <ul className="grid gap-4 md:grid-cols-2">
          {about.team.founders.map((f) => (
            <li key={f.name} className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-center gap-4">
                <span className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted font-semibold text-muted-foreground">
                  {f.initials}
                  <Image src={f.photo} alt={f.name} fill sizes="64px" className="object-cover" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{f.role}</p>
                  <h3 className="text-xl font-semibold tracking-tight">{f.name}</h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.bio}</p>
              <CheckList items={f.facts} />
              <div className="mt-auto flex items-center gap-3 pt-2">
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  <LinkedInIcon className="size-4" /> LinkedIn
                </a>
                {f.x && (
                  <a
                    href={f.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <XIcon className="size-4" /> X (Twitter)
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{about.team.coda}</p>
      </Section>

      {/* Stats */}
      <Section headline={about.stats.headline} align="center" className="border-t border-border">
        <StatBand stats={about.stats.items} />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CtaButton href={site.appUrl}>Start for free</CtaButton>
          <CtaButton href="/book" variant="outline">
            Book a demo
          </CtaButton>
        </div>
      </Section>
    </PageShell>
  );
}
