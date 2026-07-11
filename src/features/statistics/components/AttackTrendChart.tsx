

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


export type TrendPoint = {
  label: string;
  count: number;
};

type Props = {
  data: TrendPoint[];
};

export default function AttackTrendChart({
  data,
}: Props) {
  return (
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="label"
            angle={-45}
            textAnchor="end"
            height={60}
          />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="count"
          />
        </LineChart>
      </ResponsiveContainer>
    
  );
}