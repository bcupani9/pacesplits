"use client";

import { useMemo, useState } from "react";
import CTAWaitlist from "@/components/CTAWaitlist";
import PaceTable from "@/components/PaceTable";
import PacingToggle from "@/components/PacingToggle";
import type { Combo } from "@/lib/combos";
import type { DistanceTheme } from "@/lib/distance-theme";
import {
  calculatePace,
  formatPace,
  type PaceResult,
  type PacingStrategy,
} from "@/lib/vdot";

interface CalculatorClientProps {
  combo: Combo;
  initialPace: PaceResult;
  theme: DistanceTheme;
  contextParagraphs?: string[];
}

export default function CalculatorClient({
  combo,
  initialPace,
  theme,
  contextParagraphs,
}: CalculatorClientProps) {
  const [strategy, setStrategy] = useState<PacingStrategy>("even");
  const [negativeSplitPercent, setNegativeSplitPercent] = useState(4);

  const pace = useMemo(() => {
    if (strategy === "even") {
      return initialPace;
    }
    return calculatePace(
      combo.distance.distanceKm,
      combo.goalTimeSeconds,
      strategy,
      negativeSplitPercent
    );
  }, [
    strategy,
    negativeSplitPercent,
    combo.distance.distanceKm,
    combo.goalTimeSeconds,
    initialPace,
  ]);

  const pacePerMile = formatPace(pace.pacePerMileSeconds);
  const pacePerKm = formatPace(pace.pacePerKmSeconds);

  const startPace =
    pace.adjustedPaces && pace.adjustedPaces.length > 0
      ? formatPace(pace.adjustedPaces[0])
      : null;
  const finishPace =
    pace.adjustedPaces && pace.adjustedPaces.length > 0
      ? formatPace(pace.adjustedPaces[pace.adjustedPaces.length - 1])
      : null;

  const distanceStyle = {
    "--distance-gradient": theme.gradient,
    "--distance-color": theme.color,
  } as React.CSSProperties;

  const isNegative = strategy === "negative";

  return (
    <>
      <div className="mb-5">
        <PacingToggle
          strategy={strategy}
          negativeSplitPercent={negativeSplitPercent}
          onStrategyChange={setStrategy}
          onPercentChange={setNegativeSplitPercent}
        />
      </div>

      <div
        className="card-dark card-accent-top hero-wash overflow-hidden px-5 py-8 text-center sm:px-8 sm:py-10"
        style={distanceStyle}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/45">
          {isNegative ? "Average pace" : "Required pace"}
        </p>
        <p
          className="mt-2 text-[48px] font-semibold leading-none tracking-tight sm:text-[64px]"
          style={{ color: theme.color }}
        >
          {pacePerMile}
          <span className="ml-1 text-[24px] font-medium text-white/50 sm:text-[28px]">
            /mi
          </span>
        </p>
        <p className="mt-2 text-[15px] text-white/55">
          {pacePerKm} per km
        </p>
        {isNegative && startPace && finishPace && (
          <p className="mt-2 text-[13px] text-white/45">
            Starts ~{startPace} → finishes ~{finishPace}
          </p>
        )}
        <span
          className="pill-gradient mt-5 inline-block px-3.5 py-1.5 text-[13px]"
          style={distanceStyle}
        >
          {combo.distance.name} · {combo.goalLabel}
        </span>
      </div>

      <div className="mt-5">
        <h2 className="mb-3 px-1 text-[13px] font-medium uppercase tracking-[0.06em] text-white/45">
          Mile-by-mile splits
        </h2>
        <PaceTable splits={pace.splits} showVariablePace={isNegative} />
      </div>

      {contextParagraphs && contextParagraphs.length > 0 && (
        <p className="mt-5 px-1 text-[15px] leading-[1.65] text-white/55">
          {contextParagraphs.join(" ")}
        </p>
      )}

      <CTAWaitlist className="mt-8 sm:mt-10" />
    </>
  );
}
