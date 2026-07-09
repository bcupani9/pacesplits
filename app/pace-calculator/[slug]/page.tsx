import type { Metadata } from "next";
import Link from "next/link";
import CTAWaitlist from "@/components/CTAWaitlist";
import PaceTable from "@/components/PaceTable";
import { ALL_COMBOS, getComboBySlug } from "@/lib/combos";
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
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Calculator not found
        </h1>
        <p className="mt-2 text-gray-600">
          We couldn&apos;t find a pace calculator for that goal time.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-emerald-700 hover:underline"
        >
          Browse all calculators
        </Link>
      </div>
    );
  }

  const pace = calculatePace(combo.distance.distanceKm, combo.goalTimeSeconds);
  const pacePerMile = formatPace(pace.pacePerMileSeconds);
  const pacePerKm = formatPace(pace.pacePerKmSeconds);

  return (
    <article>
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-700">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{combo.distance.name}</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {combo.distance.name} Pace Calculator: {combo.goalLabel}
      </h1>

      <p className="mt-4 text-base text-gray-600 sm:text-lg">
        To finish a {combo.distance.name.toLowerCase()} in{" "}
        {combo.goalLabelLong}, you need to run{" "}
        <strong className="font-semibold text-gray-900">{pacePerMile}</strong>{" "}
        per mile ({pacePerKm} per km) at an even pace.
      </p>

      <h2 className="mb-4 mt-10 text-xl font-semibold text-gray-900">
        Mile-by-mile splits
      </h2>

      <PaceTable splits={pace.splits} />

      <CTAWaitlist />
    </article>
  );
}
