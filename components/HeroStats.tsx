"use client";

import { useEffect, useState } from "react";

export interface HeroStat {
  value: number | string;
  suffix?: string;
  label: string;
  badge?: boolean;
}

function CountUpValue({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const duration = 900;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <span className="relative inline-block">
      {/* invisible final value reserves width so neighbors don't shift,
          and is what screen readers announce */}
      <span className="opacity-0">
        {value}
        {suffix}
      </span>
      <span className="absolute inset-0" aria-hidden="true">
        {display}
        {suffix}
      </span>
    </span>
  );
}

export default function HeroStats({ stats }: { stats: HeroStat[] }) {
  return (
    <dl className="mt-10 flex flex-wrap gap-8 sm:gap-12">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt className="sr-only">{stat.label}</dt>
          <dd
            className="text-[28px] font-semibold leading-none sm:text-[32px]"
            style={{ color: "var(--cp-ink)" }}
          >
            {typeof stat.value === "number" ? (
              stat.badge ? (
                <span className="headline-badge">
                  <CountUpValue value={stat.value} suffix={stat.suffix} />
                </span>
              ) : (
                <CountUpValue value={stat.value} suffix={stat.suffix} />
              )
            ) : (
              <span
                className="fade-in-soft inline-block"
                style={{ animationDelay: "250ms" }}
              >
                {stat.value}
              </span>
            )}
          </dd>
          <dd
            className="mt-1.5 text-[13px] font-medium uppercase tracking-[0.06em]"
            style={{ color: "var(--cp-graphite)" }}
          >
            {stat.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
