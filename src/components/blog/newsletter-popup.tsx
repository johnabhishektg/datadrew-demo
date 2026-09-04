"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fieldClass } from "@/components/site/hubspot-form";
import { cn } from "@/lib/utils";

/* Scroll-triggered newsletter card for blog pages.
 *
 * Shows once the reader is 40% down the page, or after 45s on the page —
 * whichever comes first. A slide-in card (not a modal) so it never covers the
 * article and does not trip Google's intrusive-interstitial signal on mobile.
 *
 * Suppression (localStorage, wrapped so private mode can't throw):
 *   dd_nl_subscribed   — never show again
 *   dd_nl_dismissed_at — hide for 30 days
 */

const SCROLL_TRIGGER = 0.4;
const TIME_TRIGGER_MS = 45_000;
const DISMISS_DAYS = 30;
const LS_SUBSCRIBED = "dd_nl_subscribed";
const LS_DISMISSED = "dd_nl_dismissed_at";

function lsGet(k: string) {
  try {
    return window.localStorage.getItem(k);
  } catch {
    return null;
  }
}
function lsSet(k: string, v: string) {
  try {
    window.localStorage.setItem(k, v);
  } catch {
    /* ignore */
  }
}

function suppressed() {
  if (lsGet(LS_SUBSCRIBED)) return true;
  const at = Number(lsGet(LS_DISMISSED) ?? 0);
  return at > 0 && Date.now() - at < DISMISS_DAYS * 86_400_000;
}

function utmParams() {
  const out: Record<string, string> = {};
  const sp = new URLSearchParams(window.location.search);
  for (const k of ["utm_source", "utm_medium", "utm_campaign"]) {
    const v = sp.get(k);
    if (v) out[k] = v;
  }
  return out;
}

type Status = "idle" | "sending" | "done" | "error";

export function NewsletterPopup({ source = "blog-popup" }: { source?: string }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const shown = useRef(false);

  const show = useCallback(() => {
    if (shown.current) return;
    shown.current = true;
    setOpen(true);
  }, []);

  useEffect(() => {
    if (suppressed()) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= SCROLL_TRIGGER) show();
    };
    const timer = window.setTimeout(show, TIME_TRIGGER_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [show]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function dismiss() {
    setOpen(false);
    if (status !== "done") lsSet(LS_DISMISSED, String(Date.now()));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/newsletter/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          website: data.get("website"),
          source,
          path: window.location.pathname,
          referrer: document.referrer,
          utm: utmParams(),
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "failed");
      setStatus("done");
      lsSet(LS_SUBSCRIBED, "1");
      window.setTimeout(() => setOpen(false), 4000);
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error && err.message === "invalid_email"
          ? "That email doesn't look right."
          : "Couldn't subscribe just now. Try again in a moment.",
      );
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          role="dialog"
          aria-labelledby="nl-title"
          aria-live="polite"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className={cn(
            "fixed inset-x-4 bottom-4 z-[70] rounded-2xl border border-border bg-card p-5 shadow-2xl",
            "sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[22rem]",
          )}
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close"
            className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>

          {status === "done" ? (
            <div className="flex items-start gap-3 pr-6">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground">
                <Check className="size-3.5" />
              </span>
              <div>
                <p className="text-sm font-medium">You&rsquo;re in.</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Next issue lands in your inbox. No confirmation email, nothing to click.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate={false}>
              <p className="label-mono text-brand">The Ads Brief</p>
              <h2 id="nl-title" className="mt-2 text-base font-semibold leading-snug tracking-tight">
                One email a week on running paid ads for Shopify brands.
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Benchmarks from real store data, the diagnosis frameworks we publish here, and
                what Drew learned this week. No product pitches.
              </p>
              {/* Honeypot: hidden from people, filled by bots. */}
              <div aria-hidden className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
                <label>
                  Website
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <div className="mt-4 flex gap-2">
                <label htmlFor="nl-email" className="sr-only">
                  Work email
                </label>
                <input
                  id="nl-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder="you@brand.com"
                  aria-invalid={status === "error" || undefined}
                  className={cn(fieldClass, "min-w-0 flex-1")}
                />
                <Button type="submit" size="sm" className="shrink-0 rounded-lg" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Subscribe"}
                </Button>
              </div>
              {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
              <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                Unsubscribe in one click, any issue. We never share your email.
              </p>
            </form>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
