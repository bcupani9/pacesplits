import DistanceSection from "@/components/DistanceSection";
import PageShell from "@/components/PageShell";
import {
  ALL_COMBOS,
  DISTANCES,
  getFeaturedGoalTimes,
  groupCombosByDistance,
} from "@/lib/combos";

export const metadata = {
  title: "Calculators",
  description:
    "Browse pace calculators for 5K, 10K, half marathon, and marathon goal times.",
};

export default function CalculatorsPage() {
  const grouped = groupCombosByDistance();

  return (
    <PageShell>
      <header className="mb-8 sm:mb-10">
        <h1 className="text-[34px] font-bold leading-tight tracking-tight text-white sm:text-[44px]">
          Calculators
        </h1>
        <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-white/60 sm:text-[17px]">
          Pick a distance and goal time for mile-by-mile splits.{" "}
          {ALL_COMBOS.length} calculators available.
        </p>
      </header>

      <div className="space-y-4 sm:space-y-5">
        {DISTANCES.map((distance) => (
          <DistanceSection
            key={distance.id}
            distance={distance}
            featuredCombos={getFeaturedGoalTimes(distance.id)}
            allCombos={grouped.get(distance.id) ?? []}
          />
        ))}
      </div>
    </PageShell>
  );
}
