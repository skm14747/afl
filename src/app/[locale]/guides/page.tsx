"use client";

import React from "react";
import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Link } from "@/i18n/navigation";
import { getAllGuides, guideWordCount } from "@/lib/editorial-content";
import {
  BookOpen,
  ArrowRight,
  Clock,
  ChevronRight,
  Heart,
} from "lucide-react";

export default function GuidesHubPage() {
  const guides = getAllGuides();

  const jsonLd = {
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
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Love Astrology Guides",
        description:
          "Free educational guides on zodiac compatibility, Venus signs, synastry, Moon compatibility, marriage astrology, and more.",
        url: "https://www.astrologyforlove.com/guides",
        publisher: {
          "@type": "Organization",
          name: "AstrologyForLove",
          url: "https://www.astrologyforlove.com",
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: guides.map((guide, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: guide.title,
            url: `https://www.astrologyforlove.com/guides/${guide.slug}`,
          })),
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainHeader theme="dark" />
      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="bg-immersive text-[var(--moonlight-cream)] relative overflow-hidden bg-stars">
          <Container size="standard" className="py-20 md:py-28 relative text-center">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center justify-center gap-1.5 text-xs text-[var(--neutral-400)] mb-8"
            >
              <Link href="/" className="hover:text-[var(--cosmic-rose)] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[var(--moonlight-cream)]">Guides</span>
            </nav>

            <div className="flex items-center justify-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-[var(--cosmic-rose)]" />
              <Heart className="w-6 h-6 text-[var(--crimson-love)] animate-pulse" />
            </div>

            <h1
              className="text-[var(--moonlight-cream)] mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                lineHeight: 1.1,
                fontWeight: 500,
              }}
            >
              Love Astrology{" "}
              <em className="text-rose-gradient not-italic">Guides</em>
            </h1>

            <p className="text-[var(--neutral-300)] max-w-xl mx-auto leading-relaxed text-[1.05rem]">
              Educational articles on zodiac compatibility, Venus and Moon signs,
              synastry, marriage astrology, and the celestial mechanics of love.
              Real astrological concepts, not generic horoscopes.
            </p>
          </Container>
        </section>

        {/* Guide Grid */}
        <section className="py-16 md:py-24">
          <Container size="wide">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide, i) => {
                const wc = guideWordCount(guide);
                const readTime = Math.max(3, Math.ceil(wc / 230));
                const isFeature = i < 3;

                return (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}` as never}
                    className={`group block ${isFeature && i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
                  >
                    <Card
                      variant="default"
                      padding="lg"
                      className="h-full hover:border-[var(--cosmic-rose)]/40 hover:shadow-[0_12px_40px_rgba(49,13,37,0.08)] hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className={isFeature && i === 0 ? "lg:py-4" : ""}>
                        <div className="flex items-center gap-2 text-xs text-[var(--color-muted-fg)] mb-4">
                          <Clock className="w-3 h-3" />
                          <span>{readTime} min read</span>
                          <span>·</span>
                          <span>{wc.toLocaleString()} words</span>
                        </div>

                        <h2
                          className="mb-3 group-hover:text-[var(--crimson-love)] transition-colors duration-300"
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize:
                              isFeature && i === 0
                                ? "var(--text-h2)"
                                : "var(--text-h3)",
                            fontWeight: 500,
                            lineHeight: 1.25,
                          }}
                        >
                          {guide.title}
                        </h2>

                        <p className="text-[var(--color-muted-fg)] leading-[1.7] text-sm mb-4">
                          {guide.metaDescription}
                        </p>

                        <div className="flex items-center gap-3 flex-wrap">
                          {guide.relatedTools.slice(0, 2).map((toolId) => (
                            <span
                              key={toolId}
                              className="text-[10px] uppercase tracking-wider text-[var(--cosmic-rose)] bg-[var(--cosmic-rose)]/5 px-2 py-0.5 rounded-full"
                            >
                              {toolId.replace(/-/g, " ")}
                            </span>
                          ))}
                        </div>

                        <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-[var(--crimson-love)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span>Read guide</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[var(--color-bg-alt)]">
          <Container size="standard" className="text-center">
            <h2
              className="mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h2)",
                fontWeight: 500,
              }}
            >
              Ready to put this knowledge into practice?
            </h2>
            <p className="text-[var(--color-muted-fg)] mb-8 max-w-lg mx-auto">
              Use our free calculators to explore your own chart and
              compatibility with the astrological concepts from these guides.
            </p>
            <Link
              href="/love-compatibility"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[var(--crimson-love)] text-white font-semibold rounded-[var(--radius-xl)] hover:bg-[var(--primary-600)] transition-all hover:shadow-[0_8px_30px_rgba(181,45,82,0.4)] hover:-translate-y-0.5"
            >
              <Heart className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
              Explore Calculators
            </Link>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
