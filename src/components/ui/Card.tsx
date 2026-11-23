"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined" | "feature" | "cosmic";
  padding?: "sm" | "md" | "lg";
  hover?: boolean;
}

const variantStyles = {
  default: "bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border)]",
  elevated: "bg-[var(--color-surface-elevated)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]",
  outlined: "bg-transparent border border-[var(--color-border)] hover:border-[var(--gold-200)]",
  feature: "bg-[var(--color-surface-elevated)] border border-[var(--gold-200)] shadow-[var(--shadow-glow-gold)] hover:shadow-[0_0_30px_rgba(216,175,121,0.2)]",
  cosmic: "bg-[var(--cosmic-navy)] text-[var(--ivory)] border border-[var(--primary-500)]/50 shadow-[0_0_20px_rgba(23,21,45,0.3)]",
};

const paddingStyles = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  className,
  variant = "default",
  padding = "md",
  hover = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-xl)] transition-all duration-300",
        variantStyles[variant],
        paddingStyles[padding],
        hover && "hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 cursor-pointer sparkle-hover shimmer-gold",
        className
      )}
    >
      {children}
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <Card variant="elevated" hover className={className}>
      <div className="text-[var(--champagne-gold)] mb-4">{icon}</div>
      <h3
        className="text-lg font-semibold mb-2"
        style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)" }}
      >
        {title}
      </h3>
      <p className="text-[var(--color-muted-fg)] text-sm leading-relaxed">{description}</p>
    </Card>
  );
}

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export function ToolCard({ icon, title, description, className }: ToolCardProps) {
  return (
    <Card variant="outlined" hover className={cn("flex items-start gap-4", className)}>
      <div className="flex-shrink-0 w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-muted)] flex items-center justify-center text-[var(--champagne-gold)]">
        {icon}
      </div>
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-[var(--color-muted-fg)]">{description}</p>
      </div>
    </Card>
  );
}

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category?: string;
  date?: string;
  className?: string;
}

export function ArticleCard({ title, excerpt, category, date, className }: ArticleCardProps) {
  return (
    <Card variant="default" hover className={className}>
      {category && (
        <span className="text-xs uppercase tracking-widest text-[var(--champagne-gold)] font-medium">
          {category}
        </span>
      )}
      <h3
        className="mt-2 mb-3 font-semibold"
        style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)" }}
      >
        {title}
      </h3>
      <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed line-clamp-3">{excerpt}</p>
      {date && <span className="block mt-3 text-xs text-[var(--color-muted-fg)]">{date}</span>}
    </Card>
  );
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  className?: string;
}

export function TestimonialCard({ quote, author, role, className }: TestimonialCardProps) {
  return (
    <Card variant="elevated" padding="lg" className={className}>
      <blockquote
        className="text-lg italic mb-4 leading-relaxed"
        style={{ fontFamily: "var(--font-display)" }}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div>
        <div className="font-medium text-sm">{author}</div>
        {role && <div className="text-xs text-[var(--color-muted-fg)]">{role}</div>}
      </div>
    </Card>
  );
}

interface StatisticCardProps {
  value: string;
  label: string;
  className?: string;
}

export function StatisticCard({ value, label, className }: StatisticCardProps) {
  return (
    <div className={cn("text-center", className)}>
      <div
        className="text-gold-gradient mb-1"
        style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-display-2)", fontWeight: 700 }}
      >
        {value}
      </div>
      <div className="text-sm text-[var(--color-muted-fg)]">{label}</div>
    </div>
  );
}
