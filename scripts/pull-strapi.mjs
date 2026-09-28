// Pull the latest published articles from the Datadrew Strapi CMS into a
// static snapshot so the site builds deterministically (no network at build).
// Usage: node scripts/pull-strapi.mjs [count]
import { writeFileSync } from "node:fs";

const BASE = process.env.STRAPI_URL ?? "https://cms-production-0fcb.up.railway.app";
const count = Number(process.argv[2] ?? 100);
const fields = [
  "headline","slug","seoTitle","metaDescription","longDescription","category",
  "listCategory","authorName","authorRole","publishDate","updatedDate","readingTime",
  "ogImageUrl","coverGradientClass","cardTitle","cardDescription","featured","body",
  "toc","relatedArticles","searchableKeywords",
];
const qs = new URLSearchParams({ status: "published", sort: "publishDate:desc", "pagination[pageSize]": String(count) });
fields.forEach((f, i) => qs.set(`fields[${i}]`, f));
const res = await fetch(`${BASE}/api/articles?${qs}`);
if (!res.ok) throw new Error(`Strapi ${res.status}`);
const { data, meta } = await res.json();
// Strapi bodies carry inline light-theme styles (table cells, figures, images).
// Strip them so the site's own themable CSS applies, and wrap tables so they
// scroll on narrow screens instead of widening the article.
function sanitize(html) {
  return html
    .replace(/<(table|thead|tbody|tr|th|td|figure|figcaption|img)([^>]*?)\sstyle="[^"]*"/g, "<$1$2")
    .replace(/<table/g, '<div class="table-wrap"><table')
    .replace(/<\/table>/g, "</table></div>")
    .replace(/href="\/blog\/([^"#]+)\/(#[^"]*)?"/g, (_, slug, hash) => `href="/blog/${slug}${hash ?? ""}"`);
}
const firstImage = (html) => html.match(/<img[^>]+src="([^"]+)"/)?.[1] ?? null;
// The live (Framer) site's generic share image is stored as ogImageUrl on older
// posts. It is not a cover and disappears at cutover, so treat it as "no cover"
// (the site renders its own gradient cover + default og:image instead).
const isPlaceholderCover = (url) => !url || /datadrew\.io\/assets\//.test(url);
// Posts with an unpublished revision (Sumit's pending drafts) get their new cover
// on the draft only, so the live CMS entry stays untouched. Borrow just the
// draft's cover image; everything else still comes from the published entry.
const draftQs = new URLSearchParams({ status: "draft", "pagination[pageSize]": String(count), "fields[0]": "slug", "fields[1]": "ogImageUrl" });
const draftRes = await fetch(`${BASE}/api/articles?${draftQs}`);
const draftCover = new Map(
  draftRes.ok ? (await draftRes.json()).data.filter((d) => /\/uploads\//.test(d.ogImageUrl ?? "")).map((d) => [d.slug, d.ogImageUrl]) : [],
);
const coverOf = (a) =>
  isPlaceholderCover(a.ogImageUrl) || !/\/uploads\//.test(a.ogImageUrl) ? draftCover.get(a.slug) ?? firstImage(a.body ?? "") : a.ogImageUrl;

const posts = data.map((a) => ({
  id: a.documentId,
  slug: a.slug,
  title: a.headline,
  cardTitle: a.cardTitle ?? a.headline,
  seoTitle: a.seoTitle ?? a.headline,
  excerpt: a.cardDescription ?? a.metaDescription ?? "",
  standfirst: a.longDescription ?? a.metaDescription ?? "",
  metaDescription: a.metaDescription ?? "",
  category: a.listCategory ?? a.category ?? "Insights",
  author: { name: a.authorName ?? "Datadrew", role: a.authorRole ?? "" },
  date: a.publishDate,
  updated: a.updatedDate ?? a.publishDate,
  readingMinutes: Number.parseInt(a.readingTime ?? "8", 10) || 8,
  cover: coverOf(a),
  gradient: a.coverGradientClass ?? "card-grad-1",
  featured: Boolean(a.featured),
  body: sanitize(a.body ?? ""),
  toc: Array.isArray(a.toc) ? a.toc : [],
  related: (Array.isArray(a.relatedArticles) ? a.relatedArticles : []).map((r) => ({
    label: r.label,
    href: String(r.href ?? "").replace(/\/$/, ""),
  })),
}));
writeFileSync(
  new URL("../src/content/strapi-posts.json", import.meta.url),
  JSON.stringify({ pulledAt: new Date().toISOString(), total: meta?.pagination?.total ?? posts.length, posts }, null, 2)
);
console.log(`Saved ${posts.length} of ${meta?.pagination?.total} posts`);
for (const p of posts) console.log(`- ${p.date}  ${p.slug}  [${p.category}] ${p.readingMinutes}m body=${p.body.length}ch toc=${p.toc.length}`);
