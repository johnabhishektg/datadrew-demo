"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { MCP_URL, mcpPage } from "@/content/mcp";
import { cn } from "@/lib/utils";

/* Copyable endpoint + per-client setup steps. */
export function McpUrlCopy({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(MCP_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — the URL is still selectable */
    }
  };
  return (
    <div className={cn("flex items-center gap-2 rounded-xl border border-border bg-card p-1.5 pl-4", className)}>
      <code className="min-w-0 flex-1 truncate font-mono text-sm">{MCP_URL}</code>
      <button
        type="button"
        onClick={copy}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-colors hover:bg-foreground/90"
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export function McpSetupTabs() {
  const clients = mcpPage.setup.clients;
  const [active, setActive] = useState(clients[0].id);
  const c = clients.find((x) => x.id === active) ?? clients[0];
  return (
    <div className="rounded-2xl border border-border bg-card">
      <div role="tablist" aria-label="AI client" className="flex flex-wrap gap-1 border-b border-border p-2">
        {clients.map((cl) => (
          <button
            key={cl.id}
            role="tab"
            type="button"
            aria-selected={cl.id === active}
            onClick={() => setActive(cl.id)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              cl.id === active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {cl.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="grid gap-6 p-5 md:grid-cols-[1fr_auto] md:p-6">
        <ol className="flex flex-col gap-3">
          {c.steps.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-soft font-mono text-[11px] font-semibold text-brand">
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        {c.code && (
          <figure className="overflow-hidden rounded-xl border border-night-border bg-night text-night-foreground md:w-72">
            <figcaption className="border-b border-night-border px-4 py-2 font-mono text-xs text-night-muted">{c.code.title}</figcaption>
            <pre className="overflow-x-auto p-4">
              <code className="font-mono text-[0.8rem] leading-relaxed">{c.code.body}</code>
            </pre>
          </figure>
        )}
      </div>
    </div>
  );
}

export function McpPromptLibrary() {
  const { categories, items } = mcpPage.prompts;
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? items : items.filter((i) => i.c === cat);
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={cat === k}
            onClick={() => setCat(k)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              cat === k ? "border-foreground bg-foreground text-background" : "border-border bg-background text-muted-foreground hover:text-foreground"
            )}
          >
            {k}
          </button>
        ))}
      </div>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((i) => (
          <li key={i.p} className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">{i.c}</span>
            <p className="text-sm leading-relaxed">&ldquo;{i.p}&rdquo;</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
