/* Platform pages — /platform/<slug>. Copy ported from the live datadrew.io
 * pages (Sep 2026) and rendered through one shared pattern
 * (src/components/site/platform-sections.tsx). Every visual is sample data:
 * no real customer accounts, no screenshots. Positioning v8: "the AI ads
 * agent for Shopify brands"; execution is "rolling out now"; Meta + Google
 * are the only ad channels named. */

export type Kpi = { label: string; value: string; delta?: string; down?: boolean };

export type PlatformVisual =
  | { kind: "table"; title: string; caption?: string; head: string[]; rows: string[][]; note?: string }
  | { kind: "kpis"; title?: string; caption?: string; items: Kpi[]; table?: { head: string[]; rows: string[][] } }
  | { kind: "heatmap"; title: string; caption?: string; cols: string[]; rows: { label: string; cells: (number | null)[] }[] }
  | { kind: "bars"; title: string; caption?: string; items: { label: string; value: number; display: string; sub?: string }[]; note?: string }
  | { kind: "segments"; title: string; caption?: string; items: { name: string; count: string; share: string }[]; footer?: string }
  | { kind: "bundles"; title: string; caption?: string; items: { name: string; products: string[]; frequency: string; aov: string }[] }
  | { kind: "cards"; title: string; caption?: string; items: { tag: string; tone?: "scale" | "iterate" | "kill" | "wait" | "neutral" | "alert"; title: string; body: string; meta?: string }[]; footer?: string }
  | { kind: "keyvals"; title: string; caption?: string; items: { k: string; v: string }[]; table?: { head: string[]; rows: string[][] } }
  | { kind: "timeline"; title: string; caption?: string; items: { time: string; title: string; tag: string; tone?: "alert" | "neutral" | "rec"; body: string; kpis?: Kpi[] }[]; footer?: string }
  | { kind: "recommendation"; title: string; source: string; headline: string; body: string; kpis: Kpi[]; footer?: string }
  | { kind: "velocity"; title: string; caption?: string; items: { label: string; value: number; display: string; you?: boolean }[]; max: number; note: string }
  | { kind: "chat"; question: string; answer: string[]; insight?: string };

export type DrewPrompt = { q: string; answer: string[]; insight?: string };

export type PlatformSection =
  | { type: "split"; eyebrow: string; headline: string; body?: string; bullets?: string[]; visual: PlatformVisual; flip?: boolean }
  | { type: "features"; eyebrow?: string; headline: string; subhead?: string; items: { title: string; description: string; tag?: string }[]; columns?: 2 | 3 }
  | { type: "steps"; eyebrow?: string; headline: string; subhead?: string; steps: { title: string; description: string }[]; note?: string }
  | { type: "stats"; eyebrow?: string; headline: string; stats: { value: string; label: string; sub?: string }[] }
  | { type: "drew"; eyebrow?: string; headline: string; subhead?: string; prompts: DrewPrompt[] }
  | { type: "callout"; eyebrow?: string; headline: string; body?: string; cards: { title: string; body: string }[]; checklist?: string[]; visual?: PlatformVisual }
  | { type: "groups"; eyebrow?: string; headline: string; subhead?: string; groups: { title: string; items: string[] }[] }
  | { type: "templates"; eyebrow?: string; headline: string; subhead?: string; groups: { title: string; items: { kind: "Report" | "Alert"; schedule: string; title: string; body: string }[] }[]; note?: string }
  | { type: "links"; headline: string; items: { label: string; href: string; kicker?: string }[] };

export type PlatformPage = {
  slug: string;
  nav: string;
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  note?: string;
  heroVisual?: PlatformVisual | { kind: "demo"; prompts: DrewPrompt[] };
  sections: PlatformSection[];
  faq: { q: string; a: string }[];
  closing: { headline: string; body: string };
};

const startFree = { label: "Start free", href: "https://app.datadrew.io" };
const bookDemo = { label: "Book a demo", href: "https://calendly.com/sumit-growth/discussion" };
export const platformCtas = { startFree, bookDemo };

