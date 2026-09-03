// All marketing copy for datadrew.io lives here, separated from presentation.
// Grounded in /context/datadrew/Positioning_v8_Proposed_Aug18.md. Boundaries:
// not an analytics dashboard, not an attribution platform, not a rule-based
// optimizer; execution is "rolling out now" — never claimed as universally on;
// Meta + Google are the only channels named; MCP/Slack are surfaces, not the
// differentiation; profit is the objective, not the category.

export const site = {
  name: "Datadrew",
  domain: "datadrew.io",
  appUrl: "https://app.datadrew.io",
  tagline: "The AI ads agent for Shopify brands",
  description:
    "Datadrew is the AI ads agent for Shopify brands. Drew knows your products, margins, inventory and customers — not just your ad account — and combines that context with expert paid-ads judgment to make and execute better ad-spend decisions every day.",
};

export const hero = {
  eyebrow: "The AI ads agent for Shopify brands",
  // v8 messaging hierarchy: category (eyebrow) → promise (headline)
  headline: ["Make and execute", "better ad decisions."],
  subhead:
    "Drew has the judgment of an experienced media buyer — because it knows your business, not just your ad account. It watches your ads and your Shopify data every day, tells you what to scale, cut, fix or leave alone, and executes approved changes with guardrails.",
  primaryCta: { label: "Start free", sub: "Your first ads brief the same day" },
  secondaryCta: { label: "Read a sample ads brief" },
  finePrint: "7-day free trial · From $99/mo · Cancel anytime",
};

export const trustBar = {
  stats: [
    { value: "1,000+", label: "Shopify brands benchmarked" },
    { value: "$1.5B", label: "GMV analyzed" },
    { value: "5.0★", label: "Shopify App Store" },
    { value: "47", label: "countries" },
  ],
  brands: ["Aqualogica", "Monos", "Hello Bello", "Zouk", "Clinikally"],
};

// The pain section — v8 §2: running paid ads well is a continuous
// decision-and-execution job. The log renders the operator's daily questions.
export const problem = {
  eyebrow: "The daily decision job",
  headline: "Running paid ads well is a daily decision job.",
  narrative: [
    { time: "9:04", tab: "ROAS dipped", note: "Real signal, normal variance — or Tuesday's change landing?" },
    { time: "9:31", tab: "Budget", note: "Where should the next ad dollar actually go?" },
    { time: "9:58", tab: "Creative", note: "Scale it, rotate it, or let it ride?" },
    { time: "10:22", tab: "That 3.2 ROAS", note: "Still good once margin and inventory are in the math?" },
    { time: "11:15", tab: "Intervene?", note: "Act now, investigate first — or leave the account alone?" },
  ],
  logCoda: "And the same questions again tomorrow.",
  punchline:
    "The hard part isn't data. It's running this decision loop quickly, repeatedly and safely — across Meta, Google and the Shopify business behind them — then acting on the right calls without destabilising performance.",
  bridge: "Drew is the ads agent that runs this loop every day.",
};

