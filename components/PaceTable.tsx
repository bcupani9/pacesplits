import { Split, formatDuration, formatPace } from "@/lib/vdot";

interface PaceTableProps {
  splits: Split[];
  limit?: number;
  embedded?: boolean;
  showVariablePace?: boolean;
}

export default function PaceTable({
  splits,
  limit,
  embedded = false,
  showVariablePace = false,
}: PaceTableProps) {
  const visibleSplits = limit ? splits.slice(0, limit) : splits;
  const wrapperClass = embedded
    ? "overflow-hidden"
    : "card-dark overflow-hidden";

  const rowBorder = "border-[var(--border-dark)]";
  const labelClass = "text-[15px] text-[#55503f]";
  const paceClass = "text-[13px] tabular-nums text-[#55503f]/80";
  const cumulativeClass =
    "min-w-[4.5rem] text-right text-[15px] font-semibold tabular-nums text-[#1e1a16]";
  const variablePaceClass = "text-[11px] tabular-nums text-[#55503f]/70";
  const footerClass =
    "border-t border-[var(--border-dark)] bg-[#1e1a16]/[0.03] px-5 py-3 text-center text-[13px] text-[#55503f]";

  return (
    <div className={wrapperClass}>
      <ul>
        {visibleSplits.map((split, index) => (
          <li
            key={split.mile}
            className={`row-cascade${
              index < visibleSplits.length - 1 ? ` border-b ${rowBorder}` : ""
            }`}
            style={{ animationDelay: `${Math.min(index, 9) * 40}ms` }}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5">
              <span className={labelClass}>{split.label}</span>
              <div className="flex flex-col items-end gap-0.5">
                <div className="flex items-baseline gap-4">
                  <span className={paceClass}>
                    {formatPace(split.splitTimeSeconds)}
                  </span>
                  <span className={cumulativeClass}>
                    {formatDuration(split.cumulativeTimeSeconds)}
                  </span>
                </div>
                {showVariablePace && split.paceThisMile !== undefined && (
                  <span className={variablePaceClass}>
                    this mile: {formatPace(split.paceThisMile)}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {limit && splits.length > limit && (
        <div className={`row-cascade ${footerClass}`} style={{ animationDelay: "280ms" }}>
          +{splits.length - limit} more miles
        </div>
      )}
    </div>
  );
}