/* ---------------------------------------------------------------- Drew AI */
const drewai: PlatformPage = {
  slug: "drewai",
  nav: "Drew AI",
  title: "Drew AI — The AI Ads Agent for Shopify Brands",
  description:
    "Drew AI is the AI ads agent for Shopify brands: it knows your margins, stock and customers, not just your ad account, and makes better ad decisions daily.",
  eyebrow: "AI ads agent",
  headline: "Drew AI — the AI ads agent for Shopify brands",
  subhead:
    "An AI ads agent with the judgment of an experienced media buyer — because Drew knows your business, not just your ad account. It reads your products, margins, inventory, customers and history alongside your Meta and Google accounts, and it makes and executes better ad-spend decisions, every day — to grow paid advertising profitably.",
  note: "Last updated · Aug 2026",
  heroVisual: {
    kind: "demo",
    prompts: [
      {
        q: "What is my blended ROAS across all channels for the last 30 days?",
        answer: [
          "Blended ROAS is 3.1x on $48.2K spend — up from 2.8x the prior 30 days.",
          "Meta 3.4x on $29.6K · Google 2.7x on $18.6K. Contribution margin after product cost, shipping and fees: 31%.",
        ],
        insight: "Google Search is carrying Google's blended number — PMax alone is 1.6x. Worth a look before scaling Google.",
      },
      {
        q: "Which Meta ad creative has the lowest CPA this month?",
        answer: [
          "Summer UGC — $18.40 CPA on $4,820 spend, 5.4x Meta-reported ROAS, hook rate 42%.",
          "Next best: Before/After Static at $24.10, then Founder Story Reel at $31.60 (link CTR down 34% from its peak).",
        ],
        insight: "Summer UGC is at frequency 1.8 with CTR still at its peak — there is headroom to scale.",
      },
      {
        q: "What is the LTV of customers acquired through Meta vs Google?",
        answer: [
          "90-day LTV: Meta $86 (CAC $24, 3.6x) · Google Search $94 (CAC $31, 3.0x) · Google PMax $56 (CAC $52, 1.1x).",
          "Meta customers repeat at 34%; Google Search at 41%; PMax at 11%.",
        ],
        insight: "PMax is buying one-time buyers. Shift its budget toward Search and Meta prospecting.",
      },
      {
        q: "Which products have the highest repurchase rate in the last 6 months?",
        answer: [
          "1. Daily Moisturizer — 68% repeat rate, 3,240 orders",
          "2. Vitamin C Serum — 54% repeat rate, 2,180 orders",
          "3. SPF 50 Sunscreen — 41% repeat rate, 1,890 orders",
        ],
        insight: "Daily Moisturizer drives the most loyal customers. Bundle it with Vitamin C Serum to lift AOV.",
      },
    ],
  },
  sections: [
    {
      type: "steps",
      eyebrow: "How it works",
      headline: "From question to insight in seconds",
      subhead:
        "Drew AI uses a multi-agent architecture with specialized skills to analyze your data and deliver answers you can act on.",
      steps: [
        {
          title: "Ask a question",
          description:
            "Type any business question in plain English. Ask about ad performance, customer segments, product performance, or revenue trends. No SQL, no dashboards to build.",
        },
        {
          title: "Drew AI analyzes",
          description:
            "Drew AI routes your question to the right specialized skill, generates optimized queries, and pulls data from all your connected sources in real time.",
        },
        {
          title: "Get instant insights",
          description:
            "Receive clear answers with auto-generated charts, data tables, and actionable recommendations. Drew AI streams responses so you see results as they happen.",
        },
      ],
    },
    {
      type: "callout",
      eyebrow: "Core workflows",
      headline: "Make and execute better ad-spend decisions, every day",
      body:
        "Drew runs the five core workflows of expert paid-ads management across your Meta and Google accounts: Daily Ads Brief, Diagnose Performance, Ad Spend Leakages, Budget Recommendations — and Execute Ads Changes, rolling out now.",
      cards: [
        {
          title: "01 · Start with the Daily Ads Brief",
          body: "Every morning, Drew's Daily Ads Brief covers what changed across Meta and Google and what needs attention today — and its Ad Spend Leakages checks flag the budget that's quietly not earning its keep.",
        },
        {
          title: "02 · Diagnose, then recommend",
          body: "When performance moves, Drew runs root-cause diagnosis against the business behind the ads — products, margins, inventory, customers — and turns it into Budget Recommendations: what to scale, reduce or pause, with the evidence and expected impact.",
        },
        {
          title: "03 · Approve, and Drew executes",
          body: "Execute Ads Changes is rolling out now: Drew increasingly executes the changes you approve — budget changes, pauses, scaling and descaling — with guardrails, and every opportunity stays tracked so nothing slips through a busy week.",
        },
      ],
      checklist: [
        "You're always in control — every change starts as a recommendation you can take, adapt, or skip. Drew executes only what you approve, within guardrails, and every action is logged.",
        "Graded on real profit — Drew does not optimize ROAS in isolation. Across Meta and Google it uses the economics of your Shopify business, contribution margin from real orders, to grow ads profitably.",
      ],
    },
    {
      type: "features",
      eyebrow: "Capabilities",
      headline: "Specialized skills, one conversation",
      subhead:
        "Drew knows your business deeply — and has learned from thousands of similar ad decisions across Shopify brands. It understands not only what performed, but what is limiting the next level of profitable spend. These analytical skills are the inputs behind every ad-spend decision it makes.",
      items: [
        { title: "Cross-channel analysis", description: "Blended performance across Meta, Google, GA4, and Shopify. See true ROAS, CAC, and revenue attribution in one view." },
        { title: "Ad platform deep dive", description: "Campaign, adset, and creative-level analysis for Meta and Google Ads. Identify winners, cut waste, and optimize spend allocation." },
        { title: "Customer intelligence", description: "RFM segmentation, LTV analysis, cohort behavior, and new vs. existing customer breakdowns powered by your Shopify data." },
        { title: "Product performance", description: "Product performance, repurchase rates, basket analysis, and category-level metrics. Find which SKUs drive growth and retention." },
        { title: "Website performance", description: "GA4 session data, conversion funnels, traffic sources, and landing page performance. Understand what drives visitors to buy." },
        { title: "Revenue intelligence", description: "Revenue trends, store overview, sales velocity, and forecasting. Get a complete picture of your business health at any time." },
      ],
    },
    {
      type: "features",
      eyebrow: "Access",
      headline: "Works wherever you work",
      subhead: "Drew AI meets you in the tools you already use — your dashboard, your Slack workspace, or your AI tools.",
      items: [
        { title: "In-app dashboard", description: "Chat with Drew AI directly inside your Datadrew dashboard. Ask any question about your store, campaigns, or customers and get instant answers with charts and tables.", tag: "All plans" },
        { title: "Slack", description: "Mention @Drew in any Slack channel and Drew AI replies in-thread with charts and recommendations. No need to open another tab or switch context.", tag: "AI Intelligence & CoPilot" },
        { title: "AI tools via MCP", description: "Connect Drew AI to Claude, ChatGPT, Cursor, and other MCP-compatible AI tools via mcp.datadrew.io. Ask questions about your Shopify store directly inside your AI assistant — no tab switching.", tag: "Every plan · free" },
      ],
    },
    {
      type: "groups",
      eyebrow: "Real questions",
      headline: "Questions you can ask Drew AI",
      subhead: "Here are some of the real questions Shopify brands are asking Drew AI every day.",
      groups: [
        {
          title: "Marketing & ads",
          items: [
            "What is my blended ROAS across all channels for the last 30 days?",
            "Which Meta ad creative has the lowest CPA this month?",
            "Show me Google Ads campaigns where spend is up but conversions are down",
            "Where should I shift my ad budget to maximize returns?",
          ],
        },
        {
          title: "Customers & retention",
          items: [
            "What is the LTV of customers acquired through Meta vs Google?",
            "Show me my RFM segments and which ones are growing",
            "What percentage of my revenue comes from repeat customers?",
            "Which cohort has the best 90-day retention rate?",
          ],
        },
        {
          title: "Products & revenue",
          items: [
            "Which products have the highest repurchase rate in the last 6 months?",
            "What are my top product bundles by AOV?",
            "Show me products where adspend is high but ROAS is below 2x",
            "What is my revenue trend week over week for this quarter?",
          ],
        },
      ],
    },
    {
      type: "links",
      headline: "Drew works on a schedule too",
      items: [
        { kicker: "Drew AI Automations", label: "Reports and alerts, delivered while you're away", href: "/platform/automations" },
        { kicker: "Integrations", label: "Works with your entire stack — Shopify, Meta, Google, GA4, Klaviyo and more", href: "/integrations" },
      ],
    },
  ],
  faq: [
    {
      q: "How does Drew AI work?",
      a: "Drew AI is built on a multi-agent architecture with specialized analytical skills. When you ask a question in plain English, it identifies the right skill, generates optimized database queries, pulls data from your connected sources (Shopify, Meta Ads, Google Ads, GA4, Google Search Console, Klaviyo, Amazon, Unicommerce, and more), and delivers a clear answer with auto-generated visualizations. Responses are streamed in real time so you see results as they are generated. And Drew doesn't only answer when asked: it can run reports and alerts on a schedule (Drew AI Automations, delivered to email or Slack) — so every recommendation is grounded in your real numbers. The longer Drew works with your brand, the more it understands how your business operates and how your team wants ads managed.",
    },
    {
      q: "Can Drew AI make changes to my ad campaigns?",
      a: "Yes — execution is rolling out now. Drew increasingly executes the changes you approve — budget changes, pauses, scaling and descaling — with guardrails, across Meta and Google. Every change starts as a clear recommendation with the numbers that justify it: you approve, Drew executes, and every action is logged. Nothing runs without your say-so, and you can always take a recommendation to the ad platform yourself instead.",
    },
    {
      q: "Is the data accurate?",
      a: "Yes. Drew AI queries your actual data directly — it does not guess or hallucinate numbers. Every answer is grounded in your real Shopify orders, ad platform metrics, and analytics data. The AI generates precise SQL queries against your connected data sources, and you can always verify the underlying numbers in your Datadrew dashboards.",
    },
    {
      q: "What data sources does Drew AI support?",
      a: "Drew AI works with every data source connected to your Datadrew account: Shopify, Meta Ads (campaigns, adsets, creatives), Google Ads (campaigns, keywords), Google Analytics 4, Google Search Console, Klaviyo, Amazon (Seller and Ads), Unicommerce (multi-channel marketplaces), and other connected platforms. Cross-channel analysis combines data from multiple sources to give you a blended view.",
    },
    {
      q: "Is Drew AI included in all plans?",
      a: "Drew AI is available on all plans. Free plan users get a one-time welcome grant of 1,000 credits to try it out. AI Intelligence and AI Ads CoPilot include monthly Drew credits that scale with your GMV band (from 3,000 and 7,500 a month). AI Ads CoPilot adds execution: approved changes applied in Meta and Google with guardrails. Visit the pricing page for full details.",
    },
    {
      q: "Can I use Drew AI from Slack?",
      a: "Yes. Install the Datadrew Slack app once, then mention @Drew in any channel. Drew AI replies in-thread with charts and recommendations — no need to open the dashboard. Available on AI Intelligence and AI Ads CoPilot.",
    },
    {
      q: "Can I connect Drew AI to Claude, Cursor, or other AI tools?",
      a: "Yes. Datadrew provides a public MCP server at mcp.datadrew.io that works with any MCP-compatible AI tool — Claude Desktop, Claude.ai, Cursor, ChatGPT, and more. Connect once via OAuth and your AI assistant can answer questions about your Shopify store, ad campaigns, and customer data without switching tabs. Available on every plan, including Free.",
    },
  ],
  closing: {
    headline: "Put Drew AI to work today",
    body: "Install Datadrew from the Shopify App Store and get your first answers in minutes — then wake up to your Daily Ads Brief and approve the changes Drew executes. No setup, no SQL, no spreadsheets.",
  },
};

