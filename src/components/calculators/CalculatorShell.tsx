"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/layout/Footer";
import { Sparkles, ChevronRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { CosmicHeartBackground } from "@/components/cosmic/CosmicHeartBackground";

const SITE = "https://astrologyforlove.com";

interface CalculatorShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function CalculatorShell({
  children,
  title,
  subtitle,
  description,
  icon,
}: CalculatorShellProps) {
  const pathname = usePathname();
  const pageUrl = `${SITE}${pathname}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: title,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: title,
      url: pageUrl,
      applicationCategory: "LifestyleApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      ...(description ? { description } : {}),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainHeader />
      <main className="flex-1 pt-[60px]">
        {/* Hero header */}
        <div className="bg-immersive text-[var(--moonlight-cream)] py-16 md:py-24 relative overflow-hidden">
          <CosmicHeartBackground intensity="quiet" heart="corner" />
          <Container size="standard" className="relative">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 text-xs text-[var(--neutral-400)] mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[var(--cosmic-rose)] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[var(--cosmic-rose)]">{title}</span>
            </nav>

            <div className="text-center">
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 rounded-full glass-dark flex items-center justify-center border border-[var(--cosmic-rose)]/15">
                  {icon || <Sparkles className="w-6 h-6 text-[var(--cosmic-rose)]" />}
                </div>
              </div>
              {subtitle && (
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--cosmic-rose)] font-semibold mb-3 block">
                  {subtitle}
                </span>
              )}
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
                {title}
              </h1>
              {description && (
                <p className="text-[var(--neutral-300)] max-w-2xl mx-auto leading-[1.7] text-[0.95rem]">
                  {description}
                </p>
              )}
            </div>
          </Container>
        </div>

        {/* Content */}
        <Container size="standard" className="py-12 md:py-16">
          {children}
        </Container>
      </main>
      <Footer />
    </>
  );
}
