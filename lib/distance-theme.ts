import type { DistanceId } from "./combos";

export interface DistanceTheme {
  gradient: string;
  color: string;
  glow: string;
}

export const DISTANCE_THEMES: Record<DistanceId, DistanceTheme> = {
  "5k": {
    gradient: "var(--5k-gradient)",
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.35)",
  },
  "10k": {
    gradient: "var(--10k-gradient)",
    color: "#2f6fed",
    glow: "rgba(47, 111, 237, 0.35)",
  },
  "half-marathon": {
    gradient: "var(--half-gradient)",
    color: "#7c3aed",
    glow: "rgba(124, 58, 237, 0.35)",
  },
  marathon: {
    gradient: "var(--marathon-gradient)",
    color: "#ef4444",
    glow: "rgba(239, 68, 68, 0.35)",
  },
};

export function getDistanceTheme(id: DistanceId): DistanceTheme {
  return DISTANCE_THEMES[id];
}
