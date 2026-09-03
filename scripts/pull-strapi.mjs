// Pull the latest published articles from the Datadrew Strapi CMS into a
// static snapshot so the site builds deterministically (no network at build).
// Usage: node scripts/pull-strapi.mjs [count]
import { writeFileSync } from "node:fs";

const BASE = process.env.STRAPI_URL ?? "https://cms-production-0fcb.up.railway.app";
const count = Number(process.argv[2] ?? 5);
const fields = [
  "headline","slug","seoTitle","metaDescription","longDescription","category",
  "listCategory","authorName","authorRole","publishDate","updatedDate","readingTime",
  "ogImageUrl","coverGradientClass","cardTitle","cardDescription","featured","body",
  "toc","relatedArticles","searchableKeywords",
];
const qs = new URLSearchParams({ sort: "publishDate:desc", "pagination[pageSize]": String(count) });
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
  cover: a.ogImageUrl ?? firstImage(a.body ?? ""),
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
