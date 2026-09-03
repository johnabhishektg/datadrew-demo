# datadrew.io — Creative Direction

*Formed from: withsupafast portfolio study, Triple Whale/Polar/Northbeam/Ryze teardowns,
2025–26 SaaS design trend research, and the July 2026 GTM docs. See research summaries
in `docs/research-synthesis.md`.*

## The point of view

Every competitor sells a **cockpit** and dresses like one: dark navy or anthracite,
electric blue/violet, Inter, dashboard screenshots in floating frames, Swiper carousels.
Datadrew doesn't sell a cockpit — it sells **an analyst who writes you a brief every
morning**. So the site shouldn't look like software marketing; it should look like
**the world's best-designed morning briefing**: editorial, typographic, ruled like a
ledger, with numbers treated as first-class typography.

**One sentence:** *The Financial Times, if it were written overnight by an AI that knows
your store.*

Where we borrow: Ryze's DOM-rendered product artifact (real HTML, not screenshots — it
also survives AI crawlers, which matters given our AI-visibility push). Polar's
serif-italic-accent typographic move and outcome-metric cards. Northbeam's restraint.

Where we differ from everyone: light-first paper-and-ink palette, serif display,
monospace tabular data, hairline ruled layouts, one signature scroll narrative instead
of twelve carousels.

## Art direction

**Palette — "paper & ink, profit & loss":**
- Paper: warm off-white `#FAF8F4` (light) / deep ink `#12100C`-ish (dark mode inverts to
  "night desk" warm black, not blue-black)
- Ink: near-black warm `#1A1712`
- Accent — **verdict green** `oklch(0.55 0.14 155)` (~#1E7A4E): the color of "profit",
  "resolved", "go". Used sparingly: CTAs, positive deltas, the "diagnosis found" moment.
- Semantic loss red (muted vermilion) for negative deltas only — never decorative.
- No blue. No violet. No gradient blobs.

**Typography:**
- Display: **Newsreader** (Google) — editorial serif with real character, tight optical
  sizes, gorgeous italics. Headlines set large, tight leading, with *italic emphasis
  words* (the Polar move, done in our register).
- Text/UI sans: **Inter is banned.** Use **Instrument Sans** — humanist grotesk,
  quietly characterful, not yet saturated.
- Data/mono: **Spline Sans Mono** — all numbers, deltas, timestamps, tickers, table
  figures. Tabular numerals everywhere data appears.

**Layout system:**
- 12-col grid, max-w ~1200px, but the signature is **ruled hairlines**: sections divided
  by 1px rules like a broadsheet; labels set in small caps mono in the rules' margins.
- Numbered sections (01–06) like a brief's table of contents.
- Generous whitespace; density lives inside the brief artifact, calm around it.

**Signature artifacts (all real DOM, no screenshots):**
1. **The Morning Brief** — hero centerpiece. A typeset diagnosis document with
   severity-flagged findings, timestamps, and actions. This IS the product shot.
2. **The overnight timeline** — scroll-driven section: 02:00 Drew pulls 9 sources →
   03:00 reconciles → 05:00 traces anomalies → 07:00 brief lands in Slack. The "works
   while you sleep" pillar told as a narrative, in a dark "night" section — the one
   intentionally dark passage on the light page (night → morning as you scroll).
3. **The ledger table** — comparison section as an honest ledger, not a feature matrix
   with green checkmarks.

**Motion language:**
- Purposeful, restrained: one signature scroll narrative (night→morning), staggered
  reveal of brief findings (like lines being typed/filed), counters on stats,
  underline-draw on links, subtle hover lifts. Respect `prefers-reduced-motion`.
- No parallax soup, no floating 3D, no marquee-of-everything (one logo/integration
  marquee max, slow).

**IA:**
- Single narrative homepage (12 beats per `content-architecture.md`), anchor nav.
- `/blog` + `/blog/[slug]` — editorial system is native here; the blog IS the brand.
- Nav: Product (anchors), Pricing (anchor), Blog, Log in, Start free.

## What we consciously avoid
Glass cards · gradient blobs · dark-navy-with-electric-accent · Inter/Manrope/Space
Grotesk · dashboard-screenshot-in-tilted-frame · GMV slider theater · carousel stacks ·
"AI-powered" badges with no legible output · bento-grid-with-icon-filler · count-up
vanity walls rendering as zeros to crawlers.