// Why believe it — v8 §3. Four pillars: context, judgment, execution, memory.
export const pillars = [
  {
    id: "context",
    kicker: "01 — Context",
    title: "It knows the business behind the ads",
    lead: "Drew doesn't reason from the ad account alone. It sees your products, margins, inventory, customers, repeat behavior and history — live.",
    body: "SKU A has a 62% margin. SKU B has 21%. SKU C brings customers who repeat 3x more. SKU D has eight days of stock left. The same ROAS should not lead to the same budget decision for all four — and with Drew, it doesn't.",
    proof:
      "Drew learns from your connected data and your preferences, so its decisions get increasingly specific to how your business actually operates.",
    bullets: [
      "Margins, inventory and repeat behavior sit inside every budget call",
      "Products, customers, promotions and history — connected, not exported",
      "A \"good\" ROAS gets re-judged against the economics behind it",
    ],
  },
  {
    id: "judgment",
    kicker: "02 — Judgment",
    title: "It thinks like an experienced media buyer",
    lead: "Drew is built around how expert paid-ads operators actually work — not a generic AI assistant with ad APIs attached.",
    body: "Protecting signal quality, diagnosing causal drivers, managing creative portfolios, allocating marginal budget, preparing for promotions, scaling and descaling without repeatedly disrupting platform learning — encoded as channel-specific playbooks for Meta and Google.",
    proof:
      "Drew knows your business deeply — and has learned from thousands of similar ad decisions across Shopify brands. It understands not only what performed, but what is limiting the next level of profitable spend.",
    bullets: [
      "Separates real signal from noise before recommending anything",
      "Channel-specific playbooks — Meta and Google reasoned separately, one view of the business",
      "Knows when to act, how much to change — and when to leave the account alone",
    ],
  },
  {
    id: "execution",
    kicker: "03 — Execution",
    title: "It acts — with guardrails",
    lead: "Budget changes, pauses, scaling and descaling: Drew executes approved decisions inside limits you control.",
    body: "The goal isn't automation for its own sake. It's high-quality ads decisions executed with the controls a sophisticated operator expects: playbooks, memory, context, guardrails and feedback loops.",
    proof:
      "Every action Drew takes is explicit, approved and logged with its reasoning. No silent changes, ever.",
    bullets: [
      "Approve queued changes in one click — from the brief, or from Slack",
      "Guardrails you set: max daily change, protected campaigns, spend limits",
      "Every action logged with the reasoning behind it",
    ],
    honesty: {
      title: "Where execution stands",
      body: "Ads execution is rolling out now. What Drew can execute on your account is always explicit in the product — recommendations everywhere, actions as they're enabled for you. We'd rather be precise than impressive.",
    },
  },
  {
    id: "brain",
    kicker: "04 — Memory",
    title: "It compounds — your brand becomes its brain",
    lead: "The longer Drew works with your brand, the more it knows: definitions, preferences, past decisions, promotions, what worked and what didn't.",
    body: "Most tools feel like \"AI that can analyze ads.\" Drew is built to feel like \"our ads agent knows how we run this business\" — scaling rules, acceptable risk, promo calendars, historical calls and their outcomes.",
    proof:
      "The longer Drew works with your brand, the more it understands how your business operates and how your team wants ads managed.",
    bullets: [
      "Remembers your scaling rules, risk tolerance and definitions",
      "Carries promotion history and seasonal patterns into new decisions",
      "Feeds decision outcomes back into the next call",
    ],
  },
];

// The honest comparison — three characters. Boundaries respected: we compare
// against dashboards and rule-based optimizers, not attribution platforms.
export const comparison = {
  eyebrow: "The honest comparison",
  headline: "The cockpit, the autopilot, or the ads agent.",
  columns: [
    {
      name: "Dashboards",
      label: "The cockpit",
      verdict:
        "Beautiful instruments across every metric. They show you what moved — the deciding, and the doing, stay entirely with you.",
      rows: {
        knowsBusiness: "Displays it — you connect the dots",
        explainsWhy: false,
        allocates: false,
        executes: false,
        restraint: false,
        price: "$100–2,000/mo",
      },
    },
    {
      name: "Rule-based optimizers",
      label: "The autopilot",
      verdict:
        "IF ROAS < 2, THEN cut budget. Fast, tireless — and blind to margins, inventory, creative fatigue and the cost of touching a learning account.",
      rows: {
        knowsBusiness: false,
        explainsWhy: false,
        allocates: "By threshold, not judgment",
        executes: "Whatever the rule says",
        restraint: false,
        price: "$50–500/mo",
      },
    },
    {
      name: "Datadrew",
      label: "The ads agent",
      verdict:
        "Knows the business, thinks like a media buyer, recommends with reasons — and executes approved changes with guardrails.",
      highlight: true,
      rows: {
        knowsBusiness: true,
        explainsWhy: "Every day, with the numbers",
        allocates: "With margin, stock & repeat behavior in the math",
        executes: "Approved changes, with guardrails",
        restraint: "Often the best call it makes",
        price: "From $99/mo",
      },
    },
  ],
  rowLabels: {
    knowsBusiness: "Knows your margins, inventory & customers",
    explainsWhy: "Diagnoses why performance moved",
    allocates: "Decides where the next dollar goes",
    executes: "Executes the changes",
    restraint: "Knows when to do nothing",
    price: "Price",
  },
  kicker:
    "Every dollar on the wrong SKU, a fatigued creative or a mistimed scale-up compounds daily. On $200K/mo of spend, a 5% misallocation burns more in a month than Drew costs in years.",
};

