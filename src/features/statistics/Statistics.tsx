import { useMemo, useState } from "react";

import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { AppCard, PageTitle } from "@/components/common";

import type { Activity } from "@/features/attacks/types/attack";
import { getActivityLabel } from "@/features/attacks/utils/labels";

import AttackTrendChart from "./components/AttackTrendChart";
import DistributionChart, {
  type DistributionItem,
} from "./components/DistributionChart";
import StatisticsSummary from "./components/StatisticsSummary";
import { useStatistics } from "./hooks/useStatistics";

export default function Statistics() {
  const { loading, stats } = useStatistics();

  const [distributionMode, setDistributionMode] =
    useState<"activity" | "side">(
      "activity",
    );

  const [trendMode, setTrendMode] =
    useState<"day" | "week" | "month">(
      "day",
    );

  const distributionData =
    useMemo<DistributionItem[]>(() => {
      if (distributionMode === "side") {
        return [
          {
            label: "Links",
            value: stats.sideDistribution.left,
          },
          {
            label: "Beidseitig",
            value: stats.sideDistribution.both,
          },
          {
            label: "Rechts",
            value: stats.sideDistribution.right,
          },
        ];
      }

      return Object.entries(
        stats.activityDistribution,
      )
        .filter(([, value]) => value > 0)
        .map(([activity, value]) => ({
          label: getActivityLabel(
            activity as Activity,
          ),
          value,
        }));
    }, [distributionMode, stats]);

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

      <AppCard>
        <PageTitle>
          Verteilungen
        </PageTitle>

        <ToggleButtonGroup
          exclusive
          value={distributionMode}
          onChange={(_, value) => {
            if (value) {
              setDistributionMode(value);
            }
          }}
          sx={{ mb: 3 }}
        >
          <ToggleButton value="activity">
            Aktivitäten
          </ToggleButton>

          <ToggleButton value="side">
            Seiten
          </ToggleButton>
        </ToggleButtonGroup>

        <DistributionChart
          type={
            distributionMode === "activity"
              ? "pie"
              : "bar"
          }
          data={distributionData}
        />
      </AppCard>

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