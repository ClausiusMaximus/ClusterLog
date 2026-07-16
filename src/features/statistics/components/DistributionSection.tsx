import { useMemo, useState } from "react";

import Stack from "@mui/material/Stack";

import { SelectableButton } from "@/components/common";

import {
  activityOptions,
} from "@/features/attacks/options/activities";

import {
  sideOptions,
} from "@/features/attacks/options/sides";

import { CHART_COLORS } from "./constants/chartColors";
import type { Statistics } from "../utils";

import DistributionChart, {
  type DistributionItem,
} from "./DistributionChart";
import DistributionLegend from "./DistributionLegend";
import StatisticsSection from "./StatisticsSection";

type Props = {
  stats: Statistics;
};

export default function DistributionSection({
  stats,
}: Props) {
  const [
    distributionMode,
    setDistributionMode,
  ] = useState<"activity" | "side">(
    "activity",
  );

  const distributionData =
    useMemo<DistributionItem[]>(() => {
      const items: DistributionItem[] =
        distributionMode === "activity"
          ? activityOptions
              .map((activity, index) => ({
                label: activity.label,
                value:
                  stats.activityDistribution[
                    activity.value
                  ],
                icon: activity.icon,
                color:
                  CHART_COLORS[
                    index %
                      CHART_COLORS.length
                  ],
              }))
              .filter(
                (item) =>
                  item.value > 0,
              )
          : sideOptions
              .map((side, index) => ({
                label: side.label,
                value:
                  stats.sideDistribution[
                    side.value
                  ],
                icon: side.icon,
                color:
                  CHART_COLORS[
                    index %
                      CHART_COLORS.length
                  ],
              }))
              .filter(
                (item) =>
                  item.value > 0,
              );

      items.sort(
        (a, b) =>
          b.value - a.value,
      );

      const total = items.reduce(
        (sum, item) =>
          sum + item.value,
        0,
      );

      return items.map((item) => ({
        ...item,
        percent:
          total === 0
            ? 0
            : (item.value / total) *
              100,
      }));
    }, [distributionMode, stats]);

  return (
    <StatisticsSection
      title="Verteilungen"
      controls={
        <Stack
          direction="row"
          spacing={1}
        >
          <SelectableButton
            selected={distributionMode === "activity"}
            onClick={() => setDistributionMode("activity")}
          >
            Aktivitäten
          </SelectableButton>

          <SelectableButton
            selected={distributionMode === "side"}
            onClick={() => setDistributionMode("side")}
          >
            Seiten
          </SelectableButton>
        </Stack>
      }
    >
      <DistributionChart
        type={
          distributionMode ===
          "activity"
            ? "pie"
            : "bar"
        }
        data={distributionData}
      />

      <DistributionLegend
        data={distributionData}
      />
    </StatisticsSection>
  );
}