// Where Drew works — v8 §7. Surfaces, deliberately not the differentiation.
export const surfaces = {
  eyebrow: "Where Drew works",
  headline: "Wherever you already work.",
  items: [
    {
      id: "app",
      title: "Datadrew",
      body: "The full experience: connected data, analysis, brand context, workflows, reports and ads management.",
      chip: "app.datadrew.io",
    },
    {
      id: "slack",
      title: "Slack",
      body: "The Daily Ads Brief and Drew Q&A inside your team's workspace — founders and marketers share the same brand context without living in another dashboard.",
      chip: "briefs · alerts · approvals",
    },
    {
      id: "mcp",
      title: "Claude & ChatGPT",
      body: "Your live ads and business data inside the AI tools you already use, through Drew's MCP connector. Free to connect — the judgment, workflows and execution live on top.",
      chip: "MCP · free to connect",
    },
  ],
};

// Who we build for — v8 §6. ICP: Shopify brands ~$1M–$30M+ GMV with
// meaningful paid acquisition on Meta and Google. Agencies are first-class.
export const audiences = [
  {
    id: "founders",
    title: "Founder-operators",
    lines: [
      "Every morning: what changed, what Drew recommends, and what's queued — in one brief.",
      "Decisions made on your margins, inventory and cash — not platform ROAS in isolation.",
      "The judgment of a senior media buyer, without the senior-media-buyer payroll.",
    ],
  },
  {
    id: "growth",
    title: "Growth & performance leaders",
    lines: [
      "An expert second brain on every daily call: scale, cut, hold or investigate.",
      "When a metric moves, Drew has the diagnosis — cause, numbers, recommendation — before anyone asks.",
      "Execution inside guardrails you set: change caps, protected campaigns, full logs.",
    ],
  },
  {
    id: "agencies",
    title: "Agencies",
    lines: [
      "Manage more brands without diluting quality — Drew holds each brand's full context.",
      "Answer \"why did ROAS drop?\" before the client asks.",
      "Consistent, defensible decision-making across every account, with your process encoded.",
    ],
  },
];

// Real testimonial themes from app reviews & support threads; identities are
// PLACEHOLDER (anonymized in source docs) — swap in permissioned attributions.
export const testimonials = [
  {
    quote:
      "Thanks to your AI, we identified that the customer tag was missing for about 7,000 customers.",
    name: "Head of E-commerce",
    company: "Shopify Plus retailer, France",
    placeholder: true,
  },
  {
    quote:
      "The LTV and cohort numbers are the first ones that actually reconcile with our Shopify data. We use them in every investor update.",
    name: "Founder",
    company: "DTC apparel brand",
    placeholder: true,
  },
  {
    quote:
      "Support feels like having the founders on our team. Questions about gross vs net revenue got answered with the actual math.",
    name: "Growth lead",
    company: "Home & living brand",
    placeholder: true,
  },
];

export const integrations = [
  "Shopify",
  "Meta Ads",
  "Google Ads",
  "GA4",
  "Klaviyo",
  "Amazon",
  "Slack",
  "Claude",
  "ChatGPT",
];

export const pricing = {
  eyebrow: "Pricing",
  headline: "A fraction of a media buyer. None of the contract.",
  subhead:
    "Plans scale with your store's GMV. 7-day free trial on every paid plan. Cancel anytime — we mean it.",
  tiers: [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Kick the tires on your real data.",
      features: [
        "500 welcome credits for Drew",
        "3 months of history",
        "Core dashboards",
        "Shopify + ad platform integrations",
      ],
      cta: "Start free",
    },
    {
      name: "Essentials",
      price: "$99",
      period: "/mo",
      description: "The Daily Ads Brief, on schedule.",
      features: [
        "Everything in Free",
        "Drew chat across all connected sources",
        "Daily Ads Brief to Slack & email",
        "Diagnosis, leakages & budget recommendations",
        "12+ months of history",
      ],
      cta: "Start 7-day trial",
      highlight: true,
    },
    {
      name: "Pro",
      price: "$149",
      period: "/mo",
      description: "For teams that run on Drew's judgment.",
      features: [
        "Everything in Essentials",
        "Ads execution with guardrails (rolling out)",
        "Drew in Claude & ChatGPT (MCP)",
        "Multi-seat workspaces",
        "1:1 growth consulting",
      ],
      cta: "Start 7-day trial",
    },
  ],
  finePrint:
    "Prices shown are entry points; plans are banded by store GMV. No 12-month contracts, no cancellation maze.",
};

