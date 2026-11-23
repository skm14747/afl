"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/layout/Footer";
import { Sparkles, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

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
  return (
    <>
      <MainHeader />
      <main className="flex-1 pt-[60px]">
        {/* Hero header */}
        <div className="bg-immersive text-[var(--ivory)] py-16 md:py-24 bg-stars relative overflow-hidden">
          {/* Atmospheric glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[80px]"
              style={{ background: "var(--champagne-gold)", top: "-20%", left: "20%" }}
            />
            <div
              className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[60px]"
              style={{ background: "var(--romantic-rose)", bottom: "-15%", right: "15%" }}
            />
            <div
              className="absolute w-[250px] h-[250px] rounded-full opacity-[0.03] blur-[50px]"
              style={{ background: "var(--lavender-mist)", top: "50%", left: "50%" }}
            />
          </div>
          <Container size="standard" className="relative">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 text-xs text-[var(--neutral-400)] mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[var(--champagne-gold)] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[var(--champagne-gold)]">{title}</span>
            </nav>

            <div className="text-center">
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 rounded-full glass-dark flex items-center justify-center border border-[var(--ivory)]/10">
                  {icon || <Sparkles className="w-6 h-6 text-[var(--champagne-gold)]" />}
                </div>
              </div>
              {subtitle && (
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--champagne-gold)] font-semibold mb-3 block">
                  {subtitle}
                </span>
              )}
              <h1
                className="text-[var(--ivory)] mb-4"
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
