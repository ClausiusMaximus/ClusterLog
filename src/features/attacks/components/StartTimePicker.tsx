import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Divider from "@mui/material/Divider";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { AppButton, AppCard } from "@/components/common";

import {
  formatDate,
  formatTime,
} from "../utils/formatters";

type StartTimePickerProps = {
  start: Date;
  duration: number; // seconds
  onStartChange: (date: Date) => void;
  onDurationChange: (seconds: number) => void;
};

export default function StartTimePicker({
  start,
  duration,
  onStartChange,
  onDurationChange,
}: StartTimePickerProps) {
  const handleStartNow = () => {
    onStartChange(new Date());
  };

  const handleEndNow = () => {
    const now = new Date();
    const newDuration = Math.max(
      0,
      Math.floor((now.getTime() - start.getTime()) / 1000),
    );

    onDurationChange(newDuration);
  };

  const endDate = new Date(start.getTime() + duration * 1000);

  return (
    <AppCard>
      <Typography variant="h6" gutterBottom>
        Beginn
      </Typography>

      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center" }}
        >
          <CalendarTodayIcon fontSize="small" />

          <Typography>{formatDate(start)}</Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center" }}
        >
          <AccessTimeIcon fontSize="small" />

          <Typography>{formatTime(start)}</Typography>
        </Stack>

        <AppButton onClick={handleStartNow}>Jetzt übernehmen</AppButton>

        <Divider sx={{ my: 1 }} />

        <Typography variant="h6" gutterBottom>
          Ende
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center" }}
        >
          <CalendarTodayIcon fontSize="small" />

          <Typography>{formatDate(endDate)}</Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center" }}
        >
          <AccessTimeIcon fontSize="small" />

          <Typography>{formatTime(endDate)}</Typography>
        </Stack>

        <AppButton onClick={handleEndNow}>Jetzt übernehmen</AppButton>
      </Stack>
    </AppCard>
  );
}