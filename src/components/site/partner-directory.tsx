"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin, Search, X } from "lucide-react";
import { agencyRegions, agencyServices, partnersDirectory, type Agency } from "@/content/partners";
import { cn } from "@/lib/utils";

/* Region tabs + service pills + text search, same rules as the live page:
 * service matches the card tag exactly; search matches name or description. */

function AgencyCard({ a }: { a: Agency }) {
  return (
    <li>
      <a
        href={a.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-muted/40"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white text-sm font-semibold text-neutral-700">
            {a.logo ? (
              <Image src={a.logo} alt={`${a.name} logo`} width={48} height={48} className="size-10 object-contain" />
            ) : (
              a.initials
            )}
          </span>
          <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base font-semibold tracking-tight">{a.name}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{a.description}</p>
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3" /> {a.location}
          </span>
          <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{a.tag}</span>
        </div>
      </a>
    </li>
  );
}

export function PartnerDirectory() {
  const [region, setRegion] = useState("all");
  const [service, setService] = useState("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      agencyRegions
        .map((r) => ({
          ...r,
          items: r.items.filter((a) => {
            const regionMatch = region === "all" || r.id === region || q.length > 0;
            const serviceMatch = service === "all" || a.tag === service;
            const textMatch = !q || a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.location.toLowerCase().includes(q);
            return regionMatch && serviceMatch && textMatch;
          }),
        }))
        .filter((r) => r.items.length > 0),
    [region, service, q]
  );
  const total = visible.reduce((n, r) => n + r.items.length, 0);

  return (
    <div className="flex flex-col gap-8">
      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="-mx-1 overflow-x-auto px-1">
            <div role="tablist" aria-label="Region" className="flex w-max gap-1">
              {[{ id: "all", title: "All" }, ...agencyRegions].map((r) => {
                const count = r.id === "all" ? agencyRegions.reduce((n, x) => n + x.items.length, 0) : (r as { items: Agency[] }).items.length;
                const active = region === r.id;
                return (
                  <button
                    key={r.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setRegion(r.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition-colors",
                      active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {r.title}
                    <span className={cn("font-mono text-xs", active ? "text-background/70" : "text-muted-foreground/70")}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <label className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search partners…"
              aria-label="Search partners"
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-8 text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/30 md:w-64"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2 text-muted-foreground hover:text-foreground">
                <X className="size-4" />
              </button>
            )}
          </label>
        </div>
        <div className="-mx-1 overflow-x-auto px-1">
          <div className="flex w-max gap-2 md:w-auto md:flex-wrap" aria-label="Service">
            {["all", ...agencyServices].map((s) => {
              const active = service === s;
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setService(s)}
                  className={cn(
                    "whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    active
                      ? "border-brand bg-brand-soft text-brand"
                      : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {s === "all" ? "All services" : s}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      {total === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <p className="text-lg font-semibold tracking-tight">{partnersDirectory.empty.title}</p>
          <p className="max-w-sm text-sm text-muted-foreground">{partnersDirectory.empty.body}</p>
        </div>
      ) : (
        visible.map((r) => (
          <section key={r.id} id={r.id} aria-labelledby={`${r.id}-title`} className="scroll-mt-28">
            <div className="flex items-baseline justify-between">
              <h2 id={`${r.id}-title`} className="text-2xl font-semibold tracking-tight">
                {r.title}
              </h2>
              <span className="font-mono text-xs text-muted-foreground">{r.items.length}</span>
            </div>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {r.items.map((a) => (
                <AgencyCard key={a.name} a={a} />
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