export const faq = [
  {
    q: "How long does setup take?",
    a: "About 10 minutes. Connect Shopify and your ad accounts via OAuth, and Drew starts learning your business. Your first Daily Ads Brief lands the same day.",
  },
  {
    q: "Will Drew change my ads without asking?",
    a: "No. Drew executes approved changes inside guardrails you control — approval flows, daily change caps, protected campaigns. Execution is rolling out now; what Drew can execute on your account is always explicit in the product, and every action is logged with its reasoning.",
  },
  {
    q: "How is this different from a dashboard?",
    a: "Dashboards show you what moved and hand you the deciding. Drew's product is the decisions themselves: what changed, why, whether to intervene, where the next ad dollar goes — and increasingly, the execution. Analytics are inputs, not the product.",
  },
  {
    q: "Is this an attribution tool?",
    a: "No. Drew works with Shopify, GA4 and platform reporting without claiming causal credit for every sale. It doesn't need attribution theater to tell you that 40% of your spend sits on a 21%-margin SKU.",
  },
  {
    q: "Which ad channels does Drew manage?",
    a: "Meta and Google today, with your Shopify business as the backbone. Each channel gets its own playbooks — Drew doesn't flatten everything into one generic optimisation recipe.",
  },
  {
    q: "Does Drew just optimize for ROAS?",
    a: "No — not in isolation. Drew uses the economics of your business — margins, inventory, repeat behavior — to grow ads profitably. A \"good\" ROAS on the wrong SKU is still a bad decision.",
  },
  {
    q: "Where does my data live?",
    a: "In databases accessible only from our internal network. Drew's MCP access is OAuth-scoped and read-only.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Month to month, cancel in two clicks from the app. No 12-month contracts, no retention maze.",
  },
];

export const finalCta = {
  headline: "Where does your next ad dollar go?",
  subhead:
    "Connect your store and ad accounts — your first Daily Ads Brief lands the same day. Free to start, from $99/mo after.",
  primaryCta: "Start free",
  secondaryCta: "See a sample brief",
};

// The hero centerpiece: a rendered Daily Ads Brief. Content is a realistic
// composite of documented Drew behaviors (business-context-aware budget calls,
// fatigue detection, restraint) — labeled as an example, not real data.
export const sampleBrief = {
  meta: {
    title: "Daily Ads Brief",
    store: "example-store.myshopify.com",
    date: "Tuesday, Aug 18",
    deliveredVia: "Slack · 7:00 AM",
  },
  headline:
    "Spend steady at $6.2K. Two moves recommended — one change queued for your approval.",
  sources: ["shopify", "meta", "google", "klaviyo", "ga4"],
  findings: [
    {
      severity: "high",
      platform: "meta",
      title: "Scale the Hero Bundle adset",
      detail:
        "ROAS 4.1 over 7 days on your 62%-margin SKU, with 11 weeks of stock. Marginal spend has room before frequency strains.",
      action: "Queued: +15% budget — inside your 20%/day guardrail. Approve in Slack.",
    },
    {
      severity: "high",
      platform: "meta",
      title: "Creative fatigue in “Summer-Hero-V3”",
      detail:
        "Frequency hit 4.2 (was 2.1); CTR fell 38%. It still drives 31% of paid revenue — pausing it blind would hurt more than the fatigue.",
      action: "Rotate in last month's two winning variants. Keep the adset live.",
    },
    {
      severity: "info",
      platform: "google",
      title: "Brand campaign steady — leave it alone",
      detail:
        "CPC and conversion within normal variance. Intervening here would only disturb learning.",
      action: null,
    },
  ],
  queued: { name: "Hero Bundle adset", platform: "meta", from: "$410", to: "$472", unit: "/ day" },
  footer: "Approve, edit, or ask Drew to dig deeper — in the app or Slack.",
};