/* ------------------------------------------------------------ Automations */
const automations: PlatformPage = {
  slug: "automations",
  nav: "Automations",
  title: "Drew AI Automations — Scheduled Reports & Alerts",
  description:
    "Drew AI Automations run real analysis on your store data on a schedule: the Daily Ads Brief, revenue-drop alerts and weekly summaries, in Slack or email.",
  eyebrow: "Drew AI Automations",
  headline: "Your reports write themselves.",
  subhead:
    "Schedule it once. Drew runs the analysis on your real data — Shopify, Meta, Google, Klaviyo and more — and delivers it to your inbox or Slack. And when something breaks, you hear about it first.",
  note: "Included with AI Intelligence and AI Ads CoPilot · Delivers to email + Slack",
  heroVisual: {
    kind: "timeline",
    title: "While you were away",
    caption: "Drew running",
    items: [
      {
        time: "Mon 08:00",
        title: "Weekly Performance Analysis delivered",
        tag: "Email · Slack",
        body: "Revenue up 12% week over week. New customers drove 38% of revenue. Two products broke into the top 10.",
        kpis: [
          { label: "Revenue", value: "$48.2K", delta: "+12%" },
          { label: "Blended ROAS", value: "2.4x" },
          { label: "AOV", value: "$62", delta: "+3%" },
        ],
      },
      {
        time: "Tue 09:12",
        title: "Ad Spend Anomaly Alert fired",
        tag: "Alert",
        tone: "alert",
        body: "Meta spend +38% vs the 7-day average. “Prospecting — Broad” spent $412 at 0.6x ROAS.",
      },
      {
        time: "Tue 09:14",
        title: "Recommended: pause “Prospecting — Broad”",
        tag: "Recommendation",
        tone: "rec",
        body: "$412 this week at 0.6x ROAS — declining 9 straight days. The evidence and the exact call, attached.",
      },
    ],
    footer: "Drew recommends — you make the call · Sample data",
  },
  sections: [
    {
      type: "steps",
      eyebrow: "How it works",
      headline: "Set it up once. Get the work back weekly.",
      subhead: "An automation is a real Drew analysis on a schedule — not a canned dashboard export. Three steps and it runs without you.",
      steps: [
        { title: "Pick a template — or describe the job", description: "Choose a ready-made template below, or tell Drew what you want in plain English: the question, the schedule, where it should land." },
        { title: "Drew runs the real analysis", description: "On schedule, Drew digs through your connected data — comparisons, root causes, recommendations — the same depth you'd get asking in chat." },
        { title: "The report lands. The call comes with it.", description: "The finished report arrives in email or Slack — and when a fix is worth making, the exact recommendation arrives with it, evidence attached." },
      ],
      note: "Signal → schedule hits or a threshold trips · Analysis → Drew works through your data · Delivery → email + Slack, formatted to read fast · Your call → recommendations, evidence attached",
    },
    {
      type: "templates",
      eyebrow: "The template gallery",
      headline: "Pick a job. Drew starts this week.",
      subhead: "Every template below is real — pulled straight from the product. Pick one, keep the default schedule or set your own, and the first report is on its way.",
      groups: [
        {
          title: "Reports",
          items: [
            { kind: "Report", schedule: "Mon 9:00 · weekly", title: "Weekly Performance Analysis", body: "Your whole week — revenue, orders, ads, customers, products — analyzed and in your inbox before Monday stand-up." },
            { kind: "Report", schedule: "Daily 8:00", title: "Daily Marketing Pulse", body: "Yesterday's spend, ROAS and top campaigns across Meta and Google in a two-minute read." },
            { kind: "Report", schedule: "1st of month 9:00", title: "Monthly Business Review", body: "The board-ready deep dive: month-over-month and year-over-year trends, segments, channels and five priorities for next month." },
            { kind: "Report", schedule: "Mon 10:00 · weekly", title: "Website Traffic Report", body: "Where visitors came from, what they did, and where the funnel leaks — straight from GA4." },
          ],
        },
        {
          title: "Alerts",
          items: [
            { kind: "Alert", schedule: "Checks daily 9:00", title: "Revenue Drop Alert", body: "Revenue falls hard below your 7-day average and Drew tells you — with the likely cause, not just the number." },
            { kind: "Alert", schedule: "Checks daily 9:00", title: "Ad Spend Anomaly Alert", body: "Spend spikes or ROAS craters, and Drew names the campaigns responsible before the budget burns." },
            { kind: "Alert", schedule: "Checks daily 9:00", title: "Conversion Rate Drop Alert", body: "Conversion rate slips and Drew traces it to the traffic source that caused it." },
            { kind: "Alert", schedule: "Checks daily 8:00", title: "Low Inventory Alert", body: "Drew watches sales velocity against stock and flags best sellers before they sell out." },
          ],
        },
        {
          title: "Marketing",
          items: [
            { kind: "Report", schedule: "Mon 10:00 · weekly", title: "Meta Ads Weekly Review", body: "Campaign-level winners and losers, fatigue signals, and exactly where to move budget." },
            { kind: "Report", schedule: "Mon 10:00 · weekly", title: "Google Ads Weekly Review", body: "Search vs Shopping side by side, top performers, budget wasters and three concrete moves." },
            { kind: "Report", schedule: "Daily 8:00", title: "Blended ROAS Tracker", body: "One daily read on blended ROAS, CAC and MER across every channel — under 60 seconds." },
            { kind: "Report", schedule: "Mon 10:00 · weekly", title: "Email Marketing Weekly Report", body: "Klaviyo campaigns and flows ranked by revenue, with what to send — and fix — next." },
            { kind: "Report", schedule: "1st of month 9:00", title: "SEO Performance Report", body: "Rankings, rising queries and page-one opportunities from Search Console, every month." },
          ],
        },
        {
          title: "Customers & products",
          items: [
            { kind: "Report", schedule: "Mon 11:00 · weekly", title: "Customer Health Report", body: "Champions, loyal and at-risk customers — and where your retention effort pays back most." },
            { kind: "Report", schedule: "1st of month 9:00", title: "Customer Lifetime Value Report", body: "LTV by acquisition cohort: which months bought your best customers, and how fast they pay back." },
            { kind: "Report", schedule: "Mon 11:00 · weekly", title: "Weekly Product Performance", body: "Hero products, sudden decliners, and the SKUs quietly eating your ad spend." },
          ],
        },
      ],
      note: "Defaults shown · Every schedule, delivery and prompt is yours to change · Timezone-aware",
    },
    {
      type: "split",
      eyebrow: "From question to recurring job",
      headline: "Ask once. Make it weekly.",
      body: "Every automation starts as a question. Ask Drew anything in chat — and when the answer is worth repeating, “Make this weekly” is one click. The question becomes a schedule, and next Monday it's a report in your inbox.",
      visual: {
        kind: "chat",
        question: "Which campaigns wasted the most budget last week?",
        answer: ["Three campaigns burned $1,240 at under 1x ROAS. Here's the breakdown — and what to do about each."],
        insight: "Make this weekly → Scheduled · Mon 9:00 · Email + Slack",
      },
    },
    {
      type: "callout",
      eyebrow: "Built on trust",
      headline: "Drew recommends. You decide.",
      body: "Reports and alerts run on their own — that's the point. Changes to your ad accounts are always yours to make. When Drew spots a fix worth making, it arrives as a recommendation with the evidence attached: the campaign, the number, the why.",
      cards: [
        { title: "01 · Drew watches", body: "Daily checks across your ads, your store, your inventory and your site — not just the ad account." },
        { title: "02 · Drew diagnoses", body: "The root cause, isolated across channels, products and pages — not a symptom list." },
        { title: "03 · Drew recommends", body: "The exact change — pause a losing campaign, scale a winner — with the numbers that justify it." },
        { title: "04 · You decide", body: "Make the call in minutes with the full picture in front of you. Approve it and Drew executes within your guardrails — execution is rolling out now." },
      ],
      checklist: [
        "Automations never write to your ad account on their own — they read, analyze and recommend. Only a change you approve is executed.",
        "Pause any automation anytime, with a one-click off switch.",
        "Every number reconciled to Shopify.",
      ],
      visual: {
        kind: "recommendation",
        title: "Recommendation · evidence attached",
        source: "Meta Ads",
        headline: "Recommended: pause campaign “Prospecting — Broad”",
        body: "Spent $412 this week at 0.6x ROAS — below your 2.0x target and declining for 9 straight days.",
        kpis: [
          { label: "Spend", value: "$412" },
          { label: "ROAS", value: "0.6x", down: true },
          { label: "Trend", value: "↓ 9 days", down: true },
          { label: "Target", value: "2.0x" },
        ],
        footer: "The change is yours to make · Sample data",
      },
    },
  ],
  faq: [
    { q: "What are Drew AI Automations?", a: "Drew AI Automations are scheduled AI analyses of your real store data. Pick a ready-made template or describe the job in plain English, set a schedule, and Drew runs the full analysis — revenue, ads, customers, products — and delivers a formatted report or alert to your email or Slack. Reports arrive on schedule; alerts only fire when their condition trips." },
    { q: "Which Datadrew plans include Automations?", a: "Drew AI Automations are included with AI Intelligence and AI Ads CoPilot. Start for free on the Shopify App Store, connect your data, and upgrade to AI Intelligence when you're ready to put your reporting on a schedule. Each run uses Drew credits from your monthly allowance. See the pricing page for current plan details." },
    { q: "Where do the reports and alerts arrive?", a: "Email and Slack. Scheduled reports land as formatted analyses with charts and recommendations. Alerts — like a revenue drop or an ad spend spike — only show up when something actually needs your attention, with the likely root cause included." },
    { q: "Can Drew change my ads by itself?", a: "Only with your approval. Drew's automations analyze and deliver — reports and alerts to email or Slack — and when Drew finds a fix worth making, it hands you the exact recommendation with the evidence attached. Execution is rolling out now: approve the change and Drew implements it — a campaign paused, a budget shifted — within guardrails you control. Nothing runs without your say-so." },
    { q: "Can I create my own custom automations?", a: "Yes. Templates are just the fast lane. Describe any recurring job in plain English — 'every Friday, compare this month's cohort LTV to last year's' — set the schedule and delivery, and Drew runs it. Any question you ask Drew in chat can become a recurring job." },
  ],
  closing: {
    headline: "Put your reporting on autopilot",
    body: "Set up your first automation in minutes. Drew runs the analysis, your inbox gets the report — and when a fix is worth making, the recommendation comes with it. Drew AI Automations are included with AI Intelligence and AI Ads CoPilot.",
  },
};

