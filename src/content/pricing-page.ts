/* /pricing — ported from datadrew.io/pricing (live copy "Last updated: May
 * 2026"; ladder from pricing/pricing.js, which cites
 * help.datadrew.io/en/articles/12276124-pricing-plans-datadrew-ai).
 * Monthly USD per rolling-12-month GMV band. Yearly = 2 months free
 * (round(monthly × 10 / 12) per month, billed annually). Drew AI credits:
 * Free fixed 1,000 one-time; paid = ceil(monthly/10)×10 × 30 (Essentials)
 * or × 50 (Pro) — mirrors the backend formula the live page uses. */

export type GmvBand = { label: string; essentials: number | null; pro: number | null };

export const gmvBands: GmvBand[] = [
  { label: "<$250k", essentials: 99, pro: 149 },
  { label: "$250k – $500k", essentials: 99, pro: 149 },
  { label: "$500k – $1M", essentials: 99, pro: 149 },
  { label: "$1M – $2.5M", essentials: 149, pro: 199 },
  { label: "$2.5M – $5M", essentials: 229, pro: 339 },
  { label: "$5M – $7.5M", essentials: 299, pro: 369 },
  { label: "$7.5M – $10M", essentials: 369, pro: 449 },
  { label: "$10M – $15M", essentials: 489, pro: 579 },
  { label: "$15M – $20M", essentials: 649, pro: 779 },
  { label: "$20M – $30M", essentials: 799, pro: 949 },
  { label: "$30M – $40M", essentials: 1100, pro: 1300 },
  { label: "$40M – $50M", essentials: 1350, pro: 1600 },
  { label: "$50M+", essentials: null, pro: null },
];

export const FREE_CREDITS = 1000;
export const creditMultiplier = { essentials: 30, pro: 50 } as const;

export function yearlyPerMonth(monthly: number | null) {
  if (monthly === null || monthly === 0) return monthly;
  return Math.round((monthly * 10) / 12);
}

export function planCredits(plan: "free" | "essentials" | "pro", monthly: number | null) {
  if (plan === "free") return FREE_CREDITS;
  if (monthly === null) return null;
  return Math.ceil(monthly / 10) * 10 * creditMultiplier[plan];
}

export type PlanId = "free" | "essentials" | "pro";

export type PlanCard = {
  id: PlanId;
  name: string;
  tagline: string;
  creditsLabel: (credits: string) => string;
  lead?: string;
  groups: { title?: string; items: string[] }[];
  cta: { label: string; href: string };
  popular?: boolean;
};

export const planCards: PlanCard[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Jump in — no credit card required",
    creditsLabel: (c) => `${c} Drew AI welcome credits`,
    groups: [
      {
        items: [
          "Historical data — last 3 months",
          "Core analytics",
          "Blended ads summary",
          "LTV cohort analysis",
          "Basic customer segments",
          "Standard store performance",
        ],
      },
      { title: "Supporting", items: ["10 users", "Unlimited ad accounts"] },
    ],
    cta: { label: "Start for free", href: "https://app.datadrew.io" },
  },
  {
    id: "essentials",
    name: "Essentials",
    tagline: "Built for fast growing Shopify brands",
    creditsLabel: (c) => `${c} Drew AI credits / month`,
    lead: "Everything in Free, plus:",
    popular: true,
    groups: [
      { items: ["Historical data — all time"] },
      {
        title: "Retention",
        items: [
          "Advanced cohort analysis (with filters & breakdowns)",
          "RFM segmentation",
          "Segment sync to Klaviyo",
          "Retention benchmarks",
        ],
      },
      { title: "Acquisition", items: ["Campaign analysis across Meta Ads & Google Ads", "Website performance (GA4)"] },
      {
        title: "Plus, you get",
        items: [
          "Unlimited ad accounts",
          "Scheduled reports",
          "CSV data exports",
          "Multi-store support",
          "Datadrew MCP (connect Claude, Cursor & more)",
        ],
      },
      { title: "Supporting", items: ["Unlimited users", "Setup assistance", "Extended customer success"] },
    ],
    cta: { label: "Start for free", href: "https://app.datadrew.io" },
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For large product catalog Shopify brands",
    creditsLabel: (c) => `${c} Drew AI credits / month`,
    lead: "Everything in Essentials, plus:",
    groups: [
      { items: ["Historical data — all time"] },
      { title: "Product intelligence", items: ["Product performance", "Basket analysis", "Product repurchase rate"] },
      { title: "Drew AI", items: ["Drew AI Automations (scheduled reports & alerts)", "Deep analysis mode"] },
      { title: "Supporting", items: ["1:1 growth consulting for 1 month"] },
    ],
    cta: { label: "Book a demo", href: "/book" },
  },
];

