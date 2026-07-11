import type {
  Activity,
  Attack,
} from "@/features/attacks/types/attack";

export type ActivityDistribution = Record<
  Activity,
  number
>;

export function calculateActivityDistribution(
  attacks: Attack[],
): ActivityDistribution {
  const distribution: ActivityDistribution = {
    sleep: 0,
    work: 0,
    household: 0,
    leisure: 0,
    driving: 0,
    eating: 0,
    sport: 0,
    other: 0,
  };

  attacks.forEach((attack) => {
    distribution[attack.activity]++;
  });

  return distribution;
}