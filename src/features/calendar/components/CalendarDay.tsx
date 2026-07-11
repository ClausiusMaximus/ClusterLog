import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import type { CalendarDay as CalendarDayType } from "../types/calendar";

type Props = {
  day: CalendarDayType;
};

export default function CalendarDay({
  day,
}: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        height: 72,
        p: 1,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: day.isCurrentMonth
          ? "background.paper"
          : "action.hover",
        opacity: day.isCurrentMonth ? 1 : 0.45,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          alignSelf: "flex-end",
          fontWeight: day.isToday ? 700 : 400,
          color: day.isToday
            ? "primary.main"
            : "text.primary",
        }}
      >
        {day.day}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 12,
        }}
      >
        {day.hasAttack && (
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "error.main",
            }}
          />
        )}
      </Box>
    </Paper>
  );
}