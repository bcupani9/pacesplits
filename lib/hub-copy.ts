import type { DistanceId } from "@/lib/combos";
import type { FAQItem } from "@/lib/faq";

export interface HubCopy {
  slug: string;
  /** e.g. "Marathon Pace Calculator" */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  chartHeading: string;
  chartIntro: string;
  faq: FAQItem[];
}

export const HUB_SLUGS: Record<DistanceId, string> = {
  "5k": "5k-pace-calculator",
  "10k": "10k-pace-calculator",
  "half-marathon": "half-marathon-pace-calculator",
  marathon: "marathon-pace-calculator",
};

export const HUB_COPY: Record<DistanceId, HubCopy> = {
  marathon: {
    slug: HUB_SLUGS.marathon,
    h1: "Marathon Pace Calculator",
    metaTitle: "Marathon Pace Calculator — Pace Chart & Mile Splits",
    metaDescription:
      "Free marathon pace calculator with a full pace chart from 2:30 to 5:00. See pace per mile, pace per km, and mile-by-mile splits for every marathon goal time.",
    intro: [
      "A marathon is 26.2 miles (42.195 km), and pacing it well is the difference between a strong finish and a long final 10K. This marathon pace calculator turns any goal finish time into the exact pace per mile and per kilometer you need, plus a mile-by-mile split chart you can rehearse in training and follow on race day.",
      "Pick a goal time below to get the full 26-mile split table, halfway checkpoint, and a negative-split option that starts slightly slower and finishes faster.",
    ],
    chartHeading: "Marathon pace chart",
    chartIntro:
      "Every marathon goal time from 2:30 to 5:00 with the required pace per mile and per kilometer. Tap any row for the complete mile-by-mile splits.",
    faq: [
      {
        question: "What is a good marathon time?",
        answer:
          "It depends on your experience and age group. Many recreational runners finish between 4:00 and 5:00, and average finish times worldwide land around 4:20–4:40. A 3:30 marathon is a strong age-group result, and breaking 3:00 puts you in highly competitive territory — typically the top few percent of a big-city field.",
      },
      {
        question: "What pace do I need for a 4-hour marathon?",
        answer:
          "A 4:00 marathon requires an average of 9:09 per mile, or 5:41 per kilometer, held for all 26.2 miles. Open the sub-4:00 calculator to see the cumulative time you should show at every mile marker.",
      },
      {
        question: "What pace do I need to qualify for Boston?",
        answer:
          "Boston qualifying standards vary by age and gender. The fastest standard — men 18–34 — is 2:55:00, which works out to about 6:40 per mile, and standards get progressively slower with age. Find the calculator for your qualifying time in the chart above to see the exact splits you'd need to hit.",
      },
      {
        question: "Should I run even splits or negative splits in a marathon?",
        answer:
          "Most well-executed marathons are run close to even, with many personal bests coming from a slight negative split — running the second half a touch faster than the first. Every calculator on this page includes a negative-split toggle so you can compare both plans against the same goal time.",
      },
    ],
  },
  "half-marathon": {
    slug: HUB_SLUGS["half-marathon"],
    h1: "Half Marathon Pace Calculator",
    metaTitle: "Half Marathon Pace Calculator — Pace Chart & Mile Splits",
    metaDescription:
      "Free half marathon pace calculator with a full pace chart from 1:05 to 2:45. See pace per mile, pace per km, and mile-by-mile splits for every goal time.",
    intro: [
      "A half marathon is 13.1 miles (21.0975 km) — long enough that pacing errors compound, short enough that you can hold a genuinely quick rhythm. This half marathon pace calculator converts any goal finish time into pace per mile and per kilometer, with a full mile-by-mile split chart for race day.",
      "Choose a goal time below for the complete 13-mile split table, halfway checkpoint, and a negative-split pacing option.",
    ],
    chartHeading: "Half marathon pace chart",
    chartIntro:
      "Every half marathon goal time from 1:05 to 2:45 with the required pace per mile and per kilometer. Tap any row for the complete mile-by-mile splits.",
    faq: [
      {
        question: "What is a good half marathon time?",
        answer:
          "Average half marathon finish times sit around 2:00–2:15 for recreational fields. Breaking 1:45 is a strong age-group result, and a sub-1:30 half — 6:52 per mile — is highly competitive in most races.",
      },
      {
        question: "What pace is a 2-hour half marathon?",
        answer:
          "A 2:00 half marathon requires an average of 9:09 per mile, or 5:41 per kilometer, for all 13.1 miles. Open the sub-2:00 calculator to see the exact cumulative time at each mile marker.",
      },
      {
        question: "How should I pace a half marathon?",
        answer:
          "Run the first two to three miles right at goal pace or a few seconds slower, settle into rhythm through mile 10, and spend whatever is left over the final 5K. The negative-split toggle on each calculator builds this shape into your per-mile targets automatically.",
      },
    ],
  },
  "10k": {
    slug: HUB_SLUGS["10k"],
    h1: "10K Pace Calculator",
    metaTitle: "10K Pace Calculator — Pace Chart & Mile Splits",
    metaDescription:
      "Free 10K pace calculator with a full pace chart from 28 to 65 minutes. See pace per mile, pace per km, and mile-by-mile splits for every 10K goal time.",
    intro: [
      "A 10K is 6.2 miles — a distance that rewards discipline early and courage late. This 10K pace calculator turns any goal finish time into the pace per mile and per kilometer you need, plus mile-by-mile splits so you know exactly where you should be at every marker.",
      "Pick a goal time below for the full split table and a negative-split option for racing the second half faster.",
    ],
    chartHeading: "10K pace chart",
    chartIntro:
      "Every 10K goal time from 28 to 65 minutes with the required pace per mile and per kilometer. Tap any row for the complete mile-by-mile splits.",
    faq: [
      {
        question: "What is a good 10K time?",
        answer:
          "Average 10K finish times land around 55–65 minutes for recreational runners. Breaking 50 minutes is a solid benchmark, and a sub-40 10K — 6:26 per mile — is a highly competitive result in most fields.",
      },
      {
        question: "What pace is a 50-minute 10K?",
        answer:
          "A 50:00 10K requires an average of 8:03 per mile — exactly 5:00 per kilometer — for all 6.2 miles. Open the sub-50 calculator to see your cumulative time at each mile marker.",
      },
      {
        question: "How should I pace a 10K race?",
        answer:
          "The classic mistake is banking time in mile 1. Run the first mile at goal pace, stay controlled through mile 4, then race the final two miles. Each calculator's negative-split option shows what that faster finish looks like mile by mile.",
      },
    ],
  },
  "5k": {
    slug: HUB_SLUGS["5k"],
    h1: "5K Pace Calculator",
    metaTitle: "5K Pace Calculator — Pace Chart & Mile Splits",
    metaDescription:
      "Free 5K pace calculator with a full pace chart from 15 to 30 minutes. See pace per mile, pace per km, and mile-by-mile splits for every 5K goal time.",
    intro: [
      "A 5K is 3.1 miles — short enough to hurt from the gun, long enough that even pacing still wins. This 5K pace calculator converts any goal finish time into pace per mile and per kilometer, with mile splits so you know exactly what your watch should read at each marker.",
      "Choose a goal time below for the split table and a negative-split option for a faster final mile.",
    ],
    chartHeading: "5K pace chart",
    chartIntro:
      "Every 5K goal time from 15 to 30 minutes with the required pace per mile and per kilometer. Tap any row for the complete mile-by-mile splits.",
    faq: [
      {
        question: "What is a good 5K time?",
        answer:
          "Casual runners often finish a 5K in 30–35 minutes. Breaking 25 minutes reflects consistent training, a sub-20 5K — 6:26 per mile — is a strong club-level result, and sub-17 is highly competitive.",
      },
      {
        question: "What pace is a 25-minute 5K?",
        answer:
          "A 25:00 5K requires an average of 8:03 per mile — exactly 5:00 per kilometer — for all 3.1 miles. Open the sub-25 calculator to see your target time at each mile marker.",
      },
      {
        question: "How should I pace a 5K race?",
        answer:
          "Hold goal pace through the first mile even when it feels easy, stay honest in mile 2 where most 5Ks are lost, and empty the tank over the final kilometer. The negative-split toggle on each calculator maps that plan onto your exact goal time.",
      },
    ],
  },
};
