import Typography from "@mui/material/Typography";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppCard } from "@/components/common";

import type { DailyCount } from "../utils/calculateDailyCounts";

type Props = {
  data: DailyCount[];
};

export default function DailyAttackChart({
  data,
}: Props) {
  return (
    <AppCard>
      <Typography
        variant="h6"
        sx={{ mb: 2 }}
      >
        Attacken pro Tag
      </Typography>

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

          <YAxis
            allowDecimals={false}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="count"
          />
        </LineChart>
      </ResponsiveContainer>
    </AppCard>
  );
}