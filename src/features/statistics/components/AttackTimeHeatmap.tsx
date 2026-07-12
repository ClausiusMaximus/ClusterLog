import Grid from "@mui/material/Grid";

import StatisticsSection from "./StatisticsSection";
import HeatmapCell from "./HeatmapCell";

import type { Attack } from "@/features/attacks/types/attack";

import {
  calculateAttackHeatmap,
} from "../utils/calculateAttackHeatmap";

type Props = {
  attacks: Attack[];
};

export default function AttackTimeHeatmap({
  attacks,
}: Props) {
  const heatmap =
    calculateAttackHeatmap(attacks);

  return (
    <StatisticsSection
      title="Attacken nach Uhrzeit"
    >
      <Grid
        container
        spacing={1}
      >
        {heatmap.map((entry) => (
          <Grid
            key={entry.hour}
            size={{
              xs: 3,
              sm: 2,
              md: 1,
            }}
          >
            <HeatmapCell
              entry={entry}
            />
          </Grid>
        ))}
      </Grid>
    </StatisticsSection>
  );
}