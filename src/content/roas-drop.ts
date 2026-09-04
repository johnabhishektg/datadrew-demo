/* /why-did-my-roas-drop — trigger-moment landing page. Ported from the live
 * page (Sep 2026). The sample brief is illustrative data, not a customer. */

export const roasDrop = {
  title: "Why Did My ROAS Drop? The Diagnostic Order That Finds It",
  metaDescription:
    "ROAS fell and nobody can say why. The eight checks an experienced media buyer runs, in order.",
  hero: {
    eyebrow: "When ROAS drops",
    headline: "Your ROAS dropped. Nobody can say why.",
    subhead:
      "Meta says 2.1 where it said 3.4 last week. You have seven tabs open, three theories and no answer — and the meeting is in an hour. Drew has an answer, with the working shown, and it was waiting by 8am.",
    promise: {
      kicker: "Tomorrow by 8am",
      text: "Connect today and your first ads brief is waiting before you open your laptop",
    },
  },
  manual: {
    eyebrow: "The 11pm way",
    headline: "What you’re about to do by hand",
    subhead:
      "This is the pass an experienced operator makes when the number moves. It takes most of an afternoon, it gets interrupted, and it usually ends with a theory rather than a cause.",
    tabs: [
      "Meta Ads Manager, re-cut by every date range you can think of, hunting for where the line actually bent.",
      "Google Ads, to check whether it moved too — which would mean something broader than one channel.",
      "Shopify analytics, because the platforms and the order ledger never quite agree and you need to know which one to believe.",
      "The account change history, scrolling for whatever someone edited last Thursday that is only surfacing now.",
      "Creative reporting, eyeballing frequency and CTR across the ad sets carrying most of the spend.",
      "A spreadsheet where you paste it all, because none of these tools will sit next to each other.",
      "Slack, explaining to the founder that you are “still digging” and will have something by tomorrow.",
    ],
    missing: "Nowhere in those seven tabs: your margins, your stock levels, or which of these products bring customers back.",
    coda: "The data was never the hard part. Running the whole diagnosis, in the right order, before the answer stops being useful — that is the hard part.",
  },
  ladder: {
    eyebrow: "The 8am way",
    headline: "What Drew checks, and in what order",
    subhead:
      "Order matters more than coverage. Most wasted afternoons come from starting at creative when the answer was in measurement, or rebuilding an ad set that was only ever having an ordinary Tuesday. Drew walks the same ladder an experienced media buyer walks, top to bottom, every morning.",
    rungs: [
      {
        title: "Measurement",
        question: "Did performance change, or did the reporting change?",
        body: "An attribution-window change, a conversion-tracking outage, a tagging change on the site, or conversions still being reported late will all look exactly like a performance drop. Nothing below this rung is worth reading until this one is clear.",
      },
      {
        title: "Variance",
        question: "Is this a signal, or is this a Tuesday?",
        body: "The move gets compared against how much this account normally swings — not against last week’s best day. Accounts that have always been volatile produce “drops” every few days, and reacting to each one is how performance gets destabilised.",
      },
      {
        title: "Account changes",
        question: "Did someone touch it?",
        body: "Budget edits, new ad sets, bid-strategy switches, audience changes, ads newly rejected or paused. Changes made three to seven days ago frequently surface as today’s problem, which is exactly why they get missed.",
      },
      {
        title: "Creative",
        question: "Is the account fatigued?",
        body: "Frequency, CTR trend, how much spend sits behind creative that has been running a long time, and how much of the audience is seeing something for the first time. Fatigue is the most common real cause — and the most commonly guessed at before the rungs above have been ruled out.",
      },
      {
        title: "Auction and demand",
        question: "Did the market move?",
        body: "CPM trend, seasonal demand, and whether the whole category got more expensive. If costs rose across every campaign at once, the problem is not inside any single ad set and restructuring one will not fix it.",
      },
      {
        title: "Conversion path",
        question: "Did the site stop converting?",
        body: "Conversion rate, average order value, and the state of the products the ads actually point at. A hero SKU going out of stock, or a landing page quietly changing, drops ROAS without a single thing being wrong in the ad account.",
      },
      {
        title: "Product mix",
        question: "Did what you sell change?",
        body: "Spend drifting toward lower-margin products, or toward first-purchase-heavy ones, pulls blended ROAS down while the business underneath may be fine. This is the rung that needs margins, inventory and repeat behavior — which is why an ads-only tool cannot reach it.",
      },
      {
        title: "Learning state and timing",
        question: "Should you act at all right now?",
        body: "If a change was made recently and the account is still learning, intervening again resets the clock and costs more than waiting. Knowing when to leave the account alone is part of the diagnosis, not an absence of one.",
      },
    ],
  },
  brief: {
    eyebrow: "What lands by 8am",
    headline: "One diagnosis, end to end",
    subhead:
      "Not an alert saying the number moved. A cause, the business context around it, a recommendation, and a decision waiting for you.",
    title: "Drew · Daily Ads Brief",
    time: "Today, 6:04 AM",
    blocks: [
      {
        label: "What changed",
        lines: ["Meta prospecting CPA rose 34% week over week. Blended ROAS 3.4 → 2.1."],
      },
      {
        label: "Ruled out first",
        lines: [
          "Tracking healthy, no attribution-window change. Move is 2.4× this account’s normal weekly variance — real, not noise. No account edits in the last 14 days.",
        ],
      },
      {
        label: "Root cause",
        lines: [
          "Creative fatigue on the top 3 ad sets, which carry 71% of prospecting spend. Frequency 4.7, CTR down 31% over 12 days.",
        ],
      },
      {
        label: "Business context",
        lines: [
          "Those ad sets push SKU-114 — 62% contribution margin, and buyers of it repeat 3× more than average. Worth defending rather than cutting.",
          "Stock: 41 days. No constraint on scaling back up once creative refreshes.",
        ],
      },
      {
        label: "Recommended",
        lines: [
          "Hold total budget. Shift 30% of the fatigued ad sets’ spend to the two newest creatives already beating account-average CTR. Full refresh queued for Thursday. No structural changes — the account is healthy underneath.",
        ],
        highlight: true,
      },
    ],
    approve: "Approve & execute",
    dismiss: "Not now",
    note: "Execution is rolling out now. Drew implements approved changes — budget moves, pauses, scaling and descaling — within guardrails you set. You decide how much Drew is allowed to do.",
  },
  nothingWrong: {
    eyebrow: "The unpopular answer",
    headline: "Sometimes the honest answer is that nothing is wrong",
    subhead:
      "A falling ROAS is not automatically a fault to fix. Three cases where reacting costs more than sitting still — and where a tool that only sees your ad account will tell you to act anyway.",
    cases: [
      {
        title: "You scaled",
        description:
          "ROAS falling as spend rises is arithmetic, not a failure. The question that matters is whether the marginal dollar is still profitable — and that is a different calculation from the one on the dashboard.",
      },
      {
        title: "Your mix moved",
        description:
          "Spend shifted toward a lower-margin or first-purchase-heavy product. Blended ROAS drops while contribution margin and lifetime value hold. Nothing needs fixing; the average just changed shape.",
      },
      {
        title: "It’s still filling in",
        description:
          "Conversions get reported late, so the most recent 72 hours are always the worst-looking window you own. Plenty of accounts get restructured over a number that would have corrected itself by Friday.",
      },
    ],
  },
  faq: {
    eyebrow: "Common questions",
    headline: "ROAS drops, answered",
    subhead: "The questions operators ask when the number moves.",
    items: [
      {
        q: "Why did my Meta ROAS drop suddenly?",
        a: "A sudden drop usually has one of eight causes, and they are worth checking in order: a measurement change rather than a performance change; normal variance mistaken for a trend; an edit made three to seven days ago; creative fatigue in the ad sets carrying most of the spend; a rise in auction costs or a shift in demand; a conversion-path problem such as a stockout on the products your ads point at; a change in product mix toward lower-margin items; or an account still in learning after a recent change. Checking them out of order is what turns a ten-minute diagnosis into a lost day.",
      },
      {
        q: "How long should I wait before reacting to a ROAS drop?",
        a: "Long enough to know the drop is real. Two things routinely make a healthy account look broken: conversions still being reported late, which makes the most recent 72 hours the worst-looking window you have, and ordinary day-to-day variance in an account that has always swung. Compare the move against the account’s own historical variance rather than against last week’s best day. And if a change was made recently and the account is still in learning, intervening again can cost more than waiting.",
      },
      {
        q: "Is a falling ROAS always a problem?",
        a: "No. If you increased spend, ROAS falling is arithmetic rather than a fault — the real question is whether the marginal dollar is still profitable. If spend shifted toward a lower-margin or higher-repeat product, blended ROAS can fall while contribution margin and lifetime value stay healthy. A ROAS number only means something next to the margins, inventory and repeat behavior of what was actually sold.",
      },
      {
        q: "Can Drew fix a ROAS drop, or only diagnose it?",
        a: "Both, with you in control. Drew diagnoses the cause and recommends what to scale, reduce, pause or investigate, with the reasoning attached. Execution is rolling out now: Drew can implement approved changes such as budget moves and pauses within guardrails you set. You decide how much Drew is allowed to do — and part of its judgment is knowing when the right call is to leave the account alone.",
      },
    ],
  },
  finalCta: {
    headline: "Next time, have the answer by 8am",
    subhead:
      "Connect Shopify, Meta and Google today. Drew reads your history tonight and your first Daily Ads Brief is waiting tomorrow morning — about your actual account, not a sample. Free plan, no credit card required.",
    ctas: [
      { label: "Install on Shopify", href: "https://apps.shopify.com/customer-lifetime-value" },
      { label: "Sign up free", href: "https://app.datadrew.io/register", variant: "outline" as const },
      { label: "Book a demo", href: "/book", variant: "ghost" as const },
    ],
  },
};
