import { Box, Typography } from "@mui/material";

import { AppCard, NumberButton } from "@/components/common";

type DurationPickerProps = {
  value: number;
  onChange: (value: number) => void;
};

const adjustments = [-60, -10, -1, 1, 10, 60];

function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return [
    h.toString().padStart(2, "0"),
    m.toString().padStart(2, "0"),
    s.toString().padStart(2, "0"),
  ].join(":");
}

export default function DurationPicker({
  value,
  onChange,
}: DurationPickerProps) {
  const changeDuration = (delta: number) => {
    onChange(Math.max(0, value + delta));
  };

  return (
    <AppCard>
      <Typography variant="h6" gutterBottom>
        Dauer
      </Typography>

      <Typography
        variant="h3"
        align="center"
        sx={{
          my: 3,
          fontFamily: "monospace",
        }}
      >
        {formatDuration(value)}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
        }}
      >
        {adjustments.map((delta) => (
          <NumberButton
            key={delta}
            label={delta > 0 ? `+${delta}` : delta}
            onClick={() => changeDuration(delta)}
          />
        ))}
      </Box>
    </AppCard>
  );
}