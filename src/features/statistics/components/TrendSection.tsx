import { useMemo, useState } from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import StatisticsSection from "./StatisticsSection";

import AttackTrendChart from "./AttackTrendChart";

import type { Statistics } from "../utils";

type Props = {
  stats: Statistics;
};

export default function TrendSection({
  stats,
}: Props) {
  const [trendMode, setTrendMode] =
    useState<"day" | "week" | "month">(
      "day",
    );

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

  return (
    <StatisticsSection
        title="Attackenverlauf"
        controls={
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
        }
          >
        <AttackTrendChart
          data={trendData}
      />
    </StatisticsSection>
  );
}