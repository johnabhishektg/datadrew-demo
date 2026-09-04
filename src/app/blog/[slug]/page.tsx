import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { dateFormat, getPost, posts, relatedPosts } from "@/content/blog";
import { site } from "@/content/site";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ArticleStructuredData, DEFAULT_OG_IMAGE } from "@/components/site/structured-data";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ArticleBody } from "@/components/blog/article-body";
import { Avatar, PostCard } from "@/components/blog/post-card";
import { PostCover } from "@/components/blog/post-cover";
import { Toc } from "@/components/blog/toc";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: { absolute: post.seoTitle },
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author.name],
      images: [{ url: post.cover ?? DEFAULT_OG_IMAGE, alt: post.title }],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const related = relatedPosts(post);

  return (
    <>
      <ArticleStructuredData post={post} />
      <Navbar />
      <ReadingProgress />
      <main className="mx-auto w-full max-w-6xl px-5 pt-32 md:px-8 md:pt-36">
        <article>
          <header className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link href="/blog" className="transition-colors hover:text-foreground">
                Blog
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="truncate text-foreground/80">{post.cardTitle}</span>
            </nav>
            <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full border border-border bg-muted/60 px-2 py-0.5 font-medium text-foreground/80">
                {post.category}
              </span>
              <span className="font-mono tabular">{post.readingMinutes} min read</span>
            </div>
            <h1 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              {post.standfirst}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-border py-4">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar name={post.author.name} className="size-10 text-xs" />
                <div className="min-w-0 leading-tight">
                  <p className="truncate text-sm font-medium">{post.author.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{post.author.role}</p>
                </div>
              </div>
              <dl className="ml-auto flex gap-6 text-xs text-muted-foreground">
                <div>
                  <dt className="label-mono">Published</dt>
                  <dd className="mt-1 font-mono tabular text-foreground/80">
                    <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
                  </dd>
                </div>
                {post.updated !== post.date && (
                  <div>
                    <dt className="label-mono">Updated</dt>
                    <dd className="mt-1 font-mono tabular text-foreground/80">
                      <time dateTime={post.updated}>{dateFormat.format(new Date(post.updated))}</time>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </header>

          <PostCover post={post} priority className="mt-10 aspect-[21/9] max-w-4xl" />

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,42rem)_1fr] lg:gap-16">
            <ArticleBody html={post.body} />
            <aside className="hidden lg:block">
              <div className="sticky top-28 flex flex-col gap-8">
                <Toc items={post.toc} />
                <div className="rounded-2xl border border-border bg-muted/30 p-5">
                  <p className="label-mono text-brand">From the product</p>
                  <p className="mt-2 text-sm font-medium leading-snug">
                    Drew runs this analysis on your store every morning.
                  </p>
                  <Button asChild size="sm" className="mt-4 w-full rounded-lg">
                    <a href={site.appUrl}>Start free</a>
                  </Button>
                </div>
              </div>
            </aside>
          </div>

          <footer className="mt-16 max-w-[42rem]">
            <div className="rounded-2xl border border-border bg-card p-7">
              <p className="label-mono text-brand">From the product</p>
              <p className="mt-3 text-xl font-semibold leading-snug tracking-tight">
                Drew runs this diagnosis on your store every night.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                What changed, why, and what to do — in Slack before your first coffee. Free
                to start; yesterday diagnosed in 10 minutes.
              </p>
              <Button asChild className="mt-5 rounded-lg">
                <a href={site.appUrl}>Start free</a>
              </Button>
            </div>
          </footer>
        </article>

        {related.length > 0 && (
          <section aria-label="Related reading" className="mt-20 border-t border-border pt-10">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold tracking-tight">Related reading</h2>
              <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                All posts
              </Link>
            </div>
            <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
        <div className="h-16" />
      </main>
      <Footer />
    </>
  );
}
