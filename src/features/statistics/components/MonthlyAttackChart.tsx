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

import type { MonthlyCount } from "../utils/calculateMonthlyCounts";

type Props = {
  data: MonthlyCount[];
};

export default function MonthlyAttackChart({
  data,
}: Props) {
  return (
    <AppCard>
      <Typography
        variant="h6"
        sx={{ mb: 2 }}
      >
        Attacken pro Monat
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