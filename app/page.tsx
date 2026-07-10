import type { Metadata } from "next";
import FAQSchema from "@/components/FAQSchema";
import FAQSection from "@/components/FAQSection";
import HomeHero from "@/components/HomeHero";
import { FAQ_ITEMS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Free Running Pace Calculator — Mile-by-Mile Split Times",
  description:
    "Free running pace calculator with mile-by-mile split times for 5K, 10K, half marathon, and marathon. Pick your goal finish time and get exact pacing for training and race day.",
  openGraph: {
    title: "Free Running Pace Calculator — Mile-by-Mile Split Times",
    description:
      "Free running pace calculator with mile-by-mile split times for 5K, 10K, half marathon, and marathon. Pick your goal finish time and get exact pacing for training and race day.",
  },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FAQSection items={FAQ_ITEMS} />
      <FAQSchema items={FAQ_ITEMS} />
    </>
  );
}
