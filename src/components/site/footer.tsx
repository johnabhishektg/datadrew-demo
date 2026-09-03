import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "./icons";

const columns = [
  {
    title: "Product",
    links: [
      { label: "What Drew does", href: "/#product" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "AI agents", href: "/#mcp" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Log in", href: site.appUrl },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Customer stories", href: "/customers" },
      { label: "Shopify App Store", href: "https://apps.shopify.com" },
      { label: "Support", href: "mailto:support@datadrew.io" },
    ],
  },
  {
    title: "Drew, everywhere",
    links: [
      { label: "Slack", href: "/#surfaces" },
      { label: "Claude (MCP)", href: "/#surfaces" },
      { label: "ChatGPT (MCP)", href: "/#surfaces" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-10 px-5 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-8">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {site.tagline}. Drew makes and executes better ad-spend decisions — every day.
          </p>
          <p className="mt-5 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Datadrew · datadrew.io
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-sm font-semibold">{col.title}</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/") ? (
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
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
    </footer>
  );
}
