import { useMemo, useState } from "react";

import Stack from "@mui/material/Stack";

import { SelectableButton } from "@/components/common";

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
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 3 }}
          >
            <SelectableButton
              selected={trendMode === "day"}
              onClick={() => setTrendMode("day")}
            >
              Tag
            </SelectableButton>

            <SelectableButton
              selected={trendMode === "week"}
              onClick={() => setTrendMode("week")}
            >
              Woche
            </SelectableButton>

            <SelectableButton
              selected={trendMode === "month"}
              onClick={() => setTrendMode("month")}
            >
              Monat
            </SelectableButton>
          </Stack>
        }
          >
        <AttackTrendChart
          data={trendData}
      />
    </StatisticsSection>
  );
}
