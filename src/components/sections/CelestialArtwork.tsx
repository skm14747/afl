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
      {/* Heart-shaped nebula glow — primary */}
      <div
        className="absolute animate-heart-glow"
        style={{
          width: isHero ? "60%" : "50%",
          height: isHero ? "60%" : "50%",
          top: "20%",
          left: "20%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(228,93,145,0.25) 0%, rgba(181,45,82,0.08) 50%, transparent 70%)",
        }}
      />
      {/* Secondary rose nebula */}
      <div
        className="absolute animate-nebula"
        style={{
          width: isHero ? "45%" : "35%",
          height: isHero ? "45%" : "35%",
          top: "30%",
          left: "35%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(242,169,196,0.18) 0%, rgba(221,165,160,0.06) 60%, transparent 80%)",
          animationDelay: "-8s",
        }}
      />

      {/* Outer orbital ring */}
      <div
        className="absolute rounded-full border animate-orbit"
        style={{
          width: isHero ? "85%" : "75%",
          height: isHero ? "85%" : "75%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderColor: "rgba(228, 93, 145, 0.12)",
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
          borderColor: "rgba(242, 169, 196, 0.1)",
          borderWidth: "1px",
        }}
      />

      {/* Elliptical ring */}
      <div
        className="absolute rounded-full border"
        style={{
          width: isHero ? "70%" : "62%",
          height: isHero ? "40%" : "35%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-15deg)",
          borderColor: "rgba(221, 165, 160, 0.08)",
          borderWidth: "1px",
        }}
      />

      {/* Primary star (crimson) */}
      <div
        className="absolute animate-glow"
        style={{
          width: isHero ? "14px" : "10px",
          height: isHero ? "14px" : "10px",
          top: "42%",
          left: "45%",
          borderRadius: "50%",
          background: "var(--cosmic-rose)",
          boxShadow: "0 0 20px rgba(228,93,145,0.6), 0 0 40px rgba(228,93,145,0.25)",
        }}
      />

      {/* Secondary star (blush) */}
      <div
        className="absolute animate-glow"
        style={{
          width: isHero ? "10px" : "8px",
          height: isHero ? "10px" : "8px",
          top: "55%",
          left: "58%",
          borderRadius: "50%",
          background: "var(--blush-pink)",
          boxShadow: "0 0 16px rgba(242,169,196,0.6), 0 0 32px rgba(242,169,196,0.25)",
          animationDelay: "1.5s",
        }}
      />

      {/* SVG constellations and connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Connection line between stars */}
        <line x1="46" y1="43" x2="59" y2="56" stroke="rgba(228,93,145,0.15)" strokeWidth="0.3" strokeDasharray="2,2" />

        {/* Constellation dots */}
        <circle cx="30" cy="25" r="0.6" fill="rgba(242,169,196,0.4)" />
        <circle cx="72" cy="30" r="0.5" fill="rgba(228,93,145,0.3)" />
        <circle cx="25" cy="65" r="0.4" fill="rgba(221,165,160,0.3)" />
        <circle cx="78" cy="70" r="0.5" fill="rgba(242,169,196,0.3)" />
        <circle cx="50" cy="20" r="0.4" fill="rgba(255,255,255,0.3)" />
        <circle cx="40" cy="80" r="0.3" fill="rgba(228,93,145,0.2)" />
        <circle cx="65" cy="85" r="0.4" fill="rgba(242,169,196,0.25)" />

        {/* Heart constellation lines */}
        <line x1="30" y1="25" x2="50" y2="20" stroke="rgba(228,93,145,0.08)" strokeWidth="0.2" />
        <line x1="50" y1="20" x2="72" y2="30" stroke="rgba(228,93,145,0.08)" strokeWidth="0.2" />
        <line x1="25" y1="65" x2="40" y2="80" stroke="rgba(221,165,160,0.06)" strokeWidth="0.2" />
        <line x1="65" y1="85" x2="78" y2="70" stroke="rgba(242,169,196,0.06)" strokeWidth="0.2" />
      </svg>
    </div>
  );
}
