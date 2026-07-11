import Stack from "@mui/material/Stack";

import { PageTitle } from "@/components/common";

import DistributionSection from "./components/DistributionSection";
import StatisticsSummary from "./components/StatisticsSummary";
import TrendSection from "./components/TrendSection";
import { useStatistics } from "./hooks/useStatistics";

export default function Statistics() {
  const { loading, stats } =
    useStatistics();

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

      <TrendSection
        stats={stats}
      />
    </Stack>
  );
}