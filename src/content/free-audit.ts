/* /free-audit — free ad-spend leakage check. Rebuilt Sep 15 2026 from the
 * retention-era "store health check" so the lead magnet matches the ads-agent
 * positioning. The report card is illustrative, not a customer's. The checks
 * listed are the ones Drew's Ad Spend Leakages workflow runs daily. */

export const freeAudit = {
  title: "Free Ad Spend Leakage Check for Shopify Brands",
  metaDescription:
    "Connect Shopify, Meta and Google and Drew checks where ad spend is leaking: sold-out products, negative-margin SKUs, fatigued creative. Free, no card.",
  hero: {
    eyebrow: "Free — No credit card required",
    headline: ["Free ad spend", "leakage check"],
    subhead:
      "Connect your Shopify store and your Meta and Google accounts. Drew reads your ads against your margins, stock and repeat behavior and shows you where money is leaking this week — with the spend attached and the fix beside it.",
    primaryCta: { label: "Run my free leakage check", href: "https://app.datadrew.io/register" },
    secondaryCta: { label: "Talk to us first", href: "https://calendly.com/sumit-growth/discussion" },
    trust: "Trusted by 1,000+ Shopify brands analyzing $1.5Bn+ GMV · Rated 5.0 on the Shopify App Store",
  },
  report: {
    title: "Ad Spend Leakage Report",
    stats: [
      { label: "Spend on sold-out products", value: "$840", delta: "this week", up: false },
      { label: "Spend on <25% margin SKUs", value: "$2,310", delta: "this week", up: false },
      { label: "Spend behind fatigued creative", value: "31%", delta: "of prospecting", up: false },
      { label: "Blended MER", value: "3.2x", delta: "+8%", up: true },
    ],
    insightLabel: "Drew's read",
    insight:
      "Three ads across two campaigns are still pointing at sold-out products, and 40% of prospecting spend sits behind a 21%-margin SKU. Pausing the three ads and shifting $415/day to the 62%-margin hero product recovers the leak without touching a learning ad set.",
  },
  includes: {
    eyebrow: "What Drew checks",
    headline: "The six leaks Drew looks for first",
    subhead:
      "The same checks Drew runs every morning for brands on the Daily Ads Brief — run once, for free, on your real account.",
    items: [
      {
        title: "Ads pointing at sold-out products",
        description: "Every active ad matched to live inventory. Spend on out-of-stock or broken-size SKUs, with the dollar amount and the ads to pause.",
      },
      {
        title: "Spend on negative- or thin-margin SKUs",
        description: "Ad spend by product against contribution margin after COGS, shipping, fees and discounts. A 3x ROAS on a 21%-margin product is still a leak.",
      },
      {
        title: "Fatigued creative still carrying budget",
        description: "Which ad sets are running on creative past its peak — frequency up, CTR down — and how much of your prospecting spend they hold.",
      },
      {
        title: "Budget on first-purchase-only products",
        description: "Spend on products whose buyers never come back, next to products whose buyers repeat 2–3x. The same ROAS is worth different money.",
      },
      {
        title: "Platform ROAS vs real profit",
        description: "Blended MER and profit after every cost, reconciled to your Shopify orders — so you know which of your three revenue numbers to believe.",
      },
      {
        title: "The fix, with the money attached",
        description: "For each leak: what to pause, reduce or shift, how much, and why. The same recommendation card you'd get from Drew on a paid plan.",
      },
    ],
  },
  steps: {
    eyebrow: "How it works",
    headline: "Your report in three steps",
    items: [
      {
        title: "Connect Shopify, Meta and Google",
        description: "OAuth, about ten minutes. No pixel, no code, no exports. Klaviyo and GA4 are optional and sharpen the read.",
      },
      {
        title: "Drew reads the business behind the ads",
        description: "Overnight, Drew joins your ads to your products, margins, stock and repeat behavior and runs the six leakage checks.",
      },
      {
        title: "Your leakage report lands by 8am",
        description: "In the app and by email: each leak, the spend behind it, and the recommended fix. Act on it yourself, or let Drew keep running the checks daily.",
      },
    ],
  },
  faq: [
    {
      q: "Is the leakage check really free?",
      a: "Yes. It runs on the Free plan, which needs no credit card and can be used indefinitely. The check uses Drew's one-time welcome credits; the daily version of the same checks is part of AI Intelligence, from $99/mo.",
    },
    {
      q: "What do I need to connect?",
      a: "Shopify plus at least one of Meta Ads or Google Ads. Klaviyo and GA4 are optional; connecting them lets Drew include repeat behavior and site conversion in the read. Every connection is read-only OAuth that you can revoke at any time.",
    },
    {
      q: "Will Drew change anything in my ad accounts?",
      a: "No. The check is read-only: Drew reports the leaks and recommends the fix, and you make the change. Applying approved changes with guardrails is part of AI Ads CoPilot, which is enabled account by account.",
    },
    {
      q: "How accurate are the margin numbers?",
      a: "Drew uses the product costs, shipping and fees you have in Shopify and Datadrew, reconciled to your Shopify orders. If COGS is missing for a product, the report says so rather than guessing, and you can add it in a minute.",
    },
  ],
  finalCta: {
    headline: "Find the leak before the budget does",
    subhead: "Connect today; your ad spend leakage report is waiting tomorrow by 8am. Free plan, no credit card required.",
  },
};