/* ------------------------------------------------------------ Acquisition */
const acquisition: PlatformPage = {
  slug: "acquisition",
  nav: "Acquisition",
  title: "Acquisition Insights for Shopify",
  description:
    "Connect Meta, Google Ads, GA4 and Shopify to see blended ROAS, true CAC and wasted spend in one view, and ask Drew why any number moved.",
  eyebrow: "Acquisition Insights",
  headline: "Turn ad spend into profitable growth",
  subhead:
    "Connect Meta, Google Ads, GA4 and Shopify to uncover wasted spend, high-LTV campaigns, and scalable profit opportunities. Focus on CAC, LTV, wasted spend and contribution margin.",
  note: "Last updated: March 2026",
  heroVisual: {
    kind: "recommendation",
    title: "Ad Spend Leakages · this week",
    source: "Meta Ads · Google Ads",
    headline: "Recommended: pause 3 campaigns, redistribute $4,200/wk",
    body: "Meta Broad, PMax Generic and Google Display all ran at negative contribution margin. Meta TOF and Google Search hold 3x+ ROAS at current scale.",
    kpis: [
      { label: "Active campaigns", value: "24" },
      { label: "Avg ROAS", value: "3.2x" },
      { label: "Wasted spend", value: "$4.2K", down: true },
      { label: "Blended CAC", value: "$31" },
    ],
    footer: "The change is yours to approve · Sample data",
  },
  sections: [
    {
      type: "split",
      eyebrow: "Spend optimization",
      headline: "Stop wasting budget on underperforming campaigns",
      body: "Drew AI continuously analyzes your Meta, Google Ads, and GA4 data to detect wasted spend before it compounds.",
      bullets: [
        "Which campaigns are inflating CAC",
        "Which ad groups are driving low-quality customers",
        "Which keywords are burning budget",
        "Where contribution margin is getting eroded",
      ],
      visual: {
        kind: "table",
        title: "Channel performance",
        caption: "Last 30 days",
        head: ["Channel", "Spend", "CAC", "ROAS"],
        rows: [
          ["Meta - TOF", "$18.2K", "$24", "4.2x"],
          ["Google Search", "$12.8K", "$31", "3.4x"],
          ["Meta - Retarget", "$8.4K", "$18", "2.9x"],
          ["Google PMax", "$9.6K", "$52", "1.6x"],
          ["Meta - Broad", "$6.1K", "$78", "0.8x"],
        ],
      },
    },
    {
      type: "split",
      flip: true,
      eyebrow: "LTV analysis",
      headline: "See CAC vs LTV in one unified view",
      body: "Most brands optimize for short-term ROAS. Winning brands optimize for long-term contribution.",
      bullets: [
        "CAC by channel vs 30/60/90-day LTV",
        "Which channels bring in high-repeat customers",
        "Paid channels that look good but hurt retention",
        "Blended contribution across channels",
      ],
      visual: {
        kind: "table",
        title: "CAC vs LTV by channel",
        caption: "Last 90 days",
        head: ["Channel", "CAC", "30d LTV", "90d LTV", "LTV:CAC"],
        rows: [
          ["Meta - TOF", "$24", "$48", "$86", "3.6x"],
          ["Google Search", "$31", "$52", "$94", "3.0x"],
          ["Meta - Retarget", "$18", "$36", "$42", "2.3x"],
          ["Google PMax", "$52", "$38", "$56", "1.1x"],
        ],
        note: "Highest LTV channel: Google Search ($94 90d LTV, 3.0x) · Most efficient: Meta - TOF ($86 90d LTV, 3.6x)",
      },
    },
    {
      type: "split",
      eyebrow: "AI audit",
      headline: "Ask Drew AI. Get campaign-level answers in seconds.",
      body: "Instead of exporting spreadsheets, just ask Drew AI about your campaign performance.",
      bullets: [
        "“Which campaigns wasted the most budget last week?”",
        "“Why did ROAS drop WoW?”",
        "“Which ad groups are driving low LTV customers?”",
      ],
      visual: {
        kind: "chat",
        question: "Which campaigns wasted the most budget last week?",
        answer: [
          "3 campaigns had negative contribution margin:",
          "1. Meta Broad - Summer 24 — $2,100 spend, 0.6x ROAS",
          "2. PMax - Generic — $1,400 spend, 0.9x ROAS",
          "3. Google Display - Prospecting — $700 spend, 0.4x ROAS",
        ],
        insight: "Pause these 3 campaigns and redistribute $4,200/wk to Meta TOF and Google Search, which both maintain 3x+ ROAS at current scale.",
      },
    },
    {
      type: "stats",
      eyebrow: "By the numbers",
      headline: "Acquisition Insights by the numbers",
      stats: [
        { value: "$500M+", label: "Ad spend analyzed across Meta, Google & GA4" },
        { value: "15K+", label: "Campaigns optimized for Shopify brands" },
        { value: "3.2x", label: "Average ROAS improvement after insights" },
      ],
    },
    {
      type: "drew",
      eyebrow: "Drew AI",
      headline: "Ask Drew AI about your acquisition performance",
      subhead: "Go deeper with conversational acquisition analysis. Ask Drew AI any question about your campaign performance, CAC, LTV, and channel efficiency — get instant answers with charts and actionable recommendations.",
      prompts: [
        {
          q: "Why did ROAS drop WoW?",
          answer: [
            "ROAS dropped 22% WoW (3.4x to 2.7x). Here's why:",
            "1. Meta Broad campaigns scaled spend +40% without proportional revenue lift",
            "2. Google PMax CPCs increased 18% due to competitive pressure",
            "3. Landing page conversion rate dropped 12% (possible site speed issue)",
          ],
          insight: "Pull back Meta Broad to the previous week's budget, pause underperforming PMax ad groups, and investigate site speed — your load time increased from 2.1s to 3.8s.",
        },
        {
          q: "Which campaigns wasted the most budget last week?",
          answer: [
            "3 campaigns had negative contribution margin last week:",
            "1. Meta Broad - Summer 24 — $2,100 spend, 0.6x ROAS, -$1,260 net",
            "2. PMax - Generic — $1,400 spend, 0.9x ROAS, -$420 net",
            "3. Google Display - Prospecting — $700 spend, 0.4x ROAS, -$560 net",
          ],
          insight: "Pause all 3 campaigns and redistribute $4,200/wk to Meta TOF Lookalike and Google Branded Search, which both maintain 3x+ ROAS at current scale.",
        },
        {
          q: "Which ad groups are driving low LTV customers?",
          answer: [
            "3 ad groups have 60-day LTV below $40 (vs. $112 average):",
            "1. Meta Interest - Discount Seekers — $28 avg LTV, 8% repeat rate",
            "2. Google PMax - Generic Terms — $35 avg LTV, 11% repeat rate",
            "3. Meta Broad - Cold 18-24 — $31 avg LTV, 6% repeat rate",
            "These 3 ad groups represent 22% of spend but only 7% of revenue.",
          ],
          insight: "Shift budget to Meta Lookalike - High LTV Purchasers ($148 avg LTV, 34% repeat rate) and Google Branded Search ($162 avg LTV, 41% repeat rate).",
        },
        {
          q: "What is my blended CAC across all paid channels?",
          answer: [
            "Your blended CAC is $38.40, up from $34.20 last month (+12.3%).",
            "1. Meta Ads — $32.10 (58% of new customers)",
            "2. Google Ads — $41.80 (30% of new customers)",
            "3. Organic / Direct — $0 (12% of new customers)",
            "Your LTV:CAC ratio is 2.9x (target: above 3x).",
          ],
          insight: "Reallocate from Google PMax to Meta Lookalikes, where CAC is 43% lower — this could bring blended CAC back to the $35 range.",
        },
      ],
    },
  ],
  faq: [
    { q: "What ad platforms does Acquisition Insights support?", a: "Acquisition Insights integrates with Meta Ads (Facebook and Instagram), Google Ads (Search, Shopping, PMax, Display), and Google Analytics 4 (GA4). Combined with your Shopify order data, it provides a unified view of CAC, LTV, ROAS, and contribution margin across all your paid channels." },
    { q: "How does Datadrew calculate CAC and LTV by channel?", a: "CAC is calculated by dividing your total ad spend per channel by the number of new customers attributed to that channel. LTV is tracked over 30, 60, and 90-day windows using Shopify order data, giving you a true picture of customer value beyond the first purchase. Datadrew combines ad platform data with Shopify revenue to provide accurate, blended metrics." },
    { q: "Can Drew AI identify wasted ad spend automatically?", a: "Yes. Drew AI continuously monitors your campaign performance and flags campaigns, ad groups, and keywords that are underperforming relative to your target ROAS or CAC thresholds. You can ask Drew AI specific questions like \"Which campaigns wasted the most budget last week?\" and get instant, actionable answers with specific reallocation recommendations." },
    { q: "Is Acquisition Insights available on the free plan?", a: "Basic acquisition metrics and channel-level ROAS are available on the free plan with 3 months of historical data. Full Acquisition Insights — including CAC vs LTV analysis, AI-powered campaign audits, wasted spend detection, and unlimited history — are included with AI Intelligence and AI Ads CoPilot. Visit the pricing page for details." },
    { q: "How quickly does data sync from my ad platforms?", a: "After connecting your ad accounts via 1-click OAuth, historical data is typically synced within a few hours. Ongoing data syncs happen daily, so your Acquisition Insights dashboard always reflects yesterday's performance. This ensures you can catch wasted spend and react to campaign changes promptly." },
  ],
  closing: {
    headline: "Start free in seconds",
    body: "Install Datadrew on Shopify, or sign up directly with any e-commerce, ads, or marketing stack. Start uncovering wasted spend, high-LTV campaigns, and scalable profit opportunities — free to get started.",
  },
};

