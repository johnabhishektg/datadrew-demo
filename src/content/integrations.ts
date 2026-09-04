/* Integrations catalogue. Mirrors app.datadrew.io/integrations as of 4 Sep 2026
 * (30 connectors + the two surfaces, Slack and Datadrew MCP). Logos are the
 * same assets the app ships, copied to /public/integrations. `stage` carries
 * the in-app Beta / Alpha labels verbatim — we'd rather be precise than
 * impressive. Update here when a connector ships or changes stage. */

export type IntegrationStage = "ga" | "beta" | "alpha";

export type Integration = {
  slug: string;
  name: string;
  logo: string;
  description: string;
  stage: IntegrationStage;
  /** Shown in the homepage 3×2 grid. Exactly six should be true. */
  featured?: boolean;
  /** Logo file is a wide lockup rather than a square mark. */
  wide?: boolean;
};

export type IntegrationCategory = {
  id: string;
  title: string;
  blurb: string;
  items: Integration[];
};

export const integrationsPage = {
  eyebrow: "Integrations",
  headline: "Every tool Drew can see.",
  subhead:
    "Drew's judgment is only as good as its context. Connect your store, ad accounts, email, reviews, subscriptions and fulfilment — and every recommendation reasons from the whole business, not just the ad account.",
  connectCta: { label: "Connect in the app", href: "https://app.datadrew.io/integrations" },
  requestCta: {
    label: "Request an integration",
    href: "mailto:support@datadrew.io?subject=Integration%20request",
  },
  finePrint:
    "All connections are OAuth or API-key based and read-only. Beta and Alpha labels match what you'll see in the app.",
};

export const integrationsSection = {
  eyebrow: "Integrations",
  headline: ["Bring the whole", "business along."],
  subhead:
    "Drew connects to the tools you already run on — 30+ sources across commerce, ads, email, reviews, subscriptions and fulfilment — so its ad decisions carry your margins, stock and customers, not just platform ROAS.",
  cta: { label: "View all integrations", href: "/integrations" },
};

