/* /pricing — mirrors datadrew.io/pricing (live pricing/pricing.js, "Datadrew
 * Pricing Master v5.1, 5 Sep 2026"). Three tiers: Free (your data, in your AI)
 * / AI Intelligence (your analyst) / AI Ads CoPilot (your media buyer —
 * access reviewed per account, never self-serve checkout). Monthly USD per
 * rolling-12-month GMV band. Yearly = 2 months free (round(monthly × 10 / 12)
 * per month, billed annually). Drew credits: Free fixed 1,000 one-time; paid
 * = ceil(monthly/10)×10 × 30 for both paid tiers — the backend formula. MCP
 * is free to connect on every plan and MCP reads use zero credits. */

export type PlanId = "free" | "intelligence" | "copilot";
export type GmvBand = { label: string; intelligence: number | null; copilot: number | null };

export const gmvBands: GmvBand[] = [
  { label: "<$250k", intelligence: 99, copilot: 249 },
  { label: "$250k – $500k", intelligence: 99, copilot: 249 },
  { label: "$500k – $1M", intelligence: 99, copilot: 299 },
  { label: "$1M – $2.5M", intelligence: 149, copilot: 399 },
  { label: "$2.5M – $5M", intelligence: 229, copilot: 679 },
  { label: "$5M – $7.5M", intelligence: 299, copilot: 749 },
  { label: "$7.5M – $10M", intelligence: 369, copilot: 899 },
  { label: "$10M – $15M", intelligence: 489, copilot: 1149 },
  { label: "$15M – $20M", intelligence: 649, copilot: 1549 },
  { label: "$20M – $30M", intelligence: 799, copilot: null },
  { label: "$30M – $40M", intelligence: 1100, copilot: null },
  { label: "$40M – $50M", intelligence: 1350, copilot: null },
  { label: "$50M+", intelligence: null, copilot: null },
];

/** Default band shown on load — the entry of the ICP (same as live). */
export const DEFAULT_BAND = 2;

export const FREE_CREDITS = 1000;
export const CREDIT_MULTIPLIER = 30;

export function yearlyPerMonth(monthly: number | null) {
  if (monthly === null || monthly === 0) return monthly;
  return Math.round((monthly * 10) / 12);
}

export function planCredits(plan: PlanId, monthly: number | null) {
  if (plan === "free") return FREE_CREDITS;
  if (monthly === null) return null;
  return Math.ceil(monthly / 10) * 10 * CREDIT_MULTIPLIER;
}

export type PlanCard = {
  id: PlanId;
  kicker: string;
  name: string;
  tagline: string;
  creditsLabel: (credits: string) => string;
  lead?: string;
  groups: { title?: string; items: string[] }[];
  footer: string;
  cta: { label: string; href: string };
  /** Shown under the CTA — used on CoPilot to say exactly how access works. */
  ctaNote?: string;
  /** Copy for bands where the price is `null`. */
  customLabel?: string;
  customNote?: string;
  popular?: boolean;
};

