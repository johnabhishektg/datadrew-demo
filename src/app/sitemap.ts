import type { MetadataRoute } from "next";
import { posts } from "@/content/blog";
import { caseStudies } from "@/content/case-studies";
import { comparisons } from "@/content/comparisons";
import { integrationPages, integrationRoute } from "@/content/integration-pages";
import { legalSlugs } from "@/content/legal";
import { platformPages } from "@/content/platform";
import { site } from "@/content/site";

/* Mirrors the live datadrew.io sitemap (68 URLs, slash-terminated) so nothing
 * indexed is lost at cutover. A customer story is listed only once it is
 * published AND the brand has granted naming permission (content/case-studies.ts). */

const ORIGIN = `https://${site.domain}`;
const url = (path: string) => `${ORIGIN}${path === "/" ? "" : path}/`;

type Entry = MetadataRoute.Sitemap[number];
const entry = (path: string, priority: number, changeFrequency: Entry["changeFrequency"], lastModified?: string | Date): Entry => ({
  url: url(path),
  priority,
  changeFrequency,
  ...(lastModified ? { lastModified } : {}),
});

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = posts[0]?.updated;
  const core: Entry[] = [
    entry("/", 1, "weekly"),
    entry("/pricing", 0.9, "monthly"),
    entry("/mcp", 0.9, "monthly"),
    entry("/integrations", 0.8, "monthly"),
    entry("/platform", 0.8, "monthly"),
    entry("/blog", 0.8, "weekly", latestPost),
    entry("/about", 0.6, "monthly"),
    entry("/contact", 0.5, "yearly"),
    entry("/free-audit", 0.7, "monthly"),
    entry("/why-did-my-roas-drop", 0.7, "monthly"),
    entry("/partners", 0.6, "monthly"),
    entry("/partners/tech", 0.5, "monthly"),
    entry("/partners/become-a-partner", 0.5, "monthly"),
  ];
  const platform = platformPages.map((p) => entry(`/platform/${p.slug}`, 0.8, "monthly"));
  const integrations = integrationPages.map((p) => entry(`/integrations/${integrationRoute(p)}`, 0.7, "monthly"));
  const vs = comparisons.map((c) => entry(`/vs/${c.slug}`, 0.7, "monthly"));
  const legal = legalSlugs.map((slug) => entry(`/${slug}`, 0.2, "yearly"));
  const stories = caseStudies.filter((c) => c.published && c.permission === "granted");
  const customers = stories.length
    ? [entry("/customers", 0.6, "monthly"), ...stories.map((c) => entry(`/customers/${c.slug}`, 0.7, "monthly"))]
    : [];
  const blog = posts.map((p) => entry(`/blog/${p.slug}`, 0.7, "monthly", p.updated));
  return [...core, ...platform, ...integrations, ...vs, ...legal, ...customers, ...blog];
}
