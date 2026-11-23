"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Link } from "@/i18n/navigation";
import { Star } from "lucide-react";

interface ResultsSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function ResultsSection({ title, children, className }: ResultsSectionProps) {
  return (
    <section className={cn("mt-10", className)}>
      {title && (
        <div className="divider-celestial mb-8">
          <Star className="w-4 h-4 text-[var(--cosmic-rose)]" />
        </div>
      )}
      {title && (
        <h2
          className="text-center mb-8"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h2)",
            lineHeight: "var(--leading-heading)",
            fontWeight: 600,
          }}
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

interface InsightBlockProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
  variant?: "default" | "gold" | "rose";
  className?: string;
}

export function InsightBlock({ title, content, icon, variant = "default", className }: InsightBlockProps) {
  const borderColor = {
    default: "border-[var(--color-border-subtle)]",
    gold: "border-[var(--rose-gold)]",
    rose: "border-[var(--cosmic-rose)]",
  }[variant];

  return (
    <Card variant="default" className={cn(borderColor, className)}>
      <div className="flex items-start gap-3">
        {icon && <div className="text-[var(--cosmic-rose)] mt-0.5 flex-shrink-0">{icon}</div>}
        <div>
          <h3
            className="font-semibold mb-2"
            style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)" }}
          >
            {title}
          </h3>
          <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed">{content}</p>
        </div>
      </div>
    </Card>
  );
}

interface ScoreSummaryProps {
  scores: { label: string; value: number }[];
  className?: string;
}

export function ScoreSummary({ scores, className }: ScoreSummaryProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-4", className)}>
      {scores.map((s) => {
        const color =
          s.value >= 80
            ? "var(--crimson-love)"
            : s.value >= 60
              ? "var(--cosmic-rose)"
              : s.value >= 40
                ? "var(--rose-gold)"
                : "var(--neutral-400)";

        return (
          <div
            key={s.label}
            className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-[var(--radius-lg)] p-4 text-center"
          >
            <div
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: "var(--font-display)", color }}
            >
              {s.value}%
            </div>
            <div className="text-xs text-[var(--color-muted-fg)]">{s.label}</div>
          </div>
        );
      })}
    </div>
  );
}

interface RelatedToolsProps {
  tools: { title: string; description: string; href: string }[];
  className?: string;
}

export function RelatedTools({ tools, className }: RelatedToolsProps) {
  return (
    <section className={cn("mt-12 pt-10 border-t border-[var(--color-border-subtle)]", className)}>
      <h3
        className="text-center mb-6"
        style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
      >
        Explore More Tools
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href as any}
            className="block p-5 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] hover:border-[var(--cosmic-rose)]/40 hover:shadow-[var(--shadow-md)] transition-all group"
          >
            <h4 className="font-medium mb-1 group-hover:text-[var(--crimson-love)] transition-colors">
              {tool.title}
            </h4>
            <p className="text-sm text-[var(--color-muted-fg)]">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

interface FAQSectionProps {
  items: { question: string; answer: string }[];
  className?: string;
}

export function FAQSection({ items, className }: FAQSectionProps) {
  return (
    <section className={cn("mt-12 pt-10 border-t border-[var(--color-border-subtle)]", className)}>
      <h3
        className="text-center mb-8"
        style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
      >
        Frequently Asked Questions
      </h3>
      <div className="max-w-2xl mx-auto space-y-6">
        {items.map((item, i) => (
          <div key={i}>
            <h4 className="font-medium mb-2 text-sm">{item.question}</h4>
            <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

interface ShareResultProps {
  title: string;
  text: string;
  className?: string;
}

export function ShareResult({ title, text, className }: ShareResultProps) {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, text, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(`${title}\n${text}\n${window.location.href}`);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className={cn("flex justify-center mt-6", className)}>
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--champagne-gold)] border border-[var(--gold-200)] rounded-[var(--radius-full)] hover:bg-[var(--gold-50)] transition-colors cursor-pointer"
      >
        <span>✦</span> Share Your Results
      </button>
    </div>
  );
}
