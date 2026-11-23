"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CelestialArtworkProps {
  variant?: "hero" | "compact";
  className?: string;
}

export function CelestialArtwork({ variant = "hero", className }: CelestialArtworkProps) {
  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        "relative select-none pointer-events-none",
        isHero ? "w-full h-full min-h-[400px]" : "w-full h-full min-h-[300px]",
        className
      )}
      aria-hidden="true"
    >
      {/* Outer orbital ring */}
      <div
        className="absolute rounded-full border animate-orbit"
        style={{
          width: isHero ? "85%" : "75%",
          height: isHero ? "85%" : "75%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderColor: "rgba(216, 175, 121, 0.12)",
          borderWidth: "1px",
          animationDuration: "60s",
        }}
      />

      {/* Inner orbital ring */}
      <div
        className="absolute rounded-full border"
        style={{
          width: isHero ? "55%" : "50%",
          height: isHero ? "55%" : "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderColor: "rgba(185, 169, 201, 0.1)",
          borderWidth: "1px",
        }}
      />

      {/* Third ring - elliptical */}
      <div
        className="absolute rounded-full border"
        style={{
          width: isHero ? "70%" : "62%",
          height: isHero ? "40%" : "35%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-15deg)",
          borderColor: "rgba(216, 175, 121, 0.08)",
          borderWidth: "1px",
        }}
      />

      {/* Primary star (gold) */}
      <div
        className="absolute animate-glow"
        style={{
          width: isHero ? "14px" : "10px",
          height: isHero ? "14px" : "10px",
          top: "42%",
          left: "45%",
          borderRadius: "50%",
          background: "var(--champagne-gold)",
          boxShadow: "0 0 20px rgba(216,175,121,0.5), 0 0 40px rgba(216,175,121,0.2)",
        }}
      />

      {/* Secondary star (rose) */}
      <div
        className="absolute animate-glow"
        style={{
          width: isHero ? "10px" : "8px",
          height: isHero ? "10px" : "8px",
          top: "55%",
          left: "58%",
          borderRadius: "50%",
          background: "var(--romantic-rose)",
          boxShadow: "0 0 16px rgba(217,155,166,0.5), 0 0 32px rgba(217,155,166,0.2)",
          animationDelay: "1.5s",
        }}
      />

      {/* Connection line between stars */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <line
          x1="46" y1="43" x2="59" y2="56"
          stroke="rgba(216,175,121,0.15)"
          strokeWidth="0.3"
          strokeDasharray="2,2"
        />
        {/* Constellation dots */}
        <circle cx="30" cy="25" r="0.6" fill="rgba(185,169,201,0.3)" />
        <circle cx="72" cy="30" r="0.5" fill="rgba(216,175,121,0.25)" />
        <circle cx="25" cy="65" r="0.4" fill="rgba(216,175,121,0.2)" />
        <circle cx="78" cy="70" r="0.5" fill="rgba(185,169,201,0.25)" />
        <circle cx="50" cy="20" r="0.4" fill="rgba(217,155,166,0.2)" />
        <circle cx="40" cy="80" r="0.3" fill="rgba(216,175,121,0.15)" />
        <circle cx="65" cy="85" r="0.4" fill="rgba(185,169,201,0.2)" />

        {/* Constellation lines */}
        <line x1="30" y1="25" x2="50" y2="20" stroke="rgba(185,169,201,0.08)" strokeWidth="0.2" />
        <line x1="50" y1="20" x2="72" y2="30" stroke="rgba(185,169,201,0.08)" strokeWidth="0.2" />
        <line x1="25" y1="65" x2="40" y2="80" stroke="rgba(216,175,121,0.06)" strokeWidth="0.2" />
        <line x1="65" y1="85" x2="78" y2="70" stroke="rgba(185,169,201,0.06)" strokeWidth="0.2" />
      </svg>

      {/* Atmospheric glow */}
      <div
        className="absolute rounded-full blur-[60px] opacity-[0.08]"
        style={{
          width: "50%",
          height: "50%",
          top: "30%",
          left: "30%",
          background: "var(--champagne-gold)",
        }}
      />
      <div
        className="absolute rounded-full blur-[40px] opacity-[0.06]"
        style={{
          width: "30%",
          height: "30%",
          top: "45%",
          left: "50%",
          background: "var(--romantic-rose)",
        }}
      />
    </div>
  );
}
