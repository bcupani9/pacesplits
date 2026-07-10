import type { Metadata } from "next";
import Link from "next/link";
import CalculatorClient from "@/components/CalculatorClient";
import PageShell from "@/components/PageShell";
import { ALL_COMBOS, getComboBySlug } from "@/lib/combos";
import { generateContextParagraph } from "@/lib/context-copy";
import { getDistanceTheme } from "@/lib/distance-theme";
import { calculatePace } from "@/lib/vdot";

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

  const title = `${combo.distance.name} Pace Calculator: ${combo.goalLabel} Splits`;
  const description = `Mile-by-mile pace splits for a ${combo.distance.name.toLowerCase()} in ${combo.goalLabelLong}. See the exact pace per mile and per km you need to hit your goal.`;

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
          <h1 className="text-[22px] font-semibold text-white">
            Calculator not found
          </h1>
          <p className="mt-2 text-[15px] text-white/55">
            We couldn&apos;t find a pace calculator for that goal time.
          </p>
          <Link
            href="/calculators"
            className="focus-ring-dark mt-6 inline-block text-[15px] font-medium text-[#6b9fff]"
          >
            ‹ All calculators
          </Link>
        </div>
      </PageShell>
    );
  }

  const theme = getDistanceTheme(combo.distance.id);
  const initialPace = calculatePace(
    combo.distance.distanceKm,
    combo.goalTimeSeconds
  );
  const contextParagraphs = generateContextParagraph(
    combo.distance,
    combo.goalTimeSeconds,
    initialPace.pacePerKmSeconds
  );

  return (
    <PageShell>
      <Link
        href="/calculators"
        className="focus-ring-dark mb-5 inline-block text-[15px] text-white/50 transition-colors duration-150 ease-in-out hover:text-white/80"
      >
        ‹ All calculators
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
    </PageShell>
  );
}
