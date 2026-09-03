# datadrew.io — website redesign

Ground-up redesign of the datadrew.io marketing site. Next.js 16 · Tailwind v4 · Motion.

- Design rationale: [`docs/design-decisions.md`](docs/design-decisions.md)
- Creative direction: [`docs/creative-direction.md`](docs/creative-direction.md)
- Competitive/design research: [`docs/research-synthesis.md`](docs/research-synthesis.md)
- Page narrative: [`docs/content-architecture.md`](docs/content-architecture.md)

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build (all routes static)
pnpm lint
```

## Edit content

All marketing copy lives in [`src/content/site.ts`](src/content/site.ts) — no copy in
components. Placeholder items are flagged there (testimonial attributions, example
data); see the "Flagged placeholders" list in `docs/design-decisions.md` before launch.

## Add a blog post

1. Create `src/content/posts/<slug>.tsx` exporting `meta` and a default component
   composed from the primitives in `src/components/blog/prose.tsx`
   (`Lead`, `P`, `H2`, `PullQuote`, `Callout`, `BarChart`, `DataTable`, `CodeBlock`, …).
2. Register it in `src/content/posts/index.ts`.

The route, index page, metadata, and Article JSON-LD are generated from the registry.
