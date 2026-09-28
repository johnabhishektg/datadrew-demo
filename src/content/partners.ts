/* Partner program copy + tech partners, ported from live datadrew.io
 * (/partners, /partners/become-a-partner, /partners/tech) on 4 Sep 2026.
 * The agency directory itself is parsed from the live page into
 * partner-agencies.json (75 agencies, 6 regions; logos in /public/partners/agencies). */
import agencies from "./partner-agencies.json";

export const partnerCalendly = "https://calendly.com/sumit-growth/discussion";

export type Agency = {
  name: string;
  url: string;
  logo?: string;
  initials?: string;
  description: string;
  location: string;
  tag: string;
};

export type AgencyRegion = { id: string; title: string; items: Agency[] };

export const agencyRegions: AgencyRegion[] = agencies as AgencyRegion[];
export const agencyCount = agencyRegions.reduce((n, r) => n + r.items.length, 0);

/* Service pills exactly as the live page offers them (matches card tag). */
export const agencyServices = [
  "Performance Marketing",
  "Full-Service",
  "Shopify Development",
  "Retention",
  "Paid Social",
  "Growth Marketing",
  "CRO",
  "SEO",
  "Creative",
  "Paid Ads",
];

export const partnersDirectory = {
  meta: {
    title: "Agency Partners — Certified Shopify Agencies",
    description:
      "Find a Datadrew certified agency partner to help grow your Shopify brand. 70+ agencies across 25+ countries specializing in performance marketing.",
  },
  eyebrow: "Partner directory",
  headline: "Find an agency partner to grow your brand",
  subhead:
    "Datadrew partners with 70+ agencies across 25+ countries who help Shopify brands unlock growth through data-driven marketing, development, and retention strategies.",
  stats: [
    { value: String(agencyCount), label: "Agency partners" },
    { value: "25+", label: "Countries" },
    { value: "1000+", label: "Brands served" },
  ],
  empty: {
    title: "No partners found",
    body: "Try a different search term or contact us to learn about our partner program.",
  },
  cta: {
    headline: "Become a Datadrew Partner",
    body: "Help your clients unlock AI-powered growth intelligence. Join 75+ agencies already partnering with Datadrew across 25+ countries.",
    primary: { label: "Become a partner", href: "/partners/become-a-partner" },
    secondary: { label: "Get matched with an agency", href: partnerCalendly },
  },
};

export const becomePartner = {
  meta: {
    title: "Become a Partner — Agency & Tech Programs",
    description:
      "Join Datadrew's partner ecosystem as an agency, tech or integration partner: land free, operate on Drew, and grow with revenue share.",
  },
  eyebrow: "Partner program",
  headline: "Grow together with Datadrew",
  subhead:
    "Partner with the AI ads agent for Shopify brands, trusted by 1000+ Shopify brands across 47+ countries. Whether you're an agency, tech company, or app developer — there's a partnership path for you.",
  stats: [
    { value: "73+", label: "Agency partners" },
    { value: "47+", label: "Countries" },
    { value: "$1.5Bn+", label: "GMV analyzed" },
    { value: "1000+", label: "Brands served" },
  ],
  paths: {
    headline: "Choose your partnership path",
    subhead: "We work with agencies and technology companies to help Shopify brands grow with data-driven insights.",
    items: [
      {
        title: "Agency Partner",
        body: "Help your clients unlock AI-powered growth intelligence. Get white-glove onboarding, co-marketing opportunities, and revenue share on referrals.",
        perks: [
          "Revenue share on every referral",
          "Co-branded case studies",
          "Priority support for your clients",
          "Partner directory listing",
          "Dedicated partner manager",
        ],
        idealFor: "E-commerce agencies, performance marketing firms, Shopify development studios, retention consultants",
        cta: "Apply as Agency Partner",
      },
      {
        title: "Technology Partner",
        body: "Build integrations, connect your platform, or extend Datadrew's ecosystem. Whether you're a SaaS tool, ad platform, or Shopify app — let's power growth together for 1000+ brands.",
        perks: [
          "Technical integration support & API access",
          "Joint go-to-market campaigns",
          "Featured in partner & integrations directory",
          "Co-marketing visibility & joint webinars",
          "Mutual customer expansion",
        ],
        idealFor:
          "SaaS platforms, Shopify apps, ad platforms, email/SMS tools, CRM systems, analytics providers, subscription & loyalty platforms",
        cta: "Apply as Technology Partner",
      },
    ],
  },
  why: {
    headline: "Why partner with Datadrew",
    subhead: "A partnership built for mutual growth — not just a logo swap.",
    items: [
      { title: "Revenue share", body: "Earn recurring revenue for every brand you refer. Simple, transparent, and paid monthly." },
      {
        title: "Co-marketing",
        body: "Get featured in our partner directory, co-branded case studies, joint webinars, and social campaigns.",
      },
      {
        title: "Priority support",
        body: "Your clients get white-glove onboarding and a dedicated success manager. You get a direct partner Slack channel.",
      },
      {
        title: "Better client outcomes",
        body: "Give your clients AI-powered insights across LTV, acquisition, retention, and creative performance — backed by real data.",
      },
      {
        title: "Exclusive resources",
        body: "Early access to new features, partner-only training, and detailed performance reports to impress your clients.",
      },
      {
        title: "Global community",
        body: "Join 73+ agencies and tech partners across 47+ countries. Connect, learn, and grow together.",
      },
    ],
  },
  how: {
    headline: "How it works",
    subhead: "From application to active partnership in three simple steps.",
    steps: [
      {
        title: "Apply",
        description: "Schedule a call with our partnerships team. We'll learn about your business and discuss how we can grow together.",
      },
      {
        title: "Onboard",
        description:
          "Get access to partner resources, training materials, and your dedicated partner manager. We set you up for success.",
      },
      {
        title: "Grow",
        description: "Start referring clients, earning revenue, and delivering better outcomes with Drew, Datadrew's AI ads agent.",
      },
    ],
  },
  cta: {
    headline: "Ready to grow together?",
    body: "Schedule a conversation with our partnerships team. We'll find the right partnership model for your business.",
    primary: { label: "Schedule a call", href: partnerCalendly },
    secondary: { label: "View agency partners", href: "/partners" },
  },
};

