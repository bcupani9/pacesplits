import CTAWaitlist from "@/components/CTAWaitlist";
import DistanceSection from "@/components/DistanceSection";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import { BRAND_NAME } from "@/lib/brand";
import {
  ALL_COMBOS,
  DISTANCES,
  getFeaturedGoalTimes,
  groupCombosByDistance,
} from "@/lib/combos";
import { HUB_SLUGS } from "@/lib/hub-copy";

export const metadata = {
  title: "Calculators",
  description:
    "Browse free pace calculators for 5K, 10K, half marathon, and marathon goal times. Join the PaceSplits app waitlist for training plans built around your race pace.",
};

export default function CalculatorsPage() {
  const grouped = groupCombosByDistance();

  return (
    <PageShell>
      <header className="mb-8 sm:mb-10">
        <h1
          className="text-[34px] font-bold leading-tight tracking-tight sm:text-[44px]"
          style={{ color: "var(--cp-ink)", fontFamily: "var(--font-display)" }}
        >
          Calculators
        </h1>
        <p
          className="mt-3 max-w-lg text-[16px] leading-relaxed sm:text-[17px]"
          style={{ color: "var(--cp-graphite)" }}
        >
          Pick a distance and goal time for mile-by-mile splits.{" "}
          {ALL_COMBOS.length} calculators available. Want more than splits? The{" "}
          {BRAND_NAME} app is coming soon — join the waitlist below.
        </p>
      </header>

      <div className="space-y-4 sm:space-y-5">
        {DISTANCES.map((distance) => (
          <Reveal key={distance.id}>
            <DistanceSection
              distance={distance}
              featuredCombos={getFeaturedGoalTimes(distance.id)}
              allCombos={grouped.get(distance.id) ?? []}
              hubHref={`/${HUB_SLUGS[distance.id]}`}
            />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <CTAWaitlist className="mt-8 sm:mt-10" />
      </Reveal>
    </PageShell>
  );
}
