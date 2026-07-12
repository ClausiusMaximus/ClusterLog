import type { Attack } from "@/features/attacks/types/attack";

export type HeatmapEntry = {
  hour: number;
  count: number;
  intensity: number;
};

export function calculateAttackHeatmap(
  attacks: Attack[],
): HeatmapEntry[] {
  const counts = Array.from(
    { length: 24 },
    (_, hour) => ({
      hour,
      count: 0,
    }),
  );

  for (const attack of attacks) {
    const date = new Date(attack.start);

    if (Number.isNaN(date.getTime())) {
      continue;
    }

    counts[date.getHours()].count++;
  }

  const maxCount = Math.max(
    ...counts.map((entry) => entry.count),
    1,
  );

  return counts.map((entry) => ({
    ...entry,
    intensity:
      entry.count / maxCount,
  }));
}