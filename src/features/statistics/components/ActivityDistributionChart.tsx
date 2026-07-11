import Typography from "@mui/material/Typography";
import { getActivityLabel } from "@/features/attacks/utils/labels";
import type { Activity } from "@/features/attacks/types/attack";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { AppCard } from "@/components/common";

import type { ActivityDistribution } from "../utils/calculateActivityDistribution";

type Props = {
  distribution: ActivityDistribution;
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

export default function ActivityDistributionChart({
  distribution,
}: Props) {
 const data = Object.entries(distribution)
  .filter(([, value]) => value > 0)
  .map(([activity, value]) => ({
    name: getActivityLabel(
      activity as Activity,
    ),
    value,
  }));
  return (
    <AppCard>
      <Typography
        variant="h6"
        sx={{ mb: 2 }}
      >
        Aktivitäten
      </Typography>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
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
      </ResponsiveContainer>
    </AppCard>
  );
}