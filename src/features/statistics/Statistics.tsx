import { useMemo } from "react";

import Stack from "@mui/material/Stack";

import { PageTitle } from "@/components/common";

import AttackTimeHeatmap from "./components/AttackTimeHeatmap";
import DistributionSection from "./components/DistributionSection";
import KipDistribution from "./components/KipDistribution";
import StatisticsFilterPanel from "./components/StatisticsFilterPanel";
import StatisticsSummary from "./components/StatisticsSummary";
import TrendSection from "./components/TrendSection";

import { useStatistics } from "./hooks/useStatistics";
import { useStatisticsFilter } from "./hooks/useStatisticsFilter";

import { calculateStatistics } from "./utils";
import { filterAttacks } from "./utils/filterAttacks";

export default function Statistics() {
  const {
    loading,
    attacks,
  } = useStatistics();

  const {
    filter,
    updateFilter,
    resetFilter,
  } = useStatisticsFilter();

  const filteredAttacks = useMemo(
    () =>
      filterAttacks(
        attacks,
        filter,
      ),
    [attacks, filter],
  );

  const stats = useMemo(
    () =>
      calculateStatistics(
        filteredAttacks,
      ),
    [filteredAttacks],
  );

  if (loading) {
    return <>Lade Statistik...</>;
  }

  return (
    <Stack spacing={3}>
      <PageTitle>
        Statistik
      </PageTitle>

      <StatisticsFilterPanel
        filter={filter}
        onChange={updateFilter}
        onReset={resetFilter}
      />

      <StatisticsSummary
        stats={stats}
      />

      <DistributionSection
        stats={stats}
      />

      <AttackTimeHeatmap
        attacks={filteredAttacks}
      />

      <KipDistribution
        attacks={filteredAttacks}
      />

      <TrendSection
        stats={stats}
      />
    </Stack>
  );
}