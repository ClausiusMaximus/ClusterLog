import type {
  Attack,
  Side,
} from "@/features/attacks/types/attack";

export type SideDistribution = Record<
  Side,
  number
>;

export function calculateSideDistribution(
  attacks: Attack[],
): SideDistribution {
  const distribution: SideDistribution = {
    left: 0,
    right: 0,
    both: 0,
  };

  attacks.forEach((attack) => {
    distribution[attack.side]++;
  });

  return distribution;
}