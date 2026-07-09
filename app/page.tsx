import Link from "next/link";
import { ALL_COMBOS, DISTANCES, groupCombosByDistance } from "@/lib/combos";

export default function HomePage() {
  const grouped = groupCombosByDistance();

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Running Pace Calculators
        </h1>
        <p className="mt-3 max-w-2xl text-base text-gray-600 sm:text-lg">
          Pick your race distance and goal time to see the exact pace per mile
          and a full mile-by-mile split breakdown. {ALL_COMBOS.length} calculators
          and counting.
        </p>
      </div>

      <div className="space-y-12">
        {DISTANCES.map((distance) => {
          const combos = grouped.get(distance.id) ?? [];

          return (
            <section key={distance.id}>
              <h2 className="text-2xl font-semibold text-gray-900">
                {distance.name}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {distance.distanceKm} km · {combos.length} goal times
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {combos.map((combo) => (
                  <li key={combo.slug}>
                    <Link
                      href={`/pace-calculator/${combo.slug}`}
                      className="inline-block rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                    >
                      {combo.goalLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
