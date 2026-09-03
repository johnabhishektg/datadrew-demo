"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/content/blog";
import { cn } from "@/lib/utils";

/** Sticky table of contents; highlights the section currently in view. */
export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.anchor.replace("#", "") ?? "");

  useEffect(() => {
    const ids = items.map((i) => i.anchor.replace("#", ""));
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;
  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="label-mono text-muted-foreground">On this page</p>
      <ol className="mt-3 flex flex-col border-l border-border">
        {items.map((item) => {
          const id = item.anchor.replace("#", "");
          const isActive = id === active;
          return (
            <li key={item.anchor}>
              <a
                href={item.anchor}
                className={cn(
                  "-ml-px block border-l py-1.5 pl-4 leading-snug transition-colors",
                  isActive
                    ? "border-brand font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
