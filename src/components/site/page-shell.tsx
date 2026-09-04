import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { FinalCta } from "./final-cta";
import { cn } from "@/lib/utils";

/* Shared shell for every secondary page: floating navbar, top padding that
 * clears it, optional closing CTA, footer. Pages compose sections inside. */
export function PageShell({
  children,
  cta = true,
  className,
}: {
  children: React.ReactNode;
  cta?: boolean;
  className?: string;
}) {
  return (
    <>
      <Navbar />
      <main className={cn("pt-28 md:pt-36", className)}>{children}</main>
      {cta && <FinalCta />}
      <Footer />
    </>
  );
}

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, className, center = false }: { items: Crumb[]; className?: string; center?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm text-muted-foreground", className)}>
      <ol className={cn("flex flex-wrap items-center gap-1", center && "justify-center")}>
        <li>
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1">
            <ChevronRight className="size-3.5 opacity-60" aria-hidden />
            {c.href && i < items.length - 1 ? (
              <Link href={c.href} className="hover:text-foreground">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground/80">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* Page-level header. `align="left"` is the default for secondary pages
 * (matches /integrations and /customers); "center" for landing pages. */
export function PageHeader({
  eyebrow,
  headline,
  subhead,
  crumbs,
  align = "left",
  children,
  className,
  size = "lg",
}: {
  eyebrow?: string;
  headline: React.ReactNode;
  subhead?: React.ReactNode;
  crumbs?: Crumb[];
  align?: "left" | "center";
  children?: React.ReactNode;
  className?: string;
  size?: "lg" | "md";
}) {
  return (
    <header
      className={cn(
        "mx-auto w-full max-w-6xl px-5 md:px-8",
        align === "center" && "text-center",
        className
      )}
    >
      {crumbs && <Breadcrumbs items={crumbs} className="mb-6" center={align === "center"} />}
      <div className={cn("flex flex-col gap-4", align === "center" ? "mx-auto max-w-3xl items-center" : "md:max-w-2xl")}>
        {eyebrow && (
          <span className="inline-flex w-fit items-center text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            {eyebrow}
          </span>
        )}
        <h1
          className={cn(
            "text-balance font-semibold tracking-tight",
            size === "lg" ? "text-4xl md:text-5xl lg:text-6xl" : "text-3xl md:text-4xl lg:text-5xl"
          )}
        >
          {headline}
        </h1>
        {subhead && <p className="text-pretty text-base text-muted-foreground md:text-lg">{subhead}</p>}
        {children && (
          <div className={cn("mt-2 flex flex-wrap items-center gap-3", align === "center" && "justify-center")}>
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
