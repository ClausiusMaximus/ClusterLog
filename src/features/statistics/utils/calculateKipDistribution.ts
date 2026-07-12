import type { Attack } from "@/features/attacks/types/attack";

export type KipDistributionEntry = {
  kip: number;
  count: number;
};

export function calculateKipDistribution(
  attacks: Attack[],
): KipDistributionEntry[] {
  const distribution = Array.from(
    { length: 10 },
    (_, index) => ({
      kip: index + 1,
      count: 0,
    }),
  );

  for (const attack of attacks) {
    if (
      attack.kip >= 1 &&
      attack.kip <= 10
    ) {
      distribution[
        attack.kip - 1
      ].count++;
    }
  }

  return distribution;
}