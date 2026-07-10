const KM_TO_MILES = 0.621371;

export type PacingStrategy = "even" | "negative";

export interface Split {
  mile: number;
  label: string;
  splitTimeSeconds: number;
  cumulativeTimeSeconds: number;
  paceThisMile?: number;
}

export interface KmSplit {
  km: number;
  cumulativeSeconds: number;
  paceThisKm?: number;
}

export interface SplitsResult {
  paceSecPerKm: number;
  splits: KmSplit[];
  strategy: PacingStrategy;
  adjustedPaces?: number[];
}

export interface PaceResult {
  pacePerKmSeconds: number;
  pacePerMileSeconds: number;
  splits: Split[];
  strategy: PacingStrategy;
  adjustedPaces?: number[];
}

function linearRampPaces(
  segmentCount: number,
  basePace: number,
  negativeSplitPercent: number
): number[] {
  const swing = negativeSplitPercent / 100;
  const rawPaces: number[] = [];

  for (let i = 0; i < segmentCount; i++) {
    const t = segmentCount === 1 ? 0 : i / (segmentCount - 1);
    const factor = 1 + swing / 2 - swing * t;
    rawPaces.push(basePace * factor);
  }

  return rawPaces;
}

function normalizePaces(
  rawPaces: number[],
  segmentDistances: number[],
  goalSeconds: number
): number[] {
  const rawTotal = rawPaces.reduce(
    (sum, pace, i) => sum + pace * segmentDistances[i],
    0
  );
  const correction = goalSeconds / rawTotal;
  return rawPaces.map((pace) => pace * correction);
}

export function calculateSplits(
  distanceKm: number,
  goalSeconds: number,
  strategy: PacingStrategy = "even",
  negativeSplitPercent: number = 4
): SplitsResult {
  const avgPaceSecPerKm = goalSeconds / distanceKm;
  const totalKm = Math.ceil(distanceKm);
  const splits: KmSplit[] = [];

  if (strategy === "even") {
    let cumulative = 0;
    for (let km = 1; km <= totalKm; km++) {
      const segmentDistance = km < totalKm ? 1 : distanceKm - (totalKm - 1);
      cumulative += avgPaceSecPerKm * segmentDistance;
      splits.push({
        km,
        cumulativeSeconds: cumulative,
        paceThisKm: avgPaceSecPerKm,
      });
    }

    if (splits.length > 0) {
      splits[splits.length - 1].cumulativeSeconds = goalSeconds;
    }

    return {
      paceSecPerKm: avgPaceSecPerKm,
      splits,
      strategy,
    };
  }

  const unitDistances = Array.from({ length: totalKm }, (_, i) =>
    i < totalKm - 1 ? 1 : distanceKm - (totalKm - 1)
  );
  const rawPaces = linearRampPaces(totalKm, avgPaceSecPerKm, negativeSplitPercent);
  const adjustedPaces = normalizePaces(rawPaces, unitDistances, goalSeconds);

  let cumulative = 0;
  for (let i = 0; i < adjustedPaces.length; i++) {
    cumulative += adjustedPaces[i] * unitDistances[i];
    splits.push({
      km: i + 1,
      cumulativeSeconds: cumulative,
      paceThisKm: adjustedPaces[i],
    });
  }

  if (splits.length > 0) {
    splits[splits.length - 1].cumulativeSeconds = goalSeconds;
  }

  return {
    paceSecPerKm: avgPaceSecPerKm,
    splits,
    strategy,
    adjustedPaces,
  };
}

export function calculatePace(
  distanceKm: number,
  goalTimeSeconds: number,
  strategy: PacingStrategy = "even",
  negativeSplitPercent: number = 4
): PaceResult {
  const distanceMiles = distanceKm * KM_TO_MILES;
  const pacePerKmSeconds = goalTimeSeconds / distanceKm;
  const pacePerMileSeconds = goalTimeSeconds / distanceMiles;

  const fullMiles = Math.floor(distanceMiles);
  const remainderMiles = distanceMiles - fullMiles;
  const segmentCount = fullMiles + (remainderMiles > 0.001 ? 1 : 0);
  const segmentDistances: number[] = [];

  for (let mile = 1; mile <= fullMiles; mile++) {
    segmentDistances.push(1);
  }
  if (remainderMiles > 0.001) {
    segmentDistances.push(remainderMiles);
  }

  const splits: Split[] = [];
  let adjustedPaces: number[] | undefined;

  if (strategy === "even" || segmentCount === 0) {
    for (let mile = 1; mile <= fullMiles; mile++) {
      splits.push({
        mile,
        label: `Mile ${mile}`,
        splitTimeSeconds: Math.round(pacePerMileSeconds),
        cumulativeTimeSeconds: Math.round(pacePerMileSeconds * mile),
        paceThisMile: pacePerMileSeconds,
      });
    }

    if (remainderMiles > 0.001) {
      splits.push({
        mile: fullMiles + 1,
        label: `Finish (${distanceMiles.toFixed(1)} mi)`,
        splitTimeSeconds: Math.round(pacePerMileSeconds * remainderMiles),
        cumulativeTimeSeconds: goalTimeSeconds,
        paceThisMile: pacePerMileSeconds,
      });
    }
  } else {
    const rawPaces = linearRampPaces(
      segmentCount,
      pacePerMileSeconds,
      negativeSplitPercent
    );
    adjustedPaces = normalizePaces(
      rawPaces,
      segmentDistances,
      goalTimeSeconds
    );

    let cumulative = 0;
    for (let i = 0; i < adjustedPaces.length; i++) {
      const segmentTime = adjustedPaces[i] * segmentDistances[i];
      cumulative += segmentTime;
      const mile = i + 1;
      const isFinish = i === adjustedPaces.length - 1 && remainderMiles > 0.001;

      splits.push({
        mile,
        label: isFinish
          ? `Finish (${distanceMiles.toFixed(1)} mi)`
          : `Mile ${mile}`,
        splitTimeSeconds: Math.round(segmentTime),
        cumulativeTimeSeconds: Math.round(cumulative),
        paceThisMile: adjustedPaces[i],
      });
    }

    if (splits.length > 0) {
      splits[splits.length - 1].cumulativeTimeSeconds = goalTimeSeconds;
    }
  }

  return {
    pacePerKmSeconds,
    pacePerMileSeconds,
    splits,
    strategy,
    adjustedPaces,
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
