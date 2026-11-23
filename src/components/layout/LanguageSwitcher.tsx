"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { isPublishedLocale, locales, localeNames, type Locale } from "@/i18n/locales";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const publishedLocales = locales.filter((loc) => isPublishedLocale(loc));
  if (publishedLocales.length < 2) return null;

  const handleSwitch = (newLocale: Locale) => {
    setOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[var(--color-border-subtle)] rounded-[var(--radius-full)] hover:bg-[var(--color-muted)] hover:border-[var(--champagne-gold)]/40 transition-all duration-200 cursor-pointer"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Switch language"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{localeNames[locale]}</span>
      </button>

      {open && (
        <div
          className="absolute end-0 top-full mt-2 z-50 w-52 bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] py-2 overflow-hidden"
          role="listbox"
          aria-label="Available languages"
        >
          {publishedLocales.map((loc) => (
            <button
              key={loc}
              role="option"
              aria-selected={loc === locale}
              onClick={() => handleSwitch(loc)}
              className={cn(
                "w-full text-start px-4 py-2.5 text-sm transition-all duration-150 cursor-pointer",
                loc === locale
                  ? "bg-[var(--color-muted)] text-[var(--champagne-gold)] font-semibold"
                  : "text-[var(--color-fg)] hover:bg-[var(--color-muted)] hover:text-[var(--champagne-gold)] hover:ps-5"
              )}
            >
              {localeNames[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
