"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/layout/Footer";
import { CosmicSymbol } from "@/components/branding/CosmicSymbol";
import { Sparkles } from "lucide-react";

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
      <main className="flex-1">
        {/* Hero header */}
        <div className="bg-cosmic-gradient text-[var(--ivory)] py-14 md:py-20 bg-stars relative overflow-hidden">
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
          </div>
          <Container size="standard" className="relative text-center">
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 rounded-full glass-dark flex items-center justify-center border border-[var(--primary-500)]/30">
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
                fontWeight: 600,
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
