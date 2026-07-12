import type { Attack } from "@/features/attacks/types/attack";

import type {
  StatisticsFilter,
} from "../types/statisticsFilter";

export function filterAttacks(
  attacks: Attack[],
  filter: StatisticsFilter,
): Attack[] {
  const now = new Date();

  return attacks.filter((attack) => {
    if (attack.kip < filter.minKip) {
      return false;
    }

    if (
      filter.activities.length > 0 &&
      !filter.activities.includes(
        attack.activity,
      )
    ) {
      return false;
    }

    if (
      filter.sides.length > 0 &&
      !filter.sides.includes(
        attack.side,
      )
    ) {
      return false;
    }

    if (filter.period !== "all") {
      const attackDate = new Date(
        attack.start,
      );

      const diffDays =
        (now.getTime() -
          attackDate.getTime()) /
        (1000 * 60 * 60 * 24);

      switch (filter.period) {
        case "30d":
          if (diffDays > 30) {
            return false;
          }
          break;

        case "90d":
          if (diffDays > 90) {
            return false;
          }
          break;

        case "year":
          if (diffDays > 365) {
            return false;
          }
          break;
      }
    }

    return true;
  });
}