export const planCards: PlanCard[] = [
  {
    id: "free",
    kicker: "Start with your data",
    name: "Free",
    tagline: "Your Shopify and ads data, in the AI you already use.",
    creditsLabel: (c) => `${c} welcome credits · one time`,
    groups: [
      {
        title: "Datadrew MCP",
        items: ["Your connected data in Claude or ChatGPT", "Live dashboards · Prompt library", "MCP reads use zero Drew credits"],
      },
      { title: "Connected data", items: ["Shopify · Meta Ads · Google Ads · GA4 · Klaviyo"] },
      { title: "Core dashboards", items: ["Shopify store performance", "Blended ads summary"] },
      { title: "Try Drew", items: ["Analysis and recommendations with 1,000 one-time welcome credits"] },
      { title: "Support", items: ["Help centre · Email support"] },
    ],
    footer: "3 months of history · Daily refresh · Up to 10 teammates · Unlimited ad accounts",
    cta: { label: "Start free", href: "https://app.datadrew.io" },
    ctaNote: "No credit card required.",
  },
  {
    id: "intelligence",
    kicker: "Add Drew's intelligence",
    name: "AI Intelligence",
    tagline: "Know what to scale, what to fix and what to test next.",
    creditsLabel: (c) => `${c} Drew credits / month`,
    lead: "Everything in Free, plus:",
    popular: true,
    groups: [
      {
        title: "Ask Drew · your AI ads agent",
        items: [
          "Diagnose changes, compare performance and get next-step recommendations — grounded in your store, ads, customers, products and creative history",
          "Charts, reports and shareable artifacts",
          "Brand context & memory: products, margins, promotions and past decisions",
        ],
      },
      { title: "Datadrew MCP", items: ["Datadrew's computed creative, product and cohort insights in Claude or ChatGPT"] },
      { title: "Creatives", items: ["Creative leaderboard · Track creative concepts · Track competitor ads"] },
      { title: "Product intelligence", items: ["Product performance · Basket analysis · Product LTV & repurchase"] },
      { title: "Retention", items: ["Cohort analysis · Customer segments (incl. RFM) · Retention benchmarks"] },
      {
        title: "Automations",
        items: ["Daily Ads Brief · Spend spike alerts · Weekly summaries to Slack or email", "16+ templates, or describe any workflow in plain English"],
      },
      { title: "Drew in Slack", items: ["Ask @Drew in a thread · Charts and recommendations in the channel"] },
      { title: "Support", items: ["Setup assistance · Extended customer success"] },
    ],
    footer: "All history · Hourly refresh · Unlimited teammates",
    cta: { label: "Try free for 7 days", href: "https://app.datadrew.io" },
    ctaNote: "No credit card required.",
    customLabel: "Custom",
    customNote: "Custom pricing above $50M GMV",
  },
  {
    id: "copilot",
    kicker: "Hand over the execution",
    name: "AI Ads CoPilot",
    tagline: "Your AI media buyer, from insight to approved action.",
    creditsLabel: (c) => `${c} Drew credits / month`,
    lead: "Everything in AI Intelligence, plus:",
    groups: [
      {
        title: "Ads execution · Meta Ads + Google Ads",
        items: ["Approved budget changes · Pauses · Campaign updates", "Drew proposes, you approve, Drew applies — inside the controls agreed with you"],
      },
      {
        title: "Product performance management",
        items: ["Create and optimise product sets and groups in catalog ads across Meta and Google"],
      },
      { title: "Approval controls", items: ["Approval workflows · Budget guardrails · Margin floors"] },
      { title: "Automations", items: ["Everything in AI Intelligence, plus execution workflows"] },
      { title: "Audience activation", items: ["Customer segments to Klaviyo and Meta audiences, included"] },
      { title: "Support", items: ["Guided onboarding · Extended customer success"] },
    ],
    footer: "All history · Hourly refresh · Unlimited teammates",
    cta: { label: "Request access", href: "https://calendly.com/sumit-growth/discussion" },
    ctaNote: "Access is reviewed account by account. No checkout, no card. We reply within two business days.",
    customLabel: "Talk to us",
    customNote: "Custom pricing above $20M GMV",
  },
];

export const pricingPage = {
  eyebrow: "Pricing",
  headline: "Pricing that scales with the impact Drew drives.",
  subhead: "Start free, no card. Pick your plan by the work you hand over, and your band by your Shopify sales.",
  updated: "Last updated: September 2026",
  trust: ["1,000+ Shopify brands", "$1.5Bn+ GMV analysed", "5.0★ Shopify App Store", "Cancel anytime"],
  gmvLabel: "Annual Shopify sales",
  gmvHelp:
    "Choose your rolling last 12 months of Shopify sales. Your plan is a flat fee for that band; pricing and monthly credits update together.",
  billing: { monthly: "Monthly", yearly: "Yearly", save: "2 months free" },
  plansHeadline: "Flat fee for your GMV band. Credits grow with your plan.",
  cardsNote:
    "Monthly USD, banded by rolling 12-month GMV. Yearly billing = 2 months free. 7-day free trial on AI Intelligence, no card required. AI Ads CoPilot access is reviewed per account.",
  /* The "is this worth it" frame, before the tiers. A media buyer is the
   * honest comparison: this is the job Drew does, and the market rate is
   * public. No outcome claim is made. */
  roi: {
    headline: "A fraction of a media buyer. None of the contract.",
    body: "The daily ads-management loop — brief, diagnosis, leakage checks, budget calls — is a media buyer's job. Freelance and agency media buying for a Shopify brand typically runs $2,000–$8,000 a month plus a percentage of spend. Drew starts at $99, monthly, banded by your GMV rather than your ad budget.",
  },
  help: {
    headline: "Which plan is right for me?",
    items: [
      { plan: "Free", body: "if you want your store and ads data inside the AI you already use." },
      {
        plan: "AI Intelligence",
        body: "if you run paid ads and want Drew to tell you what to scale, fix and test — in Slack and in your AI.",
      },
      {
        plan: "AI Ads CoPilot",
        body: "if you want Drew to make the approved changes in Meta and Google, with guardrails.",
      },
    ],
    primary: { label: "Start free, upgrade later", href: "https://app.datadrew.io" },
    secondary: { label: "Talk to our team", href: "https://calendly.com/sumit-growth/discussion" },
  },
  agencies: {
    headline: "Running growth for multiple brands?",
    body: "Manage multiple Shopify stores from one account, standardise client reporting, give every store its own brand context and keep each client's data and access separate. Custom portfolio pricing and onboarding for agencies managing multiple stores.",
    primary: { label: "Talk to us about agency access", href: "https://calendly.com/sumit-growth/discussion" },
    secondary: { label: "Agency partner programme", href: "/partners/become-a-partner" },
  },
  testimonial: {
    quote:
      "It is so easy to use. I'm not a tech person just a business owner. This was an eye opener and I highly recommend it...for a start-up and bigger ecomm businesses its perfect...thankyou!",
    name: "Finola Fegan",
    role: "CEO, Finca Skin Organics",
  },
  experts: {
    headline: "Not sure which band or plan you're in?",
    body: "Book a 30-minute walkthrough. We'll look at your store, your ad accounts and your team, and tell you plainly which plan fits — including whether CoPilot access makes sense for you yet.",
    cta: { label: "Book a demo", href: "https://calendly.com/sumit-growth/discussion" },
  },
};

