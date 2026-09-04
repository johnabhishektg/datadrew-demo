# Design Decisions — datadrew.io redesign

## Sept 3 2026 — "Agent" layout (Magic UI + shadcn)

John asked for the site to be rebuilt on the pattern of the Magic UI *Agent* template
(https://agent-magicui.vercel.app/) using Magic UI and shadcn components. This
replaces the July editorial "morning brief" system on the homepage; the blog keeps its
article primitives but now inherits the same tokens and font, so it reads as one site.

### System
- **Stack:** shadcn (radix base, `components.json` with a `@magicui` registry alias) +
  Magic UI components vendored into `src/components/ui/` (marquee, border-beam,
  animated-beam, orbiting-circles, animated-list, magic-card, flickering-grid,
  blur-fade, animated-shiny-text, bento-grid, …). Lint exempts that folder from the
  strict React-hooks rules because it is upstream code kept verbatim.
- **Type:** Geist (sans) + Geist Mono (numbers, chips, window chrome). Newsreader /
  Instrument Sans / Spline Sans Mono are gone.
- **Color:** neutral shadcn palette (white / near-black, system dark mode with a toggle)
  plus one accent, `--brand` (Datadrew green). Legacy `verdict/loss/night/rule` tokens
  are aliased to the new ones so blog code still compiles.
- **Layout:** template rhythm — floating pill navbar, centered hero with badge pill,
  grid-fade backdrop and brand glow, logo marquee + stat row, bento grid, stepper
  "how it works", two MagicCards, comparison table, 3-tier pricing with BorderBeam
  on the popular tier, two-row testimonial marquee, accordion FAQ, FlickeringGrid CTA.

### Section map (template → Datadrew)
| Template section | Datadrew section | Copy source in `site.ts` |
|---|---|---|
| Hero + product frame | Daily Ads Brief rendered as an app window (real DOM, crawlable) | `hero`, `heroBadge`, `sampleBrief` |
| Trusted-by logos | Brand marquee + 4 stats | `trustBar` |
| Bento features | Context / Judgment / Execution / Memory (v8 pillars) with orbit, live findings feed, approval beam, compounding chart | `pillars`, `problem.punchline` |
| How it works (4 steps) | Connect → Learn → Decide → Execute, auto-advancing stepper | `howItWorks` |
| Secure growth (2 cards) | Guardrails panel + "works where you work" beam (app / Slack / Claude / ChatGPT) | `guardrails` |
| — (added) | Honest comparison table: dashboards / rule-bots / Drew | `comparison` |
| Pricing | Free / Essentials / Pro. **No monthly-yearly toggle** — no annual pricing exists to show | `pricing` |
| Testimonials marquee | 3 placeholder quotes, repeated | `testimonials` |
| FAQ | 8 questions | `faq` |
| CTA | FlickeringGrid card | `finalCta` |

### Still placeholder (swap before launch)
- Brand marks in `icons.tsx` are monogram tiles (Klaviyo, GA4, Claude, ChatGPT, Amazon)
  and hand-drawn approximations (Shopify, Meta, Google, Slack). Replace with licensed SVGs.
- Customer logo marquee is text wordmarks.
- Testimonial attributions remain anonymized composites (`placeholder: true`).
- Sample brief, guardrail values and how-it-works panels are example data.
- CTAs point at `app.datadrew.io`.

### Verified
Production build prerenders all routes; lint + tsc clean; no horizontal overflow at
360/390/1440 (measured via DevTools protocol emulation); light + dark screenshots
reviewed for hero, bento, stepper, guardrails, comparison, pricing, testimonials,
FAQ, CTA, footer and blog index.

### Sep 3 afternoon additions
- **Brand:** Datadrew mark inlined (`icons.tsx`), always white-on-black tile; favicon `src/app/icon.svg`; OG image `public/brand/datadrew-square.png`.
- **Hero brief:** platform marks per finding, connected-sources row, outlined blocks.
- **Creative Intelligence section** (after bento): fanned creative cards with images, Scale/Iterate tags, Convert Score. Images are Unsplash stand-ins (`public/creatives/CREDITS.md`).
- **Customer Stories** (after guardrails): CAVA + Devavi Media cards — both `permission: "pending"`, links go to `/blog` until case-study pages exist.
- **Hero = real app frame** (Sep 3, from app screenshots in `context/datadrew/app-screenshots/`): dark sidebar with the product's actual nav, `/daily-ads-brief` skill run in the chat thread, Drew's answer = the brief with platform marks, in-chat approval card, real composer (source chips, Sonnet 5, Send). Sidebar hides below `md`.
- **Drew for AI agents** (one agent-mode window, replaces the comparison table): floating source tiles (Shopify, Meta, GA4, Klaviyo, Unicommerce), agent-mode chat window, install terminal with Claude / Claude Code / ChatGPT / Cursor tabs. Facts from datadrew.io/mcp; `comparison.tsx` deleted, nav link now "AI agents" → `/#mcp`.

### Sep 3 evening — Blog + Customer stories (Kibo UI block patterns)
John asked for a cleaner blog populated from the real Strapi posts, plus a CAVA case study,
using kibo-ui.com/blocks/{blog,blogpost,case-studies} as the layout references.

- **Content source:** `scripts/pull-strapi.mjs` pulls the N most recent *published* articles
  from the Strapi REST API (public read, no token) into `src/content/strapi-posts.json`.
  Builds are static and offline; re-run the script to refresh (`node scripts/pull-strapi.mjs 5`).
  The pull sanitizes Strapi HTML: strips inline light-theme `style` attrs from tables/figures/
  images, wraps tables in `.table-wrap` (scrolls, never widens the article — the mobile fix
  from blog.css PR #152), normalizes `/blog/x/` links to `/blog/x`, and lifts the first
  `<img>` as the cover when `ogImageUrl` is empty. Currently 5 of 23 posts are snapshotted;
  in-body links to non-snapshotted slugs 404 in this preview.
- **`/blog` (kibo "blog" block):** left-aligned header, one large *Latest* card (cover left,
  copy right), then a 3-col grid of cards — cover, category chip + read time, title, excerpt,
  avatar byline. Covers are brand-tinted gradients (mapped from Strapi `coverGradientClass`)
  with a deterministic bar-chart motif seeded by the slug; no image files. Old TSX-post
  registry (`src/content/posts/`) and the placeholder post are gone; `prose.tsx` stays.
- **`/blog/[slug]` (kibo "blogpost" block):** breadcrumb, category + read time, title,
  standfirst (`longDescription`), author row with initials avatar + Published/Updated,
  21:9 cover, then a two-column body: sanitized HTML in `.article-body` (rules in
  globals.css: h2 rules, brand-underlined links, brand markers, `.blog-tldr` callout,
  themable tables, figures on white because Strapi SVGs are authored in dark ink) and a sticky
  sidebar with an IntersectionObserver TOC (from Strapi `toc`) + mini CTA. Related reading
  resolves Strapi `relatedArticles` against the snapshot and tops up with recent posts.
  `seoTitle`/`metaDescription` drive `<title>`/OG; `ArticleStructuredData` now takes a Post.
- **`/customers` + `/customers/[slug]` (kibo "case-studies" block):** two-col cards with
  gradient header (wordmark + descriptor + category), bold-highlight headline, two metrics,
  arrow link. Data in `src/content/case-studies.ts`. CAVA page = breadcrumb, headline with
  brand-green highlight, facts sidebar, 4-stat band on gradient, four short sections, roles
  table, "What they ask Drew" (paraphrased questions, *not* testimonials — none were
  invented), CTA. Numbers come from CAVA's own Drew usage (internal Datadrew MCP,
  /work/drew-usage-mining/): ₹12.7L legacy catalog spend at <3x inside a 4.6x account,
  200+ conversations / 10 people since Feb 2026, 26% of Sept units on broken sizes,
  repeat-revenue share 36.7%→38.2%. **`permission: "pending"`** — CAVA is named on the page
  because the homepage card already names them, but John's rule is to anonymise CAVA in
  public content until they sign off. Devavi Media is a card only (`published: false`).
- **Wiring:** navbar + footer gained *Customers*; homepage Customer Stories link to
  `/customers/cava` and `/customers`; Creative Intelligence CTA now links to
  `/blog/creative-intelligence`.

---

## July 2026 — editorial "morning brief" system (superseded on the homepage)
Kept for reference: paper-and-ink palette, Newsreader display serif, ledger tables,
scroll-driven night→morning section. Rationale and research in `creative-direction.md`
and `research-synthesis.md`. The blog's article primitives (`prose.tsx`) descend from
this system.

### Sep 4 — Integrations section + `/integrations` page
- **Homepage section** (`integrations.tsx`, after How it works): text left / 3×2 logo grid right,
  on the Magic UI "Agent" integrations pattern John supplied as a screenshot. Six featured marks
  (`featured: true` in `integrations.ts`): Shopify, Meta, Google Ads, GA4, Amazon Seller, Klaviyo.
  Grid cells link to `/integrations#<slug>`.
- **`/integrations` page**: 30 connectors + 2 surfaces (Slack, Datadrew MCP), grouped into nine
  categories with jump-link chips, one-line "what data it brings" descriptions, and in-app Beta/Alpha
  labels carried verbatim. Cards deep-link to `app.datadrew.io/integrations`; "Request an
  integration" is a mailto to support. Source of truth = the app's integrations screen (PDF export
  4 Sep 2026, `/Users/johntg/Desktop/dd_integrations.pdf`).
