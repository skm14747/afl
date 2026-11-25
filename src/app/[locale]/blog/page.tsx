import { getAllPosts } from "@/lib/blog";
import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import { ChevronRight, BookOpen, Calendar } from "lucide-react";
import type { Metadata } from "next";

const SITE = "https://www.astrologyforlove.com";

export const metadata: Metadata = {
  title: "Blog — Love Astrology Articles & Guides",
  description:
    "Guides on zodiac compatibility, Venus signs, Moon sign emotional needs, and relationship astrology. Written to help you understand your chart.",
  alternates: {
    canonical: `${SITE}/blog`,
    languages: { en: `${SITE}/blog`, "x-default": `${SITE}/blog` },
  },
  openGraph: {
    title: "Blog — AstrologyForLove",
    description:
      "Love astrology guides, zodiac compatibility deep dives, and relationship insights.",
    url: `${SITE}/blog`,
    siteName: "AstrologyForLove",
    type: "website",
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  guides: "Guides",
  "astrology-101": "Astrology 101",
  relationships: "Relationships",
  "how-to": "How-To",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <MainHeader />
      <main id="main-content" className="flex-1 pt-[60px]">
        <div className="bg-immersive text-[var(--moonlight-cream)] py-16 md:py-20 relative overflow-hidden">
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
              <span className="text-[var(--cosmic-rose)]">Blog</span>
            </nav>
            <div className="text-center">
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 rounded-full glass-dark flex items-center justify-center border border-[var(--cosmic-rose)]/15">
                  <BookOpen className="w-7 h-7 text-[var(--champagne-gold)]" />
                </div>
              </div>
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
                Love Astrology Blog
              </h1>
              <p className="text-[var(--neutral-300)] max-w-2xl mx-auto leading-[1.7] text-[0.95rem]">
                Guides on compatibility, Venus signs, Moon sign needs, and the
                astrology behind every calculator on this site.
              </p>
            </div>
          </Container>
        </div>

        <Container size="standard" className="py-12 md:py-16">
          {posts.length === 0 ? (
            <p className="text-center text-[var(--color-muted-fg)]">
              No posts yet. Check back soon.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}` as never}
                  className="group block rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 transition-all hover:border-[var(--cosmic-rose)]/40 hover:shadow-[var(--shadow-md)]"
                >
                  <span className="inline-block text-[10px] uppercase tracking-[0.15em] font-semibold text-[var(--cosmic-rose)] mb-3">
                    {CATEGORY_LABELS[post.frontmatter.category] ??
                      post.frontmatter.category}
                  </span>
                  <h2 className="text-lg font-medium mb-2 group-hover:text-[var(--crimson-love)] transition-colors leading-snug">
                    {post.frontmatter.title}
                  </h2>
                  <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed line-clamp-3 mb-4">
                    {post.frontmatter.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--neutral-500)]">
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
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
