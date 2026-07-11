import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import type { CalendarDay as CalendarDayType } from "../types/calendar";

type Props = {
  day: CalendarDayType;
  onClick: () => void;
};

export default function CalendarDay({
  day,
  onClick,
}: Props) {
  const getSeverityColor = () => {
    const count = day.attackCount;

    if (count >= 10) return "secondary.main";
    if (count >= 7) return "error.main";
    if (count >= 5) return "warning.dark";
    if (count >= 3) return "warning.main";

    return "success.main";
  };

  const severityColor = getSeverityColor();

  return (
    <Paper
      onClick={onClick}
      elevation={0}
      sx={{
        position: "relative",

        height: 72,
        p: 1,

        cursor: "pointer",

        border: "2px solid",
        borderColor: day.isSelected
          ? "primary.main"
          : "divider",

        bgcolor: day.isToday
          ? "action.selected"
          : day.isCurrentMonth
            ? "background.paper"
            : "action.hover",

        opacity: day.isCurrentMonth ? 1 : 0.45,

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        overflow: "hidden",

        transition:
          "transform .15s ease, box-shadow .15s ease, border-color .15s ease",

        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 3,
          borderColor: "primary.main",
        },
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
          height: 22,
        }}
      >
        {day.attackCount > 0 && (
          <Box
            sx={{
              minWidth: 20,
              height: 20,

              px: 0.75,

              borderRadius: 999,

              bgcolor: severityColor,
              color: "common.white",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              fontSize: "0.70rem",
              fontWeight: 700,
            }}
          >
            {day.attackCount}
          </Box>
        )}
      </Box>

      {day.attackCount > 0 && (
        <Box
          sx={{
            position: "absolute",

            left: 0,
            bottom: 0,

            width: "100%",
            height: 5,

            bgcolor: severityColor,
          }}
        />
      )}
    </Paper>
  );
}