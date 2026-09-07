/* /vs/<competitor> comparison pages. Ported from the live datadrew.io pages
 * (Sep 2026). Every price, band and "checked on" line is carried verbatim —
 * update here when either vendor's pricing page changes. Cells: `check: true`
 * renders a brand ✓ before the text; `dash: true` renders an em dash. */

export type Cell = { text?: string; check?: boolean; dash?: boolean; href?: string };

export type FeatureRow = {
  feature: string;
  desc?: string;
  datadrew: Cell;
  competitor: Cell;
};

export type FeatureGroup = { title: string; rows: FeatureRow[] };

export type Comparison = {
  slug: string;
  competitor: string;
  /** Square competitor mark in /public/competitors (see CREDITS.md there). */
  logo: string;
  /** Short label used in tiles / table headers ("TW", "NB"). */
  shortName?: string;
  title: string;
  metaDescription: string;
  intro: string;
  tiles: { label: string; datadrew: string; competitor: string; datadrewLabel?: string; competitorLabel?: string }[];
  fit: { headline: string; subhead: string; datadrew: string[]; competitor: string[] };
  pricingLadder?: {
    headline: string;
    subhead: string;
    head: string[];
    rows: string[][];
    note: string;
  };
  features: { headline: string; subhead: string; groups: FeatureGroup[] };
  approach?: {
    eyebrow: string;
    headline: string;
    subhead: string;
    cards: { step: string; kicker: string; title: string; body: string; footer: string; href?: string; linkLabel?: string }[];
  };
  delivered: { headline: string; subhead: string; items: { title: string; description: string }[] };
  betterBuy?: { headline: string; subhead: string; items: { title: string; body: string }[] };
  faq: { q: string; a: string }[];
  faqSubhead: string;
  keepComparing: { kind: "Guide" | "Comparison"; title: string; body: string; href: string }[];
  finalCta: { headline: string; subhead: string };
};

