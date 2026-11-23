import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Heart } from "lucide-react";

interface ScoreItem {
  label: string;
  score: number;
  description?: string;
}

interface RelationshipScoreCardProps {
  title: string;
  scores: ScoreItem[];
  className?: string;
}

export function RelationshipScoreCard({ title, scores, className }: RelationshipScoreCardProps) {
  return (
    <Card variant="elevated" padding="lg" className={className}>
      <div className="flex items-center gap-2 mb-6">
        <Heart className="w-4 h-4 text-[var(--romantic-rose)]" />
        <h3
          className="font-semibold"
          style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)" }}
        >
          {title}
        </h3>
      </div>

      <div className="space-y-5">
        {scores.map((item) => {
          const fillColor =
            item.score >= 80
              ? "var(--champagne-gold)"
              : item.score >= 60
                ? "var(--lavender-mist)"
                : item.score >= 40
                  ? "var(--romantic-rose)"
                  : "var(--neutral-400)";

          return (
            <div key={item.label}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium">{item.label}</span>
                <span
                  className="text-sm font-bold"
                  style={{ fontFamily: "var(--font-display)", color: fillColor }}
                >
                  {item.score}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[var(--color-muted)] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${item.score}%`,
                    backgroundColor: fillColor,
                    transition: `width var(--transition-slow)`,
                  }}
                />
              </div>
              {item.description && (
                <p className="text-xs text-[var(--color-muted-fg)] mt-1">{item.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
