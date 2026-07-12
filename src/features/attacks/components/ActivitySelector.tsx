import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ElementType } from "react";

import AppCard from "@/components/common/AppCard";
import IconButtonCard from "@/components/common/IconButtonCard";

import { ACTIVITY_OPTIONS } from "../utils/options";

import type { Activity } from "../options/activities";

type Props = {
  value: Activity;
  onChange: (value: Activity) => void;
};

export default function ActivitySelector({
  value,
  onChange,
}: Props) {
  return (
    <AppCard>
      <Typography
        variant="h6"
        gutterBottom
      >
        Tätigkeit
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4,1fr)",
          gap: 2,
        }}
      >
        {ACTIVITY_OPTIONS.map((activity) => (
          <IconButtonCard
            key={activity.value}
            icon={activity.icon as ElementType}
            label={activity.label}
            selected={
              value === activity.value
            }
            onClick={() =>
              onChange(activity.value)
            }
          />
        ))}
      </Box>
    </AppCard>
  );
}