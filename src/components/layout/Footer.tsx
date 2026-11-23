"use client";

import React from "react";
import { Logo } from "@/components/branding/Logo";
import { Container } from "./Container";

const footerLinks = [
  {
    title: "Astrology",
    links: [
      { label: "Love Compatibility", href: "/compatibility" },
      { label: "Daily Horoscope", href: "/horoscope" },
      { label: "Soulmate Finder", href: "/soulmate" },
      { label: "Venus Sign", href: "/venus-sign" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Birth Chart", href: "/tools/birth-chart" },
      { label: "Synastry Chart", href: "/tools/synastry" },
      { label: "Moon Sign", href: "/tools/moon-sign" },
      { label: "Compatibility", href: "/tools/compatibility" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
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
