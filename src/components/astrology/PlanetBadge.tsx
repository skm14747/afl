import React from "react";
import { cn } from "@/lib/utils";

interface PlanetBadgeProps {
  name: string;
  symbol: string;
  meaning: string;
  influence?: string;
  className?: string;
}

export function PlanetBadge({ name, symbol, meaning, influence, className }: PlanetBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 p-4 rounded-[var(--radius-lg)]",
        "bg-[var(--color-surface)] border border-[var(--color-border-subtle)]",
        className
      )}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-muted)] flex items-center justify-center text-lg">
        <span role="img" aria-hidden="true">{symbol}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-sm">{name}</span>
          <span className="text-xs text-[var(--champagne-gold)] uppercase tracking-wider">{meaning}</span>
        </div>
        {influence && (
          <p className="text-sm text-[var(--color-muted-fg)] mt-1 leading-relaxed">{influence}</p>
        )}
      </div>
    </div>
  );
}
