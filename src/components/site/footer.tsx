import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "./icons";
import { competitorLogo } from "@/content/comparisons";
import { BrandMark } from "./brand-mark";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Drew AI", href: "/platform/drewai" },
      { label: "Automations", href: "/platform/automations" },
      { label: "Acquisition", href: "/platform/acquisition" },
      { label: "Creative Strategy", href: "/platform/creative-strategy" },
      { label: "Retention", href: "/platform/retention" },
      { label: "Product Intelligence", href: "/platform/product-intelligence" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Integrations", href: "/integrations" },
      { label: "Drew MCP for AI agents", href: "/mcp" },
      { label: "Pricing", href: "/pricing" },
      { label: "Free store health check", href: "/free-audit" },
      { label: "Why did my ROAS drop?", href: "/why-did-my-roas-drop" },
      { label: "Log in", href: site.appUrl },
    ],
  },
  {
    title: "Compare",
    links: [
      { label: "vs Triple Whale", href: "/vs/triple-whale" },
      { label: "vs Northbeam", href: "/vs/northbeam" },
      { label: "vs Polar Analytics", href: "/vs/polar-analytics" },
      { label: "vs Lifetimely", href: "/vs/lifetimely" },
      { label: "Triple Whale alternatives", href: "/blog/triple-whale-alternatives" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Customer stories", href: "/customers" },
      { label: "Partners", href: "/partners" },
      { label: "Blog", href: "/blog" },
      { label: "Book a demo", href: "/book" },
      { label: "Contact", href: "/contact" },
      { label: "Shopify App Store", href: "https://apps.shopify.com/customer-lifetime-value" },
    ],
  },
];

const legal = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms of service", href: "/terms-of-service" },
  { label: "Refund policy", href: "/refund-policy" },
  { label: "Subprocessors", href: "/subprocessors" },
  { label: "Google API disclosure", href: "/google-limited-use-disclosure" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] md:px-8">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {site.tagline}. Drew makes and executes better ad-spend decisions — every day.
          </p>
          <p className="mt-5 text-xs text-muted-foreground">
            <a href="mailto:hello@datadrew.io" className="hover:text-foreground">hello@datadrew.io</a>
            {" · "}
            <a href="mailto:support@datadrew.io" className="hover:text-foreground">support@datadrew.io</a>
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-sm font-semibold">{col.title}</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/") ? (
                    <Link href={link.href} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                      {competitorLogo(link.href) && (
                        <BrandMark logo={competitorLogo(link.href)!} name={link.label.replace(/^vs /, "")} size="sm" />
                      )}
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Datadrew · datadrew.io</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