- **Logos** are the app's own assets, pulled from the `app.datadrew.io` bundle (27 files +
  4 decoded from inline data URIs: Gorgias, Recharge, Google Ads, GA4) into `public/integrations/`.
  They're 128px PNGs / SVGs — fine at the 32–40px we render. Amazon Ads, Unicommerce and Wati are
  wide lockups (`wide: true`).
- Nav gets an "Integrations" link; footer Product column too.

### Sep 4 — Final CTA restyled (TinySEO pattern)
- Soft brand-tinted card (`bg-brand-soft`) with the FlickeringGrid kept behind it, trust line
  (rating · Shopify App Store lockup · review count · "Trusted by 1,000+ Shopify brands"), one
  headline, two pill buttons. Rating/reviews read from `appStore` in `site.ts`.
- Primary "Install Datadrew" → Shopify App Store listing (matches the trust line); secondary
  "See how it works" → `/#how-it-works`. Subhead + "cancel anytime" fine print dropped from render
  (copy kept in `finalCta.subhead`).
- Then (John): card is **always black** (`#0B0B0B`, white text, `border-white/10` so it reads in dark
  mode) with a lighter-green grid (`oklch(0.82 0.17 155)`, opacity 0.5) for contrast; primary button
  is the dark-theme brand green with near-black text.

