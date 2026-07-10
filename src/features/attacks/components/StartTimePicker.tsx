import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AppButton, AppCard } from "@/components/common/Index";

type StartTimePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
};

export default function StartTimePicker({
  value,
  onChange,
}: StartTimePickerProps) {
  return (
    <AppCard>
      <Typography variant="h6" gutterBottom>
        Beginn
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <CalendarTodayIcon fontSize="small" />

          <Typography>
            {value.toLocaleDateString("de-DE")}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <AccessTimeIcon fontSize="small" />

          <Typography>
            {value.toLocaleTimeString("de-DE")}
          </Typography>
        </Box>

        <AppButton onClick={() => onChange(new Date())}>
          Jetzt übernehmen
        </AppButton>
      </Box>
    </AppCard>
  );
}