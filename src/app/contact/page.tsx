import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";
import { CtaButton } from "@/components/site/blocks";
import { PageShell, PageHeader } from "@/components/site/page-shell";
import { JsonLd, breadcrumbLd } from "@/components/site/structured-data";
import { LinkedInIcon, XIcon } from "@/components/site/social-icons";
import { contact, links } from "@/content/company";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: contact.meta.title,
  description: contact.meta.description,
  alternates: { canonical: "/contact" },
};

const contactLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Datadrew",
  description: contact.meta.description,
  url: `https://${site.domain}/contact`,
  publisher: { "@type": "Organization", name: site.name, url: `https://${site.domain}` },
};

export default function ContactPage() {
  return (
    <PageShell>
      <JsonLd data={[breadcrumbLd([{ name: "Contact", path: "/contact" }]), contactLd]} />
      <PageHeader eyebrow={contact.eyebrow} headline={contact.headline} subhead={contact.subhead} />

      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 pb-8 pt-12 md:grid-cols-[1.4fr_1fr] md:px-8 md:pt-16">
        <section className="rounded-3xl border border-border bg-card p-6 md:p-8" aria-labelledby="contact-form-title">
          <h2 id="contact-form-title" className="text-2xl font-semibold tracking-tight">
            {contact.form.headline}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Fill out the form and our team will get back to you within 1 business day. For faster support, try our{" "}
            <a href={links.helpCenter} className="text-foreground underline underline-offset-4 hover:text-brand">
              Help Center
            </a>{" "}
            or email{" "}
            <a href={links.support} className="text-foreground underline underline-offset-4 hover:text-brand">
              support@datadrew.io
            </a>{" "}
            directly.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </section>

        <div className="flex flex-col gap-4">
          <section className="rounded-3xl border border-border bg-card p-6 md:p-8" aria-labelledby="contact-info-title">
            <h3 id="contact-info-title" className="text-lg font-semibold tracking-tight">
              {contact.info.headline}
            </h3>
            <dl className="mt-5 flex flex-col gap-5">
              {contact.info.rows.map((r) => (
                <div key={r.label} className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                    <Mail className="size-4" />
                  </span>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{r.label}</dt>
                    <dd className="mt-0.5 text-sm">
                      {r.label === "Support" ? (
                        <>
                          <a href={links.helpCenter} className="hover:text-brand">
                            Help Center
                          </a>{" "}
                          or{" "}
                          <a href={r.href} className="hover:text-brand">
                            support@datadrew.io
                          </a>
                        </>
                      ) : (
                        <a href={r.href} className="hover:text-brand">
                          {r.value}
                        </a>
                      )}
                    </dd>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <ArrowUpRight className="size-4" />
                </span>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Follow us</dt>
                  <dd className="mt-1.5 flex items-center gap-3">
                    <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Datadrew on LinkedIn" className="text-muted-foreground hover:text-foreground">
                      <LinkedInIcon className="size-4" />
                    </a>
                    <a href={links.x} target="_blank" rel="noopener noreferrer" aria-label="Datadrew on X" className="text-muted-foreground hover:text-foreground">
                      <XIcon className="size-4" />
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </section>

          <section className="flex flex-col gap-3 rounded-3xl border border-brand/30 bg-brand/5 p-6 md:p-8" aria-labelledby="contact-demo-title">
            <h3 id="contact-demo-title" className="text-lg font-semibold tracking-tight">
              {contact.demo.headline}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{contact.demo.body}</p>
            <CtaButton href="/book" className="mt-2 w-fit">
              {contact.demo.cta}
            </CtaButton>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
