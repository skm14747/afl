"use client";

import React, { useEffect, useRef, useCallback } from "react";

/*
 * Love Sparkle Particle System
 * ─────────────────────────────
 * Full-viewport canvas overlay that paints four romantic particle types:
 *   ✦ Sparkle pins — four-pointed stars that pulse and drift
 *   ♥ Micro-hearts — tiny hearts that float upward
 *   ● Soft orbs    — glowing dots that breathe in and out
 *   ✧ Glint motes  — fast, tiny crosses that flash and vanish
 *
 * Palette draws from the brand tokens: champagne-gold, romantic-rose,
 * lavender-mist, and ivory with low opacity for subtlety.
 * Respects prefers-reduced-motion by not rendering.
 */

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  maxOpacity: number;
  speed: number;
  drift: number;
  phase: number;
  phaseSpeed: number;
  type: "sparkle" | "heart" | "orb" | "glint";
  color: string;
  life: number;
  maxLife: number;
  rotation: number;
  rotationSpeed: number;
}

const LOVE_PALETTE = [
  "216, 175, 121", // champagne-gold
  "217, 155, 166", // romantic-rose
  "185, 169, 201", // lavender-mist
  "237, 191, 200", // rose-200
  "227, 192, 138", // gold-300
  "243, 234, 221", // ivory / warm white
  "255, 182, 193", // soft pink
];

const PARTICLE_COUNT = 42;
const GLINT_COUNT = 12;

function createParticle(
  canvasW: number,
  canvasH: number,
  forceType?: Particle["type"]
): Particle {
  const type =
    forceType ||
    (["sparkle", "sparkle", "heart", "orb", "orb", "glint"] as const)[
      Math.floor(Math.random() * 6)
    ];

  const color = LOVE_PALETTE[Math.floor(Math.random() * LOVE_PALETTE.length)];

  const base = {
    x: Math.random() * canvasW,
    y: Math.random() * canvasH,
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: 0.008 + Math.random() * 0.015,
    color,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.01,
  };

  switch (type) {
    case "sparkle":
      return {
        ...base,
        type,
        size: 1.5 + Math.random() * 3,
        opacity: 0,
        maxOpacity: 0.25 + Math.random() * 0.4,
        speed: 0.08 + Math.random() * 0.15,
        drift: (Math.random() - 0.5) * 0.3,
        life: 0,
        maxLife: 300 + Math.random() * 500,
      };
    case "heart":
      return {
        ...base,
        type,
        color: LOVE_PALETTE[Math.floor(Math.random() * 3) === 0 ? 1 : Math.floor(Math.random() * 2) + 1],
        size: 2 + Math.random() * 3.5,
        opacity: 0,
        maxOpacity: 0.15 + Math.random() * 0.3,
        speed: 0.12 + Math.random() * 0.2,
        drift: (Math.random() - 0.5) * 0.5,
        life: 0,
        maxLife: 350 + Math.random() * 400,
      };
    case "orb":
      return {
        ...base,
        type,
        size: 1 + Math.random() * 2,
        opacity: 0,
        maxOpacity: 0.12 + Math.random() * 0.25,
        speed: 0.03 + Math.random() * 0.08,
        drift: (Math.random() - 0.5) * 0.2,
        life: 0,
        maxLife: 500 + Math.random() * 600,
      };
    case "glint":
      return {
        ...base,
        type,
        size: 0.8 + Math.random() * 1.5,
        opacity: 0,
        maxOpacity: 0.5 + Math.random() * 0.5,
        speed: 0.02 + Math.random() * 0.05,
        drift: (Math.random() - 0.5) * 0.1,
        life: 0,
        maxLife: 80 + Math.random() * 120,
      };
  }
}

function drawSparkleStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  // Four-pointed star with elongated spikes
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const outerX = Math.cos(angle) * size;
    const outerY = Math.sin(angle) * size;
    const innerAngle = angle + Math.PI / 4;
    const innerX = Math.cos(innerAngle) * size * 0.25;
    const innerY = Math.sin(innerAngle) * size * 0.25;

    if (i === 0) ctx.moveTo(outerX, outerY);
    else ctx.lineTo(outerX, outerY);
    ctx.lineTo(innerX, innerY);
  }
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawHeart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  const s = size * 0.55;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.4);
  ctx.bezierCurveTo(-s, -s * 0.3, -s * 0.5, -s, 0, -s * 0.4);
  ctx.bezierCurveTo(s * 0.5, -s, s, -s * 0.3, 0, s * 0.4);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawGlint(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  // Tiny cross / plus sign
  const arm = size * 1.5;
  const thick = size * 0.3;
  ctx.beginPath();
  ctx.rect(-thick / 2, -arm, thick, arm * 2);
  ctx.rect(-arm, -thick / 2, arm * 2, thick);
  ctx.fill();

  ctx.restore();
}

export function LoveSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const resizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(w, h));
    }
    for (let i = 0; i < GLINT_COUNT; i++) {
      particles.push(createParticle(w, h, "glint"));
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = document.documentElement.scrollHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      resizeRef.current = { w, h };
      return { w, h };
    };

    const { w, h } = setSize();
    initParticles(w, h);

    const resizeObserver = new ResizeObserver(() => {
      const { w: newW, h: newH } = setSize();
      // Re-scatter any out-of-bounds particles
      for (const p of particlesRef.current) {
        if (p.x > newW) p.x = Math.random() * newW;
        if (p.y > newH) p.y = Math.random() * newH;
      }
    });
    resizeObserver.observe(document.documentElement);

    const animate = () => {
      const { w: cW, h: cH } = resizeRef.current;
      ctx.clearRect(0, 0, cW, cH);

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];

        // Advance life
        p.life++;
        p.phase += p.phaseSpeed;
        p.rotation += p.rotationSpeed;

        // Fade in → sustain → fade out
        const fadeIn = Math.min(p.life / 60, 1);
        const fadeOut = Math.max((p.maxLife - p.life) / 60, 0);
        const breathe = 0.7 + 0.3 * Math.sin(p.phase);
        p.opacity = p.maxOpacity * Math.min(fadeIn, fadeOut) * breathe;

        // Movement — gentle float upward with horizontal drift
        p.y -= p.speed;
        p.x += p.drift + Math.sin(p.phase * 0.7) * 0.15;

        // Recycle dead or off-screen particles
        if (p.life >= p.maxLife || p.y < -20 || p.x < -20 || p.x > cW + 20) {
          particlesRef.current[i] = createParticle(cW, cH, p.type);
          particlesRef.current[i].y = cH + Math.random() * 40;
          continue;
        }

        if (p.opacity <= 0.01) continue;

        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;

        switch (p.type) {
          case "sparkle":
            // Glow halo
            ctx.shadowColor = `rgba(${p.color}, ${p.opacity * 0.5})`;
            ctx.shadowBlur = p.size * 3;
            drawSparkleStar(ctx, p.x, p.y, p.size, p.rotation);
            ctx.shadowBlur = 0;
            break;

          case "heart":
            ctx.shadowColor = `rgba(${p.color}, ${p.opacity * 0.4})`;
            ctx.shadowBlur = p.size * 2;
            drawHeart(ctx, p.x, p.y, p.size, p.rotation);
            ctx.shadowBlur = 0;
            break;

          case "orb":
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.shadowColor = `rgba(${p.color}, ${p.opacity * 0.6})`;
            ctx.shadowBlur = p.size * 4;
            ctx.fill();
            ctx.shadowBlur = 0;
            break;

          case "glint":
            drawGlint(ctx, p.x, p.y, p.size, p.rotation);
            break;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
