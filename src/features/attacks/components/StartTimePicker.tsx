import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { AppButton, AppCard } from "@/components/common";

import {
  formatDate,
  formatTime,
} from "../utils/formatters";

type StartTimePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
};

export default function StartTimePicker({
  value,
  onChange,
}: StartTimePickerProps) {
  const handleNow = () => {
    onChange(new Date());
  };

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

          <Typography>
            {formatDate(value)}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center" }}
        >
          <AccessTimeIcon fontSize="small" />

          <Typography>
            {formatTime(value)}
          </Typography>
        </Stack>

        <AppButton onClick={handleNow}>
          Jetzt übernehmen
        </AppButton>
      </Stack>
    </AppCard>
  );
}