/* "Compare every plan" table. "✓" renders as a check; "—" as a dash. */
export const compareTable: { group: string; rows: { label: string; note?: string; cells: [string, string, string] }[] }[] = [
  {
    group: "Drew, your AI ads agent",
    rows: [
      {
        label: "Drew credits",
        note: "Free: one-time welcome grant. Paid plans: monthly allowance that scales with your GMV band. MCP reads use zero credits.",
        cells: ["1,000 (one-time)", "From 3,000 / month", "From 7,500 / month"],
      },
      { label: "Ask Drew — diagnose, compare, recommend", cells: ["With welcome credits", "✓", "✓"] },
      { label: "Brand context & memory", cells: ["With welcome credits", "✓", "✓"] },
      { label: "Charts, reports & shareable artifacts", cells: ["With welcome credits", "✓", "✓"] },
      { label: "Creative briefs & scripts with Drew", note: "Meta Ads only, in beta", cells: ["—", "✓", "✓"] },
      { label: "Drew in Slack", cells: ["—", "✓", "✓"] },
    ],
  },
  {
    group: "Datadrew MCP for Claude & ChatGPT",
    rows: [
      { label: "Your connected data in your AI", note: "Shopify, Meta Ads, Google Ads, GA4 and Klaviyo reads. Zero Drew credits.", cells: ["✓", "✓", "✓"] },
      { label: "Datadrew's computed insights", note: "Creative, product and cohort intelligence", cells: ["—", "✓", "✓"] },
      { label: "Execution playbooks", cells: ["—", "—", "✓"] },
      { label: "Live dashboards & prompt library", cells: ["✓", "✓", "✓"] },
    ],
  },
  {
    group: "Intelligence",
    rows: [
      { label: "Dashboards", cells: ["Store performance · Blended ads", "Every dashboard", "Every dashboard"] },
      { label: "Creatives — leaderboard, concepts, competitor ads", cells: ["—", "✓", "✓"] },
      { label: "Product intelligence — performance, baskets, repurchase", cells: ["—", "✓", "✓"] },
      { label: "Retention — cohorts, segments incl. RFM, benchmarks", cells: ["—", "✓", "✓"] },
      { label: "Automations — Daily Ads Brief, alerts, summaries", cells: ["—", "✓", "✓ + execution workflows"] },
    ],
  },
  {
    group: "Execution",
    rows: [
      { label: "Ads execution — Meta Ads + Google Ads agents", note: "Approved budget changes, pauses, campaign updates", cells: ["—", "—", "✓"] },
      { label: "Product performance management in catalog ads", cells: ["—", "—", "✓"] },
      { label: "Approval workflows · Budget guardrails · Margin floors", cells: ["—", "—", "✓"] },
      { label: "Audience activation — segments to Klaviyo & Meta", cells: ["—", "Add-on", "✓"] },
    ],
  },
  {
    group: "Data & team",
    rows: [
      { label: "Historical data", cells: ["3 months", "All history", "All history"] },
      { label: "Data refresh", cells: ["Daily", "Hourly", "Hourly"] },
      { label: "Teammates", cells: ["Up to 10", "Unlimited", "Unlimited"] },
      { label: "Ad accounts", cells: ["Unlimited", "Unlimited", "Unlimited"] },
    ],
  },
  {
    group: "Support",
    rows: [
      { label: "Help centre · Email support", cells: ["✓", "✓", "✓"] },
      { label: "Setup assistance · Extended customer success", cells: ["—", "✓", "✓"] },
      { label: "Guided onboarding", cells: ["—", "—", "✓"] },
    ],
  },
];

export const compareColumns = ["Free", "AI Intelligence", "AI Ads CoPilot"] as const;

