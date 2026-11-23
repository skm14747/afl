import React from "react";
import { cn } from "@/lib/utils";
import { ZODIAC_SYMBOLS, ZODIAC_ELEMENTS, ZODIAC_DATE_RANGES, type ZodiacSign } from "@/lib/astrology-data";

interface ZodiacBadgeProps {
  sign: ZodiacSign;
  showDates?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function ZodiacBadge({ sign, showDates = false, size = "md", className }: ZodiacBadgeProps) {
  const element = ZODIAC_ELEMENTS[sign];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-full)]",
        "bg-[var(--color-muted)] border border-[var(--color-border-subtle)]",
        size === "sm" ? "px-2.5 py-1" : "px-3.5 py-1.5",
        className
      )}
    >
      <span className={size === "sm" ? "text-sm" : "text-base"} role="img" aria-hidden="true">
        {ZODIAC_SYMBOLS[sign]}
      </span>
      <div className="flex flex-col">
        <span className={cn("font-medium", size === "sm" ? "text-xs" : "text-sm")}>{sign}</span>
        {showDates && (
          <span className="text-[10px] text-[var(--color-muted-fg)]">{ZODIAC_DATE_RANGES[sign]}</span>
        )}
      </div>
      <span
        className={cn(
          "text-[10px] uppercase tracking-wider text-[var(--color-muted-fg)]",
          size === "sm" && "hidden"
        )}
      >
        {element}
      </span>
    </div>
  );
}
