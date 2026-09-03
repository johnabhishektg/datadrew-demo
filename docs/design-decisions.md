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
