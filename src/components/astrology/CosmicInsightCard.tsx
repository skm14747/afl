import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Sparkles } from "lucide-react";

interface CosmicInsightCardProps {
  title: string;
  insight: string;
  details?: string;
  cta?: { label: string; href: string };
  icon?: React.ReactNode;
  className?: string;
}

export function CosmicInsightCard({
  title,
  insight,
  details,
  cta,
  icon,
  className,
}: CosmicInsightCardProps) {
  return (
    <Card variant="feature" padding="lg" className={cn("relative overflow-hidden", className)}>
      {/* Decorative glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--champagne-gold), transparent 70%)",
        }}
      />

      <div className="relative">
        <div className="text-[var(--champagne-gold)] mb-3">
          {icon || <Sparkles className="w-5 h-5" />}
        </div>

        <h3
          className="text-lg font-semibold mb-2"
          style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)" }}
        >
          {title}
        </h3>

        <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: "var(--font-display)" }}>
          {insight}
        </p>

        {details && (
          <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed mb-4">{details}</p>
        )}

        {cta && (
          <a
            href={cta.href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--champagne-gold)] hover:text-[var(--gold-600)] transition-colors"
          >
            {cta.label}
            <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </Card>
  );
}
