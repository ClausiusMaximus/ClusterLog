import { useMemo } from "react";

import { useAttacks } from "@/features/attacks/hooks/useAttacks";

import { calculateStatistics } from "../utils";

export function useStatistics() {
  const { attacks, loading } = useAttacks();

  const stats = useMemo(
    () => calculateStatistics(attacks),
    [attacks],
  );

  return {
    loading,
    attacks,
    stats,
  };
}