export const pricingFaq = [
  {
    q: "What's the difference between Free, AI Intelligence and AI Ads CoPilot?",
    a: "Every plan sees Drew's recommendations; the difference is how much of the work Drew does. Free puts your data in your AI: 3 months of history, daily refresh, core dashboards, and Datadrew MCP so Claude or ChatGPT can read your Shopify and ads data. AI Intelligence makes Drew your analyst: all-time history, hourly refresh, every dashboard (cohort LTV, RFM, product, creative and acquisition intelligence), Drew AI Automations for scheduled reports and alerts, and a monthly Drew credit allowance from 3,000. AI Ads CoPilot makes Drew your media buyer: everything in AI Intelligence plus one-click Apply, so Drew makes the approved change in Meta Ads and Google Ads within the guardrails you set. Everyone sees the recommendations; only CoPilot applies them.",
  },
  {
    q: "What exactly can Drew execute today on AI Ads CoPilot?",
    a: "Approved budget changes, pauses and campaign updates in Meta Ads and Google Ads, plus product sets and groups in catalog ads. Drew proposes the change with the evidence, you approve it, and Drew applies it inside approval workflows, budget guardrails and margin floors you set. Ads execution is enabled account by account, so CoPilot is not self-serve and there is no checkout for it: request access with your store URL, monthly ad spend and channels, and we review every account individually and reply within two business days.",
  },
  {
    q: "Does Drew make changes to my ad accounts?",
    a: "On AI Ads CoPilot, yes. Drew proposes the change (a budget move, a pause, a scale-up or scale-down, a campaign update), you approve it, and Drew makes it in Meta Ads or Google Ads within the guardrails you set. On Free and AI Intelligence, Drew recommends and you make the change yourself. Drew never executes without an approval path, and knowing when not to touch an account is part of its judgment.",
  },
  {
    q: "Is Datadrew MCP free? Can I use Claude or ChatGPT with my data on the Free plan?",
    a: "Yes. Connecting Claude, ChatGPT, Cursor or any MCP client to your own connected data is free on every plan, including Free, and MCP reads never use Drew credits. Free gives your AI real-time reads of Shopify, Meta Ads, Google Ads, GA4 and Klaviyo with 3 months of history. AI Intelligence adds the analyst layer: cohort LTV, RFM, product performance, blended MER and CAC, benchmarks, all-time history and Drew's analyst playbooks in-session. AI Ads CoPilot adds execution playbooks.",
  },
  {
    q: "What are Drew AI Automations?",
    a: "Recurring analyses that run on a schedule and land in Slack or email: the Daily Ads Brief, spend-spike and revenue-drop alerts, weekly and monthly summaries. Start from one of 16+ templates or describe the job in plain English, set the schedule and delivery, and Drew runs it. Automations are included with AI Intelligence and AI Ads CoPilot. Each run uses Drew credits from your monthly allowance.",
  },
  {
    q: "Why not just connect ChatGPT or Claude to my ad account?",
    a: "You can, and on Free that is exactly what Datadrew MCP is for. We built the server, and the data access is free. A chat session with your data is a good analyst. What it lacks is what compounds: the brand context Drew keeps across sessions (your margins, inventory, promotions, what you've already tried), the daily loop that runs unasked (the Daily Ads Brief, alerts, leakages) and, on AI Ads CoPilot, the ability to make the approved change with guardrails. Start with your data in your AI; upgrade when you want the analyst and the media buyer.",
  },
  {
    q: "How is my GMV tier calculated?",
    a: "Your GMV (Gross Merchandise Value) tier is based on your rolling last 12 months of Shopify sales. It is calculated automatically from your connected Shopify store; you don't need to enter it manually. As your store grows, your plan moves to the next tier so pricing stays aligned to the value you're getting. Pricing is a flat monthly fee for your band; it does not track your ad spend or the number of users.",
  },
  {
    q: "What happens when I run out of Drew credits?",
    a: "Free includes a one-time welcome grant of 1,000 Drew credits. AI Intelligence and AI Ads CoPilot include a monthly allowance that scales with your GMV band, from 3,000 and 7,500 credits a month respectively, refreshed on the 1st of every month. If you use them up, Drew pauses further queries until the reset, or you can buy a top-up credit pack from your billing page at any time. MCP reads never use credits.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. AI Intelligence comes with a 7-day free trial so you can explore every feature before committing, and the Free plan needs no credit card and can be used indefinitely. AI Ads CoPilot is access-reviewed rather than trialled: request access and we'll qualify your account.",
  },
  {
    q: "Do you offer a discount for annual billing?",
    a: "Yes. Pay annually and get 2 months free: you pay for 10 months and get 12. You can switch between monthly and annual billing at any time from the billing page.",
  },
  {
    q: "Can I cancel my subscription at any time?",
    a: "Yes. There are no 12-month contracts. Cancel from the billing page and you keep access until the end of your current billing period.",
  },
  {
    q: "Is my data safe with Datadrew?",
    a: "Yes. Your data is encrypted in transit and at rest, hosted on SOC 2-compliant cloud infrastructure, and never sold or shared with third parties. Drew's MCP access is OAuth-scoped to your workspace and read-only.",
  },
];
