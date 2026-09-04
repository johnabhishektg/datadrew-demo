import { NextResponse } from "next/server";

/* Blog newsletter signup → useSend contact book.
 *
 * Env (set on Vercel for production + preview, and in .env.local for dev):
 *   USESEND_BASE_URL            self-hosted useSend origin (no trailing slash)
 *   USESEND_API_KEY             Bearer key
 *   USESEND_NEWSLETTER_BOOK_ID  the `blog-newsletter` contact book
 *
 * The book has double opt-in disabled (standing rule: never send confirmation
 * emails). Contacts are created `subscribed: true` with `icp_status: pending`;
 * the enrichment job (see /work/website-redesign/newsletter-icp-enrichment.md)
 * fills icp_score / icp_status afterwards.
 */

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FREEMAIL = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk", "yahoo.co.in", "hotmail.com",
  "outlook.com", "live.com", "icloud.com", "me.com", "aol.com", "proton.me", "protonmail.com",
  "rediffmail.com", "ymail.com", "msn.com", "mail.com", "zoho.com",
]);

type Payload = {
  email?: string;
  website?: string; // honeypot — real users never fill it
  source?: string;
  path?: string;
  referrer?: string;
  utm?: Record<string, string>;
};

function clean(v: unknown, max = 200) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot: pretend success so bots stop retrying.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const email = clean(body.email, 254).toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const base = process.env.USESEND_BASE_URL?.replace(/\/$/, "");
  const key = process.env.USESEND_API_KEY;
  const book = process.env.USESEND_NEWSLETTER_BOOK_ID;
  if (!base || !key || !book) {
    console.error("[newsletter] useSend env not configured");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const domain = email.split("@")[1] ?? "";
  const utm = body.utm ?? {};
  const properties: Record<string, string> = {
    source: clean(body.source) || "blog-popup",
    signup_path: clean(body.path, 300),
    referrer: clean(body.referrer, 300),
    utm_source: clean(utm.utm_source),
    utm_medium: clean(utm.utm_medium),
    utm_campaign: clean(utm.utm_campaign),
    email_domain: domain,
    email_type: FREEMAIL.has(domain) ? "freemail" : "business",
    signup_at: new Date().toISOString(),
    icp_status: "pending",
  };
  for (const k of Object.keys(properties)) if (!properties[k]) delete properties[k];

  const res = await fetch(`${base}/api/v1/contactBooks/${book}/contacts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email, subscribed: true, properties }),
    cache: "no-store",
  });

  if (res.ok) return NextResponse.json({ ok: true });

  // useSend rejects an email that already exists in the book; treat that as
  // subscribed — the user's intent is satisfied and we must not leak state.
  const text = await res.text().catch(() => "");
  if (res.status === 409 || /exist|duplicate|unique/i.test(text)) {
    return NextResponse.json({ ok: true, existing: true });
  }
  console.error("[newsletter] useSend error", res.status, text.slice(0, 300));
  return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
}
