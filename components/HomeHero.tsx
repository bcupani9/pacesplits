import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroStats, { type HeroStat } from "@/components/HeroStats";
import PaceTable from "@/components/PaceTable";
import Reveal from "@/components/Reveal";
import { BRAND_NAME } from "@/lib/brand";
import { ALL_COMBOS, DISTANCES, getComboBySlug } from "@/lib/combos";
import { calculatePace } from "@/lib/vdot";

const PREVIEW_SLUG = "marathon-sub-3-05";

export default function HomeHero() {
  const combo = getComboBySlug(PREVIEW_SLUG);
  const previewSplits = combo
    ? calculatePace(combo.distance.distanceKm, combo.goalTimeSeconds).splits
    : [];

  const stats: HeroStat[] = [
    { value: ALL_COMBOS.length, suffix: "+", label: "Goal times", badge: true },
    { value: DISTANCES.length, label: "Distances" },
    { value: "Free", label: "Forever" },
  ];

  return (
    <section className="relative flex min-h-screen flex-col">
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
        <div className="max-w-2xl">
          <h1 className="text-[40px] font-bold leading-[1.08] tracking-tight text-white sm:text-[56px] lg:text-[72px]">
            Find your exact{" "}
            <span className="headline-badge">race pace</span> for any goal.
          </h1>

          <p className="mt-5 max-w-[500px] text-[16px] font-normal leading-relaxed text-white/60 sm:text-[18px]">
            Mile-by-mile split tables for every race distance and goal time —
            free, instant, and built for runners who plan by the clock. The{" "}
            {BRAND_NAME} app, with personalized training plans around your pace,
            is coming soon.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/calculators"
              className="btn-hero-cta focus-ring-dark group inline-flex items-center gap-2"
            >
              Browse calculators
              <ArrowRight className="arrow-shift h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="#waitlist"
              className="focus-ring-dark inline-flex items-center rounded-full border border-[var(--border-dark)] bg-white/5 px-5 py-3 text-[15px] font-medium text-white/80 transition-all duration-150 ease-out hover:border-[#6b9fff]/50 hover:bg-white/10 hover:text-white active:scale-[0.98]"
            >
              Join the app waitlist
            </Link>
          </div>

          <HeroStats stats={stats} />

          <p className="mt-6 text-[13px] text-white/45">
            Built by a sub-3:00 marathoner training for their next PR.
          </p>
        </div>

        {combo && (
          <Reveal className="mt-12 sm:mt-16">
            <div
              className="card-dark card-accent-top overflow-hidden"
              style={
                { "--distance-gradient": "var(--brand-gradient)" } as React.CSSProperties
              }
            >
              <div className="border-b border-[var(--border-dark)] px-5 py-4 sm:px-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/45">
                  Live preview
                </p>
                <Link
                  href={`/pace-calculator/${combo.slug}`}
                  className="focus-ring-dark mt-1 inline-block text-[17px] font-semibold text-white transition-colors duration-150 hover:text-[#6b9fff]"
                >
                  {combo.distance.name} · {combo.goalLabel}
                </Link>
              </div>
              <PaceTable splits={previewSplits} limit={6} embedded />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
