import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroAtmosphere from "@/components/HeroAtmosphere";
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
    <>
      {/* Cinderpath hero band — the site's theme throughout, matching the
          PaceSplits app. */}
      <section
        className="relative z-10"
        style={{ background: "var(--cp-bone)", color: "var(--cp-ink)" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:flex-row lg:items-stretch lg:gap-0 lg:pb-6">
          <div className="cp-dot-grid relative flex flex-1 flex-col justify-center py-6 lg:pr-10">
            <p
              className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--cp-cinder-deep)",
              }}
            >
              Built for runners chasing a number
            </p>

            <h1
              className="max-w-xl text-[38px] font-bold leading-[1.06] tracking-tight sm:text-[48px] lg:text-[54px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Turn{" "}
              <span className="cp-badge cp-badge-ink">
                <ArrowRight className="h-[0.8em] w-[0.8em]" aria-hidden="true" />
                Coach
              </span>{" "}
              check-ins into{" "}
              <span className="cp-badge cp-badge-cinder">race day</span>{" "}
              results.
            </h1>

            <p
              className="mt-6 max-w-[480px] text-[16px] leading-relaxed sm:text-[17px]"
              style={{ color: "var(--cp-graphite)" }}
            >
              Free pace splits, an AI coach that edits your actual training
              week, and a plan that adapts every time your race date, goal, or
              mileage changes.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href="/calculators" className="cp-cta focus-ring">
                Get Bibbed
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="#waitlist"
                className="focus-ring text-[13.5px] font-bold"
                style={{
                  color: "var(--cp-ink)",
                  borderBottom: "1.5px solid var(--cp-ink)",
                  paddingBottom: "2px",
                }}
              >
                Join the app waitlist
              </Link>
            </div>

            <p
              className="mt-8 text-[12px] font-semibold uppercase tracking-[0.08em]"
              style={{ color: "var(--cp-graphite)" }}
            >
              Free calculator ·{" "}
              <span style={{ color: "var(--cp-cinder-deep)" }}>No signup</span>{" "}
              · Coach unlocks with Pro
            </p>
          </div>

          <div className="flex min-h-[320px] flex-1 lg:min-h-0">
            <HeroAtmosphere
              caption={
                combo
                  ? `${combo.distance.name} · ${combo.goalLabel}`
                  : undefined
              }
            />
          </div>
        </div>
      </section>

      {/* Live product preview — same Cinderpath surface as the hero. */}
      <section className="relative flex flex-col" style={{ background: "var(--cp-bone)" }}>
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
          <HeroStats stats={stats} />

          <p className="mt-6 text-[13px]" style={{ color: "var(--cp-graphite)" }}>
            Built by a sub-3:00 marathoner training for their next PR. The{" "}
            {BRAND_NAME} app, with personalized training plans around your
            pace, is coming soon.
          </p>

          {combo && (
            <Reveal className="mt-10 sm:mt-12">
              <div
                className="card-dark card-accent-top overflow-hidden"
                style={
                  {
                    "--distance-gradient": "var(--brand-gradient)",
                  } as React.CSSProperties
                }
              >
                <div className="border-b border-[var(--border-dark)] px-5 py-4 sm:px-6">
                  <p
                    className="text-[11px] font-medium uppercase tracking-[0.08em]"
                    style={{ color: "var(--cp-graphite)" }}
                  >
                    Live preview
                  </p>
                  <Link
                    href={`/pace-calculator/${combo.slug}`}
                    className="focus-ring-dark mt-1 inline-block text-[17px] font-semibold transition-colors duration-150"
                    style={{ color: "var(--cp-ink)" }}
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
    </>
  );
}
