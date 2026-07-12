import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CHART_COLORS } from "./constants/chartColors";
import KipDistributionTooltip from "./KipDistributionTooltip";

export type KipDistributionItem = {
  kip: number;
  count: number;
  color?: string;
};

type Props = {
  data: KipDistributionItem[];
};

export default function KipDistributionChart({
  data,
}: Props) {
  return (
    <ResponsiveContainer
      width="100%"
      height={340}
    >
      <BarChart
        data={data}
        margin={{
          top: 16,
          right: 16,
          left: 0,
          bottom: 8,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis
          dataKey="kip"
          tickLine={false}
          axisLine={false}
          label={{
            value: "KIP",
            position: "insideBottom",
            offset: -4,
          }}
        />

        <YAxis
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
          label={{
            value: "Attacken",
            angle: -90,
            position: "insideLeft",
          }}
        />

        <Tooltip
          content={<KipDistributionTooltip />}
        />

        <Bar
          dataKey="count"
          radius={[6, 6, 0, 0]}
        >
          {data.map((item, index) => (
            <Cell
              key={item.kip}
              fill={
                item.color ??
                CHART_COLORS[
                  index %
                    CHART_COLORS.length
                ]
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}