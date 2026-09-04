import type { Metadata } from "next";
import { posts, totalPublished } from "@/content/blog";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FinalCta } from "@/components/site/final-cta";
import { FeaturedPostCard, PostCard } from "@/components/blog/post-card";
import { NewsletterPopup } from "@/components/blog/newsletter-popup";
import { JsonLd, breadcrumbLd, collectionPageLd } from "@/components/site/structured-data";

const description =
  "Playbooks, benchmarks and data essays on running paid ads and retention for Shopify brands — from the team behind Drew.";

export const metadata: Metadata = {
  title: { absolute: "Datadrew Blog — Paid ads & retention playbooks for Shopify" },
  description,
};

export default function BlogIndex() {
  const [latest, ...rest] = posts;
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Blog", path: "/blog" }]),
          collectionPageLd({ name: "Datadrew Blog", path: "/blog", description }),
        ]}
      />
      <Navbar />
      <NewsletterPopup source="blog-index-popup" />
      <main className="mx-auto w-full max-w-6xl px-5 pt-32 md:px-8 md:pt-40">
        <header className="flex flex-col gap-4 md:max-w-2xl">
          <span className="inline-flex w-fit items-center text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            Blog
          </span>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Notes for operators who run on the numbers.
          </h1>
          <p className="text-pretty text-base text-muted-foreground md:text-lg">
            Benchmarks, daily-diagnosis frameworks and budget playbooks, written from what
            merchants actually ask Drew.
          </p>
        </header>

        {latest && (
          <section aria-label="Latest post" className="mt-12">
            <FeaturedPostCard post={latest} />
          </section>
        )}

        <section aria-label="All posts" className="mt-16">
          <div className="flex items-baseline justify-between border-b border-border pb-4">
            <h2 className="text-lg font-semibold tracking-tight">All posts</h2>
            <p className="font-mono text-xs text-muted-foreground tabular">
              {posts.length} of {totalPublished}
            </p>
          </div>
          <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>
      <div className="mt-8">
        <FinalCta />
      </div>
      <Footer />
    </>
  );
}
