import Link from "next/link";
import { CtaButton } from "@/components/site/blocks";
import { PageShell } from "@/components/site/page-shell";

export const metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist or has been moved.",
};

const links = [
  { label: "Homepage", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Integrations", href: "/integrations" },
];

export default function NotFound() {
  return (
    <PageShell cta={false}>
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-5 pb-24 pt-10 text-center md:px-8 md:pb-32">
        <span className="font-mono text-sm font-medium uppercase tracking-[0.2em] text-brand">404</span>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">Page not found</h1>
        <p className="mt-4 text-pretty text-base text-muted-foreground md:text-lg">
          Looks like this page took a wrong turn. Here are some helpful links to get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {links.map((l, i) => (
            <CtaButton key={l.href} href={l.href} variant={i === 0 ? "default" : "outline"}>
              {l.label}
            </CtaButton>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted-foreground">
          Still lost?{" "}
          <Link href="/contact" className="font-medium text-foreground hover:text-brand">
            Contact us
          </Link>{" "}
          or email{" "}
          <a href="mailto:support@datadrew.io" className="font-medium text-foreground hover:text-brand">
            support@datadrew.io
          </a>
        </p>
      </div>
    </PageShell>
  );
}
