"use client";

export type PacingStrategy = "even" | "negative";

const INTENSITY_OPTIONS = [
  { label: "Subtle (2%)", percent: 2 },
  { label: "Moderate (4%)", percent: 4 },
  { label: "Aggressive (6%)", percent: 6 },
] as const;

interface PacingToggleProps {
  strategy: PacingStrategy;
  negativeSplitPercent: number;
  onStrategyChange: (strategy: PacingStrategy) => void;
  onPercentChange: (percent: number) => void;
}

export default function PacingToggle({
  strategy,
  negativeSplitPercent,
  onStrategyChange,
  onPercentChange,
}: PacingToggleProps) {
  return (
    <div className="space-y-3">
      <div
        className="inline-flex rounded-full border border-[var(--border-dark)] bg-[var(--cp-ink)]/[0.03] p-1"
        role="group"
        aria-label="Pacing strategy"
      >
        <button
          type="button"
          onClick={() => onStrategyChange("even")}
          aria-pressed={strategy === "even"}
          className={`focus-ring-dark rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-150 ease-in-out active:scale-[0.98] sm:text-[14px] ${
            strategy === "even"
              ? "bg-[var(--accent)] text-[var(--cp-bone)] shadow-sm"
              : "text-[var(--cp-graphite)] hover:text-[var(--cp-ink)]"
          }`}
        >
          Even Pace
        </button>
        <button
          type="button"
          onClick={() => onStrategyChange("negative")}
          aria-pressed={strategy === "negative"}
          className={`focus-ring-dark rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-150 ease-in-out active:scale-[0.98] sm:text-[14px] ${
            strategy === "negative"
              ? "bg-[var(--accent)] text-[var(--cp-bone)] shadow-sm"
              : "text-[var(--cp-graphite)] hover:text-[var(--cp-ink)]"
          }`}
        >
          Negative Split
        </button>
      </div>

      {strategy === "negative" && (
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Negative split intensity"
        >
          {INTENSITY_OPTIONS.map((option) => (
            <button
              key={option.percent}
              type="button"
              onClick={() => onPercentChange(option.percent)}
              aria-pressed={negativeSplitPercent === option.percent}
              className={`focus-ring-dark rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all duration-150 ease-in-out active:scale-[0.98] sm:text-[13px] ${
                negativeSplitPercent === option.percent
                  ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--cp-cinder-deep)]"
                  : "border-[var(--border-dark)] bg-[var(--cp-ink)]/[0.03] text-[var(--cp-graphite)] hover:border-[var(--cp-ink)]/20 hover:text-[var(--cp-ink)]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
