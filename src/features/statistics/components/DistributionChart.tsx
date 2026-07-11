

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

export type DistributionItem = {
  label: string;
  value: number;
};

type Props = {
  type: "bar" | "pie";
  data: DistributionItem[];
};

const COLORS = [
  "#1976d2",
  "#2e7d32",
  "#ed6c02",
  "#9c27b0",
  "#d32f2f",
  "#00838f",
  "#5d4037",
  "#616161",
];

export default function DistributionChart({
  type,
  data,
}: Props) {
  return (
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        {type === "bar" ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar dataKey="value" />
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
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