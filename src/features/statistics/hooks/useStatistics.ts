import { useMemo } from "react";

import { useAttacks } from "@/features/attacks/hooks/useAttacks";
import type { Attack } from "@/features/attacks/types/attack";

import { calculateStatistics } from "../utils";

export const useStatistics = (attacksOverride?: Attack[]) => {
  const { attacks: repositoryAttacks, loading } = useAttacks();
  const attacks = attacksOverride ?? repositoryAttacks;
  const stats = useMemo(() => calculateStatistics(attacks), [attacks]);

  return {
    loading,
    attacks,
    stats,
  };
};
