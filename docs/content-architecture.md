# datadrew.io — Site Content Architecture (v8 repositioning, Aug 18 2026)

Source of truth: `/context/datadrew/Positioning_v8_Proposed_Aug18.md` ("The AI ads agent
for Shopify brands"). This supersedes the July "AI growth analyst" spine that this site
originally shipped with. Every section follows the v8 messaging hierarchy:
category → promise → why believe → outcome → product proof → surfaces → compounding advantage.

v8 boundaries enforced in copy (`src/content/site.ts` header repeats them):
- Not an analytics dashboard; analytics are inputs, decisions + execution are the product.
- Not positioned against attribution platforms (old Triple Whale comparison removed).
- Not a rule-based budget optimizer — we compare *against* those instead.
- Execution claims are precise: "rolling out now," per-account availability explicit.
- Only Meta + Google named as channels. MCP/Slack are surfaces, not differentiation.
- Profit is the objective, not the category.

## Narrative spine (homepage)

1. **Hero — category + promise.** Eyebrow: "The AI ads agent for Shopify brands."
   Headline: "Make and execute better ad decisions." Subhead = v8 short description
   (media-buyer judgment, knows the business not just the ad account, executes with
   guardrails). Visual: a rendered **Daily Ads Brief** document (named live workflow) —
   scale call with margin/stock reasoning + queued approval, creative-fatigue rotation,
   a deliberate "leave it alone."
2. **Trust bar.** Unchanged stats (1,000+ brands, $1.5B GMV, 5.0★, 47 countries) + logos.
3. **§01 The daily decision job** (v8 §2). Paid ads as a continuous decision-and-execution
   loop; the log renders the operator's daily questions (signal vs noise, next dollar,
   creative, ROAS vs margin/inventory, intervene-or-not) ending "And the same questions
   again tomorrow." Bridge: "Drew is the ads agent that runs this loop every day."
4. **§02 Why Drew's judgment is better** — four pillars (v8 §3), each with a DOM artifact:
   - **Context** — knows the business behind the ads. Artifact: same-ROAS/four-decisions
     SKU table (margin, stock, repeat behavior → different calls).
   - **Judgment** — thinks like an experienced media buyer; channel-specific playbooks;
     approved expertise line as proof. Artifact: a diagnosis that argues for restraint
     (fatigue ≠ bidding problem; don't restart learning).
   - **Execution** — acts with guardrails. Honesty box = "Where execution stands"
     (rolling out now, per-account availability explicit, no silent changes).
     Artifact: execution queue (pending approval / executed+logged / deliberate hold).
   - **Brain** — memory compounds (v8 §3.3). Artifact: brand-memory ledger (scaling rule,
     synced margin, user definition, learned promo lesson).
5. **§03 While you sleep** (scroll night section). Rewritten as the overnight run of the
   core loop: pull ads+business data → signal vs noise → spend leakages → draft budget
   moves → 07:00 Daily Ads Brief in Slack.
6. **§04 The honest comparison.** "The cockpit, the autopilot, or the ads agent" —
   dashboards (show what, you decide) vs rule-based optimizers (act without judgment)
   vs Drew. No attribution platforms named. Rows include "knows when to do nothing."
7. **§05 Where Drew works** (v8 §7, new section). Datadrew / Slack / Claude & ChatGPT via
   MCP (free to connect). Deliberately quiet — surfaces, not differentiation.
8. **§06 Who it's for** (v8 §6). Founder-operators, growth & performance leaders,
   agencies (first-class).
9. **Testimonials.** Unchanged; identities still PLACEHOLDER pending permissioned quotes.
10. **Pricing.** Free / Essentials $99 / Pro $149, GMV-banded. Pro lists
    "Ads execution with guardrails (rolling out)". Headline: "A fraction of a media buyer."
11. **FAQ.** Rewritten: execution + guardrails ("Will Drew change my ads without asking?"),
    not-a-dashboard, not-attribution, channels (Meta+Google), profit-not-ROAS, security,
    cancellation. Old "recommend, don't execute" answer removed (superseded by v8).
12. **Final CTA.** "Where does your next ad dollar go?" Ask-an-AI links reworded to a
    non-comparative prompt.

## Placeholder / flagged content
- Testimonial attributions: still placeholder identities (see design-decisions.md).
- Sample brief + all artifacts: example data, labeled as such in the DOM.
- Execution artifact/pillar: keep claims synced with actual rollout state before launch.
- Blog post ("diagnose a revenue dip") predates v8 — journal content, acceptable, but
  review before launch.
- Pricing tiers/features carried over from July build — re-verify against current
  pricing.js ladder before launch.

## Pages
- `/` homepage (above)
- `/blog` index + `/blog/[slug]` template with example post (placeholder content, flagged)
- Nav links to app.datadrew.io for login/signup (external), pricing + sections anchor-scroll.
