import { Link } from "@/i18n/navigation";
import { getPostsByTool, type BlogPostMeta } from "@/lib/blog";
import {
  BookOpen,
  Lightbulb,
  Stars,
  ArrowRight,
} from "lucide-react";

export interface EducationalContent {
  toolId: string;
  howItWorks: {
    title?: string;
    paragraphs: string[];
  };
  whatThisTellsYou: {
    title?: string;
    points: { heading: string; body: string }[];
  };
  astrologyBehindIt: {
    title?: string;
    paragraphs: string[];
  };
}

function SectionHeading({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--cosmic-rose)]/10 border border-[var(--cosmic-rose)]/15">
        {icon}
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-h3)",
          fontWeight: 500,
          lineHeight: "var(--leading-heading)",
        }}
      >
        {children}
      </h2>
    </div>
  );
}

function RelatedPosts({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="mt-16">
      <SectionHeading
        icon={<BookOpen className="w-4 h-4 text-[var(--cosmic-rose)]" />}
      >
        Related Reading
      </SectionHeading>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}` as never}
            className="group block rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/50 p-5 transition-all hover:border-[var(--cosmic-rose)]/40 hover:shadow-[var(--shadow-md)]"
          >
            <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[var(--cosmic-rose)] mb-2 block">
              {post.frontmatter.category}
            </span>
            <h3 className="text-[0.95rem] font-medium leading-snug group-hover:text-[var(--crimson-love)] transition-colors mb-2">
              {post.frontmatter.title}
            </h3>
            <p className="text-xs text-[var(--color-muted-fg)] leading-relaxed line-clamp-2">
              {post.frontmatter.description}
            </p>
            <span className="inline-flex items-center gap-1 text-xs text-[var(--cosmic-rose)] mt-3 group-hover:gap-2 transition-all">
              Read more <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function EducationalSections({
  content,
}: {
  content: EducationalContent;
}) {
  const relatedPosts = getPostsByTool(content.toolId);

  return (
    <div className="mt-16 max-w-3xl mx-auto space-y-16">
      {/* How It Works */}
      <section>
        <SectionHeading
          icon={
            <Lightbulb className="w-4 h-4 text-[var(--champagne-gold)]" />
          }
        >
          {content.howItWorks.title ?? "How It Works"}
        </SectionHeading>
        <div className="space-y-4">
          {content.howItWorks.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-[var(--color-muted-fg)] leading-[1.8] text-[0.95rem]"
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* What This Tells You */}
      <section>
        <SectionHeading
          icon={<Stars className="w-4 h-4 text-[var(--cosmic-rose)]" />}
        >
          {content.whatThisTellsYou.title ?? "What This Tells You"}
        </SectionHeading>
        <div className="space-y-5">
          {content.whatThisTellsYou.points.map((point, i) => (
            <div key={i}>
              <h3 className="font-medium text-[0.95rem] mb-1">
                {point.heading}
              </h3>
              <p className="text-[var(--color-muted-fg)] leading-[1.7] text-[0.9rem]">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The Astrology Behind It */}
      <section>
        <SectionHeading
          icon={<BookOpen className="w-4 h-4 text-[var(--champagne-gold)]" />}
        >
          {content.astrologyBehindIt.title ?? "The Astrology Behind It"}
        </SectionHeading>
        <div className="space-y-4">
          {content.astrologyBehindIt.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-[var(--color-muted-fg)] leading-[1.8] text-[0.95rem]"
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Related Reading — dynamically sourced from blog posts */}
      <RelatedPosts posts={relatedPosts} />
    </div>
  );
}
