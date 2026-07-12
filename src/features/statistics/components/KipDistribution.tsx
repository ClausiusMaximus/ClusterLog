import StatisticsSection from "./StatisticsSection";
import KipDistributionChart from "./KipDistributionChart";

import type { Attack } from "@/features/attacks/types/attack";

import {
  calculateKipDistribution,
} from "../utils/calculateKipDistribution";

import { CHART_COLORS } from "./constants/chartColors";

type Props = {
  attacks: Attack[];
};

export default function KipDistribution({
  attacks,
}: Props) {
  const data =
    calculateKipDistribution(attacks).map(
      (item, index) => ({
        ...item,
        color:
          CHART_COLORS[
            index %
              CHART_COLORS.length
          ],
      }),
    );

  return (
    <StatisticsSection
      title="KIP-Verteilung"
    >
      <KipDistributionChart
        data={data}
      />
    </StatisticsSection>
  );
}