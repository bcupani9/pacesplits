export type DistanceId = "5k" | "10k" | "half-marathon" | "marathon";

export interface Distance {
  id: DistanceId;
  name: string;
  shortName: string;
  distanceKm: number;
}

export interface Combo {
  slug: string;
  distance: Distance;
  goalTimeSeconds: number;
  goalLabel: string;
  goalLabelLong: string;
}

export const DISTANCES: Distance[] = [
  { id: "5k", name: "5K", shortName: "5K", distanceKm: 5 },
  { id: "10k", name: "10K", shortName: "10K", distanceKm: 10 },
  {
    id: "half-marathon",
    name: "Half Marathon",
    shortName: "Half",
    distanceKm: 21.0975,
  },
  {
    id: "marathon",
    name: "Marathon",
    shortName: "Marathon",
    distanceKm: 42.195,
  },
];

function range(startSeconds: number, endSeconds: number, stepSeconds: number): number[] {
  const times: number[] = [];
  for (let t = startSeconds; t <= endSeconds; t += stepSeconds) {
    times.push(t);
  }
  return times;
}

function goalTimesForDistance(id: DistanceId): number[] {
  switch (id) {
    case "5k":
      return range(15 * 60, 30 * 60, 30);
    case "10k":
      return range(28 * 60, 65 * 60, 60);
    case "half-marathon":
      return range(65 * 60, 165 * 60, 120);
    case "marathon": {
      const competitive = range(150 * 60, 225 * 60, 60);
      const recreational = range(230 * 60, 300 * 60, 300);
      return [...competitive, ...recreational];
    }
  }
}

export function formatGoalLabel(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `Sub ${h}:${m.toString().padStart(2, "0")}`;
  }
  if (s === 0) {
    return `Sub ${m} minutes`;
  }
  return `Sub ${m}:${s.toString().padStart(2, "0")}`;
}

export function formatGoalLabelLong(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `sub ${h} hour${h === 1 ? "" : "s"} ${m} minute${m === 1 ? "" : "s"}`;
  }
  if (s === 0) {
    return `sub ${m} minute${m === 1 ? "" : "s"}`;
  }
  return `sub ${m} minutes ${s} seconds`;
}

function goalTimeToSlugPart(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `${h}-${m.toString().padStart(2, "0")}`;
  }
  if (s === 0) {
    return `${m}`;
  }
  return `${m}-${s.toString().padStart(2, "0")}`;
}

function buildSlug(distanceId: DistanceId, goalTimeSeconds: number): string {
  return `${distanceId}-sub-${goalTimeToSlugPart(goalTimeSeconds)}`;
}

export function generateCombos(): Combo[] {
  const combos: Combo[] = [];

  for (const distance of DISTANCES) {
    for (const goalTimeSeconds of goalTimesForDistance(distance.id)) {
      combos.push({
        slug: buildSlug(distance.id, goalTimeSeconds),
        distance,
        goalTimeSeconds,
        goalLabel: formatGoalLabel(goalTimeSeconds),
        goalLabelLong: formatGoalLabelLong(goalTimeSeconds),
      });
    }
  }

  return combos;
}

export const ALL_COMBOS = generateCombos();

export function getComboBySlug(slug: string): Combo | undefined {
  return ALL_COMBOS.find((combo) => combo.slug === slug);
}

export function groupCombosByDistance(): Map<DistanceId, Combo[]> {
  const grouped = new Map<DistanceId, Combo[]>();

  for (const distance of DISTANCES) {
    grouped.set(distance.id, []);
  }

  for (const combo of ALL_COMBOS) {
    grouped.get(combo.distance.id)!.push(combo);
  }

  return grouped;
}

export function getDistanceDisplayName(id: DistanceId): string {
  return DISTANCES.find((d) => d.id === id)!.name;
}

const FEATURED_GOAL_SECONDS: Record<DistanceId, number[]> = {
  "5k": [
    15 * 60,
    18 * 60,
    20 * 60,
    22 * 60,
    24 * 60,
    25 * 60,
    28 * 60,
    30 * 60,
  ],
  "10k": [
    35 * 60,
    40 * 60,
    42 * 60,
    45 * 60,
    50 * 60,
    52 * 60,
    55 * 60,
    60 * 60,
  ],
  "half-marathon": [
    75 * 60,
    85 * 60,
    95 * 60,
    105 * 60,
    115 * 60,
    125 * 60,
    135 * 60,
    165 * 60,
  ],
  marathon: [
    165 * 60,
    180 * 60,
    195 * 60,
    210 * 60,
    225 * 60,
    240 * 60,
    270 * 60,
    300 * 60,
  ],
};

export function getFeaturedGoalTimes(distanceId: DistanceId): Combo[] {
  return FEATURED_GOAL_SECONDS[distanceId]
    .map((seconds) =>
      ALL_COMBOS.find(
        (combo) =>
          combo.distance.id === distanceId &&
          combo.goalTimeSeconds === seconds
      )
    )
    .filter((combo): combo is Combo => combo !== undefined);
}
