"use client";

import { useState } from "react";
import { DrewChat } from "./blocks";
import type { DrewPrompt } from "@/content/platform";
import { cn } from "@/lib/utils";

/* Clickable prompt list + Drew answer window. All answers are sample data
 * authored in src/content/platform.ts — nothing is generated at runtime. */
export function PlatformDrewDemo({
  prompts,
  layout = "side",
  className,
}: {
  prompts: DrewPrompt[];
  layout?: "side" | "stack";
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const current = prompts[active] ?? prompts[0];

  const list = (
    <ul className="flex flex-col gap-2" role="tablist" aria-label="Example questions">
      {prompts.map((p, i) => (
        <li key={p.q}>
          <button
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "w-full rounded-xl border px-3.5 py-2.5 text-left text-sm transition-colors",
              i === active
                ? "border-brand/40 bg-brand-soft text-foreground"
                : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            &ldquo;{p.q}&rdquo;
          </button>
        </li>
      ))}
    </ul>
  );

  if (layout === "stack") {
    return (
      <div className={cn("flex flex-col gap-4", className)}>
        <DrewChat key={current.q} question={current.q} answer={current.answer} insight={current.insight} />
        <ul className="flex flex-wrap gap-2" aria-label="Example questions">
          {prompts.map((p, i) => (
            <li key={p.q}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs transition-colors md:text-sm",
                  i === active
                    ? "border-brand/40 bg-brand-soft text-foreground"
                    : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {p.q}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-start", className)}>
      {list}
      <DrewChat key={current.q} question={current.q} answer={current.answer} insight={current.insight} />
    </div>
  );
}
