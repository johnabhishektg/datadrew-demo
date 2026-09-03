import { cn } from "@/lib/utils";

/** Renders sanitized Strapi HTML with the site's article typography
 * (`.article-body` rules live in globals.css). */
export function ArticleBody({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={cn("article-body", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