### Sep 4 — Guardrails section removed
- John asked to drop the "Judgment you can delegate. Controls you keep." section (guardrails panel +
  surfaces beam). `guardrails.tsx` deleted; footer "Drew, everywhere" links now point at `/#mcp`.
  Copy stays in `site.ts` (`guardrails`, `surfaces`) in case it comes back.

### Sep 4 (later) — John's visual pass
- **Brand marks:** Klaviyo, GA4, Amazon, Unicommerce now use the app's logo files via `ImgMark` in
  `icons.tsx` (monograms gone; Claude/ChatGPT monograms deleted — `agent-logos.tsx` covers those).
- **Eyebrow pills** everywhere are `bg-brand-soft text-brand`, no border, no shadow.
- **"example data"** chips removed from hero, Creative Intelligence and MCP window.
- **Bento:** rows 20rem → 16.5rem (mobile 27 → 24rem), orbit radii 78/136 so the Context card has
  less dead space; Memory card is now `MemoryBrain` (lucide Brain on a brand-soft tile, pulsing rings,
  four "memory" chips) instead of the bar chart.
- **How it works:** interval 5s → 9s, panels cross-fade (no blank frame), panel 22 → 24rem. Steps are
  pictorial: 5 source rows with real marks; product tiles (Unsplash stand-ins from `/creatives`) with
  margin/repeat; a 7-day ROAS sparkline with the Tuesday budget marker; approval card with budget bar +
  Slack log row. Real app screenshots deliberately NOT used (they show a live customer account).
- **MCP window:** max-w-4xl → 2xl, 13px text, tight padding.
- Note: `navbar.tsx` was changed outside this session (hide-on-scroll, links = MCP · Pricing · Blog),
  which removed the Integrations nav link; `/integrations` is still linked from the footer + homepage.

### Sep 4 — Customer logo wall replaces testimonials + stat row
- New `logo-wall.tsx` / `content/brand-wall.ts`: "Trusted by 1,000+ [Shopify] stores around the world"
  over a 7-column grid of 21 monochrome brand marks (`brightness-0`, `dark:invert`) that return to
  full colour on hover. Replaces the testimonial marquee on the homepage; the stat row (`logos.tsx`)
  and `testimonials.tsx` are deleted. The new `/pricing` page (built in a parallel session) used the
  stat row too — swapped to `<LogoWall />` there.