export const pricingPage = {
  eyebrow: "Pricing",
  headline: "Plans for the AI ads agent for Shopify brands",
  subhead: "Zero hidden fees. Pure value. Grow confidently.",
  updated: "Last updated: May 2026",
  trust: ["Data encrypted at rest & in transit", "7-day free trial", "1,000+ brands trust us", "Cancel anytime"],
  gmvLabel: "GMV in last 12 months",
  billing: { monthly: "Monthly", yearly: "Yearly", save: "Save 2 months" },
  plansHeadline: "Pricing plans for Shopify brands",
  help: {
    headline: "Not sure which plan is right for you?",
    body: "Most Shopify brands start with the free plan to see their blended performance in one place, then upgrade to Essentials when they need RFM segments, Klaviyo sync, and campaign-level reporting. Pro is ideal for brands with large catalogs that need product repurchase and basket analysis.",
    primary: { label: "Start free, upgrade later", href: "https://app.datadrew.io" },
    secondary: { label: "Talk to our team", href: "/book" },
  },
  testimonial: {
    quote:
      "It is so easy to use. I'm not a tech person just a business owner. This was an eye opener and I highly recommend it...for a start-up and bigger ecomm businesses its perfect...thankyou!",
    name: "Finola Fegan",
    role: "CEO, Finca Skin Organics",
  },
  experts: {
    headline: "Get in touch with our industry experts today",
    body: "Let our experienced team help you clarify your next steps. Personalized walkthrough, custom strategy, and integration setup assistance.",
    cta: { label: "Book a demo", href: "/book" },
  },
};

/* "Compare all features" table. "✓" renders as a check; "—" as a dash. */
export const compareTable: { group: string; rows: { label: string; note?: string; cells: [string, string, string] }[] }[] = [
  {
    group: "Analytics",
    rows: [
      { label: "Customer LTV analysis", cells: ["Basic", "Full", "Full + Product LTV"] },
      { label: "Cohort analysis", cells: ["Basic (3-month)", "All-time + Filters", "All-time + Custom"] },
      { label: "Blended ads summary", cells: ["✓", "✓", "✓"] },
      { label: "Store performance", cells: ["Standard", "✓", "✓"] },
      { label: "RFM segmentation", cells: ["—", "✓", "✓"] },
      { label: "Retention benchmarks", cells: ["—", "✓", "✓"] },
      { label: "Product intelligence", cells: ["—", "—", "✓"] },
      { label: "Basket analysis", cells: ["—", "—", "✓"] },
      { label: "Product repurchase rate", cells: ["—", "—", "✓"] },
    ],
  },
  {
    group: "Acquisition",
    rows: [
      { label: "Meta Ads campaigns", cells: ["—", "✓", "✓"] },
      { label: "Google Ads campaigns", cells: ["—", "✓", "✓"] },
      { label: "GA4 website performance", cells: ["—", "✓", "✓"] },
      { label: "Hourly performance tracking", cells: ["—", "✓", "✓"] },
    ],
  },
  {
    group: "Integrations & exports",
    rows: [
      { label: "Shopify (one-click)", cells: ["✓", "✓", "✓"] },
      { label: "Ad accounts", cells: ["Unlimited", "Unlimited", "Unlimited"] },
      { label: "Klaviyo segment sync", cells: ["—", "✓", "✓"] },
      { label: "Multi-store support", cells: ["—", "✓", "✓"] },
      { label: "Scheduled reports", cells: ["—", "✓", "✓"] },
      { label: "CSV data exports", cells: ["—", "✓", "✓"] },
    ],
  },
  { group: "Data & history", rows: [{ label: "Historical data", cells: ["3 months", "All-time", "All-time"] }] },
  {
    group: "Drew AI",
    rows: [
      { label: "Drew AI access", cells: ["Limited", "✓", "✓"] },
      {
        label: "Drew AI credits",
        note: "Free: one-time welcome grant. Paid plans: monthly, scales with your GMV tier.",
        cells: ["1,000 (one-time)", "From 3,000 / month", "From 7,500 / month"],
      },
      { label: "Real-time data queries", cells: ["—", "✓", "✓"] },
      { label: "Auto-generated charts", cells: ["—", "✓", "✓"] },
      { label: "Deep analysis mode", cells: ["—", "—", "✓"] },
      { label: "Drew AI Automations", note: "Scheduled reports & AI-generated alerts", cells: ["—", "—", "✓"] },
    ],
  },
  {
    group: "Support",
    rows: [
      { label: "Users", cells: ["10", "Unlimited", "Unlimited"] },
      { label: "Setup assistance", cells: ["—", "✓", "✓"] },
      { label: "Customer success", cells: ["—", "Extended", "Extended"] },
      { label: "1:1 growth consulting", cells: ["—", "—", "1 month"] },
    ],
  },
];

