"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/branding/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "./Container";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const defaultNav: NavItem[] = [
  { label: "Compatibility", href: "/love-compatibility" },
  { label: "Venus Sign", href: "/venus-sign-calculator" },
  { label: "Soulmate", href: "/soulmate-calculator" },
  {
    label: "More Tools",
    href: "/zodiac-love",
    children: [
      { label: "Moon Compatibility", href: "/moon-sign-compatibility" },
      { label: "Marriage", href: "/marriage-compatibility" },
      { label: "Birth Chart", href: "/birth-chart-compatibility" },
      { label: "Twin Flame", href: "/twin-flame-calculator" },
      { label: "Numerology", href: "/relationship-numerology" },
      { label: "Rising Sign", href: "/rising-sign-compatibility" },
      { label: "Ex-Compatibility", href: "/ex-compatibility" },
    ],
  },
  { label: "Zodiac Guide", href: "/zodiac-love" },
];

interface MainHeaderProps {
  nav?: NavItem[];
  className?: string;
}

export function MainHeader({ nav = defaultNav, className }: MainHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur-md border-b border-[var(--color-border-subtle)]",
        className
      )}
    >
      <Container size="wide">
        <div className="flex items-center justify-between h-16">
          <Logo variant="horizontal" theme="light" size="sm" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-[var(--color-fg)] hover:text-[var(--champagne-gold)] transition-colors rounded-[var(--radius-md)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button variant="secondary" size="sm">Get Reading</Button>
          </div>

          {/* Mobile toggle */}
          <Button
            variant="icon"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </Container>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)]">
          <Container>
            <nav className="flex flex-col py-4 gap-1" aria-label="Mobile navigation">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2.5 text-sm text-[var(--color-fg)] hover:text-[var(--champagne-gold)] hover:bg-[var(--color-muted)] rounded-[var(--radius-md)] transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-[var(--color-border-subtle)]">
                <Button variant="ghost" size="sm">Sign In</Button>
                <Button variant="secondary" size="sm">Get Reading</Button>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
