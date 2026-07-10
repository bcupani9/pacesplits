import {
  formatGoalLabelLong,
  type Distance,
  type DistanceId,
} from "@/lib/combos";

function capitalizeGoalLabel(seconds: number): string {
  const label = formatGoalLabelLong(seconds);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

type SkillTier =
  | "highly-competitive"
  | "strong-age-group"
  | "solid-recreational"
  | "average-finisher"
  | "finish-focused";

type TierBand = "fast" | "middle" | "slow";

const TIER_THRESHOLDS_SECONDS: Record<
  DistanceId,
  { tier: SkillTier; maxSeconds: number }[]
> = {
  marathon: [
    { tier: "highly-competitive", maxSeconds: 2 * 3600 + 45 * 60 },
    { tier: "strong-age-group", maxSeconds: 3 * 3600 + 15 * 60 },
    { tier: "solid-recreational", maxSeconds: 3 * 3600 + 45 * 60 },
    { tier: "average-finisher", maxSeconds: 4 * 3600 + 15 * 60 },
    { tier: "finish-focused", maxSeconds: Infinity },
  ],
  "half-marathon": [
    { tier: "highly-competitive", maxSeconds: 80 * 60 },
    { tier: "strong-age-group", maxSeconds: 95 * 60 },
    { tier: "solid-recreational", maxSeconds: 110 * 60 },
    { tier: "average-finisher", maxSeconds: 125 * 60 },
    { tier: "finish-focused", maxSeconds: Infinity },
  ],
  "10k": [
    { tier: "highly-competitive", maxSeconds: 36 * 60 },
    { tier: "strong-age-group", maxSeconds: 42 * 60 },
    { tier: "solid-recreational", maxSeconds: 50 * 60 },
    { tier: "average-finisher", maxSeconds: 58 * 60 },
    { tier: "finish-focused", maxSeconds: Infinity },
  ],
  "5k": [
    { tier: "highly-competitive", maxSeconds: 17 * 60 },
    { tier: "strong-age-group", maxSeconds: 20 * 60 },
    { tier: "solid-recreational", maxSeconds: 24 * 60 },
    { tier: "average-finisher", maxSeconds: 28 * 60 },
    { tier: "finish-focused", maxSeconds: Infinity },
  ],
};

const TIER_SENTENCES: Record<
  SkillTier,
  (ctx: {
    distanceName: string;
    goalLabelLong: string;
    pacePerKm: string;
  }) => string[]
> = {
  "highly-competitive": ({ distanceName, goalLabelLong, pacePerKm }) => [
    `${goalLabelLong} for a ${distanceName} is elite territory — about ${pacePerKm}/km even.`,
    `Few runners crack ${goalLabelLong} at the ${distanceName}; ${pacePerKm}/km is the rhythm.`,
    `A ${goalLabelLong} ${distanceName} sits among the fastest fields — ${pacePerKm}/km when even.`,
    `This is a highly competitive ${distanceName} target: ${goalLabelLong}, or ${pacePerKm} per km.`,
    `${goalLabelLong} over ${distanceName} distance marks highly competitive pacing at ${pacePerKm}/km.`,
  ],
  "strong-age-group": ({ distanceName, goalLabelLong, pacePerKm }) => [
    `${goalLabelLong} is a strong age-group ${distanceName} — roughly ${pacePerKm}/km.`,
    `A ${goalLabelLong} ${distanceName} puts you ahead of most recreational fields at ${pacePerKm}/km.`,
    `Strong age-group pace for a ${distanceName}: ${goalLabelLong}, about ${pacePerKm} per km.`,
    `Run ${goalLabelLong} and you're in strong age-group range for a ${distanceName} (${pacePerKm}/km).`,
    `${goalLabelLong} at the ${distanceName} is a serious but reachable strong age-group mark — ${pacePerKm}/km.`,
  ],
  "solid-recreational": ({ distanceName, goalLabelLong, pacePerKm }) => [
    `${goalLabelLong} is a solid recreational ${distanceName} goal — near ${pacePerKm}/km.`,
    `A ${goalLabelLong} ${distanceName} is a respectable recreational finish at ${pacePerKm}/km.`,
    `Solid recreational territory: ${goalLabelLong} for a ${distanceName}, or ${pacePerKm} per km.`,
    `Many trained recreational runners target around ${goalLabelLong} for the ${distanceName} (${pacePerKm}/km).`,
    `${goalLabelLong} over a ${distanceName} reflects solid recreational fitness — ${pacePerKm}/km evenly.`,
  ],
  "average-finisher": ({ distanceName, goalLabelLong, pacePerKm }) => [
    `${goalLabelLong} lines up with a typical ${distanceName} finisher — about ${pacePerKm}/km.`,
    `An average ${distanceName} finish lands near ${goalLabelLong}, or ${pacePerKm} per km.`,
    `${goalLabelLong} is squarely average-finisher pace for a ${distanceName} (${pacePerKm}/km).`,
    `Most ${distanceName} runners cross somewhere near ${goalLabelLong} — ${pacePerKm}/km when even.`,
    `Expect ${pacePerKm}/km to hold a ${goalLabelLong} ${distanceName} — average-finisher territory.`,
  ],
  "finish-focused": ({ distanceName, goalLabelLong, pacePerKm }) => [
    `${goalLabelLong} is a finish-focused ${distanceName} — about ${pacePerKm}/km.`,
    `The priority here is completing the ${distanceName} in ${goalLabelLong} (~${pacePerKm}/km).`,
    `A ${goalLabelLong} ${distanceName} is about getting to the finish — ${pacePerKm}/km evenly.`,
    `Finish-focused pacing: ${goalLabelLong} for the ${distanceName}, near ${pacePerKm} per km.`,
    `${goalLabelLong} over a ${distanceName} is a completion goal first — ${pacePerKm}/km is the anchor.`,
  ],
};

const TRAINING_SENTENCES: Record<TierBand, string[]> = {
  fast: [
    "Expect structured speed work and a strong mileage base behind a pace like this.",
    "Intervals, tempo runs, and high-volume weeks usually back goals at this level.",
    "Holding this effort takes deliberate speed sessions layered on consistent mileage.",
    "Race-pace workouts and a robust weekly volume tend to support finishes here.",
    "Speed-specific training and sustained mileage are the usual foundation.",
  ],
  middle: [
    "Steady easy miles plus occasional tempo or interval work usually get you there.",
    "Most runners mix comfortable volume with a few faster sessions each week.",
    "Regular easy running with sprinkled tempo efforts tends to build this fitness.",
    "A patient base of easy miles, plus some structured faster days, goes a long way.",
    "Consistency on easy runs, with tempo work when ready, is the common path.",
  ],
  slow: [
    "Consistency and time on your feet matter more than speed work at this stage.",
    "Regular, manageable runs that build endurance beat forcing hard sessions.",
    "A patient buildup — showing up often — tends to matter more than intensity.",
    "Gradual mileage gains and repeatable outings usually outperform chasing pace.",
    "Let fitness accumulate week by week; steady volume beats rushed speed work.",
  ],
};

const CLOSING_SENTENCES = [
  "Use the splits above to rehearse this rhythm on training runs.",
  "Glance at the mile markers above when you want a feel for each segment.",
  "The table above is a handy checkpoint during workouts and long runs.",
  "Memorize a few mile splits above so race day feels familiar, not foreign.",
  "Reference the breakdown above to know what each mile should feel like.",
  "Keep the splits above nearby — they turn an abstract pace into something tangible.",
  "Run key miles at the paces above and the full distance starts to click.",
  "The mile-by-mile view above helps you pace by feel, not just by watch.",
];

function getSkillTier(distanceId: DistanceId, goalSeconds: number): SkillTier {
  for (const { tier, maxSeconds } of TIER_THRESHOLDS_SECONDS[distanceId]) {
    if (goalSeconds <= maxSeconds) {
      return tier;
    }
  }
  return "finish-focused";
}

function getTierBand(tier: SkillTier): TierBand {
  if (tier === "highly-competitive" || tier === "strong-age-group") {
    return "fast";
  }
  if (tier === "solid-recreational" || tier === "average-finisher") {
    return "middle";
  }
  return "slow";
}

function formatPacePerKm(paceSecPerKm: number): string {
  const minutes = Math.floor(paceSecPerKm / 60);
  const seconds = Math.round(paceSecPerKm % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function distanceSeed(distanceId: DistanceId): number {
  return distanceId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function pickVariant(
  goalSeconds: number,
  distanceId: DistanceId,
  salt: number,
  count: number
): number {
  return (goalSeconds * 13 + distanceSeed(distanceId) * 7 + salt) % count;
}

function buildTierSentence(
  distance: Distance,
  goalSeconds: number,
  paceSecPerKm: number,
  tier: SkillTier
): string {
  const ctx = {
    distanceName: distance.name,
    goalLabelLong: capitalizeGoalLabel(goalSeconds),
    pacePerKm: formatPacePerKm(paceSecPerKm),
  };
  const variants = TIER_SENTENCES[tier](ctx);
  return variants[pickVariant(goalSeconds, distance.id, 0, variants.length)];
}

function buildTrainingSentence(
  goalSeconds: number,
  distanceId: DistanceId,
  tier: SkillTier
): string {
  const band = getTierBand(tier);
  const variants = TRAINING_SENTENCES[band];
  return variants[pickVariant(goalSeconds, distanceId, 11, variants.length)];
}

function buildClosingSentence(goalSeconds: number, distanceId: DistanceId): string {
  return CLOSING_SENTENCES[
    pickVariant(goalSeconds, distanceId, 23, CLOSING_SENTENCES.length)
  ];
}

export function generateContextParagraph(
  distance: Distance,
  goalSeconds: number,
  paceSecPerKm: number
): string[] {
  const tier = getSkillTier(distance.id, goalSeconds);

  return [
    buildTierSentence(distance, goalSeconds, paceSecPerKm, tier),
    buildTrainingSentence(goalSeconds, distance.id, tier),
    buildClosingSentence(goalSeconds, distance.id),
  ];
}
