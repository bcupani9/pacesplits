import Link from "next/link";
import type { Combo } from "@/lib/combos";
import type { DistanceTheme } from "@/lib/distance-theme";

interface NearbyGoalTimesProps {
  nearby: Combo[];
  hubHref: string;
  hubLabel: string;
  theme: DistanceTheme;
}

export default function NearbyGoalTimes({
  nearby,
  hubHref,
  hubLabel,
  theme,
}: NearbyGoalTimesProps) {
  if (nearby.length === 0) return null;

  return (
    <section
      className="mt-8"
      style={
        {
          "--distance-gradient": theme.gradient,
          "--distance-color": theme.color,
        } as React.CSSProperties
      }
    >
      <h2 className="mb-3 px-1 text-[13px] font-medium uppercase tracking-[0.06em] text-white/45">
        Nearby goal times
      </h2>
      <ul className="flex flex-wrap gap-2">
        {nearby.map((combo) => (
          <li key={combo.slug}>
            <Link
              href={`/pace-calculator/${combo.slug}`}
              className="chip-plain focus-ring-dark px-3.5 py-1.5 text-[13px] font-medium sm:text-[14px]"
            >
              {combo.goalLabel}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={hubHref}
        className="focus-ring-dark group mt-4 inline-block text-[14px] font-medium transition-colors duration-150"
        style={{ color: theme.color }}
      >
        {hubLabel}{" "}
        <span className="arrow-shift" aria-hidden="true">
          →
        </span>
      </Link>
    </section>
  );
}
