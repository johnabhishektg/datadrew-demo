import snapshot from "./strapi-posts.json";

/* Blog content comes from the Datadrew Strapi CMS. `strapi-posts.json` is a
 * static snapshot written by `scripts/pull-strapi.mjs`, so builds are
 * deterministic and need no network. Re-run the script to refresh. */

export type TocItem = { label: string; anchor: string };
export type RelatedLink = { label: string; href: string };

export type PostMeta = {
  id: string;
  slug: string;
  title: string;
  cardTitle: string;
  seoTitle: string;
  excerpt: string;
  standfirst: string;
  metaDescription: string;
  category: string;
  author: { name: string; role: string };
  date: string; // ISO date
  updated: string;
  readingMinutes: number;
  cover: string | null;
  gradient: string;
  featured: boolean;
};

export type Post = PostMeta & {
  body: string; // sanitized HTML from Strapi
  toc: TocItem[];
  related: RelatedLink[];
};

const all = (snapshot.posts as Post[]).slice().sort((a, b) => (a.date < b.date ? 1 : -1));

export const posts: Post[] = all;
export const totalPublished: number = snapshot.total;
export const pulledAt: string = snapshot.pulledAt;

export function getPost(slug: string): Post | undefined {
  return all.find((p) => p.slug === slug);
}

/** Posts linked from the article's own "related" list that exist in the
 * snapshot, topped up with the most recent other posts. */
export function relatedPosts(post: Post, count = 3): Post[] {
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  const picked: Post[] = [];
  for (const r of post.related) {
    const slug = r.href.replace(/^\/blog\//, "").split("#")[0];
    const hit = bySlug.get(slug);
    if (hit && hit.slug !== post.slug && !picked.includes(hit)) picked.push(hit);
  }
  for (const p of all) {
    if (picked.length >= count) break;
    if (p.slug !== post.slug && !picked.includes(p)) picked.push(p);
  }
  return picked.slice(0, count);
}

export const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

/** Strapi gradient class → Tailwind gradient (brand-tinted neutrals). */
export const coverGradients: Record<string, string> = {
  "card-grad-1": "from-brand/35 via-brand/10 to-muted",
  "card-grad-2": "from-foreground/15 via-muted to-brand/25",
  "card-grad-3": "from-brand/25 via-muted to-foreground/10",
  "card-grad-4": "from-muted via-brand/15 to-brand/40",
  "card-grad-5": "from-foreground/10 via-brand/10 to-muted",
  "card-grad-6": "from-brand/40 via-brand/15 to-muted",
  "featured-grad-1": "from-brand/40 via-muted to-foreground/10",
  "featured-grad-2": "from-foreground/15 via-brand/15 to-brand/35",
};
