import { useMemo, useState } from "react";

import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { AppCard, PageTitle } from "@/components/common";

import DistributionSection from "./components/DistributionSection";
import AttackTrendChart from "./components/AttackTrendChart";
import StatisticsSummary from "./components/StatisticsSummary";
import { useStatistics } from "./hooks/useStatistics";

export default function Statistics() {
  const { loading, stats } = useStatistics();

  const [trendMode, setTrendMode] =
    useState<"day" | "week" | "month">("day");

  const trendData = useMemo(() => {
    switch (trendMode) {
      case "week":
        return stats.weeklyCounts;

      case "month":
        return stats.monthlyCounts;

      default:
        return stats.dailyCounts;
    }
  }, [trendMode, stats]);

  if (loading) {
    return <>Lade Statistik...</>;
  }

  return (
    <Stack spacing={3}>
      <PageTitle>
        Statistik
      </PageTitle>

      <StatisticsSummary
        stats={stats}
      />

      <DistributionSection
        stats={stats}
      />

      <AppCard>
        <PageTitle>
          Attackenverlauf
        </PageTitle>

        <ToggleButtonGroup
          exclusive
          value={trendMode}
          onChange={(_, value) => {
            if (value) {
              setTrendMode(value);
            }
          }}
          sx={{ mb: 3 }}
        >
          <ToggleButton value="day">
            Tag
          </ToggleButton>

          <ToggleButton value="week">
            Woche
          </ToggleButton>

          <ToggleButton value="month">
            Monat
          </ToggleButton>
        </ToggleButtonGroup>

        <AttackTrendChart
          data={trendData}
        />
      </AppCard>
    </Stack>
  );
}