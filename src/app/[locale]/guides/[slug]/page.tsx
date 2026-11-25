"use client";

import React from "react";
import { useParams } from "next/navigation";
import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Link } from "@/i18n/navigation";
import {
  getGuideBySlug,
  getAllGuides,
  guideWordCount,
} from "@/lib/editorial-content";
import { getToolById } from "@/lib/tool-registry";
import {
  ChevronRight,
  ArrowRight,
  BookOpen,
  Clock,
  Calculator,
} from "lucide-react";

export default function GuidePage() {
  const params = useParams<{ slug: string }>();
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    return (
      <>
        <MainHeader />
        <main id="main-content" className="flex-1 pt-[60px]">
          <Container size="standard" className="py-24 text-center">
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h1)",
                fontWeight: 500,
              }}
            >
              Guide not found
            </h1>
            <p className="mt-4 text-[var(--color-muted-fg)]">
              <Link
                href={"/guides" as never}
                className="underline"
              >
                Browse all guides
              </Link>
            </p>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  const wordCount = guideWordCount(guide);
  const readingTime = Math.max(3, Math.ceil(wordCount / 230));

  const relatedToolDefs = guide.relatedTools
    .map((id) => getToolById(id))
    .filter((t) => t !== undefined && t.status === "live");

  const otherGuides = getAllGuides()
    .filter((g) => g.slug !== guide.slug)
    .slice(0, 4);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.astrologyforlove.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Guides",
            item: "https://www.astrologyforlove.com/guides",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: guide.title,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.metaDescription,
        url: `https://www.astrologyforlove.com/guides/${guide.slug}`,
        publisher: {
          "@type": "Organization",
          name: "AstrologyForLove",
          url: "https://www.astrologyforlove.com",
        },
        mainEntityOfPage: `https://www.astrologyforlove.com/guides/${guide.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <MainHeader theme="dark" />
      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="bg-immersive text-[var(--moonlight-cream)] relative overflow-hidden bg-stars">
          <Container size="standard" className="py-20 md:py-28 relative text-center">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center justify-center gap-1.5 text-xs text-[var(--neutral-400)] mb-8"
            >
              <Link href="/" className="hover:text-[var(--cosmic-rose)] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link
                href={"/guides" as never}
                className="hover:text-[var(--cosmic-rose)] transition-colors"
              >
                Guides
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[var(--moonlight-cream)]">
                {guide.title.length > 40
                  ? guide.title.substring(0, 40) + "…"
                  : guide.title}
              </span>
            </nav>

            <div className="flex items-center justify-center gap-4 mb-6">
              <BookOpen className="w-8 h-8 text-[var(--cosmic-rose)]" />
            </div>

            <h1
              className="text-[var(--moonlight-cream)] mb-4 max-w-3xl mx-auto"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                lineHeight: 1.15,
                fontWeight: 500,
              }}
            >
              {guide.title}
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-[var(--neutral-400)]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {readingTime} min read
              </span>
              <span>·</span>
              <span>{wordCount.toLocaleString()} words</span>
            </div>
          </Container>
        </section>

        {/* Article Content */}
        <article className="py-16 md:py-24">
          <Container size="standard">
            <div className="max-w-3xl mx-auto">
              {/* Introduction */}
              <div className="prose-afl mb-16">
                {guide.intro.split("\n\n").map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-[var(--color-fg)] leading-[1.8] mb-5"
                    style={{ fontSize: "1.05rem" }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Sections */}
              {guide.sections.map((section, i) => (
                <section key={i} className="mb-14">
                  <h2
                    className="mb-6"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-h2)",
                      fontWeight: 500,
                      lineHeight: 1.2,
                    }}
                  >
                    {section.heading}
                  </h2>
                  <div className="space-y-5">
                    {section.content.split("\n\n").map((paragraph, j) => {
                      const formatted = paragraph.replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong>$1</strong>'
                      );
                      return (
                        <p
                          key={j}
                          className="text-[var(--color-fg)] leading-[1.8]"
                          style={{ fontSize: "1.02rem" }}
                          dangerouslySetInnerHTML={{ __html: formatted }}
                        />
                      );
                    })}
                  </div>
                </section>
              ))}

              {/* FAQ Section */}
              <section className="mt-16 pt-16 border-t border-[var(--color-border)]">
                <h2
                  className="mb-10 text-center"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-h2)",
                    fontWeight: 500,
                  }}
                >
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {guide.faqs.map((faq, i) => (
                    <Card key={i} variant="default" padding="lg">
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed">
                        {faq.answer}
                      </p>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Related Calculators */}
              {relatedToolDefs.length > 0 && (
                <section className="mt-16 pt-16 border-t border-[var(--color-border)]">
                  <h2
                    className="mb-4 text-center"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-h2)",
                      fontWeight: 500,
                    }}
                  >
                    Try Our Calculators
                  </h2>
                  <p className="text-center text-[var(--color-muted-fg)] mb-8">
                    Put this knowledge into practice with these free tools.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedToolDefs.map((tool) => (
                      <Link
                        key={tool!.id}
                        href={`/${tool!.id}` as never}
                        className="group block p-5 rounded-xl border border-[var(--color-border)] hover:border-[var(--cosmic-rose)] transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Calculator
                            className="w-4 h-4"
                            style={{ color: tool!.accent }}
                          />
                          <h3 className="font-semibold text-sm group-hover:text-[var(--cosmic-rose)] transition-colors">
                            {tool!.title}
                          </h3>
                        </div>
                        <p className="text-xs text-[var(--color-muted-fg)] leading-relaxed">
                          {tool!.description}
                        </p>
                        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[var(--cosmic-rose)] opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Try now</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* More Guides */}
              <section className="mt-16 pt-16 border-t border-[var(--color-border)]">
                <h2
                  className="mb-8 text-center"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-h2)",
                    fontWeight: 500,
                  }}
                >
                  Continue Reading
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {otherGuides.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/guides/${g.slug}` as never}
                      className="group block p-5 rounded-xl border border-[var(--color-border)] hover:border-[var(--cosmic-rose)] transition-colors"
                    >
                      <h3 className="font-semibold text-sm mb-1 group-hover:text-[var(--cosmic-rose)] transition-colors flex items-center gap-1.5">
                        {g.title}
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-xs text-[var(--color-muted-fg)] line-clamp-2">
                        {g.metaDescription}
                      </p>
                    </Link>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Link
                    href={"/guides" as never}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--cosmic-rose)] hover:underline"
                  >
                    View all guides
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </section>
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