export const integrationCategories: IntegrationCategory[] = [
  {
    id: "commerce-ads",
    title: "Commerce & ads",
    blurb: "The backbone: your store, your channels and the analytics behind them.",
    items: [
      {
        slug: "shopify",
        name: "Shopify",
        logo: "/integrations/shopify-logo.svg",
        description: "Orders, products, margins, inventory and customers — the business behind the ads.",
        stage: "ga",
        featured: true,
      },
      {
        slug: "meta-ads",
        name: "Meta Ads",
        logo: "/integrations/meta-logo.svg",
        description: "Campaigns, ad sets, creatives and spend, reasoned with Meta-specific playbooks.",
        stage: "ga",
        featured: true,
      },
      {
        slug: "google-ads",
        name: "Google Ads",
        logo: "/integrations/google-ads-logo.png",
        description: "Search, Shopping and PMax performance, judged against your real product economics.",
        stage: "ga",
        featured: true,
      },
      {
        slug: "google-analytics",
        name: "Google Analytics (GA4)",
        logo: "/integrations/google-analytics-logo.png",
        description: "Sessions, channels and on-site behavior to separate ad signal from site noise.",
        stage: "ga",
        featured: true,
      },
      {
        slug: "google-search-console",
        name: "Google Search Console",
        logo: "/integrations/google-search-console.svg",
        description: "Queries, impressions and clicks — what organic already covers before you pay for it.",
        stage: "ga",
      },
      {
        slug: "amazon-seller",
        name: "Amazon Seller",
        logo: "/integrations/amazon-seller-logo.svg",
        description: "Orders, revenue and financial events via SP-API, next to your Shopify numbers.",
        stage: "ga",
        featured: true,
      },
      {
        slug: "amazon-ads",
        name: "Amazon Ads",
        logo: "/integrations/amazon-ads-logo.svg",
        description: "Sponsored Products, Brands and Display spend alongside Meta and Google.",
        stage: "alpha",
        wide: true,
      },
      {
        slug: "unicommerce",
        name: "Unicommerce",
        logo: "/integrations/unicommerce-logo.png",
        description: "Multi-channel inventory and orders across Indian marketplaces and warehouses.",
        stage: "ga",
        wide: true,
      },
    ],
  },
  {
    id: "marketing",
    title: "Email, SMS & marketing",
    blurb: "Owned channels, so paid decisions account for what retention is already doing.",
    items: [
      {
        slug: "klaviyo",
        name: "Klaviyo",
        logo: "/integrations/klaviyo-logo.svg",
        description: "Campaign and flow revenue, segments and profiles feeding retention analysis.",
        stage: "ga",
        featured: true,
      },
      {
        slug: "attentive",
        name: "Attentive",
        logo: "/integrations/attentive-logo.png",
        description: "SMS campaign and journey performance next to your paid spend.",
        stage: "beta",
      },
      {
        slug: "postscript",
        name: "Postscript",
        logo: "/integrations/postscript-logo.png",
        description: "SMS subscribers, campaigns and attributed revenue.",
        stage: "beta",
      },
      {
        slug: "omnisend",
        name: "Omnisend",
        logo: "/integrations/omnisend-logo.png",
        description: "Email and SMS automations, campaigns and contact growth.",
        stage: "beta",
      },
      {
        slug: "drip",
        name: "Drip",
        logo: "/integrations/drip-logo.png",
        description: "Email campaigns, workflows and revenue by segment.",
        stage: "beta",
      },
      {
        slug: "brevo",
        name: "Brevo",
        logo: "/integrations/brevo-logo.png",
        description: "Email and SMS campaign performance, contacts and transactional stats.",
        stage: "beta",
      },
      {
        slug: "wati",
        name: "Wati",
        logo: "/integrations/wati-logo.png",
        description: "WhatsApp broadcasts and conversations as a retention channel.",
        stage: "beta",
        wide: true,
      },
      {
        slug: "referralcandy",
        name: "ReferralCandy",
        logo: "/integrations/referralcandy-logo.png",
        description: "Referral programme reach and referred revenue.",
        stage: "beta",
      },
    ],
  },
  {
    id: "reviews",
    title: "Reviews",
    blurb: "Product sentiment, so creative and budget calls know which products customers rate.",
    items: [
      {
        slug: "yotpo",
        name: "Yotpo",
        logo: "/integrations/yotpo-logo.png",
        description: "Ratings, review volume and sentiment by product.",
        stage: "beta",
      },
      {
        slug: "okendo",
        name: "Okendo",
        logo: "/integrations/okendo-logo.png",
        description: "Reviews, attributes and UGC signals per product.",
        stage: "beta",
      },
      {
        slug: "judgeme",
        name: "Judge.me",
        logo: "/integrations/judgeme-logo.png",
        description: "Store rating, review counts and recent reviews.",
        stage: "beta",
      },
      {
        slug: "stamped",
        name: "Stamped",
        logo: "/integrations/stamped-logo.png",
        description: "Reviews and ratings alongside product performance.",
        stage: "beta",
      },
    ],
  },
  {
    id: "loyalty",
    title: "Loyalty",
    blurb: "Points, tiers and redemptions in the repeat-behavior math.",
    items: [
      {
        slug: "smile-io",
        name: "Smile.io",
        logo: "/integrations/smile-io-logo.png",
        description: "Programme members, points activity and redemptions.",
        stage: "beta",
      },
      {
        slug: "loyaltylion",
        name: "LoyaltyLion",
        logo: "/integrations/loyaltylion-logo.png",
        description: "Loyalty tiers, rewards and member purchase behavior.",
        stage: "beta",
      },
    ],
  },
  {
    id: "subscriptions",
    title: "Subscriptions",
    blurb: "Recurring revenue, so acquisition spend is judged on real lifetime value.",
    items: [
      {
        slug: "recharge",
        name: "Recharge",
        logo: "/integrations/recharge-logo.png",
        description: "Subscribers, charges, plans and churn in your retention view.",
        stage: "beta",
      },
      {
        slug: "skio",
        name: "Skio",
        logo: "/integrations/skio-logo.png",
        description: "Subscriptions, orders and cancel-flow sessions.",
        stage: "alpha",
      },
    ],
  },
  {
    id: "fulfilment",
    title: "Shipping & fulfilment",
    blurb: "Delivery reality — so Drew doesn't scale ads on stock that can't ship.",
    items: [
      {
        slug: "shipstation",
        name: "ShipStation",
        logo: "/integrations/shipstation-logo.png",
        description: "Shipments, carriers and fulfilment speed by order.",
        stage: "beta",
      },
      {
        slug: "shipbob",
        name: "ShipBob",
        logo: "/integrations/shipbob-logo.png",
        description: "3PL inventory levels and fulfilment status.",
        stage: "beta",
      },
      {
        slug: "aftership",
        name: "AfterShip",
        logo: "/integrations/aftership-logo.png",
        description: "Tracking status, delivery estimates and exceptions.",
        stage: "alpha",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    blurb: "What actually landed in the bank.",
    items: [
      {
        slug: "stripe",
        name: "Stripe",
        logo: "/integrations/stripe-logo.png",
        description: "Charges, payouts, refunds and disputes next to Shopify revenue.",
        stage: "beta",
      },
    ],
  },
  {
    id: "support-returns",
    title: "Support & returns",
    blurb: "Post-purchase friction that eats margin after the sale.",
    items: [
      {
        slug: "gorgias",
        name: "Gorgias",
        logo: "/integrations/gorgias-logo.png",
        description: "Ticket volume and topics as a signal on products and campaigns.",
        stage: "beta",
      },
      {
        slug: "loop-returns",
        name: "Loop Returns",
        logo: "/integrations/loop-returns-logo.png",
        description: "Return and exchange rates by product and reason.",
        stage: "beta",
      },
    ],
  },
  {
    id: "surfaces",
    title: "Where Drew works",
    blurb: "Not data sources — the places Drew shows up once it knows your business.",
    items: [
      {
        slug: "slack",
        name: "Slack",
        logo: "/integrations/slack-logo.svg",
        description: "The Daily Ads Brief, alerts and approvals inside your team's workspace.",
        stage: "beta",
      },
      {
        slug: "datadrew-mcp",
        name: "Datadrew MCP",
        logo: "/brand/datadrew-square.svg",
        description: "Your live store and ads data inside Claude, ChatGPT, Cursor and any MCP client.",
        stage: "ga",
      },
    ],
  },
];

export const allIntegrations = integrationCategories.flatMap((c) => c.items);
export const featuredIntegrations = allIntegrations.filter((i) => i.featured);
/* Connectors only — Slack and MCP are surfaces, so this matches the app's "All 30". */
export const integrationCount = integrationCategories
  .filter((c) => c.id !== "surfaces")
  .reduce((n, c) => n + c.items.length, 0);

export const stageLabel: Record<IntegrationStage, string | null> = {
  ga: null,
  beta: "Beta",
  alpha: "Alpha",
};
