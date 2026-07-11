import Typography from "@mui/material/Typography";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppCard } from "@/components/common";

import type { WeeklyCount } from "../utils/calculateWeeklyCounts";

type Props = {
  data: WeeklyCount[];
};

export default function WeeklyAttackChart({
  data,
}: Props) {
  return (
    <AppCard>
      <Typography
        variant="h6"
        sx={{ mb: 2 }}
      >
        Attacken pro Woche
      </Typography>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="label" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </AppCard>
  );
}