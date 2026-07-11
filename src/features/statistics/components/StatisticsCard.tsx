import Typography from "@mui/material/Typography";

import { AppCard } from "@/components/common";

type Props = {
  title: string;
  value: number;
};

export default function StatisticsCard({
  title,
  value,
}: Props) {
  return (
    <AppCard>
      <Typography variant="body1">
        {title}
      </Typography>

      <Typography
        variant="h3"
        sx={{ mt: 1 }}
      >
        {value}
      </Typography>
    </AppCard>
  );
}