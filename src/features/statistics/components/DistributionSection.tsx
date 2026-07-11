import { useMemo, useState } from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { AppCard, PageTitle } from "@/components/common";

import type { Activity } from "@/features/attacks/types/attack";
import { getActivityLabel } from "@/features/attacks/utils/labels";

import DistributionChart, {
  type DistributionItem,
} from "./DistributionChart";

import type { Statistics } from "../utils";

type Props = {
  stats: Statistics;
};

export default function DistributionSection({
  stats,
}: Props) {
  const [distributionMode, setDistributionMode] =
    useState<"activity" | "side">(
      "activity",
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

  return (
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
  );
}