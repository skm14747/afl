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
        { label: t("zodiacGuide"), href: "/zodiac-love" as const },
        { label: t("risingSign"), href: "/rising-sign-compatibility" as const },
        { label: t("exCompat"), href: "/ex-compatibility" as const },
      ],
    },
  ];

  return (
    <footer className="bg-[var(--cosmic-navy)] text-[var(--ivory)] mt-auto">
      <Container size="wide" className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Logo variant="horizontal" theme="gold" size="sm" showTagline />
            <p className="mt-4 text-sm text-[var(--neutral-400)] leading-relaxed max-w-xs">
              {t("description")}
            </p>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--champagne-gold)] mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--neutral-400)] hover:text-[var(--ivory)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-[var(--primary-600)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--neutral-500)]">
            {t("copyright")}
          </p>
          <p className="text-xs text-[var(--neutral-500)] italic" style={{ fontFamily: "var(--font-display)" }}>
            {t("tagline")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
