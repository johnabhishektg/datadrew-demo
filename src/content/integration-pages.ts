/* Per-integration detail pages (/integrations/<slug>). Ported from the live
 * datadrew.io/integrations/<slug>/ pages on 4 Sep 2026. Keyed by the catalog
 * slug in ./integrations.ts so name / logo / stage come from one place; Gmail
 * and Google Sheets are not in the app catalog (they're export surfaces), so
 * they carry their own minimal `catalog` override. Metrics, tables and Drew
 * conversations are illustrative example data, as on the live site. */

import { allIntegrations, type Integration } from "./integrations";

export type IntegrationMetric = { label: string; value: string; delta?: string; down?: boolean };

export type IntegrationPage = {
  slug: string;
  /** Overrides for integrations that aren't in the app catalog. */
  catalog?: Integration;
  category: string;
  /** H1. */
  title: string;
  /** Hero subhead. */
  subhead: string;
  seoTitle: string;
  metaDescription: string;
  primaryCta?: { label: string; href: string };
  /** Intro section: headline + paragraph + example metrics + table. */
  intro?: {
    headline: string;
    body: string;
    metrics: IntegrationMetric[];
    table?: { caption: string; head: string[]; rows: string[][] };
  };
  features: { title: string; description: string }[];
  synced?: { headline: string; blurb: string; items: string[] };
  steps: { headline: string; blurb?: string; items: { title: string; description: string }[] };
  drew?: {
    headline: string;
    blurb: string;
    prompts: string[];
    chat: { question: string; answer: string[]; insight?: string };
  };
  faq?: { q: string; a: string }[];
  privacy?: { headline: string; blurb: string; items: string[] };
  closing: { headline: string; body: string };
};

const APP_INTEGRATIONS = "https://app.datadrew.io/integrations";
const SHOPIFY_LISTING = "https://apps.shopify.com/customer-lifetime-value";