export const pricingFaq = [
  { q: "Is my data safe with your platform?", a: "Yes, absolutely. We take data security very seriously. Your data is encrypted in transit and at rest, and we follow industry best practices for security. We never share your data with third parties. Our infrastructure is hosted on secure cloud providers with SOC 2 compliance." },
  { q: "Can I add a second Shopify store to my account?", a: "Yes! With our Essentials and Pro plans, you can connect unlimited Shopify stores to a single account. Multi-store support lets Drew work across all your stores from one account." },
  { q: "Is there a trial period to test your product?", a: "Yes, we offer a 7-day free trial on our Essentials and Pro plans so you can explore all the features before committing. No credit card required. You can also use our Free plan indefinitely with the core features." },
  { q: "Can I cancel my subscription at any time?", a: "Yes, you can cancel your subscription at any time. We believe in flexibility and don't lock you into long-term contracts. If you cancel, you'll retain access until the end of your current billing period." },
  { q: "How can I manage my subscription?", a: "You can manage your subscription directly through our in-app chat support or by emailing us at support@datadrew.io. Our team is always happy to help with any billing or account changes." },
  { q: "How is my GMV tier calculated?", a: "Your GMV (Gross Merchandise Value) tier is based on your rolling last 12 months of Shopify sales. It's calculated automatically from your connected Shopify store — you don't need to enter it manually. As your store grows, your plan moves to the next tier so pricing stays fair and aligned to the value you're getting." },
  { q: "What happens when I run out of Drew AI credits?", a: "If you exhaust your monthly Drew AI credits, Drew AI will pause further queries until your next monthly reset. You can also purchase top-up credit bundles anytime from your billing page to continue without waiting. Your Drew AI credit allowance refreshes on the 1st of every month, and scales automatically with your GMV tier on paid plans." },
  { q: "Can I switch plans mid-cycle?", a: "Yes, you can upgrade or downgrade your plan at any time directly from the billing page. Upgrades take effect immediately and are prorated — you only pay the difference for the remainder of your billing cycle. Downgrades take effect at the end of your current billing period so you keep the features you've paid for." },
  { q: "What integrations are included?", a: "All paid plans include integrations with Shopify, Meta Ads (Facebook & Instagram), Google Ads, Google Analytics 4, and Klaviyo. Connections are one-click OAuth — no technical setup required. Free, Essentials, and Pro all support unlimited ad accounts. See our full integrations list." },
  { q: "Do you offer a discount for annual billing?", a: "Yes. Pay annually and get 2 months free — you pay for 10 months and get 12. You can switch between monthly and annual billing at any time from the billing page." },
  { q: "What's the difference between Essentials and Pro?", a: "Essentials is built for fast-growing brands who need full retention analysis (RFM segmentation, cohort analysis, Klaviyo sync) and campaign-level acquisition reporting across Meta Ads, Google Ads, and GA4. Pro adds product intelligence (product performance, basket analysis, repurchase rate), Drew AI Automations, deep analysis mode in Drew AI, and 1:1 growth consulting — ideal for brands with large product catalogs or that want hands-off, AI-driven insights delivered automatically." },
];
