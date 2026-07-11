import Typography from "@mui/material/Typography";
import { getSideLabel } from "@/features/attacks/utils/labels";
import type { Side } from "@/features/attacks/types/attack";
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


type Props = {
  left: number;
  right: number;
  both: number;
};

export default function SideDistributionChart({
  left,
  right,
  both,
}: Props) {
const data = [
  {
    name: getSideLabel("left" as Side),
    value: left,
  },
  {
    name: getSideLabel("both" as Side),
    value: both,
  },
  {
    name: getSideLabel("right" as Side),
    value: right,
  },
];

  return (
    <AppCard>
        <Typography
            variant="h6"
            sx={{ mb: 2 }}
        >
            Seitenverteilung
        </Typography>

        <ResponsiveContainer
            width="100%"
            height={300}
        >
    <       BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar dataKey="value" />
            </BarChart>
        </ResponsiveContainer>
    </AppCard>
  );
}