export const integrationPages: IntegrationPage[] = [
  {
    slug: "shopify",
    category: "Core platform",
    title: "Shopify Integration",
    subhead:
      "Connect effortlessly to all your Shopify stores and unlock a world of data-driven decision-making. Automatic setup on app install with full data sync.",
    seoTitle: "Shopify Integration — Connect Your Shopify Store",
    metaDescription:
      "Connect your Shopify store to Datadrew and give your AI ads agent the business behind the ads. Automatically sync orders, products, customers, and inventory data to uncover actionable insights.",
    primaryCta: { label: "Install on Shopify", href: SHOPIFY_LISTING },
    intro: {
      headline: "Your Shopify data, supercharged with AI",
      body: "Datadrew is a native Shopify app that connects directly to your store. Once installed, your orders, products, customers, inventory, and refunds are synced automatically — no manual exports or CSV uploads needed. Datadrew transforms this raw data into actionable intelligence: product repurchase rates, customer LTV, cohort retention, basket analysis, and more.",
      metrics: [
        { label: "Total orders", value: "24,380", delta: "+18%" },
        { label: "Avg AOV", value: "$74.50", delta: "+6%" },
        { label: "Repeat rate", value: "34.2%", delta: "+3%" },
      ],
      table: {
        caption: "Store overview · last 30 days",
        head: ["Metric", "Value", "Trend"],
        rows: [
          ["Revenue", "$182K", "+18%"],
          ["New customers", "1,840", "+12%"],
          ["Products sold", "8,420", "+9%"],
          ["Refund rate", "2.1%", "−0.4%"],
        ],
      },
    },
    features: [
      { title: "Product intelligence", description: "Repurchase analysis, basket insights, and full-funnel SKU KPIs built directly from your Shopify product and order data." },
      { title: "Customer lifetime value", description: "Track LTV per customer, segment, and acquisition source. Understand the true value each customer brings over their entire journey." },
      { title: "Retention & cohort analysis", description: "Monthly cohort heatmaps, RFM segmentation, and retention curves built from your Shopify customer purchase history." },
      { title: "Revenue performance", description: "Track revenue, orders, AOV, and growth trends across your entire store with daily, weekly, and monthly breakdowns." },
      { title: "Drew for Shopify", description: "Ask natural language questions about your store data and get instant answers with charts and recommendations powered by ShopifyQL." },
      { title: "Automatic sync", description: "Data syncs automatically on app install with daily incremental updates. No manual configuration or CSV exports required." },
    ],
    synced: {
      headline: "Data synced from Shopify",
      blurb: "Datadrew pulls all the data it needs directly from your Shopify store via the official Shopify API.",
      items: [
        "Orders and order line items",
        "Product catalog and variants",
        "Customer profiles and purchase history",
        "Inventory levels and stock data",
        "Refunds and cancellations",
        "Shop configuration and settings",
        "Discount codes and usage",
        "Multi-store aggregation",
      ],
    },
    steps: {
      headline: "Get started in minutes",
      items: [
        { title: "Install the app", description: "Add Datadrew from the Shopify App Store with one click. No code changes needed." },
        { title: "Data syncs automatically", description: "Your orders, products, and customers begin syncing immediately. Historical data loads within hours." },
        { title: "Unlock insights", description: "Explore dashboards, ask Drew questions, and start making data-driven decisions right away." },
      ],
    },
    drew: {
      headline: "Ask Drew about your Shopify store",
      blurb: "Drew connects directly to Shopify via ShopifyQL and GraphQL, giving you real-time answers about your store's performance.",
      prompts: [
        "What are my top 10 best-selling products this month?",
        "Which customers have the highest lifetime value?",
        "Show me the repeat purchase rate by product category",
      ],
      chat: {
        question: "What are my top products by repeat purchase rate?",
        answer: [
          "Top 3 products by repeat rate:",
          "1. Daily Moisturizer — 68% repeat rate, 3,240 orders",
          "2. Vitamin C Serum — 54% repeat rate, 2,180 orders",
          "3. SPF 50 Sunscreen — 41% repeat rate, 1,890 orders",
        ],
        insight: "Daily Moisturizer drives the most loyal customers. Consider bundling it with Vitamin C Serum to boost AOV.",
      },
    },
    closing: {
      headline: "Connect your Shopify store today",
      body: "Install Datadrew from the Shopify App Store and start uncovering growth insights in minutes. Free to get started.",
    },
  },
  {
    slug: "meta-ads",
    category: "Marketing",
    title: "Meta Ads Integration",
    subhead:
      "Harness the power of Facebook and Instagram Ads with Datadrew. Track performance metrics, analyze audience engagement, and refine your strategy to maximize ROAS.",
    seoTitle: "Meta Ads Integration — Facebook & Instagram Ad Performance",
    metaDescription:
      "Connect Meta Ads (Facebook & Instagram) to Datadrew. Track campaign performance, audience insights, creative performance, and ROAS across all your ad sets with AI-powered intelligence.",
    intro: {
      headline: "Full-funnel Meta Ads performance in one place",
      body: "Datadrew connects to the Facebook Graph API to pull campaigns, ad sets, ads, creatives, audience insights, spend, ROAS, and conversions. Initial sync takes about 1 hour, then updates are incremental. See exactly how your Facebook and Instagram ad spend translates into Shopify revenue, customer acquisition, and lifetime value.",
      metrics: [
        { label: "Total spend", value: "$42.8K" },
        { label: "ROAS", value: "3.6x", delta: "+14%" },
        { label: "Conversions", value: "2,840", delta: "+22%" },
      ],
      table: {
        caption: "Campaign performance · last 30 days",
        head: ["Campaign", "Spend", "ROAS"],
        rows: [
          ["Prospecting — LAL", "$18.2K", "4.2x"],
          ["Retargeting — ATC", "$8.4K", "5.8x"],
          ["Brand Awareness", "$12.1K", "2.1x"],
          ["DPA — Catalog", "$4.1K", "3.4x"],
        ],
      },
    },
    features: [
      { title: "Campaign performance", description: "Track spend, ROAS, CPA, and conversions across every campaign, ad set, and individual ad in your Meta account." },
      { title: "Creative strategy", description: "Analyze which creatives, copy, and formats drive the best performance. Build a library of winning ads backed by data." },
      { title: "Audience insights", description: "Understand which audiences convert best, their LTV, and how they compare across different targeting strategies." },
      { title: "Cross-platform attribution", description: "Map Meta ad spend back to Shopify revenue. See true ROAS by combining ad platform data with actual store orders." },
      { title: "Drew for Meta Ads", description: "Ask Drew questions about your campaigns in natural language. Get instant insights with 21 specialized Meta Ads AI tools." },
      { title: "Spend optimization", description: "Identify which campaigns waste budget and which deserve more investment. Data-backed recommendations to improve efficiency." },
    ],
    synced: {
      headline: "Data synced from Meta Ads",
      blurb: "Connected via the Facebook Graph API with incremental syncing after the initial 1-hour setup.",
      items: [
        "Campaign structure and settings",
        "Ad sets and targeting parameters",
        "Individual ad creatives and copy",
        "Audience insights and demographics",
        "Spend, impressions, and clicks",
        "Conversions and ROAS metrics",
        "Placement performance breakdowns",
        "Daily and hourly performance data",
      ],
    },
    steps: {
      headline: "Connect Meta Ads in minutes",
      items: [
        { title: "Authorize your account", description: "Connect your Meta Business account with one click through OAuth. No API keys needed." },
        { title: "Initial sync", description: "Historical data begins loading immediately. Full sync completes in about 1 hour for most accounts." },
        { title: "Analyze and optimize", description: "Explore campaign dashboards, ask Drew questions, and find opportunities to improve ROAS." },
      ],
    },
    drew: {
      headline: "Ask Drew about your Meta Ads",
      blurb: "Drew has 21 specialized tools for Meta Ads, giving you instant answers about campaign performance, audience insights, and creative strategy.",
      prompts: [
        "Which campaigns have the highest ROAS this month?",
        "Show me the best-performing ad creatives by CPA",
        "Compare audience performance across my prospecting campaigns",
      ],
      chat: {
        question: "Which campaigns should I scale this week?",
        answer: [
          "2 campaigns performing above target:",
          "1. Prospecting LAL — 4.2x ROAS, $18.2K spend",
          "2. Retargeting ATC — 5.8x ROAS, $8.4K spend",
        ],
        insight: "Increase budget on Retargeting ATC by 20% — it has room to scale with strong ROAS. Consider testing new LAL audiences on the Prospecting campaign.",
      },
    },
    closing: {
      headline: "Maximize your Meta Ads ROAS",
      body: "Connect Meta Ads to Datadrew and see exactly how your ad spend translates into revenue and customer lifetime value.",
    },
  },
  {
    slug: "google-ads",
    category: "Marketing",
    title: "Google Ads Integration",
    subhead:
      "Optimize with precision. Supercharge your ad decisions by syncing Google Ads campaigns — Search, Performance Max, Video, and Shopping — with your Shopify data.",
    seoTitle: "Google Ads Integration — Search, PMax & Shopping Performance",
    metaDescription:
      "Connect Google Ads to Datadrew. Track Search, Performance Max, Video, and Shopping campaigns alongside Shopify revenue for true ROAS and AI-powered optimization.",
    intro: {
      headline: "Google Ads performance meets Shopify revenue data",
      body: "Datadrew connects to the Google Ads API to pull campaign data across Search, Performance Max, Video, and Shopping campaign types. Combined with your Shopify order data, you get true ROAS attribution, keyword-level performance insights, and AI-powered optimization recommendations. Drew includes 3 specialized Google Ads tools, including access to the Keyword Planner.",
      metrics: [
        { label: "Total spend", value: "$28.4K" },
        { label: "ROAS", value: "4.1x", delta: "+8%" },
        { label: "Conversions", value: "1,920", delta: "+15%" },
      ],
      table: {
        caption: "Campaign performance · last 30 days",
        head: ["Campaign", "Spend", "ROAS"],
        rows: [
          ["Brand Search", "$4.2K", "8.4x"],
          ["PMax — Products", "$12.8K", "3.8x"],
          ["Non-Brand Search", "$8.1K", "2.4x"],
          ["YouTube Video", "$3.3K", "1.9x"],
        ],
      },
    },
    features: [
      { title: "Search campaign performance", description: "Track keyword performance, search terms, quality scores, and CPC across your Search and Brand campaigns." },
      { title: "Performance Max insights", description: "Understand how PMax campaigns allocate budget across channels and which product listings drive the most conversions." },
      { title: "Shopping performance", description: "Product-level ad performance with ROAS, CPA, and conversion metrics mapped to your Shopify catalog." },
      { title: "Cross-platform attribution", description: "Combine Google Ads and Meta Ads data with Shopify orders to see the full acquisition picture and true ROAS." },
      { title: "Drew + Keyword Planner", description: "Ask Drew about your Google Ads performance and get keyword research insights powered by the Google Ads Keyword Planner API." },
      { title: "Budget optimization", description: "Identify underperforming campaigns and get AI-powered budget allocation recommendations to maximize return." },
    ],
    synced: {
      headline: "Data synced from Google Ads",
      blurb: "Connected via the Google Ads API with support for all major campaign types.",
      items: [
        "Search campaigns and keywords",
        "Performance Max campaigns",
        "Video campaigns (YouTube)",
        "Shopping product performance",
        "Spend, conversions, and ROAS",
        "Keyword planner data",
      ],
    },
    steps: {
      headline: "Connect Google Ads in minutes",
      items: [
        { title: "Authorize your account", description: "Connect your Google Ads account through OAuth. Select the accounts you want to sync." },
        { title: "Campaign data syncs", description: "Historical campaign performance data begins loading. Combined with your Shopify data for true ROAS." },
        { title: "Optimize spend", description: "Explore campaign dashboards, use the keyword planner via Drew, and find budget optimization opportunities." },
      ],
    },
    closing: {
      headline: "Optimize your Google Ads spend",
      body: "Connect Google Ads to Datadrew and see true ROAS by combining ad performance with Shopify revenue data.",
    },
  },
  {
    slug: "google-analytics",
    category: "Analytics",
    title: "Google Analytics Integration",
    subhead:
      "Elevate your analytics game with Datadrew's seamless GA4 integration. Combine traffic sources, sessions, engagement, and conversions with your Shopify data.",
    seoTitle: "Google Analytics 4 Integration — GA4 Analytics for Shopify",
    metaDescription:
      "Connect Google Analytics 4 (GA4) to Datadrew. Combine traffic sources, sessions, engagement, and conversions with Shopify data for complete e-commerce analytics.",
    intro: {
      headline: "GA4 data enriched with Shopify intelligence",
      body: "Datadrew connects to the GA4 Data API to pull traffic sources, sessions, users, engagement metrics, conversions, device and browser breakdowns, and hourly metrics. Combined with Shopify order data, you get a complete picture of how website traffic converts into revenue and customer lifetime value. Drew includes 7 specialized GA4 tools for instant insights.",
      metrics: [
        { label: "Sessions", value: "148K", delta: "+12%" },
        { label: "Conv. rate", value: "3.2%", delta: "+0.4%" },
        { label: "Revenue", value: "$182K", delta: "+18%" },
      ],
      table: {
        caption: "Traffic sources · last 30 days",
        head: ["Source", "Sessions", "Revenue"],
        rows: [
          ["Organic Search", "52,400", "$64K"],
          ["Paid Social", "38,200", "$58K"],
          ["Paid Search", "28,100", "$42K"],
          ["Direct", "18,600", "$12K"],
        ],
      },
    },
    features: [
      { title: "Traffic source breakdown", description: "See which traffic sources drive the most sessions, conversions, and revenue — from organic search to paid campaigns." },
      { title: "User engagement metrics", description: "Track session duration, pages per session, bounce rate, and engagement patterns across devices and browsers." },
      { title: "Conversion performance", description: "Connect GA4 conversions with Shopify revenue for a complete funnel view from first visit to purchase." },
      { title: "Device & browser data", description: "Understand how customers browse on different devices and browsers, identifying friction points in the purchase journey." },
      { title: "Hourly metrics", description: "Track traffic and conversion patterns by hour of day to optimize ad scheduling and content publishing." },
      { title: "Drew for GA4", description: "Ask Drew questions about your website traffic with 7 specialized GA4 tools for instant answers and insights." },
    ],
    synced: {
      headline: "Data synced from Google Analytics 4",
      blurb: "Connected via the GA4 Data API with automatic daily syncing.",
      items: [
        "Traffic sources and mediums",
        "Sessions and active users",
        "User engagement and behavior",
        "Conversion events and goals",
        "Device and browser breakdown",
        "Hourly traffic metrics",
      ],
    },
    steps: {
      headline: "Connect GA4 in minutes",
      items: [
        { title: "Authorize GA4", description: "Connect your Google Analytics property through OAuth. Select the GA4 property you want to sync." },
        { title: "Data flows in", description: "Traffic, engagement, and conversion data starts syncing automatically with daily incremental updates." },
        { title: "Explore insights", description: "See how traffic converts to revenue. Ask Drew about your traffic to uncover optimization opportunities." },
      ],
    },
    closing: {
      headline: "Connect GA4 to unlock traffic insights",
      body: "Combine your Google Analytics data with Shopify intelligence for a complete view of your e-commerce funnel.",
    },
  },
  {
    slug: "google-search-console",
    category: "SEO",
    title: "Google Search Console Integration",
    subhead:
      "Track search queries, impressions, clicks, and keyword positions. Understand how organic search drives traffic and revenue to your store.",
    seoTitle: "Google Search Console Integration — SEO Performance",
    metaDescription:
      "Connect Google Search Console to Datadrew. Track search queries, impressions, clicks, and keyword positions to understand how organic search drives revenue to your store.",
    intro: {
      headline: "SEO performance meets revenue data",
      body: "Datadrew connects to Google Search Console to pull search queries, impressions, clicks, CTR, keyword positions, and URL inspection data. This data is accessible via Drew with 4 specialized Search Console tools, so you can ask natural language questions about your organic search performance and understand how it connects to your store's revenue.",
      metrics: [
        { label: "Impressions", value: "2.4M", delta: "+28%" },
        { label: "Clicks", value: "52.4K", delta: "+19%" },
        { label: "Avg position", value: "12.8", delta: "−2.1" },
      ],
      table: {
        caption: "Top queries · last 28 days",
        head: ["Query", "Clicks", "Position"],
        rows: [
          ["best vitamin c serum", "4,280", "3.2"],
          ["natural moisturizer", "2,840", "5.8"],
          ["spf 50 sunscreen face", "1,920", "8.4"],
          ["skincare routine oily skin", "1,640", "11.2"],
        ],
      },
    },
    features: [
      { title: "Search query performance", description: "Track which search terms bring visitors to your store, their impression volume, click-through rates, and average positions." },
      { title: "Position tracking", description: "Monitor keyword rankings over time and identify opportunities where small improvements can drive significant traffic gains." },
      { title: "CTR optimization", description: "Find high-impression, low-click queries where improved title tags and meta descriptions could boost organic traffic." },
      { title: "URL performance", description: "See which pages drive the most organic traffic and revenue. Identify underperforming URLs with optimization potential." },
      { title: "Drew for SEO", description: "Ask Drew about your organic search performance with 4 specialized Search Console tools for instant SEO insights." },
      { title: "Organic revenue attribution", description: "Connect organic search traffic to Shopify revenue to understand the true ROI of your SEO efforts." },
    ],
    synced: {
      headline: "Data available from Search Console",
      blurb: "Accessed via Drew with 4 specialized MCP tools for real-time search data.",
      items: [
        "Search queries and terms",
        "Impressions and clicks",
        "Click-through rate (CTR)",
        "Average keyword positions",
        "URL inspection data",
        "Page-level performance",
      ],
    },
    steps: {
      headline: "Connect Search Console in minutes",
      items: [
        { title: "Authorize access", description: "Connect your Google Search Console property through OAuth. Select the site you want to analyze." },
        { title: "Data becomes available", description: "Search performance data is accessible immediately through Drew's specialized Search Console tools." },
        { title: "Ask Drew", description: "Query your SEO data in natural language. Find keyword opportunities, track rankings, and connect to revenue." },
      ],
    },
    closing: {
      headline: "Unlock organic search insights",
      body: "Connect Google Search Console to Datadrew and understand how organic search drives traffic and revenue to your store.",
    },
  },
  {
    slug: "klaviyo",
    category: "Marketing",
    title: "Klaviyo Integration",
    subhead:
      "Elevate your marketing game with Datadrew's Klaviyo integration. Track campaign performance, flow revenue, and push RFM segments directly to Klaviyo for targeted campaigns.",
    seoTitle: "Klaviyo Integration — Email & SMS Marketing Performance",
    metaDescription:
      "Connect Klaviyo to Datadrew for AI-powered email and SMS insight. Track campaign performance, flow revenue, and sync RFM segments directly to Klaviyo for targeted marketing.",
    intro: {
      headline: "Two-way Klaviyo integration for smarter email marketing",
      body: "Datadrew doesn't just pull data from Klaviyo — it pushes insights back. Sync your campaigns, flows, profiles, lists, metrics, and templates into Datadrew for comprehensive analytics. Then push RFM segments from Datadrew directly into Klaviyo lists for targeted email and SMS campaigns. Drew includes 18 specialized Klaviyo tools for deep marketing insights.",
      metrics: [
        { label: "Email revenue", value: "$48.2K", delta: "+24%" },
        { label: "Open rate", value: "42.8%", delta: "+3%" },
        { label: "Flow revenue", value: "$31.4K", delta: "+18%" },
      ],
      table: {
        caption: "Top flows · last 30 days",
        head: ["Flow", "Sent", "Revenue"],
        rows: [
          ["Welcome Series", "4,280", "$12.4K"],
          ["Abandoned Cart", "2,190", "$9.8K"],
          ["Post-Purchase", "3,120", "$5.2K"],
          ["Win-Back", "1,840", "$4.0K"],
        ],
      },
    },
    features: [
      { title: "Campaign analytics", description: "Track every campaign's open rate, click rate, revenue, and conversion data alongside your Shopify metrics." },
      { title: "Flow performance", description: "Measure revenue attribution for every flow — Welcome Series, Abandoned Cart, Post-Purchase, Win-Back, and more." },
      { title: "RFM segment sync", description: "Push Datadrew's RFM segments (Champions, Loyal, At-Risk, Lost) directly into Klaviyo lists for targeted campaigns." },
      { title: "List & profile analytics", description: "Analyze list growth, profile engagement, and subscriber quality across all your Klaviyo lists and segments." },
      { title: "Drew for Klaviyo", description: "Ask Drew about your email marketing with 18 specialized Klaviyo tools. Get insights on flows, campaigns, and segments instantly." },
      { title: "Retention insights", description: "Combine Klaviyo email engagement with Shopify purchase data to understand how email drives retention and repeat purchases." },
    ],
    synced: {
      headline: "Data synced with Klaviyo",
      blurb: "Two-way integration: pull Klaviyo data in, push RFM segments out.",
      items: [
        "Campaigns and performance metrics",
        "Flows and automation revenue",
        "Profiles and subscriber data",
        "Lists and segments",
        "Email and SMS metrics",
        "Templates and content data",
        "RFM segments pushed to Klaviyo",
        "Customer engagement history",
      ],
    },
    steps: {
      headline: "Connect Klaviyo in minutes",
      items: [
        { title: "Connect your account", description: "Authorize your Klaviyo account with one click. Your campaigns, flows, and profiles start syncing immediately." },
        { title: "Analyze performance", description: "See email revenue alongside Shopify data. Understand which flows and campaigns drive the most value." },
        { title: "Push RFM segments", description: "Sync Datadrew's RFM segments into Klaviyo lists to build targeted campaigns for each customer tier." },
      ],
    },
    closing: {
      headline: "Supercharge your Klaviyo campaigns",
      body: "Connect Klaviyo to Datadrew and start targeting customers with RFM-powered segments for higher retention and LTV.",
    },
  },
  {
    slug: "amazon-seller",
    category: "Marketplace",
    title: "Amazon Seller Integration",
    subhead:
      "Connect your Amazon Seller account via secure OAuth to track your orders, revenue, seller feedback, and financial events. Your data is accessed exclusively for your account — never shared with or visible to other sellers.",
    seoTitle: "Amazon Seller Integration — Your Amazon Data, Your Insights",
    metaDescription:
      "Connect your Amazon Seller account to Datadrew via SP-API OAuth. Track your orders, revenue, seller feedback, and financial events with AI-powered insights — your data stays private to your account.",
    intro: {
      headline: "Your Amazon seller data, unified in one dashboard",
      body: "Datadrew connects to the Amazon Seller Partner API (SP-API) via OAuth to securely access your orders, order items, seller feedback, and financial events. All data retrieved from Amazon is used exclusively to provide analytics and insights for your own seller account. Your Amazon data is never aggregated across sellers, shared with third parties, or used for any purpose other than powering your personal analytics dashboard.",
      metrics: [
        { label: "Amazon revenue", value: "$62.4K", delta: "+21%" },
        { label: "Orders", value: "1,840", delta: "+14%" },
        { label: "Seller rating", value: "4.8" },
      ],
      table: {
        caption: "Cross-channel revenue · last 30 days",
        head: ["Channel", "Revenue", "Orders"],
        rows: [
          ["Shopify", "$182K", "4,280"],
          ["Amazon", "$62.4K", "1,840"],
          ["Total", "$244.4K", "6,120"],
        ],
      },
    },
    features: [
      { title: "Cross-channel revenue", description: "See Shopify and Amazon revenue side by side. Understand which channel drives more value per product." },
      { title: "Order tracking", description: "Track Amazon orders, order items, and fulfillment status alongside your Shopify orders in a unified view." },
      { title: "Seller feedback", description: "Monitor seller ratings and feedback trends to maintain high customer satisfaction and account health." },
      { title: "Financial events", description: "Track Amazon financial events including payments, refunds, and fee breakdowns for complete profitability analysis." },
      { title: "Product comparison", description: "Compare product performance across Shopify and Amazon to identify where each product sells best." },
      { title: "Drew insights", description: "Ask Drew to compare performance across channels and identify opportunities to grow your Amazon business." },
    ],
    synced: {
      headline: "Data synced from Amazon",
      blurb: "Connected via the Amazon Seller Partner API.",
      items: ["Orders and order items", "Seller feedback and ratings", "Financial events and settlements", "Product catalog data"],
    },
    steps: {
      headline: "How Amazon OAuth connection works",
      blurb: "Datadrew uses Amazon's official Seller Partner API (SP-API) OAuth 2.0 authorization flow. You grant access directly through Amazon's consent screen — we never see or store your Amazon login credentials.",
      items: [
        { title: "Authorize via Amazon OAuth", description: "Click “Connect Amazon” in Datadrew. You are redirected to Amazon's official authorization page where you grant Datadrew permission to access your seller data. We use OAuth 2.0 — your Amazon credentials are never shared with us." },
        { title: "Your data syncs securely", description: "Once authorized, Datadrew retrieves your order history, financial events, seller feedback, and product catalog via the SP-API. Data is encrypted in transit and at rest, and stored in isolation — only accessible to your account." },
        { title: "Analytics for your account only", description: "View your Amazon performance in a unified dashboard. All insights are generated from your own seller data — never combined with data from other sellers or used outside your account." },
      ],
    },
    faq: [
      { q: "How does Datadrew access my Amazon Seller data?", a: "Datadrew connects to your Amazon Seller account using the official Amazon Seller Partner API (SP-API) with OAuth 2.0 authorization. When you click “Connect Amazon” in Datadrew, you are redirected to Amazon's authorization page where you explicitly grant permission. We never see or store your Amazon login credentials — authentication is handled entirely by Amazon." },
      { q: "Is my Amazon data shared with other sellers or third parties?", a: "No. Your Amazon Seller data is accessed and used exclusively to provide analytics and insights for your own account. Your data is never aggregated with data from other sellers, never shared with third parties, and never used for any purpose beyond powering your personal Datadrew dashboard." },
      { q: "What Amazon data does Datadrew access?", a: "Datadrew accesses the following data types via the Amazon SP-API: orders and order items, seller feedback and ratings, financial events and settlements, and product catalog data. This data is used solely to generate analytics, dashboards, and AI-powered insights for your seller account." },
      { q: "How can I revoke access or delete my Amazon data?", a: "You can revoke Datadrew's access at any time through your Amazon Seller Central account settings (under “Manage Your Apps”) or by emailing support@datadrew.io. Upon revocation or account deletion request, all Amazon data is permanently deleted from our systems within 30 days." },
      { q: "How is my Amazon data stored and protected?", a: "All Amazon data is encrypted in transit using TLS and encrypted at rest. Data is stored in isolated databases that are not accessible from the public internet. Each seller's data is logically separated — there is no cross-account data access. Datadrew adheres to the Amazon SP-API Data Protection Policy and Acceptable Use Policy." },
    ],
    privacy: {
      headline: "Data privacy and security",
      blurb: "How Datadrew handles your Amazon Seller data in compliance with Amazon's Acceptable Use Policy.",
      items: [
        "Your Amazon data is accessed via SP-API OAuth and used exclusively to provide analytics for your own seller account",
        "Data is never aggregated across multiple sellers or shared with any third party",
        "All data is encrypted in transit (TLS) and at rest, stored in isolated databases with no cross-account access",
        "You can revoke access at any time via Amazon Seller Central or by contacting support@datadrew.io",
        "Upon account closure or deletion request, all Amazon data is permanently deleted from our systems within 30 days",
        "Datadrew adheres to the Amazon Seller Partner API Acceptable Use Policy and Data Protection Policy",
      ],
    },
    closing: {
      headline: "Get insights from your Amazon seller data",
      body: "Connect your Amazon Seller account to Datadrew and see your complete e-commerce performance in one dashboard.",
    },
  },
  {
    slug: "amazon-ads",
    category: "Marketing",
    title: "Amazon Ads Integration",
    subhead:
      "Connect your Amazon Advertising account via secure OAuth to track Sponsored Products, Sponsored Brands, and Sponsored Display campaign performance. Your data is accessed exclusively for your account — never shared with or visible to other advertisers.",
    seoTitle: "Amazon Ads Integration — Your Advertising Data, Your Insights",
    metaDescription:
      "Connect your Amazon Advertising account to Datadrew via OAuth. Track Sponsored Products, Sponsored Brands, and Sponsored Display campaign performance with AI-powered insights — your data stays private to your account.",
    intro: {
      headline: "Your Amazon advertising data, unified in one dashboard",
      body: "Datadrew connects to the Amazon Ads API via OAuth to securely access your Sponsored Products, Sponsored Brands, and Sponsored Display campaign data. All data retrieved from Amazon Ads is used exclusively to provide analytics and insights for your own advertising account. Your Amazon Ads data is never aggregated across advertisers, shared with third parties, or used for any purpose other than powering your personal analytics dashboard.",
      metrics: [
        { label: "Ad spend", value: "$18.2K", delta: "+8%" },
        { label: "ROAS", value: "4.2x", delta: "+12%" },
        { label: "ACoS", value: "23.8%", delta: "−3%" },
      ],
      table: {
        caption: "Campaign performance · last 30 days",
        head: ["Campaign type", "Spend", "ROAS"],
        rows: [
          ["Sponsored Products", "$10.4K", "4.8x"],
          ["Sponsored Brands", "$4.6K", "3.9x"],
          ["Sponsored Display", "$3.2K", "3.1x"],
        ],
      },
    },
    features: [
      { title: "Campaign performance", description: "Track Sponsored Products, Sponsored Brands, and Sponsored Display campaigns. Monitor impressions, clicks, spend, and ROAS in one unified view." },
      { title: "Search term analysis", description: "Discover which search terms drive clicks and conversions. Identify high-performing keywords and optimize your targeting strategy." },
      { title: "ACoS & ROAS tracking", description: "Monitor Advertising Cost of Sale and Return on Ad Spend across all campaign types to maximize profitability." },
      { title: "New-to-brand metrics", description: "Measure how effectively your ads attract new customers with new-to-brand detail page views and purchase metrics." },
      { title: "Cross-channel attribution", description: "Compare Amazon Ads performance against Meta, Google Ads, and organic channels to understand the full picture of your ad spend." },
      { title: "Drew insights", description: "Ask Drew about your Amazon Ads performance — get instant answers on which campaigns to scale, pause, or optimize." },
    ],
    synced: {
      headline: "Data synced from Amazon Ads",
      blurb: "Connected via the Amazon Ads API.",
      items: [
        "Sponsored Products campaign reports",
        "Sponsored Brands campaign reports",
        "Sponsored Display campaign reports",
        "Search term and keyword performance",
        "Impressions, clicks, and conversions",
        "ACoS, ROAS, and spend metrics",
      ],
    },
    steps: {
      headline: "How Amazon Ads OAuth connection works",
      blurb: "Datadrew uses Amazon's official Advertising API with OAuth 2.0 authorization. You grant access directly through Amazon's consent screen — we never see or store your Amazon login credentials.",
      items: [
        { title: "Authorize via Amazon OAuth", description: "Click “Connect Amazon Ads” in Datadrew. You are redirected to Amazon's official authorization page where you grant Datadrew permission to access your advertising data. We use OAuth 2.0 — your Amazon credentials are never shared with us." },
        { title: "Your data syncs securely", description: "Once authorized, Datadrew retrieves your campaign performance data, search term reports, and conversion metrics via the Amazon Ads API. Data is encrypted in transit and at rest, and stored in isolation — only accessible to your account." },
        { title: "Analytics for your account only", description: "View your Amazon Ads performance in a unified dashboard alongside your other channels. All insights are generated from your own advertising data — never combined with data from other advertisers or used outside your account." },
      ],
    },
    faq: [
      { q: "How does Datadrew access my Amazon Ads data?", a: "Datadrew connects to your Amazon Advertising account using the official Amazon Ads API with OAuth 2.0 authorization. When you click “Connect Amazon Ads” in Datadrew, you are redirected to Amazon's authorization page where you explicitly grant permission. We never see or store your Amazon login credentials — authentication is handled entirely by Amazon." },
      { q: "Is my Amazon Ads data shared with other advertisers or third parties?", a: "No. Your Amazon Ads data is accessed and used exclusively to provide analytics and insights for your own advertising account. Your data is never aggregated with data from other advertisers, never shared with third parties, and never used for any purpose beyond powering your personal Datadrew dashboard. All Amazon Ads data is treated as confidential information belonging to your account." },
      { q: "What Amazon Ads data does Datadrew access?", a: "Datadrew accesses the following data types via the Amazon Ads API: Sponsored Products campaign reports, Sponsored Brands campaign reports, Sponsored Display campaign reports, search term and keyword performance data, and metrics including impressions, clicks, conversions, ACoS, ROAS, and spend. This data is used solely to generate analytics, dashboards, and AI-powered insights for your advertising account." },
      { q: "How can I revoke access or delete my Amazon Ads data?", a: "You can revoke Datadrew's access at any time through your Amazon Advertising console account settings or by emailing support@datadrew.io. Upon revocation or account deletion request, all Amazon Ads data is permanently deleted from our systems within 30 days." },
      { q: "How is my Amazon Ads data stored and protected?", a: "All Amazon Ads data is encrypted in transit using TLS and encrypted at rest. Data is stored in isolated databases that are not accessible from the public internet. Each advertiser's data is logically separated — there is no cross-account data access. Non-PII advertising data is retained for no longer than 18 months in compliance with Amazon's Data Protection Policy. Datadrew adheres to the Amazon Ads API License Agreement, Data Protection Policy, and Acceptable Use Policy." },
      { q: "Does Datadrew use my Amazon Ads data to train AI models?", a: "No. Your Amazon Ads data is never used to train, improve, or benchmark Datadrew's models or platform for other customers. Drew generates insights exclusively from your own advertising data within your account session. We are transparent about all uses of AI and clearly indicate when AI-generated insights are presented." },
    ],
    privacy: {
      headline: "Data privacy and security",
      blurb: "How Datadrew handles your Amazon Ads data in compliance with the Amazon Ads API License Agreement and Data Protection Policy.",
      items: [
        "Your Amazon Ads data is accessed via OAuth and used exclusively to provide analytics for your own advertising account",
        "Data is never aggregated across multiple advertisers or shared with any third party",
        "All data is encrypted in transit (TLS) and at rest, stored in isolated databases with no cross-account access",
        "You can revoke access at any time via the Amazon Advertising console or by contacting support@datadrew.io",
        "Non-PII advertising data is retained for no longer than 18 months per Amazon's Data Protection Policy",
        "Upon account closure or deletion request, all Amazon Ads data is permanently deleted from our systems within 30 days",
        "Datadrew does not falsely represent data — we are transparent about AI usage, data accuracy, and freshness",
        "Datadrew adheres to the Amazon Ads API License Agreement, Acceptable Use Policy, and Data Protection Policy",
      ],
    },
    closing: {
      headline: "Get insights from your Amazon advertising data",
      body: "Connect your Amazon Ads account to Datadrew and see your complete advertising performance alongside all your other channels.",
    },
  },
  {
    slug: "unicommerce",
    category: "Sales channels",
    title: "Unicommerce Integration",
    subhead:
      "Connect your Unicommerce account to get AI-powered insight across Myntra, Flipkart, Amazon IN, and every Indian sales channel you sell on. Unify inventory, sales, and product data in one dashboard — no other AI ads agent offers this.",
    seoTitle: "Unicommerce Integration — Sales & Inventory Data for Indian Marketplaces",
    metaDescription:
      "Datadrew is the only AI ads agent with a Unicommerce integration. Get AI-powered insights across Myntra, Flipkart, Amazon IN — inventory, sales, and product data in one dashboard.",
    intro: {
      headline: "Inventory, sales, and product data across every Indian sales channel",
      body: "Datadrew is the only AI ads agent that integrates with Unicommerce — giving you unified visibility into sales, inventory, and product performance across Myntra, Flipkart, Amazon India, Shopify, and every channel managed through Unicommerce. Combine this with your ad spend data from Meta and Google to see the complete picture: from marketing investment to warehouse fulfillment to customer lifetime value.",
      metrics: [
        { label: "Total sales", value: "₹42.2L", delta: "+18%" },
        { label: "Active SKUs", value: "1,240", delta: "+8%" },
        { label: "Channels", value: "5" },
      ],
      table: {
        caption: "Channel-wise sales · last 30 days",
        head: ["Channel", "Orders", "Revenue"],
        rows: [
          ["Amazon IN", "3,640", "₹18.4L"],
          ["Flipkart", "2,890", "₹14.2L"],
          ["Myntra", "1,820", "₹9.6L"],
          ["Total", "8,350", "₹42.2L"],
        ],
      },
    },
    features: [
      { title: "Multi-channel sales performance", description: "See sales from Myntra, Flipkart, Amazon IN, and every channel managed through Unicommerce in one unified dashboard alongside your Shopify data." },
      { title: "Inventory intelligence", description: "Track inventory levels across warehouses and channels. Identify stockouts before they happen and reduce excess inventory costs." },
      { title: "Product performance", description: "Analyze product-level data across all Indian sales channels. See which SKUs perform best on which marketplace and optimize your catalog strategy." },
      { title: "Channel comparison", description: "Compare revenue, order volume, AOV, and return rates across Flipkart, Myntra, Amazon IN, and more to allocate inventory where it drives the most profit." },
      { title: "Returns & fulfillment", description: "Track return rates and fulfillment SLAs by channel and product. Identify which channels or SKUs drive the most returns and why." },
      { title: "Drew analysis", description: "Drew has dedicated Unicommerce analysis tools — ask about channel performance, inventory gaps, and product trends in natural language." },
    ],
    synced: {
      headline: "Data synced from Unicommerce",
      blurb: "Inventory, sales, and product data across all your Indian sales channels.",
      items: [
        "Sales orders and order items across all channels",
        "Inventory levels by warehouse and channel",
        "Product catalog and SKU-level data",
        "Shipping, dispatch, and fulfillment status",
        "Returns and cancellation data",
        "Channel-wise sales performance (Myntra, Flipkart, Amazon IN, etc.)",
      ],
    },
    steps: {
      headline: "How the Unicommerce connection works",
      items: [
        { title: "Connect your Unicommerce account", description: "Enter your Unicommerce API credentials in Datadrew. We connect securely to the Unicommerce API to access your order management and warehouse data." },
        { title: "Your operations data syncs automatically", description: "Datadrew pulls your order history, inventory levels, fulfillment data, and returns from Unicommerce. Data is encrypted in transit and at rest." },
        { title: "Get a unified view and AI insights", description: "View multi-channel performance in a single dashboard. Ask Drew to surface fulfillment issues, compare channels, and optimize your operations." },
      ],
    },
    drew: {
      headline: "Ask Drew about your Unicommerce data",
      blurb: "Drew has dedicated Unicommerce analysis tools to give you instant answers about sales, inventory, and fulfillment across Myntra, Flipkart, Amazon IN, and every channel you sell on.",
      prompts: [
        "Which channel has the highest return rate this month?",
        "Show me inventory levels for my top 10 SKUs across warehouses",
        "Compare Flipkart vs Amazon order volume this quarter",
        "Which products are frequently out of stock on Myntra?",
      ],
      chat: {
        question: "Compare my sales across Flipkart, Myntra, and Amazon this month",
        answer: [
          "Channel-wise sales (Mar 1–25):",
          "Amazon IN — ₹18.4L revenue, 3,640 orders, AOV ₹505",
          "Flipkart — ₹14.2L revenue, 2,890 orders, AOV ₹491",
          "Myntra — ₹9.6L revenue, 1,820 orders, AOV ₹527",
        ],
        insight: "Myntra has the highest AOV but lowest volume. 3 top SKUs are currently out of stock on Myntra — restocking could add ~₹2.1L this month.",
      },
    },
    closing: {
      headline: "The only AI ads agent with Unicommerce built in",
      body: "Connect Unicommerce to Datadrew and get AI-powered insights across every Indian sales channel — Myntra, Flipkart, Amazon IN, and more.",
    },
  },
  {
    slug: "slack",
    category: "Collaboration",
    title: "Slack Integration",
    subhead:
      "Receive the most up-to-date business KPIs where you already manage your business — in Slack. Automated reports, performance alerts, and team notifications.",
    seoTitle: "Slack Integration — KPI Alerts & Reports in Slack",
    metaDescription:
      "Receive Datadrew KPI updates, performance alerts, and automated weekly reports directly in Slack. Stay on top of key metrics where you already manage your business.",
    features: [
      { title: "Automated weekly reports", description: "Get a weekly summary of your key KPIs delivered to any Slack channel — revenue, orders, AOV, ROAS, and more." },
      { title: "Performance alerts", description: "Receive instant notifications when metrics spike or drop beyond your set thresholds — never miss an important trend." },
      { title: "Team visibility", description: "Keep your entire team aligned with shared KPI updates. Marketing, ops, and leadership all see the same data." },
    ],
    steps: {
      headline: "Connect Slack in seconds",
      items: [
        { title: "Add to Slack", description: "Authorize the Datadrew Slack app and choose which channels should receive updates." },
        { title: "Configure alerts", description: "Set which KPIs and thresholds trigger notifications. Choose daily or weekly report schedules." },
        { title: "Stay informed", description: "Your team receives automatic reports and real-time alerts right in the channels they check every day." },
      ],
    },
    closing: {
      headline: "Get KPI alerts in Slack",
      body: "Connect Slack to Datadrew and keep your entire team informed with automated reports and real-time performance alerts.",
    },
  },
  {
    slug: "gmail",
    catalog: {
      slug: "gmail",
      name: "Gmail",
      logo: "/integrations/gmail-logo.svg",
      description: "Scheduled performance reports delivered to any inbox.",
      stage: "ga",
    },
    category: "Collaboration",
    title: "Gmail Integration",
    subhead:
      "Receive the latest performance reports directly in your inbox. Streamline your reporting, making it easy to stay on top of key metrics without logging in.",
    seoTitle: "Gmail Integration — Performance Reports in Your Inbox",
    metaDescription:
      "Receive Datadrew performance reports directly in your Gmail inbox. Stay on top of key metrics with scheduled email reports and summaries.",
    features: [
      { title: "Weekly performance reports", description: "Receive a beautifully formatted weekly summary of revenue, orders, AOV, ROAS, and other key metrics in your inbox." },
      { title: "Scheduled reports", description: "Configure custom report schedules — daily, weekly, or monthly — and choose which metrics and time periods to include." },
      { title: "No login required", description: "Keep stakeholders informed without requiring them to log into Datadrew. Everyone gets the data they need directly in email." },
    ],
    steps: {
      headline: "Set up email reports in seconds",
      items: [
        { title: "Add recipients", description: "Enter the email addresses of everyone who should receive performance reports from Datadrew." },
        { title: "Choose your schedule", description: "Pick daily, weekly, or monthly delivery and select which KPIs to include in each report." },
        { title: "Reports arrive automatically", description: "Formatted performance summaries land in your inbox on schedule, keeping your whole team aligned." },
      ],
    },
    closing: {
      headline: "Get reports in your inbox",
      body: "Set up automated email reports from Datadrew and keep your entire team informed without extra logins.",
    },
  },
  {
    slug: "google-sheets",
    catalog: {
      slug: "google-sheets",
      name: "Google Sheets",
      logo: "/integrations/google-sheets-logo.svg",
      description: "Export any report as a spreadsheet and open it in Sheets.",
      stage: "ga",
    },
    category: "Collaboration",
    title: "Google Sheets Integration",
    subhead:
      "Export any Datadrew report as a spreadsheet file and open it in Google Sheets, so you can share and slice the data in the tool your team already uses.",
    seoTitle: "Google Sheets Integration — Export Reports to Sheets",
    metaDescription:
      "Export any Datadrew report as a spreadsheet file and open it in Google Sheets to share and analyse it with your team.",
    features: [
      { title: "One-click export", description: "Export any Datadrew report or dashboard view as a spreadsheet file with a single click, then open it in Google Sheets." },
      { title: "Team collaboration", description: "Share analytics data with stakeholders who prefer spreadsheets. No Datadrew login needed for collaborators." },
      { title: "Custom analysis", description: "Use exported data for custom pivot tables, charts, and further analysis in the spreadsheet environment you know best." },
    ],
    steps: {
      headline: "Into Sheets in seconds",
      items: [
        { title: "Open any report", description: "Go to the dashboard or report you want to work with. Export is available across Datadrew reports." },
        { title: "Export the data", description: "Click the export button to download the report as a spreadsheet file." },
        { title: "Share with your team", description: "Open the file in Google Sheets and share it, pivot it, or build custom reports from it." },
      ],
    },
    closing: {
      headline: "Export your analytics to Sheets",
      body: "Open any report in Sheets and start sharing Datadrew insights with your entire team in the tools they already use.",
    },
  },
];

export const integrationPageSlugs = integrationPages.map((p) => p.slug);

export function getIntegrationPage(slug: string) {
  return integrationPages.find((p) => p.slug === slug);
}

/** Catalog entry (name / logo / stage) for a detail page. */
export function getIntegrationCatalog(page: IntegrationPage): Integration {
  return page.catalog ?? allIntegrations.find((i) => i.slug === page.slug) ?? {
    slug: page.slug,
    name: page.title.replace(/ Integration$/, ""),
    logo: "/brand/datadrew-square.svg",
    description: "",
    stage: "ga",
  };
}

export const integrationCtas = {
  connect: { label: "Connect in the app", href: APP_INTEGRATIONS },
  demo: { label: "Book a demo", href: "/book" },
};
