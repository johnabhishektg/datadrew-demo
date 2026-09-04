import { posts } from "@/content/blog";
import { comparisons } from "@/content/comparisons";
import { integrationPages, integrationRoute } from "@/content/integration-pages";
import { platformPages } from "@/content/platform";
import { site } from "@/content/site";

/* /llms.txt — the first-read file for AI crawlers (llmstxt.org). Generated
 * from the same content modules as the pages so it can't drift from the site.
 * Claims follow the anti-claims ledger in /context/datadrew/Positioning_v5 §8:
 * no campaign-level CAC/LTV, execution is "rolling out", MCP plan gating is
 * left to the /mcp page rather than asserted here. */

const ORIGIN = `https://${site.domain}`;
const link = (label: string, path: string, note: string) => `- [${label}](${ORIGIN}${path}/): ${note}`;

export const dynamic = "force-static";

export function GET() {
  const platform = platformPages.map((p) => link(p.title, `/platform/${p.slug}`, p.description));
  const integrations = integrationPages.map((p) =>
    link(p.title.replace(/ Integration$/, ""), `/integrations/${integrationRoute(p)}`, p.metaDescription)
  );
  const vs = comparisons.map((c) => link(`Datadrew vs ${c.competitor}`, `/vs/${c.slug}`, c.metaDescription));
  const blog = posts.map((p) => link(p.title, `/blog/${p.slug}`, p.excerpt || p.metaDescription));

  const body = `# ${site.name}

> ${site.name} is the AI ads agent for Shopify brands. Drew knows the Shopify business behind the ads (products, margins, inventory, customers, repeat behavior, history), understands how expert media buyers operate (channel-specific playbooks for Meta and Google, learned from thousands of ad decisions across Shopify brands), and acts on that judgment through five core workflows: the Daily Ads Brief, Diagnose Performance, Ad Spend Leakages, Budget Recommendations, and Execute Ads Changes (approved changes implemented with guardrails, rolling out now). It connects Shopify, Meta Ads, Google Ads, GA4, Google Search Console, Klaviyo, Amazon (Seller + Ads), Unicommerce, Stripe, Recharge, Skio, Brevo, Judge.me, AfterShip, and more. Drew does not optimize ROAS in isolation: it uses the economics of the Shopify business (every number reconciles to Shopify orders overnight) to grow ads profitably. Drew is available in the Datadrew app, in Slack (@-mention in channels), and inside Claude, ChatGPT, Cursor and other MCP clients via a public OAuth-secured remote MCP server at mcp.datadrew.io.

Datadrew is trusted by 1,000+ Shopify brands across 47+ countries, analyzing over $1.5Bn in GMV. It is a Shopify App Store app (rated 5.0) with zero-code setup and GMV-based pricing: Free, Essentials from $99/mo, Pro from $149/mo. Annual billing saves 2 months.

Key differentiators: an AI ads agent with the judgment of an experienced media buyer, because it knows your business, not just your ad account; decisions and execution (approved changes with guardrails), not just dashboards; profit as the governing objective, reconciled to Shopify orders overnight; a Brain that compounds (playbooks + memory + context + guardrails + feedback loops); cohort-based LTV analysis; RFM segments that sync directly to Klaviyo and Meta; product-level repurchase, basket and margin intelligence; transparent GMV-based pricing with no per-seat charges; multi-channel support including Indian marketplaces (Myntra, Flipkart, Amazon IN, Quick Commerce) via Unicommerce; and a public MCP server that lets any AI agent query your store via OAuth.

What Datadrew does not claim: it is not an attribution platform and does not judge which channel drove which order. Channel visibility is via GA4 source/medium and platform reporting, shown alongside Shopify revenue. Blended MER, CAC and contribution margin are shop- and product-level; LTV is cohort-based. Alerting is daily, not intraday.

## Product

${platform.join("\n")}

## Key Pages

${link("Pricing", "/pricing", "GMV-based pricing for Free, Essentials and Pro plans with a monthly/yearly toggle, plus a full feature comparison table")}
${link("Integrations", "/integrations", "Shopify, Meta Ads, Google Ads, GA4, Google Search Console, Klaviyo, Amazon (Seller + Ads), Unicommerce, Stripe, Recharge, Skio, Brevo, Judge.me, AfterShip, Google Sheets, Slack and more")}
${link("Connect Claude & ChatGPT (MCP)", "/mcp", "Connect Claude, ChatGPT, Cursor and any MCP-compatible AI tool to your store data via Datadrew's public, OAuth-secured MCP server at mcp.datadrew.io. Read-only access across 15+ data sources with blended ROAS, MER, CAC and LTV metrics; set up in about 2 minutes; multi-store support for agencies")}
${link("Free store audit", "/free-audit", "A free AI-powered health check of a Shopify store: LTV, retention, wasted ad spend and product economics")}
${link("Why did my ROAS drop?", "/why-did-my-roas-drop", "The eight checks an experienced media buyer runs, in order, when ROAS falls")}
${link("Book a demo", "/book", "Schedule a personalized walkthrough with the Datadrew team")}
${link("About", "/about", "Company story, founders (Sumit Bansal, Vikas Bansal), and values")}
${link("Partners", "/partners", "Datadrew certified agency partners directory")}
${link("Become a partner", "/partners/become-a-partner", "Agency and tech partner programs")}

## Integrations

${integrations.join("\n")}

## Comparisons

${vs.join("\n")}

## Blog

${blog.join("\n")}

## Optional

${link("Privacy Policy", "/privacy-policy", "How Datadrew handles data")}
${link("Terms of Service", "/terms-of-service", "Terms for using Datadrew")}
${link("Contact", "/contact", "General inquiries, support, partnerships")}
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
