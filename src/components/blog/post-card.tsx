import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { dateFormat, type PostMeta } from "@/content/blog";
import { cn } from "@/lib/utils";
import { PostCover } from "./post-cover";

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground font-mono text-[0.7rem] font-medium text-background",
        className
      )}
    >
      {initials}
    </span>
  );
}

export function Byline({ post, className }: { post: PostMeta; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5 text-sm", className)}>
      <Avatar name={post.author.name} />
      <span className="font-medium">{post.author.name}</span>
      <span className="text-muted-foreground">·</span>
      <time dateTime={post.date} className="text-muted-foreground">
        {dateFormat.format(new Date(post.date))}
      </time>
    </div>
  );
}

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/blog/${post.slug}`} className="flex flex-col gap-4">
        <PostCover post={post} className="aspect-[16/10] transition-transform duration-300 group-hover:-translate-y-0.5" />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border border-border bg-muted/60 px-2 py-0.5 font-medium text-foreground/80">
            {post.category}
          </span>
          <span className="font-mono tabular">{post.readingMinutes} min read</span>
        </div>
        <h3 className="text-balance text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-brand">
          {post.cardTitle}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
      </Link>
      <Byline post={post} className="mt-4" />
    </article>
  );
}

/** Large lead card for the most recent post: cover left, copy right. */
export function FeaturedPostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group grid gap-6 overflow-hidden rounded-3xl border border-border bg-card p-3 md:grid-cols-2 md:gap-10 md:p-4">
      <Link href={`/blog/${post.slug}`} className="block">
        <PostCover post={post} priority className="aspect-[16/10] h-full md:aspect-auto md:min-h-[22rem]" />
      </Link>
      <div className="flex flex-col justify-center px-3 pb-4 md:px-2 md:py-6 md:pr-8">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-brand/15 px-2 py-0.5 font-medium text-brand">Latest</span>
          <span className="rounded-full border border-border bg-muted/60 px-2 py-0.5 font-medium text-foreground/80">
            {post.category}
          </span>
          <span className="font-mono tabular">{post.readingMinutes} min read</span>
        </div>
        <h2 className="mt-4 text-balance text-2xl font-semibold leading-tight tracking-tight md:text-3xl lg:text-4xl">
          <Link href={`/blog/${post.slug}`} className="transition-colors group-hover:text-brand">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <Byline post={post} />
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-brand"
          >
            Read post
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
