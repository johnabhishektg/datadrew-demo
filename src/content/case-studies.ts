/* Customer stories. Numbers come from the merchant's own Drew usage
 * (internal Datadrew MCP, /work/drew-usage-mining/), rounded. No quotes are
 * invented: "What they ask Drew" items are paraphrased questions, not
 * testimonials. `permission` gates naming the brand publicly. */

export type CaseStudy = {
  slug: string;
  brand: string;
  descriptor: string;
  category: "Shopify brands" | "Agencies";
  // [lead, highlight, trail] — the highlight is set in bold
  headline: [string, string, string];
  summary: string;
  metrics: { value: string; label: string }[];
  facts: { label: string; value: string }[];
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  roles?: { role: string; uses: string }[];
  askDrew?: string[];
  published: boolean;
  permission: "pending" | "granted";
  gradient: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "cava",
    brand: "CAVA Athleisure",
    descriptor: "₹5 Cr/month athleisure brand · India",
    category: "Shopify brands",
    headline: [
      "How CAVA found ",
      "₹12.7L of under-3x catalog spend",
      " hiding behind a 4.6x account ROAS",
    ],
    summary:
      "Ten people across six roles run their daily performance review, monthly budget plan and retention questions through Drew. One prompt joins Meta, Google, GA4, Shopify and inventory into a causal answer.",
    metrics: [
      { value: "₹12.7L", label: "legacy catalog spend at under 3x, found inside a 4.6x account" },
      { value: "200+", label: "Drew conversations since Feb 2026, across 10 people" },
      { value: "26%", label: "of planned September units flagged on broken-size SKUs before spend" },
      { value: "38%", label: "repeat-revenue share, up from 36.7% in May" },
    ],
    facts: [
      { label: "Industry", value: "Athleisure apparel" },
      { label: "Scale", value: "~₹5 Cr / month" },
      { label: "Stack", value: "Shopify, Meta, Google Ads, GA4, Klaviyo, Unicommerce" },
      { label: "Using Drew since", value: "February 2026" },
      { label: "Automations", value: "Daily pulse, daily size-run health, weekly movement, monthly bucket P&L + LTV cohorts" },
    ],
    sections: [
      {
        heading: "Every dip was a two-hour argument",
        paragraphs: [
          "Revenue or ROAS would slip on a given morning and nobody could say which lever broke: Meta creative fatigue, a Google feed issue, a hero SKU with broken sizes, or the site funnel. The question the team kept asking in different words was \"is this a Meta issue or an inventory issue?\"",
          "Ads Manager, Shopify, GA4 and the inventory system each answered part of it. None of them answered the join.",
        ],
      },
      {
        heading: "One prompt, five sources, then the whole team",
        paragraphs: [
          "The growth lead started running a daily root-cause check in Drew: product picks and dips, ad-level performance and site metrics against a good comparison day. Drew pulls Meta, Google, GA4, Shopify and Unicommerce and returns a causal read instead of five tabs.",
          "Their product buckets, ad nomenclature, coupon codes and excluded order tags now live in Drew's memory, so answers come back in the team's own vocabulary. The power users' prompts became slash commands, and from late June the media buyer and leadership joined in.",
        ],
        bullets: [
          "Conversations went from 27 in June to 49 in July once the slash commands spread",
          "Four automations run without anyone asking: a 6:00 IST marketing pulse, a daily size-run health snapshot, a weekly product-and-bucket movement report, and a monthly bucket P&L with LTV cohorts",
        ],
      },
      {
        heading: "The September budget plan",
        paragraphs: [
          "In late August the marketing lead uploaded a unit plan and asked how to split ₹1.78 Cr across product buckets, including a celebrity collection with no history. Drew's plan did three things a campaign-level view could not.",
        ],
        bullets: [
          "Cut three legacy catalog campaigns that had spent ₹12.7L at under 3x while the account averaged 4.6x. Nobody had noticed.",
          "Released the new collection's budget in five phases, each gated on blended MER holding, instead of front-loading launch week",
          "Flagged that 26% of the planned units sat on products with broken size runs, before any of that spend went out",
        ],
      },
      {
        heading: "Launch day, read correctly",
        paragraphs: [
          "The collection went live on September 1. Drew's source-and-medium read showed paid social drove the lift, email drove almost nothing, and 57% of sessions landed in GA4 as \"(not set)\", which turned into a pixel and tagging fix rather than a budget decision. The next morning ROAS was down a third by 11am. Drew's call, with same-hour comparison and iOS lag in view, was to hold until end of day. The team did.",
        ],
      },
    ],
    roles: [
      { role: "Growth lead", uses: "Daily performance RCA, same-hour comparisons" },
      { role: "Marketing lead", uses: "Budget-by-bucket planning, monthly summaries, owns every automation" },
      { role: "Media buyer", uses: "/daily-marketing-rca, /media-buyer-brief, /meta-creative-analysis" },
      { role: "Leadership", uses: "\"Why is revenue low today?\" and week-on-week comparisons" },
      { role: "Analyst", uses: "Codified reports: size-run health, collection deep-dives" },
      { role: "Retention", uses: "Repeat revenue, days to second purchase, segment copy" },
    ],
    askDrew: [
      "Do a performance RCA of today versus yesterday at 11am: which products picked or dipped, ad-level performance, and ATC, checkout and session rates.",
      "Here is our September unit plan. How should we split spend by bucket, including the collection that has not launched yet?",
      "Of the men's buyers, how many come back, how fast, and do they cross over to women's?",
    ],
    published: true,
    permission: "pending",
    gradient: "featured-grad-1",
  },
  {
    slug: "devavi-media",
    brand: "Devavi Media",
    descriptor: "Performance marketing agency · India",
    category: "Agencies",
    headline: [
      "",
      "30 ads sorted into Scale, Monitor and Stop",
      " — a full media-buyer brief in one command",
    ],
    summary:
      "₹73.8K of dead spend identified in 7.7 minutes, with two budget changes queued for approval.",
    metrics: [
      { value: "₹73.8K", label: "dead spend identified" },
      { value: "7.7 min", label: "for a 28-day Meta + Google brief" },
    ],
    facts: [],
    sections: [],
    published: false,
    permission: "pending",
    gradient: "featured-grad-2",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug && c.published);
}
