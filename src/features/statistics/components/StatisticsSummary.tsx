import Grid from "@mui/material/Grid";

import { AppCard, PageTitle } from "@/components/common";

import { Icons } from "@/shared/icons";

import { formatDuration } from "@/features/attacks/utils/formatters";
import { getKipColor } from "@/features/attacks/utils/display";

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
            icon={Icons.attack}
            color="error.main"
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <StatisticsCard
            title="Heute"
            value={stats.today}
            icon={Icons.attack}
            color="warning.main"
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <StatisticsCard
            title="Diese Woche"
            value={stats.week}
            icon={Icons.calendar}
            color="primary.main"
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <StatisticsCard
            title="Diesen Monat"
            value={stats.month}
            icon={Icons.calendar}
            color="success.main"
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <StatisticsCard
            title="Ø KIP"
            value={stats.averageKip.toFixed(1)}
            icon={Icons.kip}
            color={getKipColor(stats.averageKip)}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <StatisticsCard
            title="Ø Dauer"
            value={formatDuration(
              Math.round(stats.averageDuration),
            )}
            icon={Icons.duration}
            color="info.main"
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <StatisticsCard
            title="Längste Attacke"
            value={formatDuration(
              stats.longestDuration,
            )}
            icon={Icons.duration}
            color="warning.main"
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <StatisticsCard
            title="Kürzeste Attacke"
            value={formatDuration(
              stats.shortestDuration,
            )}
            icon={Icons.duration}
            color="success.main"
          />
        </Grid>
      </Grid>
    </AppCard>
  );
}