- **Sources:** 17 logos are the PNGs the live datadrew.io homepage already publishes; 4 more
  (Disguise, Kradle, ShredLights, Silvertraq) come from the app.datadrew.io login bundle. Files in
  `public/customers/logos/`. The 4 connector shops (Henri-Lloyd, Jaded London, Here We Flo, yuicy)
  are recorded in `connectorBrandsPendingPermission` and NOT rendered — need merchant OK + a logo.
- `testimonials` in `site.ts` now holds the six real, attributed quotes from datadrew.io
  (not rendered on the homepage; the pricing page has its own testimonial figures).

### Sep 4 — Ported the pages the redesign was missing (content only, new UI)
John's ask: compare the live `datadrew-analytics/website` repo against this redesign, find the
pages it lacked, and rebuild them here in the current theme — **no UI carried over from the old
site, only the copy, prices, tables and FAQs**. 38 routes added (51 prerendered in total).

- **Shared primitives** (`src/components/site/`): `page-shell.tsx` (`PageShell`, `PageHeader`,
  `Breadcrumbs`) and `blocks.tsx` (`Section`, `StatBand`, `FeatureGrid`, `Steps`, `CheckList`,
  `FaqBlock`, `CtaButton`, `DrewChat`, `PromptChips`, `SimpleTable`, `Eyebrow`). Every secondary
  page composes these, so they all inherit the homepage tokens. `structured-data.tsx` gained
  `JsonLd`, `breadcrumbLd`, `faqLd`.
- **Company:** `/about` (founder photos in `public/about/`), `/contact` + `/book` (HubSpot
  collected-forms POST, portal 245380752, same field names as live; no tracker script added),
  `/partners` (75-agency directory, region tabs + service filter, logos in
  `public/partners/agencies/`), `/partners/become-a-partner`, `/partners/tech`, `not-found.tsx`.
- **Legal:** `/privacy-policy`, `/terms-of-service`, `/refund-policy`, `/subprocessors`,
  `/google-limited-use-disclosure` — body HTML verbatim via `ArticleBody`, shared `legal-page.tsx`.
- **Platform:** `/platform` index + six pages from one data-driven route
  (`src/content/platform.ts`, `platform-visuals.tsx` with 12 mock kinds, `platform-drew-demo.tsx`).
  Fixes applied while porting: Product Intelligence's duplicated tab copy rewritten, Retention's
  acquisition bullets dropped, TikTok lines removed (Meta + Google only), Automations' "never
  writes to your ad account" reconciled with "execution rolling out now".
- **Comparisons:** `/vs/{triple-whale,northbeam,polar-analytics,lifetimely}` from
  `src/content/comparisons.ts` — prices, GMV bands and "checked on 10 August 2026" verbatim.
- **Landing:** `/why-did-my-roas-drop` (8-rung ladder, sample brief card), `/free-audit`.
- **Integrations:** `/integrations/[slug]` for 12 connectors (incl. gmail + google-sheets, which
  are not in the app catalogue); index cards now link to detail pages where one exists.
- **`/pricing`:** GMV-band selector + monthly/yearly toggle (live had both; yearly = 2 months
  free), full 31-row feature table, 11 FAQs. Ladder from live `pricing.js` (help article 12276124).
- **`/mcp`:** reuses the homepage `McpAgents` window plus setup tabs, prompt library, sources.
- **Nav:** Platform dropdown (6 pages), Integrations, MCP → `/mcp`, Pricing → `/pricing`, Blog.
  **Footer:** Platform / Product / Compare / Company columns + legal row.

**Verify before launch:** review counts differ across pages (23 on /vs, 27 in `appStore`, 35 in
homepage JSON-LD); free-plan credits (1,000 on /pricing and /vs vs 500 in `site.ts`); "$1.6Bn+
revenue tracked" on Product Intelligence vs "$1.5B GMV" elsewhere; /mcp says read-only while the
homepage says Drew executes approved changes; named reviewers on /book, /vs, /pricing, /mcp are
real App Store reviews (homepage testimonials stay anonymised); partner counts (70+/73+/75).
