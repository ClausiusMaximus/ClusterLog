import type { Attack } from "@/features/attacks/types/attack";

export type AverageStatistics = {
  averageKip: number;
  averageDuration: number;
  longestDuration: number;
  shortestDuration: number;
};

export function calculateAverages(
  attacks: Attack[],
): AverageStatistics {
  if (attacks.length === 0) {
    return {
      averageKip: 0,
      averageDuration: 0,
      longestDuration: 0,
      shortestDuration: 0,
    };
  }

  let kipSum = 0;
  let kipCount = 0;
  let durationSum = 0;

  let longestDuration = attacks[0].duration;
  let shortestDuration = attacks[0].duration;

  attacks.forEach((attack) => {
    if (attack.kip !== null) {
      kipSum += attack.kip;
      kipCount++;
    }
    durationSum += attack.duration;

    longestDuration = Math.max(
      longestDuration,
      attack.duration,
    );

    shortestDuration = Math.min(
      shortestDuration,
      attack.duration,
    );
  });

  return {
    averageKip:
      kipCount === 0 ? 0 : kipSum / kipCount,

    averageDuration:
      durationSum / attacks.length,

    longestDuration,

    shortestDuration,
  };
}
