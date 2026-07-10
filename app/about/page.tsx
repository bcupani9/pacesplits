import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description:
    "PaceSplits is a free running pace calculator with mile-by-mile splits for every race distance and goal time.",
};

const features = [
  {
    title: "Built for goal-setters",
    body: "Every page targets a specific distance and finish time — sub-3:05 marathon, sub-20 5K, and hundreds more.",
  },
  {
    title: "Mile-by-mile clarity",
    body: "See the exact even pace per mile and cumulative splits at every marker. No guesswork on race day.",
  },
  {
    title: "Free, no signup",
    body: "Open any calculator instantly. No account, no app download, no paywall.",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <header className="mb-8 max-w-2xl sm:mb-10">
        <h1 className="text-[34px] font-bold leading-tight tracking-tight text-white sm:text-[44px]">
          About {BRAND_NAME}
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-white/60 sm:text-[18px]">
          {BRAND_NAME} is a free running pace calculator built for runners who
          plan races by the clock. Pick your distance, pick your goal, and get
          the numbers you need to train and execute.
        </p>
      </header>

      <div className="space-y-4">
        {features.map((feature) => (
          <article key={feature.title} className="card-dark p-5 sm:p-6">
            <h2 className="text-[17px] font-semibold text-white sm:text-[19px]">
              {feature.title}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-white/55">
              {feature.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/calculators"
          className="btn-hero-cta focus-ring-dark inline-flex items-center gap-2"
        >
          Browse calculators
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </PageShell>
  );
}