/* -------------------------------------------------------------- Retention */
const retention: PlatformPage = {
  slug: "retention",
  nav: "Retention",
  title: "Retention Insights for Shopify",
  description:
    "Cohort analysis, RFM segments synced to Klaviyo and LTV tracking, so Drew knows which customers are worth paying for before it moves ad budget.",
  eyebrow: "Retention Insights",
  headline: "Turn first-time buyers into lifelong customers",
  subhead:
    "Advanced cohort analysis, RFM segmentation synced to Klaviyo, and product repurchase tracking. Know what drives repeat purchases, customer LTV, and long-term retention.",
  note: "Last updated: March 2026",
  heroVisual: {
    kind: "heatmap",
    title: "Cohort retention",
    caption: "By acquisition month · sample data",
    cols: ["Month 0", "Month 1", "Month 2", "Month 3", "Month 4", "Month 5"],
    rows: [
      { label: "Sep 2025", cells: [100, 42, 31, 24, 19, 16] },
      { label: "Oct 2025", cells: [100, 45, 34, 26, 21, null] },
      { label: "Nov 2025", cells: [100, 38, 28, 22, null, null] },
      { label: "Dec 2025", cells: [100, 35, 24, null, null, null] },
      { label: "Jan 2026", cells: [100, 44, null, null, null, null] },
      { label: "Feb 2026", cells: [100, null, null, null, null, null] },
    ],
  },
  sections: [
    {
      type: "split",
      eyebrow: "Cohort analysis",
      headline: "Calculate retention KPIs like 3-month repeat rate and 9-month LTV",
      body: "Go beyond simple retention numbers. Datadrew breaks down customer cohorts by acquisition month, channel, and product to reveal what truly drives long-term value.",
      bullets: [
        "Monthly cohort retention curves",
        "Repeat purchase rate by time window",
        "Revenue retention vs customer retention",
        "Channel-level cohort comparison",
      ],
      visual: {
        kind: "heatmap",
        title: "Cohort retention heatmap",
        caption: "By acquisition month",
        cols: ["M0", "M1", "M2", "M3", "M4", "M5"],
        rows: [
          { label: "Sep 2025", cells: [100, 42, 31, 24, 19, 16] },
          { label: "Oct 2025", cells: [100, 45, 34, 26, 21, null] },
          { label: "Nov 2025", cells: [100, 38, 28, 22, null, null] },
          { label: "Dec 2025", cells: [100, 35, 24, null, null, null] },
          { label: "Jan 2026", cells: [100, 44, null, null, null, null] },
          { label: "Feb 2026", cells: [100, null, null, null, null, null] },
        ],
      },
    },
    {
      type: "split",
      flip: true,
      eyebrow: "Repurchase insights",
      headline: "Identify SKUs pulling shoppers back for repeat purchases",
      body: "Understand which products in your catalog drive the most repeat purchases. See product-level repurchase rates against revenue contribution.",
      bullets: [
        "Product-level repurchase rates",
        "First purchase to second purchase timing",
        "Products that drive multi-purchase journeys",
        "Category-level retention patterns",
      ],
      visual: {
        kind: "bars",
        title: "Product repurchase vs revenue",
        caption: "All products · last 6 months",
        items: [
          { label: "Daily Moisturizer", value: 68, display: "68%", sub: "Rev $142K" },
          { label: "Vitamin C Serum", value: 54, display: "54%", sub: "Rev $98K" },
          { label: "SPF 50 Sunscreen", value: 41, display: "41%", sub: "Rev $67K" },
          { label: "Night Cream", value: 38, display: "38%", sub: "Rev $51K" },
          { label: "Eye Cream Deluxe", value: 12, display: "12%", sub: "Rev $23K" },
        ],
        note: "Repurchase rate per product, revenue contribution alongside.",
      },
    },
    {
      type: "split",
      eyebrow: "RFM segmentation",
      headline: "Segment shoppers and sync them with Klaviyo for targeted flows",
      body: "Automatically segment your customers into Champion, Loyal, Promising, Need Attention, At Risk, and Lost segments using RFM analysis. Sync segments directly to Klaviyo.",
      bullets: [
        "Champions, Loyal, Promising, Need Attention, At Risk, Lost",
        "Auto-sync to Klaviyo lists and segments",
        "Track segment movement over time",
        "Trigger personalized flows per segment",
      ],
      visual: {
        kind: "segments",
        title: "RFM customer segments",
        caption: "Auto-synced to Klaviyo",
        items: [
          { name: "Champions", count: "4,820", share: "18.2%" },
          { name: "Loyal", count: "6,340", share: "24.0%" },
          { name: "Promising", count: "3,910", share: "14.8%" },
          { name: "Need Attention", count: "3,280", share: "12.4%" },
          { name: "At Risk", count: "4,150", share: "15.7%" },
          { name: "Lost", count: "3,940", share: "14.9%" },
        ],
        footer: "Synced to Klaviyo — last sync: 2 min ago",
      },
    },
    {
      type: "stats",
      eyebrow: "By the numbers",
      headline: "Retention Insights by the numbers",
      stats: [
        { value: "500K+", label: "Customers segmented across Shopify stores" },
        { value: "32%", label: "Average repeat rate improvement tracked" },
        { value: "2.4x", label: "LTV increase tracked with retention insights" },
      ],
    },
    {
      type: "drew",
      eyebrow: "Drew AI",
      headline: "Ask Drew AI about your retention",
      subhead: "Go deeper with conversational retention analysis. Ask Drew AI any question about your cohorts, RFM segments, and repurchase patterns, and get instant answers with charts and actionable recommendations.",
      prompts: [
        {
          q: "What's my 90-day repeat purchase rate?",
          answer: [
            "Your 90-day repeat purchase rate is 34.2%, up from 28.7% last quarter.",
            "1. Champions segment — 72% repeat rate (4,820 customers)",
            "2. Loyal segment — 58% repeat rate (6,340 customers)",
            "3. Daily Moisturizer — highest product-level repeat at 68%",
          ],
          insight: "Focus Klaviyo flows on the “Need Attention” segment (3,280 customers) — a 10% win-back rate would add $48K in quarterly revenue.",
        },
        {
          q: "Which RFM segment is growing fastest?",
          answer: [
            "The “Promising” segment grew 28% MoM (1,240 to 1,588 customers).",
            "1. Champions — 4,820 (+6% MoM) — 72% repeat, $218 avg LTV",
            "2. Loyal — 6,340 (+9% MoM) — 58% repeat, $156 avg LTV",
            "3. Promising — 1,588 (+28% MoM) — 31% repeat, $84 avg LTV",
            "4. Need Attention — 3,280 (-4% MoM) — 12% repeat, $62 avg LTV",
          ],
          insight: "Convert the Promising segment with a targeted Klaviyo flow offering 15% off their second purchase — these customers have 3.1x higher LTV potential than one-time buyers.",
        },
        {
          q: "Show cohort retention curves for last 6 months",
          answer: [
            "Monthly cohort retention (Month 1 / Month 3 / Month 6):",
            "Sep 2025 — 42% / 28% / 19% · Oct 2025 — 44% / 30% / 21% · Nov 2025 — 48% / 33% / —",
            "Dec 2025 — 38% / 26% / — · Jan 2026 — 46% / — / — · Feb 2026 — 51% / — / —",
            "December dipped due to gift buyers with low repeat intent. February is your strongest Month-1 ever.",
          ],
          insight: "Replicate Feb's onboarding flow (personalized post-purchase email + product tips) across all months — this flow drove the 51% M1 retention.",
        },
      ],
    },
  ],
  faq: [
    { q: "What is cohort retention analysis?", a: "Cohort retention analysis groups customers by when they made their first purchase (e.g., all customers acquired in January) and tracks what percentage come back to purchase again in each subsequent month. Datadrew automatically builds these cohorts from your Shopify data and shows retention curves, so you can see exactly how well you retain customers over time and which acquisition channels produce the most loyal buyers." },
    { q: "How does RFM segmentation work?", a: "RFM stands for Recency, Frequency, and Monetary value. Datadrew scores each customer on these three dimensions and automatically assigns them to segments: Champions (best customers), Loyal, Promising, Need Attention, At Risk, and Lost. These segments update daily and can be synced directly to Klaviyo so you can trigger personalized email flows for each segment." },
    { q: "How does the Klaviyo sync work?", a: "Once you connect your Klaviyo account, Datadrew automatically syncs your RFM segments as Klaviyo lists or segments. When a customer moves between segments (e.g., from \"Loyal\" to \"At Risk\"), the sync updates within minutes. This lets you build targeted Klaviyo flows — like win-back campaigns for At Risk customers or VIP offers for Champions — without any manual list management." },
    { q: "What repeat purchase metrics can I track?", a: "Datadrew tracks a full suite of repeat purchase metrics including 30/60/90-day repeat rates, product-level repurchase rates, time between first and second purchase, cohort-based retention curves, revenue retention vs customer retention, and LTV by acquisition cohort. You can filter all metrics by acquisition channel, product category, or customer segment." },
    { q: "Is Retention Insights available on the free plan?", a: "Basic retention metrics and cohort views are available on the free plan with 3 months of historical data. Full Retention Insights — including RFM segmentation, Klaviyo sync, product repurchase tracking, and unlimited history — are included with AI Intelligence and AI Ads CoPilot. Visit the pricing page for details." },
  ],
  closing: {
    headline: "Turn first-time buyers into lifelong customers",
    body: "Install Datadrew from the Shopify App Store and start tracking cohort retention, RFM segments, and repurchase patterns. Free to get started.",
  },
};

