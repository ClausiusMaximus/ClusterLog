import type {Attack,} from "@/features/attacks/types/attack";
import type { Side } from "@/features/attacks/options/sides";

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