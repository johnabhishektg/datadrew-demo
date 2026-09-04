import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mcpAgents } from "@/content/site";
import { cn } from "@/lib/utils";
import { GA4Mark, KlaviyoMark, MetaMark, ShopifyMark, UnicommerceMark } from "./icons";
import { InlineAgentLogos } from "./agent-logos";

const floating = [
  { Mark: MetaMark, className: "left-[16%] top-0 lg:left-[22%]", delay: "0s" },
  { Mark: ShopifyMark, className: "left-[4%] top-[34%] lg:left-[9%]", delay: "-1.2s" },
  { Mark: UnicommerceMark, className: "left-[0%] top-[70%] lg:left-[3%]", delay: "-2.4s" },
  { Mark: GA4Mark, className: "right-[16%] top-0 lg:right-[22%]", delay: "-3.6s" },
  { Mark: KlaviyoMark, className: "right-[4%] top-[34%] lg:right-[9%]", delay: "-4.8s" },
];

function FloatingTile({ Mark, className, delay }: (typeof floating)[number]) {
  return (
    <span aria-hidden className={cn("animate-float absolute hidden sm:block", className)} style={{ animationDelay: delay }}>
      <span className="flex size-14 items-center justify-center rounded-2xl border border-border bg-card shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18)] md:size-16">
        <Mark className="size-12 border-0 bg-transparent text-xl font-bold shadow-none md:size-14 md:text-2xl" />
      </span>
    </span>
  );
}

/* Renders **bold** segments from content strings. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") ? (
          <strong key={i} className="font-semibold text-white">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

export function McpAgents() {
  const m = mcpAgents;
  return (
    <section id="mcp" className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24">
      {/* Headline with floating source tiles */}
      <div className="relative">
        {floating.map((f) => (
          <FloatingTile key={f.delay} {...f} />
        ))}
        <div className="relative mx-auto flex max-w-2xl flex-col items-center px-4 text-center sm:pt-20 md:px-8">
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">{m.headline}</h2>
          <p className="mt-5 text-balance text-base leading-[2.1] text-muted-foreground md:text-lg md:leading-[2.2]">
            {m.subhead.lead} <InlineAgentLogos className="mx-1" /> {m.subhead.trail}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Button asChild size="lg" className="h-12 rounded-xl bg-brand px-8 text-base text-brand-foreground hover:bg-brand/90">
              <a href={m.primaryCta.href}>
                {m.primaryCta.label}
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <a href={m.secondaryCta.href} className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
              {m.secondaryCta.label}
              <ChevronRight className="size-3.5" />
            </a>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            Works with {m.clients.join(" · ")} · <code className="font-mono">{m.mcpUrl.replace("https://", "")}</code>
          </p>
        </div>
      </div>

      {/* The one window: agent-mode chat, framed like a Mac window */}
      <div className="mx-auto mt-10 max-w-2xl md:mt-14">
        <div className="rounded-2xl border border-border bg-muted/70 p-1.5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]">
          <div className="overflow-hidden rounded-xl bg-[#111111] text-[#E8E8E8]">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-white/10 bg-[#161616] px-4 py-2.5">
              <div className="flex gap-2">
                <span className="size-2.5 rounded-full bg-[#FF5F57]" />
                <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="size-2.5 rounded-full bg-[#28C840]" />
              </div>
              <span className="font-mono text-xs text-white/45">{m.chat.title}</span>
              <span className="text-right text-xs text-white/40">{m.chat.mode}</span>
            </div>

            <div className="px-5 py-5 md:px-8 md:py-6">
              <div className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-[13px] leading-relaxed text-white">
                {m.chat.question.map((q) => (
                  <p key={q} className="py-0.5">{q}</p>
                ))}
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-xs text-white/45">
                <ChevronRight className="size-3.5" /> {m.chat.worked}
              </p>

              <p className="mt-3 text-[13px] leading-relaxed text-white/90">
                <Rich text={m.chat.answer} />
              </p>

              {m.chat.groups.map((g) => (
                <div key={g.title} className="mt-3">
                  <p className="text-[13px] font-semibold text-white">{g.title}</p>
                  <ul className="mt-1 space-y-1 text-[13px] text-white/80">
                    {g.rows.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
