"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/branding/Logo";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Container } from "./Container";
import { Link } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";

interface MainHeaderProps {
  className?: string;
}

export function MainHeader({ className }: MainHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("nav");

  const navItems = [
    { label: t("compatibility"), href: "/love-compatibility" as const },
    { label: t("venuSign"), href: "/venus-sign-calculator" as const },
    { label: t("soulmate"), href: "/soulmate-calculator" as const },
    { label: t("zodiacGuide"), href: "/zodiac-love" as const },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur-md border-b border-[var(--color-border-subtle)]",
        className
      )}
    >
      <Container size="wide">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <Logo variant="horizontal" theme="light" size="sm" />
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-[var(--color-fg)] hover:text-[var(--champagne-gold)] transition-colors rounded-[var(--radius-md)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm">{t("signIn")}</Button>
            <Button variant="secondary" size="sm">{t("getReading")}</Button>
          </div>

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

      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)]">
          <Container>
            <nav className="flex flex-col py-4 gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2.5 text-sm text-[var(--color-fg)] hover:text-[var(--champagne-gold)] hover:bg-[var(--color-muted)] rounded-[var(--radius-md)] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-[var(--color-border-subtle)]">
                <LanguageSwitcher />
                <Button variant="ghost" size="sm">{t("signIn")}</Button>
                <Button variant="secondary" size="sm">{t("getReading")}</Button>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
