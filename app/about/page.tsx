import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CTAWaitlist from "@/components/CTAWaitlist";
import PageShell from "@/components/PageShell";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description:
    "PaceSplits is a free running pace calculator with mile-by-mile splits. The PaceSplits app — personalized training plans around your goal pace — is coming soon.",
};

const features = [
  {
    title: "Free calculators, right now",
    body: "Every page targets a specific distance and finish time — sub-3:05 marathon, sub-20 5K, and hundreds more. Open any calculator instantly, no signup required.",
  },
  {
    title: "Mile-by-mile clarity",
    body: "See the exact even pace per mile and cumulative splits at every marker. Toggle negative splits on any calculator to plan a smarter race-day strategy.",
  },
  {
    title: "The PaceSplits app is coming",
    body: "The free site gets you the numbers. The PaceSplits app will turn your goal pace into a full training plan — workouts, weekly mileage, and race-day guidance tailored to your target time.",
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
          the numbers you need to train and execute — then join the app waitlist
          for personalized plans built around your pace.
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

      <CTAWaitlist className="mt-8" />

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
