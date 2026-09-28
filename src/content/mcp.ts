/* /mcp — ported from datadrew.io/mcp (4 Sep 2026). MCP is a surface for Drew,
 * not the differentiation; copy kept faithful to the live page. */

export const MCP_URL = "https://mcp.datadrew.io/mcp";

export const mcpPage = {
  eyebrow: "Model Context Protocol",
  headline: "Connect Claude, ChatGPT & any AI tool to your store data",
  subhead:
    "Datadrew's secure MCP server gives your AI assistant a live, read-only line to your Shopify, ads, email and analytics data. Ask in plain English — get real numbers, blended ROAS, LTV and cohorts back in seconds. No CSV exports. No hallucinations. Set up in 2 minutes.",
  primaryCta: { label: "Start for free", href: "https://app.datadrew.io" },
  secondaryCta: { label: "See the 2-minute setup", href: "#setup" },
  worksWith: ["Claude", "ChatGPT", "Cursor", "Windsurf", "VS Code", "Any MCP client"],
  stats: [
    { value: "1,000+", label: "Shopify brands" },
    { value: "$1.5Bn+", label: "GMV analyzed" },
    { value: "15+", label: "Data sources, one server" },
    { value: "47+", label: "Countries" },
  ],
  heroChat: {
    question: "Why did our blended ROAS drop last week?",
    tool: "Called Datadrew · fb_ads_get_campaign_insights",
    metrics: [
      { label: "Blended ROAS", value: "2.1x", delta: "−18%" },
      { label: "Meta CPC", value: "$1.74", delta: "+24%" },
      { label: "MER", value: "4.1x", delta: "−9%" },
    ],
    answer:
      "Meta CPC jumped 24% on 3 prospecting campaigns while Google held steady. Shift ~15% of budget to Google Brand and pause the 2 fatiguing ad sets.",
    chips: ["Why did ROAS drop?", "90-day LTV by cohort", "Hero SKUs vs wasters", "Monthly summary"],
  },
  problem: {
    headline: "Asking AI about your store today is broken",
    subhead: "Generic AI doesn't know your numbers — so you get confident guesses, or you spend your evening exporting spreadsheets.",
    items: [
      { title: "AI that guesses", description: "Ask ChatGPT about last week's ROAS and it invents a plausible-looking number. Without your real data, every answer is a hallucination waiting to mislead a decision." },
      { title: "Death by CSV export", description: "You burn hours exporting from Shopify, Meta and Google, stitching spreadsheets together, then pasting them into a chat window that forgets it all tomorrow." },
      { title: "Dashboards aren't answers", description: "A dozen dashboards tell you what happened. None of them tell you why, or which lever to pull next — so the insight dies in a tab you never reopen." },
    ],
    punchline: "Datadrew MCP gives your AI real, governed data — so it reasons instead of guessing.",
  },
  how: {
    eyebrow: "How it works",
    headline: "One connector. All your data. Plain English.",
    explainer:
      "MCP (Model Context Protocol) is an open standard that lets AI assistants securely connect to outside tools and data. Datadrew runs a public, OAuth-secured MCP server at mcp.datadrew.io. Connect it once and your AI client can query every platform you've linked to Datadrew — answering with the exact same numbers, metric definitions and permissions as the app.",
    steps: [
      { title: "Open Datadrew MCP", description: "In Datadrew, go to Settings → Datadrew MCP. It's free to connect on every plan, including Free." },
      { title: "Copy your secure URL", description: "Copy the Datadrew MCP URL — mcp.datadrew.io/mcp — shown right here and in Settings → Datadrew MCP." },
      { title: "Paste into your AI tool", description: "Add it as a connector in Claude, ChatGPT, Cursor or any MCP client, authorize with OAuth, and start asking." },
    ],
    endpointNote:
      "Paste this URL into your AI tool, then authorize with OAuth. You'll also find it — with step-by-step instructions — under Settings → Datadrew MCP inside Datadrew.",
    serverFacts: ["Read-only tools · every platform", "Blended CAC · ROAS · MER · LTV", "Analyst playbooks built in", "OAuth 2.1 · workspace-scoped · read-only"],
  },
  setup: {
    headline: "Set it up in your favourite AI tool",
    subhead: "Pick your client and follow the steps. Same URL, same OAuth flow, everywhere.",
    note: "The MCP server is free to connect on every plan, and MCP reads use zero Drew credits. You'll find the URL and full instructions any time in Settings → Datadrew MCP.",
    clients: [
      {
        id: "claude",
        label: "Claude",
        steps: [
          "Open Settings → Connectors in Claude (works in Claude.ai and Claude Desktop).",
          "Click Add custom connector and paste the URL above.",
          "Click Connect and authorize with your Datadrew account via OAuth.",
          "Start any chat and ask “What was my blended ROAS last week?” — Drew's tools run automatically.",
        ],
      },
      {
        id: "chatgpt",
        label: "ChatGPT",
        steps: [
          "In ChatGPT, open Settings → Connectors (or build a custom GPT).",
          "Add a new connector and paste the URL above.",
          "Sign in with OAuth to link your Datadrew workspace.",
          "Ask your store questions right inside the chat — ChatGPT calls Datadrew for the real numbers.",
        ],
      },
      {
        id: "cursor",
        label: "Cursor & IDEs",
        steps: [
          "Open your MCP config — mcp.json in Cursor, Windsurf or VS Code.",
          "Add a server entry pointing at https://mcp.datadrew.io/mcp.",
          "Reload and complete the OAuth flow when your editor prompts you.",
          "Drew's read-only tools appear alongside your other MCP servers, ready to query.",
        ],
        code: {
          title: "mcp.json",
          body: `{
  "mcpServers": {
    "datadrew": {
      "url": "https://mcp.datadrew.io/mcp"
    }
  }
}`,
        },
      },
      {
        id: "any",
        label: "Any client",
        steps: [
          "Point any spec-compliant MCP client at https://mcp.datadrew.io/mcp (streamable HTTP).",
          "Authenticate with OAuth — access is scoped to your workspace and plan.",
          "Discover Datadrew's read-only tools across every connected platform.",
          "Use them from any agent framework, automation or custom app that speaks MCP.",
        ],
      },
    ],
  },
  sources: {
    eyebrow: "15+ sources, one connector",
    headline: "Everything your AI can pull",
    subhead:
      "Connect once and your assistant can query 15+ platforms in plain English — all blended into consistent CAC, ROAS, MER and LTV definitions the AI actually understands.",
    groups: [
      { title: "Store & orders", tools: ["Shopify", "ShopifyQL", "GraphQL", "Inventory"], prompt: "Show me yesterday's revenue, AOV and units sold by product type." },
      { title: "Advertising", tools: ["Meta Ads", "Google Ads", "Amazon Ads"], prompt: "Compare ROAS and CPC across Meta and Google for the last 14 days." },
      { title: "Web & SEO", tools: ["Google Analytics 4", "Search Console"], prompt: "Which landing pages convert best, and which search queries are rising?" },
      { title: "Email & retention", tools: ["Klaviyo", "Brevo"], prompt: "How much revenue did my Klaviyo flows drive vs campaigns this month?" },
      { title: "Payments & subscriptions", tools: ["Stripe", "Recharge", "Skio"], prompt: "What's my subscription churn and MRR trend by plan?" },
      { title: "Marketplaces & ops", tools: ["Amazon Seller", "Unicommerce", "Judge.me", "AfterShip"], prompt: "Break down sales by marketplace and flag any late shipments." },
    ],
  },
  prompts: {
    headline: "A prompt library to get you started",
    subhead: "Copy a prompt, paste it into Claude or ChatGPT, and let Drew pull the numbers. Filter by what you're working on.",
    categories: ["All", "Acquisition", "Retention", "Product", "Executive"],
    items: [
      { c: "Acquisition", p: "Where should I shift budget this week for better blended ROAS?" },
      { c: "Acquisition", p: "Show me which ads are winning and which to pause across Meta and Google." },
      { c: "Acquisition", p: "Which campaigns wasted the most budget last week, and why?" },
      { c: "Retention", p: "Show me my customer segments — who are my champions vs at-risk?" },
      { c: "Retention", p: "What's my 90-day LTV by acquisition cohort?" },
      { c: "Retention", p: "Which products drive the most repeat purchases?" },
      { c: "Product", p: "Which SKUs are hero products vs ad-spend wasters?" },
      { c: "Product", p: "What are my top product bundles by revenue for cross-sell?" },
      { c: "Product", p: "Show me repurchase rates by product type over the last 6 months." },
      { c: "Executive", p: "Give me an executive summary of this month's performance." },
      { c: "Executive", p: "How are we performing vs last month, and what changed?" },
      { c: "Executive", p: "Which channel should I scale next, and what's the expected payback?" },
    ],
  },
  agencies: {
    eyebrow: "For agencies & multi-store brands",
    headline: "Every client store, in one conversation",
    subhead: "Managing more than one Shopify store? Datadrew MCP is built for it. No re-authing between clients, no juggling logins — just ask.",
    items: [
      "Query multiple stores in a single chat session.",
      "Name the store in your question, or compare two stores in one go.",
      "Every answer reports which store it actually ran against.",
      "One Datadrew login, OAuth-scoped to exactly the shops you manage.",
    ],
    stores: ["Acme Cosmetics", "Northwind Apparel", "Peak Supplements"],
    example: "Compare 30-day MER across all three stores →",
  },
  security: {
    eyebrow: "Secure by design",
    headline: "Your data, on your terms",
    subhead: "Plug AI into your store with confidence. Datadrew MCP is read-only, OAuth-secured, and built so your assistant can analyze everything while changing nothing.",
    items: [
      { title: "OAuth, not API keys", description: "Access is granted through OAuth and tied to your Datadrew workspace. Revoke it anytime from the app — no secret keys to leak." },
      { title: "Read-only by default", description: "The server can read and analyze your data — it can never pause campaigns, edit orders, move budget or place spend." },
      { title: "Data minimization", description: "Drew sends your AI only the data needed to answer the question in front of it — nothing more, never your whole database." },
      { title: "Encrypted & compliant", description: "Data is encrypted in transit and at rest on SOC 2-compliant, GDPR-aligned infrastructure — the same backbone that powers the app." },
    ],
  },
  compare: {
    headline: "Why Datadrew MCP, not just ChatGPT?",
    subhead: "Plain chatbots guess. Ad-only connectors see a sliver of your funnel. Datadrew gives your AI the whole picture.",
    head: ["Capability", "Datadrew MCP", "Plain ChatGPT / Claude", "Ad-only AI connectors"],
    rows: [
      ["Answers from your real store data", "✓", "✗", "Ads only"],
      ["Connected data sources", "15+", "0", "2–3"],
      ["Shopify orders, products & LTV", "✓", "✗", "✗"],
      ["Blended ROAS, MER & cohorts", "✓", "✗", "Partial"],
      ["Email, subscriptions & marketplaces", "✓", "✗", "✗"],
      ["Read-only & OAuth-secured", "✓", "n/a", "Varies"],
      ["Works in Claude, ChatGPT & Cursor", "✓", "—", "✓"],
      ["Multi-store for agencies", "✓", "✗", "Partial"],
      ["Consistent metric definitions", "✓", "✗", "Partial"],
    ] as string[][],
  },
  surfaces: {
    headline: "One analyst, everywhere you work",
    subhead: "The MCP server is one of three ways to put Drew to work. Same brain, same numbers — wherever your team lives.",
    items: [
      { title: "In the Datadrew app", description: "Chat with Drew right inside Datadrew, next to your dashboards, on every plan.", link: { label: "Meet Drew", href: "/#product" }, plan: "All plans" },
      { title: "In Slack", description: "Mention @Drew in any channel and get charts and recommendations back in-thread.", link: { label: "Slack integration", href: "/integrations/slack" }, plan: "AI Intelligence and AI Ads CoPilot" },
      { title: "Via MCP (you're here)", description: "Bring Drew's tools into Claude, ChatGPT, Cursor or any MCP client with one URL.", link: { label: "Jump to setup", href: "#setup" }, plan: "AI Intelligence and AI Ads CoPilot" },
    ],
  },
  testimonials: [
    { quote: "One of the best apps in the Shopify App Store. Saves hours of manual reporting if you track customer lifetime value. Good options for slicing and dicing by customer cohort, product, etc.", name: "Kyle Hill", role: "Director of Paid Media, KradleMyPet" },
    { quote: "WOW is all I can say. I have spent so much time trying to nail down an accurate LTV and I was amazed at how robust this app is and gives me quality data that I can take action on.", name: "Eric Birkemeier", role: "Co-Founder & CMO, Shred Lights" },
    { quote: "Needed a tool for historic cohort / LTV analysis. Datadrew hit the sweet spot. Nifty, to the point, quick 1:1 support and great pricing.", name: "Stephan Freh", role: "Partner" },
  ],
  faq: [
    { q: "What is MCP (Model Context Protocol)?", a: "MCP, the Model Context Protocol, is an open standard that lets AI assistants like Claude and ChatGPT securely connect to external tools and data. Datadrew runs a public, OAuth-secured MCP server at mcp.datadrew.io, so your AI client can query the platforms you've connected to Datadrew using your own data — instead of guessing." },
    { q: "Which AI tools can I connect to Datadrew?", a: "Any MCP-compatible client — including Claude (Claude.ai and Claude Desktop), ChatGPT, Cursor, Windsurf, VS Code and other agent frameworks that support the Model Context Protocol. You connect them all with the same MCP URL and OAuth flow." },
    { q: "Is it safe to connect my store data to AI?", a: "Yes. Access is granted through OAuth and tied to your Datadrew workspace, so you can revoke it anytime. The MCP server is read-only, it sends your AI only the data needed to answer the current question, and all data is encrypted in transit and at rest on SOC 2-compliant, GDPR-aligned infrastructure." },
    { q: "Can the AI change my campaigns, orders or ad spend?", a: "No. The Datadrew MCP server is read-only by design. Your AI assistant can read and analyze your data, but it can never pause campaigns, edit orders, move budget or place spend. It analyzes everything and changes nothing." },
    { q: "Which Datadrew plan do I need for MCP?", a: "None beyond Free. Connecting Claude, ChatGPT, Cursor or any MCP client to your own connected data is free on every plan, and MCP reads never use Drew credits. Free gives your AI reads of Shopify, Meta Ads, Google Ads, GA4 and Klaviyo with 3 months of history; AI Intelligence adds Datadrew's computed creative, product and cohort insights and all history; AI Ads CoPilot adds execution playbooks. Your personal MCP URL appears in Settings → Datadrew MCP." },
    { q: "How long does setup take?", a: "About two minutes. Open Settings → Datadrew MCP in Datadrew, copy your MCP URL, paste it into Claude, ChatGPT or your IDE as a custom connector, and authorize with OAuth. There's no code to write." },
    { q: "What data can my AI assistant access?", a: "Everything you've connected to Datadrew — 15+ sources including Shopify, Meta Ads, Google Ads, GA4, Google Search Console, Klaviyo, Amazon Seller and Amazon Ads, Unicommerce, Stripe, Recharge, Skio, Brevo, Judge.me and AfterShip — plus blended cross-channel KPIs like ROAS, MER, CAC and LTV." },
    { q: "Can agencies use it across multiple stores?", a: "Yes. Multi-store merchants and agencies can query several stores in a single session — name the store in your question, or compare two stores in one question, without re-authenticating. Every answer tells the AI which store it ran against, and access is OAuth-scoped to exactly the shops you manage." },
  ],
  closing: {
    headline: "Bring your store data into Claude & ChatGPT",
    body: "Connect Datadrew's MCP server and ask your AI anything about your Shopify, ads and analytics data — securely, with OAuth, in two minutes.",
    note: "Free to connect on every plan. MCP reads use zero Drew credits.",
  },
};
