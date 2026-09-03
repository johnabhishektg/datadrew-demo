import { coverGradients, type PostMeta } from "@/content/blog";
import { cn } from "@/lib/utils";

/* Cover art for posts. Strapi only stores a gradient class for most posts, so
 * the cover is a brand-tinted gradient with a deterministic schematic (bars
 * derived from the slug) — crawlable, themable, no image files. Posts that do
 * carry an image use it. */

function bars(seed: string, n = 9) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  return Array.from({ length: n }, (_, i) => {
    h = (Math.imul(h, 1664525) + 1013904223) >>> 0;
    return 28 + ((h >>> 8) % 60) + (i === n - 1 ? 8 : 0);
  });
}

export function PostCover({
  post,
  className,
  priority = false,
}: {
  post: PostMeta;
  className?: string;
  priority?: boolean;
}) {
  if (post.cover) {
    return (
      <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-muted", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.cover}
          alt=""
          loading={priority ? "eager" : "lazy"}
          className="size-full object-cover"
        />
      </div>
    );
  }
  const values = bars(post.slug);
  const gradient = coverGradients[post.gradient] ?? coverGradients["card-grad-1"];
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br",
        gradient,
        className
      )}
    >
      <div className="absolute inset-0 bg-grid-fade opacity-70" />
      <svg
        viewBox="0 0 320 200"
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-x-0 bottom-0 h-[62%] w-full text-foreground"
      >
        {values.map((v, i) => (
          <rect
            key={i}
            x={24 + i * 31}
            y={200 - v * 1.6}
            width={20}
            height={v * 1.6}
            rx={3}
            className={i === values.length - 1 ? "fill-brand" : "fill-current opacity-[0.16]"}
          />
        ))}
        <line x1="0" y1="199" x2="320" y2="199" className="stroke-current opacity-30" />
      </svg>
      <span className="absolute left-4 top-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-foreground/60">
        {post.category}
      </span>
    </div>
  );
}