/** Logo for a comparison by slug or by its /vs/ href (footer, cross-links). */
export function competitorLogo(slugOrHref: string): string | undefined {
  const slug = slugOrHref.replace(/^\/vs\//, "").replace(/\/$/, "");
  return comparisons.find((c) => c.slug === slug)?.logo;
}

export const appStoreUrl = "https://apps.shopify.com/customer-lifetime-value";

export const comparisonReviews = [
  {
    quote: "One of the best apps in the Shopify App Store. Saves hours of manual reporting.",
    name: "Kyle Hill",
    role: "Director of Paid Media, KradleMyPet",
  },
  {
    quote: "Datadrew hit the sweetspot. Nifty, to the point, quick 1:1 support and great pricing.",
    name: "Stephan Freh",
    role: "Partner, Subscription E-Commerce Brand",
  },
  {
    quote:
      "Amazing app. The reports have some great data that would be really hard to come by otherwise. 100% recommended.",
    name: "Thomas Schmidt",
    role: "Architecture & Planning Professional",
  },
];

export const reviewsLine = "Rated 5.0 on the Shopify App Store across 23 reviews.";
export const trustLine = "Join 1,000+ Shopify brands in 47+ countries analyzing over $1.5Bn+ GMV with Datadrew.";

const guideCard = {
  kind: "Guide" as const,
  title: "8 best Triple Whale alternatives for Shopify",
  body: "The wider market with real pricing and contract terms — Polar, Lifetimely, TrueProfit, Northbeam, ThoughtMetric, TrackBee and Hyros.",
  href: "/blog/triple-whale-alternatives",
};
const twCard = {
  kind: "Comparison" as const,
  title: "Datadrew vs Triple Whale",
  body: "The broad attribution and BI platform against the AI ads agent, compared band by band on published GMV pricing.",
  href: "/vs/triple-whale",
};
const nbCard = {
  kind: "Comparison" as const,
  title: "Datadrew vs Northbeam",
  body: "Enterprise multi-touch attribution priced on media spend against the AI ads agent.",
  href: "/vs/northbeam",
};
const polarCard = {
  kind: "Comparison" as const,
  title: "Datadrew vs Polar Analytics",
  body: "A BI layer with custom dashboards against an agent that delivers the answer without a build.",
  href: "/vs/polar-analytics",
};

const deliveredDefault = [
  {
    title: "The Daily Ads Brief & Diagnose Performance",
    description:
      "What you really made yesterday, after every cost, by 8am. Then ask why any number moved and get the root cause.",
  },
  {
    title: "Ad Spend Leakages & Budget Recommendations",
    description:
      "Daily checks for spend on out-of-stock products and negative-margin SKUs, then weekly recommendations on what to scale, reduce or pause, and why.",
  },
  {
    title: "LTV and retention depth",
    description:
      "Four cohort types, RFM segments that push straight to Klaviyo and Meta, plus repurchase and basket analysis.",
  },
];

export const comparisons: Comparison[] = [
  {
    slug: "triple-whale",
    logo: "/competitors/triple-whale.png",
    competitor: "Triple Whale",
    shortName: "TW",
    title: "Datadrew vs Triple Whale — Pricing & Feature Comparison 2026",
    metaDescription:
      "Datadrew vs Triple Whale on the same GMV bands: Essentials from $99/mo vs Foundation from $219/mo. Broad BI platform vs the AI ads agent for Shopify brands.",
    intro:
      "Triple Whale is the broad measurement platform, built for teams with an analyst to run it. Drew is the AI ads agent that makes and executes the daily ad-spend decisions for a lean team — grounded in real profit, reconciled to your Shopify orders overnight.",
    tiles: [
      { label: "What you optimise on", datadrew: "Real profit", competitor: "Attributed ROAS" },
      { label: "To get started", datadrew: "No site script", competitor: "Pixel + learning" },
      { label: "Entry paid plan", datadrew: "$99/mo", competitor: "$219/mo" },
    ],
    pricingLadder: {
      headline: "Same GMV bands, both ladders published",
      subhead:
        "Both scale price with annual GMV and both publish the bands — so this is a like-for-like comparison, not an estimate.",
      head: ["Annual GMV", "Datadrew Essentials", "TW Foundation"],
      rows: [
        ["Under $1M", "$99", "$219 – $429"],
        ["$1M – $2.5M", "$149", "$549"],
        ["$2.5M – $5M", "$229", "$799"],
        ["$5M – $10M", "$299 – $369", "$1,129 – $1,529"],
        ["$10M – $15M", "$489", "$1,849"],
        ["$20M and above", "Published to $50M", "Talk to sales"],
      ],
      note: "Monthly billing, USD. Datadrew Pro starts at $149/mo; Triple Whale’s Automate tier starts at $749/mo. Datadrew bills monthly with no lock-in — Triple Whale’s listed prices are 12-month subscriptions. Checked against both vendors’ pricing pages on 10 August 2026.",
    },
    features: {
      headline: "What actually differs",
      subhead: "Both connect Shopify, Meta, Google and GA4. These are the rows that change the decision.",
      groups: [
        {
          title: "Profit",
          rows: [
            {
              feature: "Profit after all costs",
              desc: "Net of product cost, shipping, fees and discounts",
              datadrew: { check: true, text: "Reconciled to Shopify orders overnight" },
              competitor: { check: true, text: "P&L with COGS" },
            },
            {
              feature: "Daily decisions delivered",
              desc: "Daily Ads Brief, Ad Spend Leakages, Budget Recommendations",
              datadrew: { check: true, text: "Arrives in Slack or email" },
              competitor: { text: "You query the platform" },
            },
          ],
        },
        {
          title: "Setup & commercials",
          rows: [
            {
              feature: "Data architecture",
              datadrew: { text: "No site script — Shopify server-side plus ad APIs" },
              competitor: { text: "Triple Pixel plus a learning period" },
            },
            { feature: "Entry paid plan", datadrew: { text: "From $99/mo" }, competitor: { text: "From $219/mo" } },
            { feature: "Contract", datadrew: { text: "Monthly, cancel anytime" }, competitor: { text: "12-month subscriptions" } },
            {
              feature: "Free trial of paid plans",
              datadrew: { check: true, text: "7 days, no card" },
              competitor: { text: "None advertised" },
            },
          ],
        },
        {
          title: "AI",
          rows: [
            {
              feature: "Scheduled AI reports",
              desc: "Analysis on a schedule, delivered to email or Slack",
              datadrew: { check: true, text: "16 templates (Pro)" },
              competitor: { check: true, text: "Moby Automations (Automate)" },
            },
            {
              feature: "Who applies the change",
              desc: "Whether the AI executes changes in your ad accounts",
              datadrew: { check: true, text: "Drew executes approved changes with guardrails (rolling out now)" },
              competitor: { check: true, text: "Moby Actions writes directly (Automate)" },
            },
            {
              feature: "Open MCP server",
              desc: "Connect Claude, ChatGPT or Cursor to your data",
              datadrew: { check: true, text: "Essentials and Pro", href: "/mcp" },
              competitor: { check: true },
            },
          ],
        },
        {
          title: "Retention depth",
          rows: [
            {
              feature: "LTV cohort analysis",
              datadrew: { text: "Time, product, location and custom" },
              competitor: { text: "Order-based cohort LTV" },
            },
            {
              feature: "RFM segments that activate",
              datadrew: { check: true, text: "Sync to Klaviyo and Meta" },
              competitor: { check: true, text: "In-dashboard" },
            },
            {
              feature: "Product intelligence",
              desc: "Repurchase, basket analysis, SKU KPIs",
              datadrew: { text: "Repurchase, basket, SKU KPIs (Pro)" },
              competitor: { text: "Product analytics" },
            },
          ],
        },
        {
          title: "Measurement depth",
          rows: [
            { feature: "Multi-touch attribution", datadrew: { dash: true }, competitor: { check: true, text: "Triple Pixel" } },
            { feature: "MMM & incrementality", datadrew: { dash: true }, competitor: { check: true, text: "Compass (Enterprise)" } },
            { feature: "BI builder & warehouse sync", datadrew: { dash: true }, competitor: { check: true } },
          ],
        },
      ],
    },
    fit: {
      headline: "Which one fits your team?",
      subhead: "",
      datadrew: [
        "You are a lean team that needs the daily ad-spend decisions made and executed, not a platform to staff",
        "You want profit after all costs, not platform-reported ROAS",
        "You want published pricing, monthly billing, and depth in LTV and product",
      ],
      competitor: [
        "Multi-touch attribution is the job you are hiring for",
        "You need media mix modeling and incrementality testing",
        "You have an analyst to run a BI builder and warehouse sync",
      ],
    },
    approach: {
      eyebrow: "Approach · How the AI work reaches you",
      headline: "Agent templates vs delivered work",
      subhead:
        "An agent you operate is still a session you open. A template you install is work that arrives finished.",
      cards: [
        {
          step: "01",
          kicker: "Switch on · Operate",
          title: "Triple Whale’s Agent Template Library",
          body: "Pre-built agents by role — media buyer, CRO, retention — that you enable inside Moby and then work with.",
          footer: "Available on Automate and above",
        },
        {
          step: "02",
          kicker: "Pick · Schedule · Delivered",
          title: "Drew AI Automations",
          body: "Sixteen ready-made templates. Pick one, set the cadence, and the finished report lands in your email or Slack — with the recommendation and the evidence attached.",
          footer: "Included on the Pro plan",
          href: "/platform/automations",
          linkLabel: "Browse the templates",
        },
      ],
    },
    delivered: {
      headline: "The daily ad-spend decisions, made and executed for you",
      subhead: "Four things that arrive on their own, on real profit. No analyst required.",
      items: deliveredDefault,
    },
    betterBuy: {
      headline: "Where Triple Whale is the better buy",
      subhead:
        "We would rather you land on the right tool than churn in month three. Three jobs Datadrew does not attempt:",
      items: [
        {
          title: "Multi-touch attribution.",
          body: "The Triple Pixel and the attribution suite around it are the core of their product. Datadrew has no first-party pixel and no channel-credit model.",
        },
        {
          title: "Media mix modeling and incrementality testing.",
          body: "Available through Compass on their Enterprise tier. Datadrew offers neither.",
        },
        {
          title: "A BI layer and a warehouse.",
          body: "Custom dashboards, a SQL editor and warehouse sync, so a data team can model on top of it.",
        },
      ],
    },
    faqSubhead: "",
    faq: [
      {
        q: "What does Datadrew cost compared to Triple Whale?",
        a: "Both price on annual GMV and both publish a ladder, so you can compare like for like. At the entry band Datadrew Essentials is $99/mo against Triple Whale Foundation at $219/mo. At $2.5M–$5M it is $229 against $799. At $10M–$15M it is $489 against $1,849. Datadrew Pro starts at $149/mo; Triple Whale’s Automate tier starts at $749/mo. Datadrew bills monthly with no lock-in, while Triple Whale’s listed prices are 12-month subscriptions. Figures checked against both vendors’ pricing pages on 10 August 2026.",
      },
      {
        q: "Can I migrate from Triple Whale to Datadrew?",
        a: "Yes, and you do not have to cut over on day one. Datadrew installs from the Shopify App Store and reads your store’s server-side data plus your ad-platform APIs, so there is no site script to add and nothing to re-tag. Connecting takes a click; allow up to 24 hours for the first full sync. Because Datadrew pulls your Shopify order history directly rather than rebuilding it from pixel events, you are not starting from zero. Most brands run both side by side for a billing cycle and compare the numbers before deciding.",
      },
      {
        q: "How does Drew AI compare to Moby?",
        a: "Both can act on your ad accounts. Moby Actions writes approved changes on Triple Whale’s Automate tier; Drew executes approved changes too — budget changes, pauses, scaling — with guardrails you control, rolling out now. The difference is where the judgment comes from: Drew knows the Shopify business behind the ads — margins, inventory, customers, history — so the Daily Ads Brief, Diagnose Performance, Ad Spend Leakages and Budget Recommendations are grounded in real profit, with every number reconciled to your Shopify orders overnight.",
      },
      {
        q: "Does Datadrew have a first-party tracking pixel like Triple Whale?",
        a: "No, and that is deliberate. Triple Whale’s Triple Pixel powers its multi-touch attribution, and if channel-credit attribution is the job you are hiring for, Triple Whale does it and Datadrew does not. Datadrew reads Shopify server-side data and your ad-platform APIs, then reconciles spend against actual orders to answer a different question: what did you really make after product cost, shipping, fees and discounts.",
      },
    ],
    keepComparing: [
      { ...guideCard, body: "The wider market with real pricing and contract terms." },
      { ...nbCard, body: "Enterprise attribution priced on media spend, against the AI ads agent." },
      { ...polarCard, body: "A BI layer you build on, against an agent that delivers the answer." },
    ],
    finalCta: {
      headline: "Ready to switch from Triple Whale?",
      subhead: "Join 1,000+ Shopify brands using Datadrew. Install from the Shopify App Store — no site script to add.",
    },
  },

  {
    slug: "northbeam",
    logo: "/competitors/northbeam.png",
    competitor: "Northbeam",
    shortName: "NB",
    title: "Datadrew vs Northbeam — Pricing & Feature Comparison 2026",
    metaDescription:
      "Datadrew vs Northbeam: enterprise multi-touch attribution from $1,500/mo vs the AI ads agent for Shopify brands that runs daily ad decisions on profit, from $99/mo.",
    intro:
      "Northbeam is the enterprise attribution stack — ML-based multi-touch, incrementality testing and media mix modeling, priced on media spend from $1,500/mo. Drew is the AI ads agent that makes and executes the daily ad-spend decisions for a lean team: what you actually made, where spend is leaking, and what to scale, reduce or pause — reconciled to your Shopify orders overnight, on published pricing from $99/mo.",
    tiles: [
      {
        label: "Entry paid plan",
        datadrew: "$99/mo",
        competitor: "$1,500/mo",
        datadrewLabel: "Datadrew Essentials",
        competitorLabel: "NB Starter",
      },
      { label: "Priced on", datadrew: "Annual GMV", competitor: "Media spend" },
      { label: "Pricing published", datadrew: "All 13 bands", competitor: "Starter only" },
    ],
    fit: {
      headline: "Which platform is right for you?",
      subhead:
        "Northbeam answers “which channel deserves the credit?”. Datadrew answers “did we actually make money, and what do I do today?”. Different jobs, priced on different things.",
      datadrew: [
        "You want profit after product cost, shipping, fees and discounts — not channel credit",
        "You need the daily decisions made and executed: the Daily Ads Brief, Ad Spend Leakages, Budget Recommendations",
        "LTV cohort analysis, RFM segmentation and product intelligence matter to you",
      ],
      competitor: [
        "You need statistical multi-touch attribution with ML models — Datadrew has none",
        "Incrementality testing and media mix modeling are central to how you buy media",
        "You are spending enough on media that a $1,500/mo floor is a rounding error",
      ],
    },
    features: {
      headline: "Feature-by-feature comparison",
      subhead: "What each platform actually does across setup, pricing, profit, attribution and retention.",
      groups: [
        {
          title: "Platform & Setup",
          rows: [
            {
              feature: "Free plan",
              desc: "A permanently free tier",
              datadrew: { check: true, text: "3 months of data, 1 shop, 10 users, 1,000 welcome AI credits" },
              competitor: { text: "None advertised" },
            },
            {
              feature: "Free trial of paid plans",
              datadrew: { check: true, text: "7 days, no card" },
              competitor: { text: "None advertised" },
            },
            {
              feature: "Data architecture",
              desc: "How each platform gets your data",
              datadrew: { text: "No site script — Shopify server-side data plus ad-platform APIs" },
              competitor: { text: "Pixel install plus implementation and model calibration" },
            },
            {
              feature: "Priced on",
              datadrew: { text: "Annual GMV — 13 bands, all published" },
              competitor: { text: "Media spend — Starter published, rest by quote" },
            },
            {
              feature: "Entry paid plan",
              datadrew: { text: "From $99/mo (Essentials)" },
              competitor: { text: "From $1,500/mo (Starter)" },
            },
            {
              feature: "Contract",
              datadrew: { text: "Monthly, cancel anytime; annual optional" },
              competitor: { text: "Month-to-month on Starter; annual terms above" },
            },
          ],
        },
        {
          title: "AI & Automation",
          rows: [
            {
              feature: "AI agent",
              desc: "Ask questions in plain English, get charts and recommendations",
              datadrew: { text: "Drew AI" },
              competitor: { text: "None advertised" },
            },
          ],
        },
        {
          title: "LTV & Retention",
          rows: [
            {
              feature: "LTV Cohort Analysis",
              desc: "4 types: time-based, product, location, and custom cohorts",
              datadrew: { text: "Deep (4 cohort types)" },
              competitor: { dash: true },
            },
            {
              feature: "RFM segmentation",
              desc: "Recency-Frequency-Monetary scoring with pre-built segments",
              datadrew: { check: true, text: "+ sync to Klaviyo and Meta" },
              competitor: { dash: true },
            },
            {
              feature: "Product intelligence",
              desc: "Repurchase analysis, basket analysis, full-funnel SKU KPIs",
              datadrew: { text: "Repurchase, basket, SKU KPIs (Pro)" },
              competitor: { text: "Ad-focused product analytics" },
            },
          ],
        },
        {
          title: "Attribution & Measurement",
          rows: [
            {
              feature: "Multi-Touch Attribution",
              desc: "ML-based statistical attribution across ad channels",
              datadrew: { text: "Blended ROAS" },
              competitor: { check: true, text: "ML-based MTA" },
            },
            { feature: "Incrementality Testing", datadrew: { dash: true }, competitor: { check: true } },
            { feature: "Media Mix Modeling", datadrew: { dash: true }, competitor: { check: true } },
          ],
        },
        {
          title: "Integrations & Data",
          rows: [
            { feature: "Klaviyo", datadrew: { check: true, text: "+ segment sync" }, competitor: { dash: true } },
            {
              feature: "Profit after all costs",
              desc: "Revenue net of product cost, shipping, fees and discounts",
              datadrew: { check: true, text: "Reconciled to Shopify orders overnight" },
              competitor: { dash: true },
            },
            {
              feature: "Open MCP server",
              desc: "Connect Claude, ChatGPT or Cursor directly to your data",
              datadrew: { check: true, text: "Essentials and Pro", href: "/mcp" },
              competitor: { dash: true },
            },
          ],
        },
      ],
    },
    delivered: {
      headline: "The daily ad-spend decisions, made and executed for you",
      subhead:
        "Not an attribution model to calibrate and interpret. Four decisions that arrive on their own, on real profit — reconciled to your Shopify orders overnight. No analyst required.",
      items: [
        deliveredDefault[0],
        deliveredDefault[1],
        { ...deliveredDefault[2], title: "LTV and retention intelligence" },
      ],
    },
    faqSubhead: "Common questions about choosing Datadrew over Northbeam.",
    faq: [
      {
        q: "What does Datadrew cost compared to Northbeam?",
        a: "Northbeam prices on media spend: Starter from $1,500/mo, with Professional and Enterprise quoted. Datadrew prices on annual GMV and publishes all 13 bands — Essentials from $99/mo, Pro from $149/mo, monthly with no lock-in, plus a free plan and a 7-day trial.",
      },
      {
        q: "How does Datadrew's attribution compare to Northbeam's?",
        a: "Northbeam does statistical multi-touch attribution, incrementality testing and media mix modeling. Datadrew does not compete there — it reconciles spend against actual Shopify orders to show profit after all costs.",
      },
      {
        q: "Is Datadrew suitable for brands spending heavily on ads?",
        a: "Yes, the ladder runs to $50M annual GMV. But if your main need is statistical attribution across a large media budget, Northbeam is purpose-built for it. Plenty of large brands run both.",
      },
      {
        q: "How long does it take to set up Datadrew compared to Northbeam?",
        a: "Connecting takes a click and there is no site script to add. Allow up to 24 hours for the first full sync. Northbeam needs implementation support, a pixel and a calibration period.",
      },
    ],
    keepComparing: [guideCard, twCard, polarCard],
    finalCta: {
      headline: "Make and execute better ad-spend decisions, every day",
      subhead: "Join 1,000+ Shopify brands using Datadrew. Install from the Shopify App Store — no site script to add.",
    },
  },

  {
    slug: "polar-analytics",
    logo: "/competitors/polar-analytics.png",
    competitor: "Polar Analytics",
    shortName: "Polar",
    title: "Datadrew vs Polar Analytics — Pricing & Feature Comparison 2026",
    metaDescription:
      "Datadrew vs Polar Analytics: Polar prices by quote behind a demo; Datadrew publishes all 13 GMV bands from $99/mo, with deeper LTV cohorts and an agent that answers.",
    intro:
      "Polar is a BI layer — a data stack you build dashboards on, priced by quote behind a demo. Drew is the AI ads agent that makes and executes the daily ad-spend decisions for a lean team: what you actually made, where spend is leaking, and what to scale, reduce or pause — reconciled to your Shopify orders overnight, on pricing you can read before you talk to anyone.",
    tiles: [
      { label: "Entry paid plan", datadrew: "$99/mo", competitor: "Quote only", datadrewLabel: "Datadrew Essentials", competitorLabel: "Polar" },
      { label: "AI Agent", datadrew: "Drew AI", competitor: "Ask Polar" },
      { label: "Pricing published", datadrew: "All 13 bands", competitor: "Book a demo" },
    ],
    fit: {
      headline: "Which platform is right for you?",
      subhead:
        "Polar is a data infrastructure platform. Datadrew is an AI ads agent. The best choice depends on whether you need data breadth or the daily ad-spend decisions made for you.",
      datadrew: [
        "You want deeper LTV analysis with 4 cohort types (Polar offers basic only)",
        "Product intelligence matters (repurchase analysis, basket analysis, SKU KPIs)",
        "You need RFM segments that activate in Klaviyo and Meta, not just sit in a dashboard",
      ],
      competitor: [
        "You need 45+ data integrations and broad data infrastructure",
        "First-party pixel tracking is essential for your attribution strategy",
        "You want a BI builder with custom dashboards your team designs and maintains",
      ],
    },
    features: {
      headline: "Feature-by-feature comparison",
      subhead:
        "Both platforms connect your data. Datadrew goes further with deeper LTV analysis, product intelligence, and actionable segments.",
      groups: [
        {
          title: "Platform & Setup",
          rows: [
            { feature: "Free Plan", datadrew: { check: true }, competitor: { dash: true } },
            {
              feature: "Entry paid plan",
              datadrew: { text: "From $99/mo (Essentials), $149/mo (Pro)" },
              competitor: { text: "Not published — quote after a demo" },
            },
            {
              feature: "Pricing model",
              datadrew: { text: "GMV-tiered, published — 13 bands to $50M" },
              competitor: { text: "Scales with GMV; figures demo-gated" },
            },
          ],
        },
        {
          title: "AI & Automation",
          rows: [
            {
              feature: "AI Agent",
              desc: "Conversational analysis with charts and recommendations",
              datadrew: { text: "Drew AI (multi-source)" },
              competitor: { text: "Ask Polar" },
            },
          ],
        },
        {
          title: "LTV & Retention",
          rows: [
            {
              feature: "LTV Cohort Analysis",
              desc: "4 types: time-based, product, location, and custom cohorts",
              datadrew: { text: "Deep (4 cohort types)" },
              competitor: { text: "Basic" },
            },
            {
              feature: "Product Cohorts",
              desc: "Segment customers by first product purchased for LTV analysis",
              datadrew: { check: true },
              competitor: { dash: true },
            },
            {
              feature: "RFM Segmentation",
              desc: "Recency-Frequency-Monetary scoring with pre-built segments",
              datadrew: { check: true, text: "+ Klaviyo Sync" },
              competitor: { text: "Limited" },
            },
            { feature: "Purchase Frequency Heatmap", datadrew: { check: true }, competitor: { dash: true } },
          ],
        },
        {
          title: "Product Intelligence",
          rows: [
            {
              feature: "Product Intelligence",
              desc: "Repurchase analysis, full-funnel SKU KPIs, hero product identification",
              datadrew: { text: "Repurchase, Basket, SKU KPIs" },
              competitor: { dash: true },
            },
            { feature: "Basket Analysis", datadrew: { check: true }, competitor: { dash: true } },
          ],
        },
        {
          title: "Integrations & Data",
          rows: [
            { feature: "Integration Count", datadrew: { text: "6+ key platforms" }, competitor: { text: "45+ sources" } },
            {
              feature: "MCP / external AI access",
              desc: "Connect Claude, ChatGPT or Cursor directly to your data",
              datadrew: { check: true, text: "Essentials and Pro", href: "/mcp" },
              competitor: { check: true, text: "Polar Headless MCP" },
            },
            { feature: "First-Party Pixel", datadrew: { dash: true }, competitor: { check: true } },
          ],
        },
      ],
    },
    delivered: {
      headline: "Why growing brands choose Datadrew",
      subhead:
        "Polar is a solid data platform. Datadrew is purpose-built for the insights and actions that actually drive Shopify growth.",
      items: [
        {
          title: "Pricing you can read before a call",
          description:
            "Essentials from $99/mo, Pro from $149/mo, across 13 published GMV bands, billed monthly. Polar quotes you after a demo — so you cannot compare until you are already in a sales cycle.",
        },
        {
          title: "Deeper product and LTV analysis",
          description:
            "Four LTV cohort types, repurchase analysis, basket analysis for bundles, and full-funnel SKU KPIs.",
        },
        {
          title: "Actionable segments, not just data",
          description:
            "RFM segments that sync straight to Klaviyo and Meta, so a segment becomes a campaign instead of a chart.",
        },
      ],
    },
    faqSubhead: "Common questions about switching from Polar Analytics to Datadrew.",
    faq: [
      {
        q: "Can I migrate from Polar Analytics to Datadrew?",
        a: "Yes. Datadrew installs from the Shopify App Store and pulls your history directly from Shopify and your connected platforms — no migration needed. Allow up to 24 hours for the first full sync. You can run both side by side during the transition.",
      },
      {
        q: "How does Drew AI compare to Ask Polar?",
        a: "Both are conversational assistants and both ship an MCP server. The difference is what they return: Ask Polar queries the stack you built; Drew makes the daily ad-spend decisions with the evidence attached — grounded in the Shopify business behind the ads — and executes approved changes with guardrails you control, rolling out now.",
      },
      {
        q: "Polar has 45+ integrations — does Datadrew have enough?",
        a: "Datadrew goes deep on the sources that drive Shopify profit rather than offering a builder. If you need niche integrations, Polar's 45+ library is more comprehensive.",
      },
      {
        q: "Is Datadrew worth the switch if I'm already paying for Polar?",
        a: "If you need LTV depth, product intelligence and segments you can activate, Datadrew delivers more there, with every band published. If you rely on Polar's integrations or BI builder, Polar is stronger.",
      },
    ],
    keepComparing: [guideCard, twCard, nbCard],
    finalCta: {
      headline: "Get deeper insights at a better price",
      subhead: "More LTV depth, product intelligence, and an AI ads agent. Start free on Shopify today.",
    },
  },

  {
    slug: "lifetimely",
    logo: "/competitors/lifetimely.png",
    competitor: "Lifetimely",
    title: "Datadrew vs Lifetimely — Pricing & Feature Comparison 2026",
    metaDescription:
      "Datadrew vs Lifetimely (by AMP): Lifetimely prices on monthly orders and does LTV and P&L well. Datadrew is the AI ads agent for Shopify, priced on GMV from $99/mo.",
    intro:
      "Lifetimely (by AMP) does LTV projections and P&L reporting well, priced on your monthly order count. Drew is the AI ads agent that makes and executes the daily ad-spend decisions for a lean team — what you actually made, where spend is leaking, and what to scale, reduce or pause — with the same cohort depth underneath, priced on annual GMV from $99/mo.",
    tiles: [
      { label: "Analytics Scope", datadrew: "Full Funnel", competitor: "LTV Focus" },
      { label: "AI Agent", datadrew: "Drew AI", competitor: "Ask Amp" },
      { label: "Cohort Types", datadrew: "4 Types", competitor: "1 Type" },
    ],
    fit: {
      headline: "Which platform is right for you?",
      subhead:
        "Lifetimely is a solid LTV tool. Datadrew is an AI ads agent built on full-funnel business context. The right choice depends on what you need.",
      datadrew: [
        "You have outgrown LTV-only analytics and need full-funnel intelligence",
        "You want AI that queries across Shopify, Meta, Google Ads, GA4, and Klaviyo",
        "You need 4 types of LTV cohorts instead of 1",
      ],
      competitor: [
        "LTV projections and P&L reporting are your primary use case",
        "You need built-in profit-and-loss dashboards with COGS tracking",
        "You prefer a simpler, LTV-focused tool without multi-channel analytics",
      ],
    },
    features: {
      headline: "Feature-by-feature comparison",
      subhead: "Lifetimely does LTV well. Datadrew does LTV and everything else you need to grow.",
      groups: [
        {
          title: "Platform & Setup",
          rows: [
            {
              feature: "Free plan",
              desc: "A permanently free tier, and what it includes",
              datadrew: { check: true, text: "3 months of data, 1 shop, 10 users, 1,000 welcome AI credits" },
              competitor: { check: true, text: "Up to 50 orders/month" },
            },
            {
              feature: "Free trial of paid plans",
              datadrew: { check: true, text: "7 days, no card" },
              competitor: { check: true, text: "14 days" },
            },
            {
              feature: "Priced on",
              datadrew: { text: "Annual GMV — 13 bands, all published" },
              competitor: { text: "Monthly orders — tiers published" },
            },
            {
              feature: "Entry paid plan",
              datadrew: { text: "From $99/mo (Essentials), $149/mo (Pro)" },
              competitor: { text: "Tiered by order volume; $149/mo at 501–3,000 orders" },
            },
            {
              feature: "Contract",
              datadrew: { text: "Monthly, cancel anytime; annual optional" },
              competitor: { text: "Monthly" },
            },
            { feature: "Scheduled Reports", datadrew: { check: true }, competitor: { check: true } },
          ],
        },
        {
          title: "AI & Automation",
          rows: [
            {
              feature: "AI Agent",
              desc: "Conversational analysis across all connected data sources",
              datadrew: { text: "Drew AI (multi-source)" },
              competitor: { text: "Ask Amp (basic)" },
            },
          ],
        },
        {
          title: "LTV & Retention",
          rows: [
            {
              feature: "LTV Cohort Analysis",
              desc: "Group customers by first purchase and track value over time",
              datadrew: { check: true },
              competitor: { check: true },
            },
            {
              feature: "Product Cohorts",
              desc: "Segment customers by first product purchased for LTV analysis",
              datadrew: { check: true },
              competitor: { dash: true },
            },
            { feature: "Location Cohorts", datadrew: { check: true }, competitor: { dash: true } },
            { feature: "Custom Cohorts", datadrew: { check: true }, competitor: { dash: true } },
            {
              feature: "RFM Segmentation",
              desc: "Recency-Frequency-Monetary scoring with pre-built segments",
              datadrew: { check: true, text: "+ Klaviyo Sync" },
              competitor: { text: "Limited" },
            },
            { feature: "LTV Projections", datadrew: { text: "AI-powered" }, competitor: { check: true } },
          ],
        },
        {
          title: "Product Intelligence",
          rows: [
            {
              feature: "Product Intelligence",
              desc: "Repurchase analysis, basket analysis, full-funnel SKU KPIs",
              datadrew: { text: "Repurchase, Basket, SKU KPIs" },
              competitor: { dash: true },
            },
          ],
        },
        {
          title: "Financial & Reporting",
          rows: [{ feature: "P&L Reporting", datadrew: { dash: true }, competitor: { check: true } }],
        },
      ],
    },
    delivered: {
      headline: "Why brands outgrow Lifetimely",
      subhead:
        "Lifetimely is great for LTV tracking alone. But growing brands need the full picture — acquisition, product intelligence, and AI that connects the dots across every data source.",
      items: [
        {
          title: "Full-funnel, not just LTV",
          description:
            "Repurchase and basket analysis, blended acquisition dashboards for Meta and Google, and profit after every cost — not just LTV.",
        },
        {
          title: "Drew AI goes deeper",
          description:
            "Drew AI queries Shopify, Meta, Google Ads, GA4 and Klaviyo together. Ask “which campaigns bring back high-LTV customers?” and get the answer with the evidence, not just data. On every plan — 1,000 welcome credits on Free, 3,000/mo on Essentials, 7,500/mo on Pro.",
        },
        {
          title: "Segments that activate",
          description:
            "RFM segments that push straight to Klaviyo and Meta, so a segment becomes a campaign instead of a dashboard view.",
        },
      ],
    },
    faqSubhead: "Common questions about switching from Lifetimely to Datadrew.",
    faq: [
      {
        q: "Can I migrate from Lifetimely to Datadrew?",
        a: "Yes. Datadrew installs from the Shopify App Store and pulls your Shopify history directly — no export or import. Allow up to 24 hours for the first full sync. You can run both side by side and compare before switching.",
      },
      {
        q: "How do Datadrew's LTV cohorts compare to Lifetimely's?",
        a: "Lifetimely does time-based cohorts. Datadrew does four — time, product (by first product bought), location, and custom by any tag.",
      },
      {
        q: "Both have free plans — what is the difference?",
        a: "Both include basic LTV cohorts. Datadrew's free plan adds 1,000 welcome Drew AI credits, new vs returning analysis and retention dashboards.",
      },
      {
        q: "When should I upgrade from Lifetimely to Datadrew?",
        a: "When you need more than LTV tracking — which campaigns bring back high-LTV customers, which products drive repeats, or segments you can activate.",
      },
    ],
    keepComparing: [guideCard, twCard, nbCard],
    finalCta: {
      headline: "Get LTV depth and so much more",
      subhead: "Everything Lifetimely does, plus full-funnel intelligence. Start free today.",
    },
  },
];

export function getComparison(slug: string) {
  return comparisons.find((c) => c.slug === slug);
}
