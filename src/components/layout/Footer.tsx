"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/branding/Logo";
import { Container } from "./Container";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");

  const footerLinks = [
    {
      title: t("astrologyTools"),
      links: [
        { label: t("loveCompatibility"), href: "/love-compatibility" as const },
        { label: t("venusSign"), href: "/venus-sign-calculator" as const },
        { label: t("moonCompat"), href: "/moon-sign-compatibility" as const },
        { label: t("soulmate"), href: "/soulmate-calculator" as const },
      ],
    },
    {
      title: t("moreTools"),
      links: [
        { label: t("marriage"), href: "/marriage-compatibility" as const },
        { label: t("birthChart"), href: "/birth-chart-compatibility" as const },
        { label: t("twinFlame"), href: "/twin-flame-calculator" as const },
        { label: t("numerology"), href: "/relationship-numerology" as const },
      ],
    },
    {
      title: t("explore"),
      links: [
        { label: "Blog", href: "/blog" as const },
        { label: "Compatibility Guide", href: "/compatibility" as const },
        { label: t("zodiacGuide"), href: "/zodiac-love" as const },
        { label: t("risingSign"), href: "/rising-sign-compatibility" as const },
        { label: t("exCompat"), href: "/ex-compatibility" as const },
        { label: "Love Language", href: "/love-language-calculator" as const },
        { label: "Relationship Patterns", href: "/relationship-pattern-analyzer" as const },
        { label: "Relationship Forecast", href: "/relationship-forecast" as const },
        { label: "Composite Chart", href: "/composite-chart" as const },
        { label: "Kundli Matching", href: "/kundli-matching" as const },
        { label: "Synastry Chart", href: "/synastry-chart" as const },
        { label: "Moon Phase Soulmate", href: "/moon-phase-soulmate" as const },
        { label: "Mars Sign Compatibility", href: "/mars-sign-compatibility" as const },
        { label: "Venus–Mars Attraction", href: "/venus-mars-attraction" as const },
        { label: "Weton Jodoh", href: "/weton-jodoh" as const },
      ],
    },
    {
      title: "Guides",
      links: [
        { label: "Zodiac Compatibility Guide", href: "/guides/zodiac-compatibility-guide" as never },
        { label: "Venus in Signs Guide", href: "/guides/venus-in-signs-guide" as never },
        { label: "Synastry Explained", href: "/guides/synastry-explained" as never },
        { label: "Moon Signs & Emotions", href: "/guides/moon-signs-emotional-needs" as never },
        { label: "Marriage Astrology", href: "/guides/marriage-astrology-guide" as never },
        { label: "All Guides →", href: "/guides" as never },
      ],
    },
  ];

  return (
    <footer className="bg-cosmic-gradient text-[var(--moonlight-cream)] mt-auto bg-stars relative overflow-hidden">
      {/* Pink nebula atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[80px]"
          style={{ background: "var(--cosmic-rose)", bottom: "-20%", left: "20%" }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-[0.04] blur-[60px]"
          style={{ background: "var(--blush-pink)", top: "10%", right: "15%" }}
        />
      </div>
      <Container size="wide" className="py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-1">
            <Logo variant="horizontal" theme="gold" size="sm" showTagline />
            <p className="mt-5 text-sm text-[var(--neutral-400)] leading-[1.7] max-w-xs">
              {t("description")}
            </p>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--cosmic-rose)] mb-5">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--neutral-400)] hover:text-[var(--blush-pink)] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[var(--crimson-love)]/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[var(--neutral-400)]">
              {t("copyright")}
            </p>
            <div className="flex items-center gap-6">
              <Link href="/about" className="text-xs text-[var(--neutral-400)] hover:text-[var(--blush-pink)] transition-colors">
                About
              </Link>
              <Link href="/privacy" className="text-xs text-[var(--neutral-400)] hover:text-[var(--blush-pink)] transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-xs text-[var(--neutral-400)] hover:text-[var(--blush-pink)] transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-xs text-[var(--neutral-400)] hover:text-[var(--blush-pink)] transition-colors">
                Contact
              </Link>
            </div>
            <p
              className="text-xs text-[var(--neutral-400)] italic"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("tagline")}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
