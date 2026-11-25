import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ChevronRight, Calendar, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { locales, defaultLocale, localePublicationStatus } from "@/i18n/locales";

const SITE = "https://www.astrologyforlove.com";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const canonical = `${SITE}/blog/${slug}`;
  const languages: Record<string, string> = {};
  for (const l of locales) {
    if (localePublicationStatus[l] === "published") {
      languages[l] = l === defaultLocale
        ? `${SITE}/blog/${slug}`
        : `${SITE}/${l}/blog/${slug}`;
    }
  }
  languages["x-default"] = canonical;

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: canonical,
      siteName: "AstrologyForLove",
      type: "article",
      publishedTime: post.frontmatter.publishedAt,
      ...(post.frontmatter.updatedAt
        ? { modifiedTime: post.frontmatter.updatedAt }
        : {}),
    },
  };
}

const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="text-xl font-medium mt-10 mb-4"
      style={{ fontFamily: "var(--font-display)" }}
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3
      className="text-lg font-medium mt-8 mb-3"
      style={{ fontFamily: "var(--font-display)" }}
      {...props}
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p
      className="text-[var(--color-muted-fg)] leading-[1.8] mb-4 text-[0.95rem]"
      {...props}
    />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul
      className="list-disc pl-6 mb-4 space-y-1 text-[var(--color-muted-fg)] text-[0.95rem]"
      {...props}
    />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol
      className="list-decimal pl-6 mb-4 space-y-1 text-[var(--color-muted-fg)] text-[0.95rem]"
      {...props}
    />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="leading-[1.7]" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-[var(--color-fg)]" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a
      className="text-[var(--cosmic-rose)] underline underline-offset-2 hover:text-[var(--crimson-love)] transition-colors"
      {...props}
    />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="border-l-2 border-[var(--cosmic-rose)]/40 pl-4 italic text-[var(--color-muted-fg)] my-6"
      {...props}
    />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="overflow-x-auto my-6">
      <table
        className="w-full text-sm border-collapse border border-[var(--color-border-subtle)]"
        {...props}
      />
    </div>
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th
      className="border border-[var(--color-border-subtle)] bg-[var(--color-muted)]/50 px-3 py-2 text-left font-medium"
      {...props}
    />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td
      className="border border-[var(--color-border-subtle)] px-3 py-2"
      {...props}
    />
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const readingTime = Math.max(
    1,
    Math.round(post.content.split(/\s+/).length / 230),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.publishedAt,
    ...(post.frontmatter.updatedAt
      ? { dateModified: post.frontmatter.updatedAt }
      : {}),
    url: `${SITE}/blog/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "AstrologyForLove",
      url: SITE,
    },
    mainEntityOfPage: `${SITE}/blog/${slug}`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <MainHeader />
      <main id="main-content" className="flex-1 pt-[60px]">
        <div className="bg-immersive text-[var(--moonlight-cream)] py-14 md:py-20 relative overflow-hidden">
          <Container size="standard" className="relative">
            <nav
              className="flex items-center gap-1.5 text-xs text-[var(--neutral-400)] mb-8"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="hover:text-[var(--cosmic-rose)] transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="w-3 h-3" aria-hidden />
              <Link
                href="/blog"
                className="hover:text-[var(--cosmic-rose)] transition-colors"
              >
                Blog
              </Link>
              <ChevronRight className="w-3 h-3" aria-hidden />
              <span className="text-[var(--cosmic-rose)] line-clamp-1">
                {post.frontmatter.title}
              </span>
            </nav>
            <div className="max-w-2xl">
              <span className="inline-block text-[10px] uppercase tracking-[0.15em] font-semibold text-[var(--cosmic-rose)] mb-3">
                {post.frontmatter.category}
              </span>
              <h1
                className="text-[var(--moonlight-cream)] mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-h1)",
                  lineHeight: "var(--leading-heading)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                }}
              >
                {post.frontmatter.title}
              </h1>
              <div className="flex items-center gap-4 text-xs text-[var(--neutral-400)]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" aria-hidden />
                  <time dateTime={post.frontmatter.publishedAt}>
                    {new Date(
                      post.frontmatter.publishedAt,
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" aria-hidden />
                  {readingTime} min read
                </span>
              </div>
            </div>
          </Container>
        </div>

        <Container size="standard" className="py-12 md:py-16">
          <article className="prose-afl max-w-2xl mx-auto">
            <MDXRemote source={post.content} components={mdxComponents} />
          </article>

          {post.frontmatter.relatedTools.length > 0 && (
            <section className="max-w-2xl mx-auto mt-16 pt-10 border-t border-[var(--color-border-subtle)]">
              <h2
                className="text-center mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-h3)",
                  fontWeight: 500,
                }}
              >
                Try These Tools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {post.frontmatter.relatedTools.map((toolId) => (
                  <Link
                    key={toolId}
                    href={`/${toolId}` as never}
                    className="block p-5 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] hover:border-[var(--cosmic-rose)]/40 hover:shadow-[var(--shadow-md)] transition-all group"
                  >
                    <span className="font-medium group-hover:text-[var(--crimson-love)] transition-colors">
                      {toolId
                        .split("-")
                        .map(
                          (w) => w.charAt(0).toUpperCase() + w.slice(1),
                        )
                        .join(" ")}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
