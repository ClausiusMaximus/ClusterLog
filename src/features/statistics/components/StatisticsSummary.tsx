import Grid from "@mui/material/Grid";

import { AppCard, PageTitle } from "@/components/common";

import type { Statistics } from "../utils/calculateStatistics";
import StatisticsCard from "./StatisticsCard";

type Props = {
  stats: Statistics;
};

export default function StatisticsSummary({
  stats,
}: Props) {
  return (
    <AppCard>
      <PageTitle>
        Kennzahlen
      </PageTitle>

      <Grid
        container
        spacing={2}
      >
        <Grid size={{ xs: 6 }}>
          <StatisticsCard
            title="Attacken gesamt"
            value={stats.total}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <StatisticsCard
            title="Heute"
            value={stats.today}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <StatisticsCard
            title="Diese Woche"
            value={stats.week}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <StatisticsCard
            title="Diesen Monat"
            value={stats.month}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <StatisticsCard
            title="Ø KIP"
            value={parseFloat(stats.averageKip.toFixed(1))}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <StatisticsCard
            title="Ø Dauer"
            value={Math.round(
              stats.averageDuration,
            )}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <StatisticsCard
            title="Längste Attacke"
            value={stats.longestDuration}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <StatisticsCard
            title="Kürzeste Attacke"
            value={stats.shortestDuration}
          />
        </Grid>
      </Grid>
    </AppCard>
  );
}