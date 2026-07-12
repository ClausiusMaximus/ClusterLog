import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { AppCard } from "@/components/common";

import type { ElementType } from "react";

type Props = {
  title: string;
  value: string | number;
  icon: ElementType;
  color?: string;
};

export default function StatisticsCard({
  title,
  value,
  icon: Icon,
  color = "primary.main",
}: Props) {
  return (
    <AppCard>
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            alignItems: "center",
          }}
        >
          <Icon
            sx={{
              color,
              fontSize: 28,
            }}
          />

          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            {title}
          </Typography>
        </Stack>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {value}
        </Typography>
      </Stack>
    </AppCard>
  );
}