// ---------------------------------------------------------------------------
// Sections added for the Sept 2026 "agent" layout (Magic UI / shadcn build).

export const heroBadge = "New · Ads execution with guardrails is rolling out";

export const howItWorks = {
  eyebrow: "How it works",
  headline: "Connect. Learn. Decide. Execute.",
  subhead:
    "From OAuth to your first Daily Ads Brief in one day — and a better-informed ads agent every day after.",
  steps: [
    {
      id: "connect",
      title: "Connect your store and ad accounts",
      body: "Shopify, Meta and Google via OAuth. About ten minutes, no exports, no spreadsheets.",
    },
    {
      id: "learn",
      title: "Drew learns the business behind the ads",
      body: "Products, margins, inventory, customers, repeat behavior, promotions and history — plus how your team likes ads run.",
    },
    {
      id: "decide",
      title: "Get the brief, the diagnosis and the recommendation",
      body: "Every morning: what changed, why, what to scale, cut, fix or leave alone — with the numbers behind each call.",
    },
    {
      id: "execute",
      title: "Approve, and Drew executes with guardrails",
      body: "Budget changes, pauses, scaling and descaling inside limits you set. Every action logged with its reasoning.",
    },
  ],
};

export const guardrails = {
  eyebrow: "Built for operators",
  headline: "Judgment you can delegate. Controls you keep.",
  subhead:
    "Drew is built around how sophisticated paid-ads teams actually work — approvals, caps, protected campaigns and a full audit trail.",
  cards: [
    {
      id: "guardrails",
      title: "Executes inside your guardrails",
      body: "Approval flows, max daily change, protected campaigns, spend limits. No silent changes — ever. Execution is rolling out now, and what Drew can do on your account is always explicit in the product.",
    },
    {
      id: "surfaces",
      title: "Works where you already work",
      body: "The full experience in the Datadrew app, the Daily Ads Brief and approvals in Slack, and your live ads + business data inside Claude and ChatGPT through Drew's MCP connector.",
    },
  ],
};

// Customer stories — two cards, one D2C brand and one agency. Numbers come from
// /work/drew-usage-mining/ (CAVA week Aug 27–Sep 3; agency audit Aug 2026).
// PERMISSION: both names require sign-off before launch; the CAVA notes say to
// anonymise in public content. `href` targets are placeholders until case-study
// pages exist.
export const customerStories = {
  eyebrow: "Customer stories",
  headline: ["Meet the brands", "who win with Drew"],
  categories: ["Shopify brands", "Agencies"],
  allLabel: "All customer stories",
  allHref: "/customers",
  stories: [
    {
      id: "cava",
      category: "Shopify brands",
      brand: "CAVA Athleisure",
      descriptor: "₹5 Cr/month athleisure brand · India",
      // Logo pulled from cavaathleisure.com (Sep 3) — permission still pending
      logo: { light: "/customers/cava-logo.png", dark: "/customers/cava-logo-white.png", width: 455, height: 113 },
      // [lead, highlight, trail] — the highlight is set in bold
      headline: [
        "How CAVA found ",
        "₹12.7L of under-3x catalog spend",
        " hiding behind a 4.6x account ROAS",
      ],
      proof: "Six roles run Drew daily — one prompt joins Meta, Google, GA4, Shopify and inventory into a causal answer.",
      href: "/customers/cava",
      permission: "pending",
    },
    {
      id: "devavi",
      category: "Agencies",
      brand: "Devavi Media",
      descriptor: "Performance marketing agency · India",
      // Square mark from their LinkedIn page (Sep 3) — permission still pending
      logo: { light: "/customers/devavi-logo.png", width: 394, height: 155 },
      headline: [
        "",
        "30 ads sorted into Scale, Monitor and Stop",
        " — a full media-buyer brief in one command",
      ],
      proof: "₹73.8K of dead spend identified in 7.7 minutes, with two budget changes queued for approval.",
      href: "/customers",
      permission: "pending",
    },
  ],
};

