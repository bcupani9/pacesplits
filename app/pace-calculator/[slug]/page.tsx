import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import CalculatorClient from "@/components/CalculatorClient";
import CTAWaitlist from "@/components/CTAWaitlist";
import FAQSchema from "@/components/FAQSchema";
import FAQSection from "@/components/FAQSection";
import NearbyGoalTimes from "@/components/NearbyGoalTimes";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import {
  ALL_COMBOS,
  getComboBySlug,
  getNearbyCombos,
} from "@/lib/combos";
import { generateContextParagraph } from "@/lib/context-copy";
import { getDistanceTheme } from "@/lib/distance-theme";
import { HUB_COPY } from "@/lib/hub-copy";
import { buildCalculatorFAQ, distanceInSentence, SITE_URL } from "@/lib/seo";
import { calculatePace, formatPace } from "@/lib/vdot";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return ALL_COMBOS.map((combo) => ({ slug: combo.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const combo = getComboBySlug(params.slug);

  if (!combo) {
    return {
      title: "Calculator Not Found",
    };
  }

  const pace = calculatePace(combo.distance.distanceKm, combo.goalTimeSeconds);
  const paceMi = formatPace(pace.pacePerMileSeconds);
  const paceKm = formatPace(pace.pacePerKmSeconds);
  const name = distanceInSentence(combo.distance.name);

  const title = `${combo.goalLabel} ${combo.distance.name} Pace: ${paceMi}/mi + Mile Splits`;
  const description = `Run a ${combo.goalLabel.toLowerCase()} ${name} by holding ${paceMi} per mile (${paceKm} per km). Free mile-by-mile split chart with cumulative checkpoint times and a negative split pacing option.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default function PaceCalculatorPage({ params }: PageProps) {
  const combo = getComboBySlug(params.slug);

  if (!combo) {
    return (
      <PageShell>
        <div className="card-dark px-5 py-10 text-center sm:px-8">
          <h1
            className="text-[22px] font-semibold"
            style={{ color: "var(--cp-ink)" }}
          >
            Calculator not found
          </h1>
          <p className="mt-2 text-[15px]" style={{ color: "var(--cp-graphite)" }}>
            We couldn&apos;t find a pace calculator for that goal time.
          </p>
          <Link
            href="/calculators"
            className="focus-ring-dark group mt-6 inline-block text-[15px] font-medium text-[var(--cp-cinder)] transition-colors duration-150 hover:text-[var(--cp-cinder-deep)]"
          >
            <span className="arrow-shift-back" aria-hidden="true">
              ‹
            </span>{" "}
            All calculators
          </Link>
        </div>
      </PageShell>
    );
  }

  const theme = getDistanceTheme(combo.distance.id);
  const hub = HUB_COPY[combo.distance.id];
  const initialPace = calculatePace(
    combo.distance.distanceKm,
    combo.goalTimeSeconds
  );
  const contextParagraphs = generateContextParagraph(
    combo.distance,
    combo.goalTimeSeconds,
    initialPace.pacePerKmSeconds
  );
  const faqItems = buildCalculatorFAQ(combo, initialPace);
  const nearby = getNearbyCombos(combo);

  return (
    <PageShell>
      <Link
        href={`/${hub.slug}`}
        className="focus-ring-dark group mb-5 inline-block text-[15px] transition-colors duration-150 ease-in-out"
        style={{ color: "var(--cp-graphite)" }}
      >
        <span className="arrow-shift-back" aria-hidden="true">
          ‹
        </span>{" "}
        {combo.distance.name} pace calculator
      </Link>

      <h1 className="sr-only">
        {combo.distance.name} Pace Calculator: {combo.goalLabel}
      </h1>

      <CalculatorClient
        combo={combo}
        initialPace={initialPace}
        theme={theme}
        contextParagraphs={contextParagraphs}
      />

      <NearbyGoalTimes
        nearby={nearby}
        hubHref={`/${hub.slug}`}
        hubLabel={`Full ${distanceInSentence(combo.distance.name)} pace chart`}
        theme={theme}
      />

      <Reveal>
        <FAQSection
          items={faqItems}
          title={`${combo.goalLabel} ${combo.distance.name} FAQ`}
          className="mt-10"
          headingClassName="text-[22px] font-semibold leading-tight tracking-tight text-[var(--cp-ink)] sm:text-[24px]"
        />
      </Reveal>

      <Reveal>
        <CTAWaitlist className="mt-8 sm:mt-10" />
      </Reveal>

      <FAQSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "PaceSplits", url: SITE_URL },
          { name: hub.h1, url: `${SITE_URL}/${hub.slug}` },
          {
            name: `${combo.goalLabel} ${combo.distance.name}`,
            url: `${SITE_URL}/pace-calculator/${combo.slug}`,
          },
        ]}
      />
    </PageShell>
  );
}
