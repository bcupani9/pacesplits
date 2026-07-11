import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import CTAWaitlist from "@/components/CTAWaitlist";
import FAQSchema from "@/components/FAQSchema";
import FAQSection from "@/components/FAQSection";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import {
  DISTANCES,
  getFeaturedGoalTimes,
  groupCombosByDistance,
  type DistanceId,
} from "@/lib/combos";
import { getDistanceTheme } from "@/lib/distance-theme";
import { HUB_COPY, HUB_SLUGS } from "@/lib/hub-copy";
import { SITE_URL } from "@/lib/seo";
import { calculatePace, formatPace } from "@/lib/vdot";

export function hubMetadata(distanceId: DistanceId): Metadata {
  const copy = HUB_COPY[distanceId];
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
    },
  };
}

export default function DistanceHub({ distanceId }: { distanceId: DistanceId }) {
  const distance = DISTANCES.find((d) => d.id === distanceId)!;
  const copy = HUB_COPY[distanceId];
  const theme = getDistanceTheme(distanceId);
  const combos = groupCombosByDistance().get(distanceId) ?? [];
  const featured = getFeaturedGoalTimes(distanceId);
  const otherHubs = DISTANCES.filter((d) => d.id !== distanceId);

  const distanceStyle = {
    "--distance-gradient": theme.gradient,
    "--distance-color": theme.color,
  } as React.CSSProperties;

  return (
    <PageShell>
      <Link
        href="/calculators"
        className="focus-ring-dark group mb-5 inline-block text-[15px] text-white/50 transition-colors duration-150 ease-in-out hover:text-white/80"
      >
        <span className="arrow-shift-back" aria-hidden="true">
          ‹
        </span>{" "}
        All calculators
      </Link>

      <header className="mb-8 max-w-2xl sm:mb-10">
        <h1 className="text-[34px] font-bold leading-tight tracking-tight text-white sm:text-[44px]">
          {copy.h1}
        </h1>
        {copy.intro.map((paragraph) => (
          <p
            key={paragraph.slice(0, 32)}
            className="mt-4 text-[16px] leading-relaxed text-white/60 sm:text-[17px]"
          >
            {paragraph}
          </p>
        ))}
      </header>

      <section
        className="card-dark card-accent-top p-4 pt-5 sm:p-5 sm:pt-6"
        style={distanceStyle}
      >
        <h2
          className="mb-4 text-[20px] font-semibold"
          style={{ color: theme.color }}
        >
          Popular {distance.name} goal times
        </h2>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {featured.map((combo) => (
            <li key={combo.slug}>
              <Link
                href={`/pace-calculator/${combo.slug}`}
                className="chip-gradient-wrap focus-ring-dark"
              >
                <span className="chip-gradient-inner px-3.5 py-1.5 text-[13px] sm:text-[14px]">
                  {combo.goalLabel}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Reveal className="mt-8 sm:mt-10">
        <section aria-labelledby="pace-chart-heading">
          <h2
            id="pace-chart-heading"
            className="text-[24px] font-semibold leading-tight tracking-tight text-white sm:text-[28px]"
          >
            {copy.chartHeading}
          </h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-white/55">
            {copy.chartIntro}
          </p>

          <div
            className="card-dark card-accent-top mt-5 overflow-hidden"
            style={distanceStyle}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--border-dark)]">
                    <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-[0.08em] text-white/45">
                      Goal time
                    </th>
                    <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-[0.08em] text-white/45">
                      Pace per mile
                    </th>
                    <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-[0.08em] text-white/45">
                      Pace per km
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {combos.map((combo, index) => {
                    const pace = calculatePace(
                      combo.distance.distanceKm,
                      combo.goalTimeSeconds
                    );
                    return (
                      <tr
                        key={combo.slug}
                        className={`transition-colors duration-150 hover:bg-white/5${
                          index < combos.length - 1
                            ? " border-b border-[var(--border-dark)]"
                            : ""
                        }`}
                      >
                        <td className="px-5 py-2.5">
                          <Link
                            href={`/pace-calculator/${combo.slug}`}
                            className="focus-ring-dark text-[14px] font-medium text-white transition-colors duration-150 hover:text-[var(--distance-color)] sm:text-[15px]"
                          >
                            {combo.goalLabel}
                          </Link>
                        </td>
                        <td className="px-5 py-2.5 text-[14px] tabular-nums text-white/70">
                          {formatPace(pace.pacePerMileSeconds)} /mi
                        </td>
                        <td className="px-5 py-2.5 text-right text-[14px] tabular-nums text-white/70">
                          {formatPace(pace.pacePerKmSeconds)} /km
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <FAQSection
          items={copy.faq}
          title={`${distance.name} pacing FAQ`}
          className="mt-10 sm:mt-12"
          headingClassName="text-[24px] font-semibold leading-tight tracking-tight text-white sm:text-[28px]"
        />
      </Reveal>

      <Reveal>
        <CTAWaitlist className="mt-8 sm:mt-10" />
      </Reveal>

      <p className="mt-8 text-[14px] leading-relaxed text-white/50">
        More pace calculators:{" "}
        {otherHubs.map((d, index) => (
          <span key={d.id}>
            <Link
              href={`/${HUB_SLUGS[d.id]}`}
              className="focus-ring-dark text-[#6b9fff] transition-colors duration-150 hover:text-[#8bb3ff]"
            >
              {d.name} pace calculator
            </Link>
            {index < otherHubs.length - 1 ? " · " : ""}
          </span>
        ))}
      </p>

      <FAQSchema items={copy.faq} />
      <BreadcrumbSchema
        items={[
          { name: "PaceSplits", url: SITE_URL },
          { name: "Calculators", url: `${SITE_URL}/calculators` },
          { name: copy.h1, url: `${SITE_URL}/${copy.slug}` },
        ]}
      />
    </PageShell>
  );
}
