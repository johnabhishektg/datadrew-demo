"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Logo } from "./icons";
import { ThemeToggle } from "./theme-toggle";

const platform = [
  { label: "Drew AI", href: "/platform/drewai", note: "The ads agent" },
  { label: "Automations", href: "/platform/automations", note: "Scheduled reports" },
  { label: "Acquisition", href: "/platform/acquisition", note: "CAC, LTV, wasted spend" },
  { label: "Creative Strategy", href: "/platform/creative-strategy", note: "Which ads are winning" },
  { label: "Retention", href: "/platform/retention", note: "Cohorts, RFM, LTV" },
  { label: "Product Intelligence", href: "/platform/product-intelligence", note: "Repurchase, baskets" },
];

const links = [
  { label: "Integrations", href: "/integrations" },
  { label: "MCP", href: "/mcp" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  // Hide the navbar once the user has scrolled down a bit; bring it back on
  // any upward scroll. Small deltas are ignored so it doesn't flicker.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const HIDE_AFTER = 120; // px from top before hiding is allowed
    const THRESHOLD = 6; // px of movement before we react

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      setScrolled(y > 12);
      if (y <= HIDE_AFTER) {
        setHidden(false);
      } else if (delta > THRESHOLD) {
        setHidden(true);
      } else if (delta < -THRESHOLD) {
        setHidden(false);
      }
      if (Math.abs(delta) > THRESHOLD) lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Never hide while the mobile menu is open.
  const isHidden = hidden && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 transition-transform duration-300 ease-out",
        isHidden ? "-translate-y-[calc(100%+1rem)]" : "translate-y-0"
      )}
    >
      {/* Fades page content out above the floating pill once scrolled */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background via-background/85 to-transparent transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />
      <nav
        aria-label="Main"
        className={cn(
          "relative flex w-full max-w-6xl items-center justify-between rounded-2xl border px-3 py-2 transition-all duration-300",
          scrolled || open
            ? "border-border bg-background/80 shadow-sm backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <Link href="/" className="px-2" aria-label="Datadrew home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          <li
            className="relative"
            onMouseEnter={() => setMenu(true)}
            onMouseLeave={() => setMenu(false)}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={menu}
              onClick={() => setMenu((v) => !v)}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                menu && "bg-muted text-foreground"
              )}
            >
              Platform
              <ChevronDown className={cn("size-3.5 transition-transform", menu && "rotate-180")} />
            </button>
            {menu && (
              <div className="absolute left-0 top-full pt-2">
                <div className="grid w-[30rem] grid-cols-2 gap-1 rounded-2xl border border-border bg-background p-2 shadow-lg">
                  {platform.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      onClick={() => setMenu(false)}
                      className="flex flex-col gap-0.5 rounded-lg px-3 py-2 hover:bg-muted"
                    >
                      <span className="text-sm font-medium">{p.label}</span>
                      <span className="text-xs text-muted-foreground">{p.note}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm">
            <a href={site.appUrl}>Log in</a>
          </Button>
          <Button asChild size="sm" className="rounded-lg">
            <a href={site.appUrl}>Start free</a>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>

        {open && (
          <div className="absolute inset-x-0 top-full mt-2 rounded-2xl border border-border bg-background p-3 shadow-lg md:hidden">
            <ul className="flex flex-col">
              <li className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Platform
              </li>
              {platform.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
              <li className="my-2 border-t border-border" aria-hidden />
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm hover:bg-muted"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
              <Button asChild variant="outline">
                <a href={site.appUrl}>Log in</a>
              </Button>
              <Button asChild>
                <a href={site.appUrl}>Start free</a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
