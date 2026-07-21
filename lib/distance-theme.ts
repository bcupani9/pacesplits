import type { DistanceId } from "./combos";

export interface DistanceTheme {
  gradient: string;
  color: string;
  glow: string;
}

export const DISTANCE_THEMES: Record<DistanceId, DistanceTheme> = {
  "5k": {
    gradient: "var(--5k-gradient)",
    color: "#e7a93a",
    glow: "rgba(231, 169, 58, 0.35)",
  },
  "10k": {
    gradient: "var(--10k-gradient)",
    color: "#d9832f",
    glow: "rgba(217, 131, 47, 0.35)",
  },
  "half-marathon": {
    gradient: "var(--half-gradient)",
    color: "#c1401f",
    glow: "rgba(193, 64, 31, 0.35)",
  },
  marathon: {
    gradient: "var(--marathon-gradient)",
    color: "#9e3018",
    glow: "rgba(158, 48, 24, 0.35)",
  },
};

export function getDistanceTheme(id: DistanceId): DistanceTheme {
  return DISTANCE_THEMES[id];
}
