"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-[var(--cosmic-navy)] text-white",
    "hover:bg-[var(--primary-700)]",
    "active:bg-[var(--primary-900)]",
    "disabled:bg-[var(--neutral-300)] disabled:text-[var(--neutral-500)]",
  ].join(" "),
  secondary: [
    "bg-[var(--champagne-gold)] text-[var(--cosmic-navy)]",
    "hover:bg-[var(--gold-500)]",
    "active:bg-[var(--gold-600)]",
    "disabled:bg-[var(--neutral-200)] disabled:text-[var(--neutral-500)]",
  ].join(" "),
  outline: [
    "border border-[var(--color-border)] bg-transparent text-[var(--color-fg)]",
    "hover:bg-[var(--color-muted)] hover:border-[var(--neutral-300)]",
    "active:bg-[var(--neutral-200)]",
    "disabled:border-[var(--neutral-200)] disabled:text-[var(--neutral-400)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-[var(--color-fg)]",
    "hover:bg-[var(--color-muted)]",
    "active:bg-[var(--neutral-200)]",
    "disabled:text-[var(--neutral-400)]",
  ].join(" "),
  icon: [
    "bg-transparent text-[var(--color-fg)]",
    "hover:bg-[var(--color-muted)]",
    "active:bg-[var(--neutral-200)]",
    "disabled:text-[var(--neutral-400)]",
    "!p-0 flex items-center justify-center",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3 text-base gap-2.5",
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const isIcon = variant === "icon";

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all",
        "rounded-[var(--radius-md)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]",
        "disabled:cursor-not-allowed disabled:opacity-70",
        "cursor-pointer sparkle-hover heart-click",
        variantStyles[variant],
        isIcon ? iconSizeStyles[size] : sizeStyles[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {!isIcon && children}
    </button>
  );
}
