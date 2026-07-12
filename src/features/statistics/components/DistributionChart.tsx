import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { ElementType } from "react";

import { CHART_COLORS } from "./constants/chartColors";

export type DistributionItem = {
  label: string;
  value: number;
  icon?: ElementType;
  color?: string;
};

type Props = {
  type: "bar" | "pie";
  data: DistributionItem[];
};

export default function DistributionChart({
  type,
  data,
}: Props) {
  return (
    <ResponsiveContainer
      width="100%"
      height={340}
    >
      {type === "bar" ? (
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
            dataKey="label"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip />

          <Bar
            dataKey="value"
            radius={[6, 6, 0, 0]}
          >
            {data.map((item, index) => (
              <Cell
                key={item.label}
                fill={
                  item.color ??
                  CHART_COLORS[
                    index % CHART_COLORS.length
                  ]
                }
              />
            ))}
          </Bar>
        </BarChart>
      ) : (
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius={60}
            outerRadius={110}
            paddingAngle={3}
            label
          >
            {data.map((item, index) => (
              <Cell
                key={item.label}
                fill={
                  item.color ??
                  CHART_COLORS[
                    index % CHART_COLORS.length
                  ]
                }
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      )}
    </ResponsiveContainer>
  );
}