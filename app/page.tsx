import type { Metadata } from "next";
import CTAWaitlist from "@/components/CTAWaitlist";
import FAQSchema from "@/components/FAQSchema";
import FAQSection from "@/components/FAQSection";
import HomeHero from "@/components/HomeHero";
import Reveal from "@/components/Reveal";
import { FAQ_ITEMS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Free Running Pace Calculator — Mile-by-Mile Split Times",
  description:
    "Free running pace calculator with mile-by-mile split times for 5K, 10K, half marathon, and marathon. Join the PaceSplits app waitlist for personalized training plans built around your goal pace.",
  openGraph: {
    title: "Free Running Pace Calculator — Mile-by-Mile Split Times",
    description:
      "Free running pace calculator with mile-by-mile split times for 5K, 10K, half marathon, and marathon. Join the PaceSplits app waitlist for personalized training plans built around your goal pace.",
  },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <Reveal className="mb-10 sm:mb-12">
          <CTAWaitlist id="waitlist" />
        </Reveal>
      </div>
      <Reveal>
        <FAQSection items={FAQ_ITEMS} />
      </Reveal>
      <FAQSchema items={FAQ_ITEMS} />
    </>
  );
}