// Creative Intelligence — launched Aug 21 2026 (/work/creative-intelligence-launch/).
// Claims only what the launch pack claims: Convert Score + Scale/Iterate/Kill/Wait
// with reasoning shown. Card numbers mirror the launch graphic; all example data.
// Images are Unsplash stand-ins (public/creatives/CREDITS.md) — swap for real ads.
export const creativeIntelligence = {
  eyebrow: "Creative Intelligence",
  headline: ["Every ad graded.", "Scale, Iterate, Kill or Wait."],
  subhead:
    "Drew grades every active creative in your Meta account and gives each one a verdict with the reasoning shown — measured against the ad's own peak, not just last week's ROAS.",
  bullets: [
    "A Convert Score for every ad — delivery, CTR vs. its own peak, frequency and conversion economics in one grade",
    "Catches fatigue while it's still cheap: CTR breaks before CPA does",
    "\"Iterate\" verdicts tell you what to shoot next — the brief writes itself",
  ],
  cta: { label: "Read the launch post", href: "/blog/creative-intelligence" },
  cards: [
    {
      id: "serum",
      image: "/creatives/serum.jpg",
      alt: "Ad creative: skincare serum bottle on a white surface",
      name: "Vitamin C Serum",
      verdict: "Scale",
      spend: "$78,980",
      roas: "2.1",
      cpa: "$12",
      score: 73,
    },
    {
      id: "sneaker",
      image: "/creatives/sneaker.jpg",
      alt: "Ad creative: white and orange sneaker floating on a light background",
      name: "Cloud Runner",
      verdict: "Iterate",
      spend: "$41,260",
      roas: "1.6",
      cpa: "$31",
      score: 48,
    },
    {
      id: "bottle",
      image: "/creatives/bottle.jpg",
      alt: "Ad creative: black and orange bottle beside a white jar",
      name: "Solar Citrus Bottle",
      verdict: "Scale",
      spend: "$22,032",
      roas: "3.1",
      cpa: "$22",
      score: 91,
    },
  ],
};

// Drew for AI agents — replaces the comparison section (Sep 3). Facts from the
// live datadrew.io/mcp page: endpoint mcp.datadrew.io/mcp, streamable HTTP,
// OAuth 2.1, read-only, workspace-scoped; clients: Claude, ChatGPT, Cursor,
// Windsurf, VS Code, any MCP client. Chat transcript is example data.
export const mcpAgents = {
  eyebrow: "Drew for AI agents",
  headline: "Drew for AI agents",
  subhead:
    "Connect Drew to Claude, ChatGPT, Cursor or Claude Code with MCP. Ask in plain English about your ads, your store and your customers — and get real numbers back, not guesses.",
  primaryCta: { label: "Connect with MCP", href: "https://app.datadrew.io/datadrew-mcp" },
  secondaryCta: { label: "Read the setup guide", href: "https://datadrew.io/mcp/" },
  mcpUrl: "https://mcp.datadrew.io/mcp",
  chat: {
    title: "datadrew.io",
    mode: "agent mode",
    question: [
      "Which Meta campaigns lost efficiency this week?",
      "Tell me if it's creative fatigue or an inventory problem.",
    ],
    worked: "Worked for 12s",
    // **bold** segments are rendered in white/semibold
    answer: "This week, **3 of 11** prospecting campaigns fell below your 2.0x floor. **2** are creative fatigue. **1** is inventory.",
    groups: [
      {
        title: "Creative fatigue",
        rows: ["Summer-Hero-V3 · frequency 3.8 · CTR −31% vs peak", "UGC-Testimonial-02 · frequency 4.1 · CTR −27% vs peak"],
      },
      {
        title: "Inventory",
        rows: ["Hero Bundle · size M out of stock since Tuesday · ROAS 4.2 → 1.6"],
      },
      {
        title: "Recommended",
        rows: ["Rotate two fresh cuts into the fatigued ad sets", "Pause Hero Bundle until size M is back in stock"],
      },
    ],
  },
  clients: ["Claude", "ChatGPT", "Cursor", "Claude Code", "Windsurf", "VS Code"],
};