/* --------------------------------------------------- Product Intelligence */
const productIntelligence: PlatformPage = {
  slug: "product-intelligence",
  nav: "Product Intelligence",
  title: "Product Intelligence for Shopify",
  description:
    "Find the winners hiding in your catalog: which products drive repeat purchases, which sell together, and product-level margin and ROAS.",
  eyebrow: "Product Intelligence",
  headline: "Find the winners hiding in your catalog",
  subhead:
    "Know which products drive repeat purchases, which bundles lift AOV, and where your ad spend is wasted. AI-powered product intelligence built for Shopify brands.",
  note: "Last updated: March 2026",
  heroVisual: {
    kind: "kpis",
    title: "Full-funnel SKU KPIs",
    caption: "All products · sample data",
    items: [
      { label: "Total products", value: "248" },
      { label: "Avg product ROAS", value: "3.4x", delta: "+12%" },
      { label: "Avg retention", value: "34%", delta: "+5%" },
    ],
    table: {
      head: ["Product", "Revenue", "ROAS", "LTV"],
      rows: [
        ["Daily Moisturizer", "$142K", "4.8x", "$126"],
        ["Vitamin C Serum", "$98K", "3.6x", "$104"],
        ["SPF 50 Sunscreen", "$67K", "2.1x", "$72"],
        ["Eye Cream Deluxe", "$23K", "0.8x", "$38"],
      ],
    },
  },
  sections: [
    {
      type: "split",
      eyebrow: "Repurchase analysis",
      headline: "Track which products are driving the repeats and LTV",
      body: "See exactly which products bring customers back. Product Repurchase Analysis reveals which SKUs create loyal buyers and which are one-time purchases, so you can focus marketing spend on products that build lasting value.",
      bullets: [
        "Product-level repurchase rate and frequency",
        "Cohort-based repeat purchase tracking",
        "Identify hero products that drive retention",
        "LTV contribution by product and category",
      ],
      visual: {
        kind: "bars",
        title: "Product repurchase rate",
        caption: "Last 6 months",
        items: [
          { label: "Daily Moisturizer", value: 68, display: "68%", sub: "3,240 orders" },
          { label: "Vitamin C Serum", value: 54, display: "54%", sub: "2,180 orders" },
          { label: "SPF 50 Sunscreen", value: 41, display: "41%", sub: "1,890 orders" },
          { label: "Night Cream", value: 38, display: "38%", sub: "1,420 orders" },
          { label: "Eye Cream Deluxe", value: 12, display: "12%", sub: "640 orders" },
        ],
      },
    },
    {
      type: "split",
      flip: true,
      eyebrow: "Basket analysis",
      headline: "Instantly identify top product baskets to create bundles and upsell to lift AOV",
      body: "Discover which products customers buy together most frequently. Use these insights to create bundles, cross-sells, and upsell offers that naturally increase average order value.",
      bullets: [
        "Most frequent product combinations",
        "Bundle opportunity scoring",
        "AOV impact by product pair",
        "Category-level basket patterns",
      ],
      visual: {
        kind: "bundles",
        title: "Top product baskets",
        caption: "Frequency & AOV",
        items: [
          { name: "Bundle #1", products: ["Daily Moisturizer", "Vitamin C Serum"], frequency: "1,840", aov: "$84.50" },
          { name: "Bundle #2", products: ["SPF 50 Sunscreen", "Daily Moisturizer"], frequency: "1,290", aov: "$72.30" },
          { name: "Bundle #3", products: ["Night Cream", "Vitamin C Serum"], frequency: "980", aov: "$91.20" },
          { name: "Bundle #4", products: ["Daily Moisturizer", "Night Cream"], frequency: "760", aov: "$78.90" },
        ],
      },
    },
    {
      type: "split",
      eyebrow: "SKU performance",
      headline: "One grid showing product-level retention and performance KPIs",
      body: "Full-funnel SKU performance in a single view. Track product revenue, ad spend, ROAS, retention, and LTV contribution side by side. Know which products are truly profitable and which ones are draining budget.",
      bullets: [
        "Revenue, orders, and AOV per product",
        "Product-level ad spend and ROAS",
        "Retention rate and LTV per SKU",
        "Category-level roll-ups and trends",
      ],
      visual: {
        kind: "kpis",
        title: "Full-funnel SKU KPIs",
        caption: "All products",
        items: [
          { label: "Total products", value: "248" },
          { label: "Avg product ROAS", value: "3.4x", delta: "+12%" },
          { label: "Avg retention", value: "34%", delta: "+5%" },
        ],
        table: {
          head: ["Product", "Revenue", "ROAS", "LTV"],
          rows: [
            ["Daily Moisturizer", "$142K", "4.8x", "$126"],
            ["Vitamin C Serum", "$98K", "3.6x", "$104"],
            ["SPF 50 Sunscreen", "$67K", "2.1x", "$72"],
            ["Eye Cream Deluxe", "$23K", "0.8x", "$38"],
          ],
        },
      },
    },
    {
      type: "features",
      eyebrow: "Three lenses",
      headline: "Repurchases, baskets, and the product journey",
      subhead: "Three views on the same Shopify order history, each answering a different merchandising question.",
      items: [
        {
          title: "Product repurchases",
          description: "Which SKUs customers come back for, how often, and how long the gap between first and second order runs. The repurchase view ranks every product by its repeat rate and LTV contribution, so hero products that quietly build retention stand apart from one-and-done sellers.",
        },
        {
          title: "Cart (basket) analysis",
          description: "Which products are bought together in the same order, how often each pair or trio shows up, and the AOV it carries. Basket analysis scores bundle opportunities and cross-sell pairings straight from real carts, not assumptions about what should go together.",
        },
        {
          title: "Product journey",
          description: "What customers buy first, what they buy next, and where the path ends. The journey view follows customers from their entry product through later orders, revealing which first purchases lead into multi-order relationships and which products should front your acquisition campaigns.",
        },
      ],
    },
    {
      type: "stats",
      eyebrow: "By the numbers",
      headline: "Product Intelligence by the numbers",
      stats: [
        { value: "2M+", label: "Products analyzed across Shopify stores" },
        { value: "$1.6Bn+", label: "Revenue tracked through product intelligence" },
        { value: "50K+", label: "Product insights generated every month" },
      ],
    },
    {
      type: "drew",
      eyebrow: "Drew AI",
      headline: "Ask Drew AI about your products",
      subhead: "Go deeper with conversational product intelligence. Ask Drew AI any question about your product performance, and get instant answers with charts and actionable recommendations.",
      prompts: [
        {
          q: "Which products waste the most ad spend with ROAS below 2x?",
          answer: [
            "3 products have ROAS below 1x:",
            "1. Eye Cream Deluxe — $4,200 spend, 0.8x ROAS",
            "2. Travel Kit Mini — $2,800 spend, 0.6x ROAS",
            "3. Gift Set Holiday — $1,900 spend, 0.9x ROAS",
          ],
          insight: "Pause ads on these 3 products and reallocate $8,900/mo to Daily Moisturizer and Vitamin C Serum, which both exceed 3.5x ROAS.",
        },
        {
          q: "Which products have the highest repurchase rate this quarter?",
          answer: [
            "Top 5 products by repurchase rate (Q4 2025):",
            "1. Daily Moisturizer — 68% repeat rate (3,240 orders)",
            "2. Vitamin C Serum — 61% repeat rate (2,870 orders)",
            "3. Hydrating Cleanser — 54% repeat rate (1,960 orders)",
            "4. Night Repair Cream — 49% repeat rate (1,510 orders)",
            "5. SPF 50 Sunscreen — 44% repeat rate (1,280 orders)",
          ],
          insight: "Bundle Daily Moisturizer + Vitamin C Serum as a subscription offer — customers who buy both have a 78% 6-month retention rate vs. 42% for single-product buyers.",
        },
        {
          q: "Show me product bundles that increase AOV above $80",
          answer: [
            "3 natural bundles with AOV above $80:",
            "1. Vitamin C Serum + Daily Moisturizer — $92 AOV (bought together by 34% of customers)",
            "2. Full Routine Kit (Cleanser + Serum + Moisturizer) — $118 AOV, 12% of orders",
            "3. Night Repair + Eye Cream — $84 AOV, 8% of orders",
            "Your current blended AOV is $64.",
          ],
          insight: "Promote the Full Routine Kit on PDPs of individual items — stores that added this bundle saw a 23% increase in AOV within 30 days.",
        },
      ],
    },
  ],
  faq: [
    { q: "What data does Product Intelligence use?", a: "Product Intelligence pulls data from your connected Shopify store, including order history, product catalog, and customer data. When you connect ad platforms (Meta Ads, Google Ads), it also brings in product-level ad spend and ROAS metrics. All data is synced automatically and updated daily." },
    { q: "How is repurchase rate calculated?", a: "Repurchase rate measures the percentage of customers who bought a specific product and then purchased it (or any product) again within a given time window. Datadrew calculates this using your complete Shopify order history, tracking individual customer purchase journeys across products and time periods." },
    { q: "Can I see product-level ad performance?", a: "Yes. When you connect Meta Ads and Google Ads, Datadrew maps ad spend back to individual products, giving you product-level ROAS, CPA, and profitability metrics. This lets you identify which products waste ad spend versus which drive profitable growth, so you can optimize budget allocation at the SKU level." },
    { q: "Is Product Intelligence available on the free plan?", a: "Basic product metrics are available on the free plan with 3 months of historical data. Full Product Intelligence features — including repurchase analysis, basket analysis, product-level ad performance, and unlimited history — are included with AI Intelligence and AI Ads CoPilot. Visit the pricing page for details." },
  ],
  closing: {
    headline: "Unlock hidden winners in your product catalog",
    body: "Install Datadrew from the Shopify App Store and start discovering which products truly drive growth. Free to get started.",
  },
};

