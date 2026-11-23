"use client";

import React from "react";
import { Logo } from "@/components/branding/Logo";
import { Container } from "./Container";

const footerLinks = [
  {
    title: "Astrology Tools",
    links: [
      { label: "Love Compatibility", href: "/love-compatibility" },
      { label: "Venus Sign Calculator", href: "/venus-sign-calculator" },
      { label: "Moon Sign Compatibility", href: "/moon-sign-compatibility" },
      { label: "Soulmate Calculator", href: "/soulmate-calculator" },
    ],
  },
  {
    title: "More Tools",
    links: [
      { label: "Marriage Compatibility", href: "/marriage-compatibility" },
      { label: "Birth Chart Compatibility", href: "/birth-chart-compatibility" },
      { label: "Twin Flame Calculator", href: "/twin-flame-calculator" },
      { label: "Relationship Numerology", href: "/relationship-numerology" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Zodiac Love Guide", href: "/zodiac-love" },
      { label: "Rising Sign Compatibility", href: "/rising-sign-compatibility" },
      { label: "Ex-Compatibility", href: "/ex-compatibility" },
      { label: "Design System", href: "/design-system" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--cosmic-navy)] text-[var(--ivory)] mt-auto">
      <Container size="wide" className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Logo variant="horizontal" theme="gold" size="sm" showTagline />
            <p className="mt-4 text-sm text-[var(--neutral-400)] leading-relaxed max-w-xs">
              Discover your cosmic love story through the wisdom of the stars.
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
                    <a
                      href={link.href}
                      className="text-sm text-[var(--neutral-400)] hover:text-[var(--ivory)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-[var(--primary-600)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--neutral-500)]">
            © 2026 AstrologyForLove. All rights reserved.
          </p>
          <p className="text-xs text-[var(--neutral-500)] italic" style={{ fontFamily: "var(--font-display)" }}>
            Written in the Stars. Felt in the Heart.
          </p>
        </div>
      </Container>
    </footer>
  );
}
