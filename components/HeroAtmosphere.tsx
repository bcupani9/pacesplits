"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative dusk-track gradient panel for the Cinderpath hero: glowing
 * lane arcs sweeping in from the corner, on a night-to-cinder sky gradient.
 * Canvas keeps this cheap to redraw on resize versus hand-built SVG paths.
 */
export default function HeroAtmosphere({ caption }: { caption?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);

      const glowY = h * 0.62;
      const glow = ctx.createRadialGradient(
        w * 0.72,
        glowY,
        0,
        w * 0.72,
        glowY,
        w * 0.5
      );
      glow.addColorStop(0, "rgba(231,169,58,0.55)");
      glow.addColorStop(1, "rgba(231,169,58,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      const cx = w * 0.18;
      const cy = h * 1.15;
      const baseR = h * 0.62;
      for (let i = 0; i < 7; i++) {
        const r = baseR + i * (h * 0.085);
        const alpha = 0.5 - i * 0.06;
        ctx.beginPath();
        ctx.arc(cx, cy, r, -0.75, 0.15);
        ctx.strokeStyle =
          i % 3 === 0
            ? `rgba(231,169,58,${Math.max(alpha, 0.06)})`
            : `rgba(246,239,225,${Math.max(alpha * 0.4, 0.04)})`;
        ctx.lineWidth = i === 0 ? 3 : 1.4;
        ctx.stroke();
      }

      for (let i = 0; i < 70; i++) {
        const x = (i * 137.5) % w;
        const y = (i * 71.3) % (h * 0.4);
        ctx.fillStyle = `rgba(246,239,225,${0.15 + (i % 5) * 0.05})`;
        ctx.fillRect(x, y, 1.4, 1.4);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(rect.width, rect.height);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative min-h-[320px] flex-1 overflow-hidden rounded-[22px]"
      style={{
        background:
          "linear-gradient(180deg, var(--cp-dusk-top) 0%, var(--cp-dusk-mid) 46%, var(--cp-cinder) 78%, var(--cp-lane) 100%)",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {caption && (
        <p
          className="absolute bottom-5 left-6 z-[1] text-[12px] font-bold uppercase tracking-[0.12em]"
          style={{ color: "var(--cp-bone)" }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}
