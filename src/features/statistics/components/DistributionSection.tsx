import { useMemo, useState } from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

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
      if (distributionMode === "side") {
        return sideOptions
          .map((side, index) => ({
            label: side.label,
            value:
              stats.sideDistribution[
                side.value
              ],
            icon: side.icon,
            color:
              CHART_COLORS[
                index % CHART_COLORS.length
              ],
          }))
          .filter(
            (item) => item.value > 0,
          )
          .sort(
            (a, b) =>
              b.value - a.value,
          );
      }

      return activityOptions
        .map((activity, index) => ({
          label: activity.label,
          value:
            stats.activityDistribution[
              activity.value
            ],
          icon: activity.icon,
          color:
            CHART_COLORS[
              index % CHART_COLORS.length
            ],
        }))
        .filter(
          (item) => item.value > 0,
        )
        .sort(
          (a, b) =>
            b.value - a.value,
        );
    }, [distributionMode, stats]);

  return (
    <StatisticsSection
      title="Verteilungen"
      controls={
        <ToggleButtonGroup
          exclusive
          value={distributionMode}
          onChange={(_, value) => {
            if (value) {
              setDistributionMode(value);
            }
          }}
          sx={{
            mb: 3,
          }}
        >
          <ToggleButton value="activity">
            Aktivitäten
          </ToggleButton>

          <ToggleButton value="side">
            Seiten
          </ToggleButton>
        </ToggleButtonGroup>
      }
    >
      <DistributionChart
        type={
          distributionMode === "activity"
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