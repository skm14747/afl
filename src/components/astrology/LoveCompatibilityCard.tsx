import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { ZodiacIcon } from "./ZodiacIcon";
import { StarRating } from "./StarRating";
import type { ZodiacSign } from "@/lib/astrology-data";
import { Heart } from "lucide-react";

interface LoveCompatibilityCardProps {
  sign1: ZodiacSign;
  sign2: ZodiacSign;
  rating: number;
  summary: string;
  highlights?: string[];
  className?: string;
}

export function LoveCompatibilityCard({
  sign1,
  sign2,
  rating,
  summary,
  highlights,
  className,
}: LoveCompatibilityCardProps) {
  return (
    <Card variant="feature" hover className={cn("relative overflow-hidden", className)}>
      {/* Top section with signs */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <ZodiacIcon sign={sign1} size="md" showElement />
        <Heart className="w-4 h-4 text-[var(--romantic-rose)]" />
        <ZodiacIcon sign={sign2} size="md" showElement />
      </div>

      <h3
        className="text-center font-semibold mb-1"
        style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)" }}
      >
        {sign1} & {sign2}
      </h3>

      <div className="flex justify-center mb-3">
        <StarRating rating={rating} size="sm" />
      </div>

      <p className="text-sm text-[var(--color-muted-fg)] text-center leading-relaxed mb-3">
        {summary}
      </p>

      {highlights && highlights.length > 0 && (
        <ul className="space-y-1">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-[var(--color-muted-fg)]">
              <span className="text-[var(--champagne-gold)] mt-0.5">✦</span>
              {h}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