/* ------------------------------------------------------ Creative Strategy */
const creativeStrategy: PlatformPage = {
  slug: "creative-strategy",
  nav: "Creative Strategy",
  title: "Creative Strategy for Shopify",
  description:
    "Every Meta ad creative graded against your own account, read for angle and hook, grouped into concepts and tracked against competitors.",
  eyebrow: "Creative Strategy",
  headline: "Know which ads are winning, which are dying, and what to brief next",
  subhead:
    "Drew grades every Meta creative against your own account, reads what each one shows and claims, groups your ads into the concepts they really are, and watches what your competitors launch — then turns the verdict into an action or a brief.",
  note: "Meta Ads today · graded against your own account on Meta-reported signals, labelled as such · Last updated: September 2026",
  heroVisual: {
    kind: "cards",
    title: "This week's actions",
    caption: "Ranked by spend at risk · Meta-reported · sample data",
    items: [
      { tag: "KILL", tone: "kill", title: "Brand Montage", body: "CPA +58% vs its own baseline · Freq 4.2 · 0.7× ROAS", meta: "$1,980 at risk" },
      { tag: "ITERATE", tone: "iterate", title: "Founder Story Reel", body: "Link CTR −34% vs peak · Freq 3.1 · still 2.3× ROAS", meta: "$2,740 at risk" },
      { tag: "SCALE", tone: "scale", title: "Summer UGC", body: "5.4× ROAS at freq 1.8 · CTR at its peak · headroom", meta: "$4,820 spend" },
    ],
  },
  sections: [
    {
      type: "split",
      eyebrow: "Creative leaderboard",
      headline: "Every creative graded, with the evidence behind the call",
      body: "One row per creative, not per ad. A creative running under six ad sets is counted once, so its ROAS and hook rate are measured on all of its delivery. Each one is graded Scaling, Healthy, Fatiguing, Dead or Testing against its own baseline, and every grade maps to one verb.",
      bullets: [
        "Spend, ROAS, link CTR, hook rate, hold rate, frequency and purchases per creative — Meta-reported, and labelled that way",
        "Five states, one verb each: SCALE, ITERATE, KILL, WAIT — and Healthy, which needs nothing from you",
        "Winner badge when spend is at least 10× your account-median creative spend, above the spend floor, with ROAS at or above your account average",
        "The evidence inline — “link CTR −34% vs peak, frequency 3.1” — never a label without the numbers behind it",
      ],
      visual: {
        kind: "table",
        title: "Creative leaderboard",
        caption: "Last 30 days · Meta-reported",
        head: ["Creative", "Status", "Action", "Spend", "ROAS", "Hook"],
        rows: [
          ["Summer UGC Winner", "Scaling", "SCALE", "$4,820", "5.4x", "42%"],
          ["Before/After Static", "Healthy", "—", "$3,190", "4.1x", "—"],
          ["Founder Story Reel", "Fatiguing", "ITERATE", "$2,740", "2.3x", "24%"],
          ["Brand Montage", "Dead", "KILL", "$1,980", "0.7x", "14%"],
          ["Problem/Solution v3", "Testing", "WAIT", "$310", "—", "—"],
        ],
        note: "Founder Story Reel · Link CTR −34% vs 7-day peak · Freq 3.1 · Still 2.3× ROAS · Refresh the hook, don't kill it",
      },
    },
    {
      type: "split",
      flip: true,
      eyebrow: "Weekly diagnosis",
      headline: "This week's actions, ranked by spend at risk",
      body: "Every week Drew lists the creatives that need a decision, worst first, with the numbers that triggered each call. Testing creatives are held out until they clear the sufficiency gate, and when nothing needs action it says so — no filler recommendations.",
      bullets: [
        "KILL, ITERATE and SCALE cards ranked by the spend riding on each verdict",
        "Testing velocity: your launches per week against the peer median and top quartile of Datadrew's active Meta ad accounts in your spend tier",
        "Creative mix: how many of your creatives sit in Scaling, Healthy, Fatiguing, Dead and Testing right now",
        "“Nothing needs action this week” is a real answer, not an empty state",
      ],
      visual: {
        kind: "velocity",
        title: "Testing velocity",
        caption: "Compared with 212 accounts in your spend tier",
        items: [
          { label: "You", value: 3, display: "3 / week", you: true },
          { label: "Peer median", value: 5, display: "5 / week" },
          { label: "Top quartile", value: 9, display: "9 / week" },
        ],
        max: 10,
        note: "You launch below your peer median. At roughly a 5% winner rate, volume is the most reliable lever you have.",
      },
    },
    {
      type: "split",
      eyebrow: "AI-read creatives",
      headline: "Drew reads every creative — what it shows, what it claims, who it speaks to",
      body: "No naming conventions required. Drew looks at the image or the video frames and the copy of every creative that has spent enough to judge, tags it on 20 attributes — angle, hook type, visual device, tone, offer, production style, proof devices and more — and writes a plain-language read-out of the ad.",
      bullets: [
        "Group performance by angle, hook, visual device, tone, offer, production style or CTA: do social-proof hooks beat offer-led hooks on ROAS?",
        "Cross two attributes — angle × hook is often the most useful creative question there is",
        "Per creative: the claims it makes, the objections it answers, who it appears to speak to, what's on screen and every word of on-image text",
        "Tag coverage stated on every view, so a rollup never pretends to cover spend it hasn't read",
      ],
      visual: {
        kind: "keyvals",
        title: "Summer UGC · AI-read",
        caption: "Group by: Angle · 31 of 34 creatives tagged · 96% of spend",
        table: {
          head: ["Angle", "Creatives", "Spend share", "ROAS", "Hook"],
          rows: [
            ["Problem / solution", "9", "38%", "4.6x", "39%"],
            ["Social proof", "7", "24%", "3.9x", "35%"],
            ["Offer / discount", "8", "21%", "2.4x", "22%"],
            ["Lifestyle aspiration", "4", "11%", "1.8x", "19%"],
          ],
        },
        items: [
          { k: "Claims it makes", v: "“Visible results in 14 days” · “Sold out 3× this year”" },
          { k: "Objections it answers", v: "Works on sensitive skin · Free shipping over $60" },
          { k: "Speaks to (inferred)", v: "Women 30–45 with reactive skin" },
          { k: "Text on screen", v: "“Day 1 | Day 14 | still can't believe it”" },
        ],
      },
    },
    {
      type: "split",
      flip: true,
      eyebrow: "Concepts",
      headline: "48 ads. 6 concepts. Now you know how many ideas you're really testing.",
      body: "Variants of the same idea count once. Drew groups creatives whose message and visuals are near-identical into named concepts, so you can see where spend is concentrated, which idea is carrying the account, and whether a “new” launch is actually a new argument.",
      bullets: [
        "Concepts named from the ads themselves — angle and hook: “Product Feature — Bold Claim”, “Offer Discount — Offer Led”",
        "Spend share, purchase value and ROAS per concept — Meta-reported",
        "“Doesn't match an existing concept” flagged on its own — often a genuinely new angle",
        "Coverage of your Meta spend stated on the page, never assumed",
      ],
      visual: {
        kind: "bars",
        title: "Concepts",
        caption: "Last 30 days · 94% of Meta spend covered · 6 distinct concepts behind 48 ads",
        items: [
          { label: "Problem/Solution — Problem Callout", value: 34, display: "34%", sub: "4.8x" },
          { label: "Social Proof — Testimonial Quote", value: 27, display: "27%", sub: "4.1x" },
          { label: "Offer Discount — Offer Led", value: 19, display: "19%", sub: "2.2x" },
          { label: "Education/How-to — Demonstration", value: 9, display: "9%", sub: "3.0x" },
        ],
        note: "Not yet grouped: 11% of spend — 2 creatives that match nothing else you run. Often a genuinely new angle.",
      },
    },
    {
      type: "split",
      eyebrow: "Rivals",
      headline: "See what competitors are testing — and the angles you have no answer to",
      body: "Track up to five competitor brands straight from Meta's public Ad Library, each in the market you choose. Drew collects their creatives, deduplicates them so one creative is one row instead of the dozens of ad IDs Meta runs it under, compares them week over week, and keeps the media so it still loads a month later.",
      bullets: [
        "What's new and what stopped in the last 7 days, per brand",
        "Long-running badge: live 30+ days — the operators' own proxy for “this is working for them”",
        "Format mix, calls to action and the creators they whitelist — so you can see an angle, offer or format they have moved into that you have no active answer to",
        "A Competitor Watch report you can schedule for Monday mornings — honest about what Meta doesn't publish: no spend, no results, no estimates",
      ],
      visual: {
        kind: "cards",
        title: "Rivals",
        caption: "Meta Ad Library · United States · Gymshark, Alo Yoga, Vuori · 2 slots left · Last 7 days: 6 new · 2 stopped · 61 active",
        items: [
          { tag: "New · Video · Reels", tone: "neutral", title: "“Your gym kit called. It wants a promotion.”", body: "Running as 14 ads · CTA: Shop now" },
          { tag: "Long-running · 47 days · Static", tone: "neutral", title: "“Free shipping over $75 — this week only.”", body: "Running as 6 ads · Creator ad" },
        ],
        footer: "Public Ad Library data. Meta publishes no spend or results for competitor ads — none is shown or estimated.",
      },
    },
    {
      type: "features",
      eyebrow: "The grading contract",
      headline: "Five states, one clear call each — graded against your own account, not a universal cutoff",
      subhead: "The same contract runs in the dashboard, in Drew's answers and in the weekly diagnosis, so a creative is never “fatiguing” on one screen and “healthy” on another.",
      items: [
        { tag: "Scaling · SCALE", title: "A fresh winner with headroom", description: "Spend at least 10× your account-median creative spend and above the 500 spend floor, ROAS at or above your account average, frequency under 2.5 and link CTR not declining. Push budget while the signals hold." },
        { tag: "Healthy · no action", title: "At or above its own baseline", description: "No verb, because no action is needed — keep watching frequency. When signals conflict, Drew says “mixed signals — watching” rather than forcing a verdict." },
        { tag: "Fatiguing · ITERATE", title: "Proven concept, tired execution", description: "Fatigue confirmed but ROAS still holds. Refresh the hook and the first frame — don't kill it. This is the verdict that turns into an iteration brief." },
        { tag: "Dead · KILL", title: "Weak concept — free the budget", description: "Fatiguing and ROAS below the greater of 1.0 and 0.75× your account average. Pause it and move the budget to your scaling ads — don't re-cut it." },
        { tag: "Testing · WAIT", title: "Below the sufficiency gate", description: "Under 500 in your ad account's currency, or fewer than 5 delivery days. Not enough signal to rank, crown or cut — let it run." },
        { tag: "Two-condition test", title: "Fatigue is never called on one leg", description: "Link CTR down 30% or more from its own 7-day peak and frequency at 2.5 or above — or the recent 7-day cost per purchase at 1.5× the creative's own 30-day baseline while spend is sustained. Nor is a creative ever killed on CTR and frequency alone: Dead needs its ROAS to have collapsed too." },
      ],
    },
    {
      type: "callout",
      eyebrow: "Meta-reported, and labelled that way",
      headline: "A verdict is only useful if something happens next",
      body: "ROAS, purchases and purchase value are the platform's own attribution — a leading indicator of creative strength, not a revenue claim. Hook rate is 3-second views ÷ impressions; hold rate is 15-second views ÷ 3-second views. The formulas are frozen, so the number in Datadrew reconciles with the one Drew quotes. Every verdict is relative to your own account's baseline — and Drew reads your Shopify orders and blended ad efficiency alongside them before it proposes a card.",
      cards: [
        { title: "01 · Approve it from the board", body: "Drew proposes the pause or the budget change as a recommendation card with the evidence attached. Approve it and Drew executes within your guardrails. Execution is rolling out now." },
        { title: "02 · Brief the next one", body: "Ask Drew for the iteration brief: keep the concept that's winning, change the hook, and cite the tags, claims and objections that made the parent work. Written for your editor — Drew doesn't generate images or video." },
        { title: "03 · Where it reaches you", body: "The Creative Intelligence section in Datadrew, Drew in Slack, a Competitor Watch report you can schedule, and every creative tool through Claude or ChatGPT via MCP." },
      ],
    },
    {
      type: "stats",
      eyebrow: "By the numbers",
      headline: "Creative Strategy by the numbers",
      stats: [
        { value: "160K+", label: "Meta creatives tracked across Datadrew brands" },
        { value: "20", label: "Attributes read on every tagged creative" },
        { value: "5", label: "Competitor brands tracked per shop, in the markets you choose" },
      ],
    },
    {
      type: "drew",
      eyebrow: "Drew AI",
      headline: "Ask Drew AI about your creatives",
      subhead: "Everything on this page is available conversationally, on the same grading contract. Ask in Datadrew, in Slack, or from Claude and ChatGPT through MCP — and get the verdict, the evidence and the next step in one answer.",
      prompts: [
        {
          q: "Which creatives should I scale, and which should I kill?",
          answer: [
            "Graded on the last 30 days, Meta-reported:",
            "SCALE — Summer UGC: 5.4× ROAS at frequency 1.8, $4,820 spend, link CTR still at its peak.",
            "ITERATE — Founder Story Reel: 2.3× ROAS, but link CTR is down 34% from its 7-day peak at frequency 3.1. Proven concept, tired hook.",
            "KILL — Brand Montage: CPA +58% vs its own baseline, 0.7× ROAS, frequency 4.2.",
          ],
          insight: "Proposed: pause Brand Montage and move its $66/day to Summer UGC — two cards on your board, ready to approve. Want the iteration brief for the Founder Story hook?",
        },
        {
          q: "Do social-proof hooks beat offer-led hooks on ROAS?",
          answer: [
            "Yes, on your account — and by a wide margin. 31 of 34 delivering creatives are tagged, covering 96% of spend (last 30 days, Meta-reported).",
            "1. Social-proof hooks (testimonial quote, rating stars) — 7 creatives, 24% of spend, 3.9× ROAS, 35% hook rate",
            "2. Offer-led hooks (percent off, free shipping) — 8 creatives, 21% of spend, 2.4× ROAS, 22% hook rate",
            "The gap holds inside each format: social-proof video 4.1× vs offer-led video 2.6×. Crossing angle with hook, the best pair is Problem/Solution × testimonial quote at 4.6×.",
          ],
          insight: "Brief the next two concepts with a customer-quote opener; keep the offer in the body copy, not the first line.",
        },
        {
          q: "What did my competitors launch this week?",
          answer: [
            "3 rivals tracked in the US — 9 new creatives, 3 stopped, last 7 days. Public Ad Library data, counted per creative, not per ad ID. No spend or results exist for anyone.",
            "1. Gymshark — 6 new, 2 stopped. Four of the six are Reels leading with a creator talking to camera; one whitelisted creator ad. They dropped their two “20% off” statics.",
            "2. Alo Yoga — 2 new, 1 stopped. Both new are studio product carousels with a “Shop now” CTA.",
            "3. Vuori — 1 new, still running 11 creatives past 30 days — the most long-running set in your group.",
          ],
          insight: "Gymshark has moved from offer-led statics to creator-led video; you have no active creator-led answer. Vuori's long-running set is all lifestyle-aspiration — worth reading before your autumn brief.",
        },
        {
          q: "My problem/solution ads win — write the brief for the next one",
          answer: [
            "Iteration brief — from Summer UGC (5.4× ROAS, 42% hook rate, Scaling).",
            "Keep: the problem/solution angle, the before/after visual device, the claim “visible results in 14 days”, the objection it already answers (works on sensitive skin).",
            "Change (one variable): the hook. Parent opens on a face close-up; Variant B opens on the “Day 1 | Day 14” text card in the first second.",
            "Script beats (15–30s, 9:16, captions on): problem in the buyer's words → discovery → experience → the 14-day result → “if your skin reacts to everything, try this”.",
            "Success bar: at least 1,000 impressions and 50 clicks per variant over a full week, a 20% gap holding 3 days before either is called the winner.",
          ],
          insight: "Every claim above comes from the parent ad — nothing invented. Want it as a shareable doc for your editor?",
        },
      ],
    },
    {
      type: "links",
      headline: "Go deeper",
      items: [
        { kicker: "Blog", label: "Creative Intelligence: every ad graded", href: "/blog/creative-intelligence" },
        { kicker: "Blog", label: "Ad creative fatigue: signals, thresholds and cost", href: "/blog/ad-creative-fatigue-signals" },
        { kicker: "Guide", label: "Meta Ads creative analysis in Claude — the MCP guide", href: "/blog/meta-ads-creative-analysis-claude-mcp" },
      ],
    },
  ],
  faq: [
    { q: "What ad platforms does Creative Strategy support?", a: "The graded creative library, AI-read tags, concepts and Rivals cover Meta Ads (Facebook and Instagram) today. Connect your Meta ad account and the first sync of creative data completes within a day, with no manual uploads or naming conventions. Drew works from the Meta history already in your account, so verdicts appear as soon as that first sync completes for every creative that clears the sufficiency gate; thinner creatives stay in Testing rather than being judged on noise. Google Ads responsive search ad and Performance Max asset performance is available through Drew conversationally." },
    { q: "How does Drew know what a creative shows and says?", a: "Drew reads the image, or up to four frames of the video, together with the headline and primary text, and tags the creative on 20 attributes: angle, hook type, visual hook device, emotional tone, offer, production style, proof devices, claim risk and more. It also writes a plain-language read-out of the ad: the claims it makes, the objections it answers, who it appears to speak to, and every word of on-image text. Tags are validated against a human-graded sample and labelled AI-read in the product, so you can always tell which numbers come from Meta and which from the model; coverage is stated on every rollup, and a creative is read once it has spent enough for its performance to mean something." },
    { q: "What is hook rate and how is it measured?", a: "Hook rate measures how many people stopped scrolling to watch your ad: 3-second video views divided by impressions. Hold rate measures how many of those viewers kept watching: 15-second views divided by 3-second views. Together they show whether a creative earns attention and then holds it. The formulas are frozen, so the hook rate on the dashboard, in Drew's answers and in the weekly diagnosis is the same number." },
    { q: "How does creative fatigue detection work?", a: "Fatigue is a two-condition test, never a single signal. A creative is fatiguing when its link CTR is down 30% or more from its own 7-day peak and its frequency is 2.5 or above, or when its recent 7-day cost per purchase is 1.5 times its own 30-day baseline while spend is sustained. A fatiguing creative whose ROAS still holds is graded Fatiguing and mapped to ITERATE — a proven concept with a tired execution. One whose ROAS has also collapsed below the greater of 1.0 and 0.75 times your account average is graded Dead and mapped to KILL. Every verdict ships with the numbers that triggered it." },
    { q: "Are these numbers Meta-reported or true ROAS?", a: "Meta-reported, and labelled that way everywhere. ROAS, purchases and purchase value are the platform's own attribution — a leading indicator of creative strength rather than deduplicated revenue. Datadrew does not claim causal credit for every sale. For the business view, Drew reads the Shopify orders and blended ad efficiency behind the ads alongside the creative grades." },
    { q: "What does Rivals show, and where does the data come from?", a: "Rivals is built on public data from Meta's Ad Library. You track up to five competitor brands per shop, each in the market you choose, because global brands run a separate Page in each country. Drew deduplicates Meta's many ad IDs down to one row per creative, compares complete snapshots week over week, and keeps a copy of the media so it still loads later. You see what launched and stopped in the last 7 days, which creatives have run 30 days or more, their format, call-to-action and creator mix, and which ads are catalogue templates. Meta publishes no spend or results for competitor ads in any market, so none is shown or estimated. A Competitor Watch report can be scheduled as an automation, Monday mornings by default." },
    { q: "Can Drew act on a creative verdict?", a: "Yes, with your approval. From a creative diagnosis Drew proposes pausing a dead creative or scaling a winner as a recommendation card with the evidence attached. You approve it and Drew executes the change within your guardrails. Execution is rolling out now, so what is click-to-apply depends on what is enabled for your account." },
    { q: "Does Drew write the creative brief?", a: "Drew writes briefs conversationally. Ask for the iteration brief on a winning or fatiguing creative and Drew keeps the concept, changes the hook, and cites the tags, claims, objections and numbers that made the parent work — with hook-body-CTA structure, UGC script beats and one-variable A/B tests. Drew does not generate images or video; the brief is written for your editor or creator to produce." },
    { q: "Is Creative Strategy available on the free plan?", a: "Creative Strategy ships inside the existing plans rather than as a separate add-on. The free plan carries 3 months of history; AI Intelligence and AI Ads CoPilot carry all history and the monthly Drew credit allowance that conversational creative analysis and briefs draw on. Visit the pricing page for details." },
  ],
  closing: {
    headline: "Know what to brief next",
    body: "Connect Meta and Shopify. Your creatives are graded and your rivals collected within a day — free to get started.",
  },
};

export const platformPages: PlatformPage[] = [
  drewai,
  automations,
  acquisition,
  retention,
  productIntelligence,
  creativeStrategy,
];

export const platformIndex = {
  eyebrow: "Platform",
  headline: "One agent. The whole business behind the ads.",
  subhead:
    "Drew makes and executes the daily ad-spend decisions — and every decision leans on the same product, customer, retention and creative intelligence you can explore here.",
};

export function getPlatformPage(slug: string) {
  return platformPages.find((p) => p.slug === slug);
}
