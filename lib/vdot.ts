const KM_TO_MILES = 0.621371;

export interface Split {
  mile: number;
  label: string;
  splitTimeSeconds: number;
  cumulativeTimeSeconds: number;
}

export interface PaceResult {
  pacePerKmSeconds: number;
  pacePerMileSeconds: number;
  splits: Split[];
}

export function calculatePace(
  distanceKm: number,
  goalTimeSeconds: number
): PaceResult {
  const distanceMiles = distanceKm * KM_TO_MILES;
  const pacePerKmSeconds = goalTimeSeconds / distanceKm;
  const pacePerMileSeconds = goalTimeSeconds / distanceMiles;

  const fullMiles = Math.floor(distanceMiles);
  const splits: Split[] = [];

  for (let mile = 1; mile <= fullMiles; mile++) {
    splits.push({
      mile,
      label: `Mile ${mile}`,
      splitTimeSeconds: Math.round(pacePerMileSeconds),
      cumulativeTimeSeconds: Math.round(pacePerMileSeconds * mile),
    });
  }

  const remainderMiles = distanceMiles - fullMiles;
  if (remainderMiles > 0.001) {
    splits.push({
      mile: fullMiles + 1,
      label: `Finish (${distanceMiles.toFixed(1)} mi)`,
      splitTimeSeconds: Math.round(pacePerMileSeconds * remainderMiles),
      cumulativeTimeSeconds: goalTimeSeconds,
    });
  }

  return {
    pacePerKmSeconds,
    pacePerMileSeconds,
    splits,
  };
}

export function formatPace(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}
