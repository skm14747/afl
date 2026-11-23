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
        <div className="bg-[var(--cosmic-navy)] text-[var(--ivory)] py-12 md:py-16 bg-stars relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, var(--champagne-gold), transparent 60%)",
            }}
          />
          <Container size="standard" className="relative text-center">
            <div className="flex justify-center mb-4">
              {icon || <Sparkles className="w-8 h-8 text-[var(--champagne-gold)]" />}
            </div>
            {subtitle && (
              <span className="text-xs uppercase tracking-[0.15em] text-[var(--champagne-gold)] mb-2 block">
                {subtitle}
              </span>
            )}
            <h1
              className="text-[var(--ivory)] mb-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h1)",
                lineHeight: "var(--leading-heading)",
                fontWeight: 600,
              }}
            >
              {title}
            </h1>
            {description && (
              <p className="text-[var(--neutral-300)] max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            )}
          </Container>
        </div>

        {/* Content */}
        <Container size="standard" className="py-10 md:py-14">
          {children}
        </Container>
      </main>
      <Footer />
    </>
  );
}
