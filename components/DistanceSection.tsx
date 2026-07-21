"use client";

import Link from "next/link";
import { useState } from "react";
import type { Combo, Distance } from "@/lib/combos";
import { getDistanceTheme } from "@/lib/distance-theme";

interface DistanceSectionProps {
  distance: Distance;
  featuredCombos: Combo[];
  allCombos: Combo[];
  hubHref?: string;
}

export default function DistanceSection({
  distance,
  featuredCombos,
  allCombos,
  hubHref,
}: DistanceSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const theme = getDistanceTheme(distance.id);
  const visibleCombos = expanded ? allCombos : featuredCombos;
  const remainingCount = allCombos.length - featuredCombos.length;

  return (
    <section
      className="card-dark card-accent-top p-4 pt-5 sm:p-5 sm:pt-6"
      style={
        {
          "--distance-gradient": theme.gradient,
          "--distance-color": theme.color,
        } as React.CSSProperties
      }
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <h2
            className="text-[20px] font-semibold"
            style={{ color: theme.color }}
          >
            {distance.name}
          </h2>
          <p className="mt-0.5 text-[13px]" style={{ color: "var(--cp-graphite)" }}>
            {distance.distanceKm} km · {allCombos.length} goal times
          </p>
        </div>
        {hubHref && (
          <Link
            href={hubHref}
            className="focus-ring-dark group text-[13px] font-medium transition-colors duration-150"
            style={{ color: "var(--cp-graphite)" }}
          >
            Pace chart{" "}
            <span className="arrow-shift" aria-hidden="true">
              →
            </span>
          </Link>
        )}
      </div>

      <ul
        className={
          expanded
            ? "flex flex-wrap gap-2"
            : "grid grid-cols-2 gap-2 sm:grid-cols-4"
        }
      >
        {visibleCombos.map((combo) => (
          <li key={combo.slug}>
            {expanded ? (
              <Link
                href={`/pace-calculator/${combo.slug}`}
                className="chip-plain focus-ring-dark px-3.5 py-1.5 text-[13px] font-medium sm:text-[14px]"
              >
                {combo.goalLabel}
              </Link>
            ) : (
              <Link
                href={`/pace-calculator/${combo.slug}`}
                className="chip-gradient-wrap focus-ring-dark"
              >
                <span className="chip-gradient-inner px-3.5 py-1.5 text-[13px] sm:text-[14px]">
                  {combo.goalLabel}
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>

      {remainingCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="focus-ring-dark group mt-4 text-[14px] font-medium transition-colors duration-150 ease-in-out"
          style={{ color: theme.color }}
        >
          {expanded ? (
            "Show fewer goal times"
          ) : (
            <>
              See all {allCombos.length} goal times{" "}
              <span className="arrow-shift" aria-hidden="true">
                →
              </span>
            </>
          )}
        </button>
      )}
    </section>
  );
}
