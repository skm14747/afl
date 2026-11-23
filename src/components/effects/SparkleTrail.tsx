"use client";

import React, { useEffect, useRef, useCallback } from "react";

/*
 * Sparkle Trail — Mouse / Touch Interaction Layer
 * ─────────────────────────────────────────────────
 * Emits small love-themed sparkles wherever the user moves
 * or taps. Creates a magical trailing effect that feels intimate
 * and romantic — like leaving tiny love notes across the page.
 *
 * Automatically reduces to touch-only bursts on mobile.
 * Fully invisible when prefers-reduced-motion is set.
 */

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  shape: "star" | "heart" | "dot";
  rotation: number;
  rotationSpeed: number;
}

const TRAIL_COLORS = [
  "216, 175, 121",
  "217, 155, 166",
  "185, 169, 201",
  "255, 192, 203",
  "237, 212, 169",
];

function createTrailParticle(x: number, y: number): TrailParticle {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.3 + Math.random() * 1.2;
  const shapes: TrailParticle["shape"][] = ["star", "star", "heart", "dot", "dot"];

  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 0.5,
    size: 1.2 + Math.random() * 2.5,
    opacity: 0.4 + Math.random() * 0.4,
    color: TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)],
    life: 0,
    maxLife: 30 + Math.random() * 40,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.15,
  };
}

export function SparkleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<TrailParticle[]>([]);
  const rafRef = useRef<number>(0);
  const lastEmit = useRef(0);

  const emit = useCallback((clientX: number, clientY: number, count = 2) => {
    const now = Date.now();
    if (now - lastEmit.current < 30) return;
    lastEmit.current = now;

    for (let i = 0; i < count; i++) {
      const jitter = 8;
      particlesRef.current.push(
        createTrailParticle(
          clientX + (Math.random() - 0.5) * jitter,
          clientY + (Math.random() - 0.5) * jitter
        )
      );
    }

    // Cap at 80 to stay performant
    if (particlesRef.current.length > 80) {
      particlesRef.current = particlesRef.current.slice(-80);
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    const onResize = () => setSize();
    window.addEventListener("resize", onResize);

    const onMouseMove = (e: MouseEvent) => emit(e.clientX, e.clientY, 2);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) emit(t.clientX, t.clientY, 3);
    };
    const onClick = (e: MouseEvent) => emit(e.clientX, e.clientY, 6);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });

    const drawMiniStar = (x: number, y: number, s: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2;
        ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s);
        const ia = a + Math.PI / 4;
        ctx.lineTo(Math.cos(ia) * s * 0.3, Math.sin(ia) * s * 0.3);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawMiniHeart = (x: number, y: number, s: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      const h = s * 0.5;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.4);
      ctx.bezierCurveTo(-h, -h * 0.3, -h * 0.5, -h, 0, -h * 0.4);
      ctx.bezierCurveTo(h * 0.5, -h, h, -h * 0.3, 0, h * 0.4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        if (p.life > p.maxLife) return false;

        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.01; // gentle float up
        p.vx *= 0.98;
        p.rotation += p.rotationSpeed;

        const progress = p.life / p.maxLife;
        const alpha = p.opacity * (1 - progress * progress);
        const scale = 1 - progress * 0.3;

        if (alpha < 0.01) return false;

        ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
        ctx.shadowColor = `rgba(${p.color}, ${alpha * 0.5})`;
        ctx.shadowBlur = p.size * 2;

        switch (p.shape) {
          case "star":
            drawMiniStar(p.x, p.y, p.size * scale, p.rotation);
            break;
          case "heart":
            drawMiniHeart(p.x, p.y, p.size * scale, p.rotation);
            break;
          case "dot":
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * scale * 0.6, 0, Math.PI * 2);
            ctx.fill();
            break;
        }

        ctx.shadowBlur = 0;
        return true;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("click", onClick);
    };
  }, [emit]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  );
}