export type TechPartner = { name: string; logo: string; body: string; tag: string; href: string; external: boolean };

export const techPartners = {
  meta: {
    title: "Tech Partners — Technology & Integration Partners",
    description:
      "Datadrew's technology and integration partners: from subscription management to ad platforms, the tools that power growth alongside Datadrew.",
  },
  eyebrow: "Tech partners",
  headline: "Technology partners powering e-commerce growth",
  subhead:
    "From subscription management to ad platforms — Datadrew integrates with the best tools in the Shopify ecosystem to deliver a complete growth intelligence solution.",
  matchmaking: {
    headline: "Not sure which tool is right for you?",
    body: "Book a call with Sumit and we'll help you find the right technology partner or integration for your brand's needs.",
    cta: "Schedule a call",
    href: partnerCalendly,
    photo: "/about/sumit-bansal.jpg",
    name: "Sumit Bansal",
  },
  items: [
    { name: "Bigatom", logo: "/partners/tech/bigatom-logo.png", body: "Conversion rate optimization and A/B testing platform built for Shopify brands looking to maximize revenue per visitor.", tag: "CRO & Testing", href: "https://bigatom.ai", external: true },
    { name: "Recurpay", logo: "/partners/tech/recurpay-logo.png", body: "Subscription management and recurring revenue platform for Shopify. Power memberships, subscribe-and-save, and subscription boxes.", tag: "Subscriptions", href: "https://recurpay.com", external: true },
    { name: "Jarbug", logo: "/partners/tech/jarbug-logo.png", body: "Shopify automation and workflow platform. Automate repetitive tasks, order management, and operational workflows to save time.", tag: "Automation", href: "https://jarbug.com", external: true },
    { name: "Google Ads", logo: "/partners/tech/google-ads-logo.png", body: "Connect your Google Ads account to analyze campaign performance, ROAS, and customer acquisition costs in real time.", tag: "Advertising", href: "/integrations/google-ads", external: false },
    { name: "Meta Ads", logo: "/partners/tech/meta-ads-logo.png", body: "Sync Facebook and Instagram ad data to measure true ROAS, attribution, and creative performance across your campaigns.", tag: "Advertising", href: "/integrations/meta-ads", external: false },
    { name: "Klaviyo", logo: "/partners/tech/klaviyo-logo.png", body: "Integrate Klaviyo email and SMS data to analyze retention flows, RFM segments, and customer lifecycle performance.", tag: "Email & SMS", href: "/integrations/klaviyo", external: false },
    { name: "Amazon", logo: "/partners/tech/amazon-logo.png", body: "Connect Amazon Seller Central data to unify your multi-channel view. Track sales, advertising, and product performance.", tag: "Marketplace", href: "/integrations/amazon", external: false },
    { name: "Catalogus", logo: "/partners/tech/catalogus-logo.png", body: "AI-powered product information operating system. Automate catalog management, enrich product data, and streamline listings at scale.", tag: "Product Data & Catalogs", href: "https://www.catalogus.ai/", external: true },
    { name: "Phot AI", logo: "/partners/tech/phot-ai-logo.png", body: "AI-powered photo editing and visual content platform. Create high-converting product images, ads, and catalogs with 40+ generative AI tools.", tag: "Creative & Visual AI", href: "https://www.phot.ai/", external: true },
    { name: "Ingest Labs", logo: "/partners/tech/ingestlabs-logo.png", body: "Server-side customer data infrastructure for Shopify. Capture first-party data, recover lost conversions, and route clean events to your marketing stack for accurate attribution.", tag: "Data Infrastructure", href: "https://ingestlabs.com/", external: true },
    { name: "Wizzy", logo: "/partners/tech/wizzy-logo.png", body: "AI-powered site search and product discovery for e-commerce. Natural language search, smart filters, and merchandising tools that help shoppers find products faster and lift conversion.", tag: "Search & Discovery", href: "https://www.wizzy.ai/", external: true },
  ] satisfies TechPartner[],
  cta: {
    headline: "Become a technology partner",
    body: "Build an integration, reach 1000+ Shopify brands, and grow your platform alongside Datadrew.",
    primary: { label: "Become a partner", href: "/partners/become-a-partner" },
    secondary: { label: "View all integrations", href: "/integrations" },
  },
};
