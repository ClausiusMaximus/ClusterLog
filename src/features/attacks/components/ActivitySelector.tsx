import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AppCard, NumberButton } from "@/components/common";

import type { Activity } from "../types/attack";

type Props = {
  value: Activity;
  onChange: (activity: Activity) => void;
};

const activities = [
  { value: "sleep", label: "😴 Schlaf" },
  { value: "work", label: "💼 Arbeit" },
  { value: "household", label: "🏠 Haushalt" },
  { value: "leisure", label: "🚶 Freizeit" },
  { value: "driving", label: "🚗 Autofahren" },
  { value: "eating", label: "🍽 Essen" },
  { value: "sport", label: "🏃 Sport" },
  { value: "other", label: "❓ Sonstiges" },
] as const;

export default function ActivitySelector({
  value,
  onChange,
}: Props) {
  return (
    <AppCard>
      <Typography variant="h6" gutterBottom>
        Tätigkeit
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 1,
        }}
      >
        {activities.map((activity) => (
          <NumberButton
            key={activity.value}
            label={activity.label}
            selected={value === activity.value}
            onClick={() => onChange(activity.value as Activity)}
          />
        ))}
      </Box>
    </AppCard>
  );
}