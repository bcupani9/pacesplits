import type { Combo } from "@/lib/combos";
import { getGoalAssessment } from "@/lib/context-copy";
import type { FAQItem } from "@/lib/faq";
import { formatDuration, formatPace, type PaceResult } from "@/lib/vdot";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pacesplits.com";

const KM_TO_MILES = 0.621371;

/** "Marathon" → "marathon" for mid-sentence use; "5K"/"10K" stay uppercase. */
export function distanceInSentence(name: string): string {
  return name === name.toUpperCase() ? name : name.toLowerCase();
}

export function buildCalculatorFAQ(combo: Combo, pace: PaceResult): FAQItem[] {
  const name = distanceInSentence(combo.distance.name);
  const paceMi = formatPace(pace.pacePerMileSeconds);
  const paceKm = formatPace(pace.pacePerKmSeconds);
  const goal = formatDuration(combo.goalTimeSeconds);
  const halfway = formatDuration(combo.goalTimeSeconds / 2);
  const miles = Number((combo.distance.distanceKm * KM_TO_MILES).toFixed(1));
  const km = Number(combo.distance.distanceKm.toFixed(1));
  const assessment = getGoalAssessment(
    combo.distance.id,
    combo.goalTimeSeconds
  );

  return [
    {
      question: `What pace do I need to run a ${combo.goalLabelLong} ${name}?`,
      answer: `To finish a ${name} (${miles} miles / ${km} km) in under ${goal}, you need to average ${paceMi} per mile — that's ${paceKm} per kilometer. The split table on this page shows the exact cumulative time to hit at every mile marker along the way.`,
    },
    {
      question: `What are the mile splits for a ${combo.goalLabel.toLowerCase()} ${name}?`,
      answer: `Running an even ${paceMi} per mile, you'd pass mile 1 at ${paceMi}, reach halfway in about ${halfway}, and cross the finish line in ${goal}. Prefer to finish faster than you start? Switch the calculator above to negative split to see per-mile targets that start slower and speed up.`,
    },
    {
      question: `Is a ${combo.goalLabel.toLowerCase()} ${name} a good time?`,
      answer: `Finishing a ${name} in ${combo.goalLabelLong} is ${assessment}. Practicing ${paceMi} per mile in training — on tempo runs, race-pace intervals, and long runs — is the most direct way to make this goal feel routine on race day.`,
    },
  ];
}
