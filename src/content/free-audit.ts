/* /free-audit — free store health check landing page. Ported from the live
 * page (Sep 2026). Report numbers are illustrative, not a customer's. */

export const freeAudit = {
  title: "Free Shopify Store Health Check — AI-Powered Growth Audit",
  metaDescription:
    "Get a free AI-powered health check of your Shopify store. Drew AI analyzes your LTV, retention, product performance, and ad spend in minutes.",
  hero: {
    eyebrow: "Free — No credit card required",
    headline: ["Free AI Store", "Health Check"],
    subhead:
      "Install Datadrew on your Shopify store and Drew AI will analyze your customer data, identify hidden opportunities, and surface risks you did not know existed — all within minutes.",
    primaryCta: { label: "Get your free health check", href: "https://apps.shopify.com/customer-lifetime-value" },
    secondaryCta: { label: "Talk to us first", href: "/book" },
    trust: "Trusted by 1,000+ Shopify brands analyzing $1.5Bn+ GMV",
  },
  report: {
    title: "Store Health Report",
    stats: [
      { label: "Customer LTV", value: "$127", delta: "+12%", up: true },
      { label: "Repeat Rate", value: "24.3%", delta: "-3%", up: false },
      { label: "Blended ROAS", value: "3.2x", delta: "+8%", up: true },
      { label: "Top 10% Revenue", value: "41%" },
    ],
    insightLabel: "Drew AI Insight",
    insight:
      "Your top 10% of customers generate 41% of revenue, but your repeat purchase rate dropped 3% this month. Focus retention campaigns on this high-value segment to recover lost revenue.",
  },
  includes: {
    eyebrow: "What's included",
    headline: "What your free health check includes",
    subhead: "Drew AI analyzes your Shopify data and delivers a personalized report covering every dimension of store health.",
    items: [
      {
        title: "Customer LTV Analysis",
        description: "See your true customer lifetime value broken down by cohort, product, and acquisition source.",
      },
      {
        title: "Customer Concentration Risk",
        description:
          "Find out what percentage of your revenue comes from your top customers — and how vulnerable that makes you.",
      },
      {
        title: "Repeat Purchase Rate",
        description:
          "Your repeat rate vs industry benchmarks, with specific insights on what is driving (or hurting) repeat purchases.",
      },
      {
        title: "Product Performance",
        description:
          "Which products drive the most value, which ones are underperforming, and which have untapped cross-sell potential.",
      },
      {
        title: "New vs Returning Mix",
        description:
          "Your acquisition vs retention balance and whether your growth is sustainable or dangerously dependent on new customers.",
      },
      {
        title: "Drew AI Recommendations",
        description:
          "Personalized, actionable recommendations based on your specific store data. Not generic advice — insights tailored to your business.",
      },
    ],
  },
  steps: {
    eyebrow: "How it works",
    headline: "Get your report in 3 steps",
    items: [
      {
        title: "Install from Shopify App Store",
        description: "One-click install. No code, no pixel setup. Datadrew connects directly to your Shopify store data.",
      },
      {
        title: "Drew AI analyzes your data",
        description:
          "Within minutes, Drew AI scans your customer data, product catalog, and purchase history to build your health report.",
      },
      {
        title: "Get actionable insights",
        description:
          "Receive a personalized store health report with specific findings and recommendations you can act on immediately.",
      },
    ],
  },
  finalCta: {
    headline: "See what you are missing in your store data",
    subhead: "Your free health check is waiting. Install Datadrew, and Drew AI does the rest.",
  },
};
