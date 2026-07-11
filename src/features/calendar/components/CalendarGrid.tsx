import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import CalendarDay from "./CalendarDay";

import type { CalendarDay as CalendarDayType } from "../types/calendar";

type Props = {
  days: CalendarDayType[];
  onSelect: (date: Date) => void;
};

const WEEKDAYS = [
  "Mo",
  "Di",
  "Mi",
  "Do",
  "Fr",
  "Sa",
  "So",
];

export default function CalendarGrid({
  days,
  onSelect,
}: Props) {
  return (
    <>
      <Grid container spacing={1} sx={{ mb: 1 }}>
        {WEEKDAYS.map((weekday) => (
          <Grid
            key={weekday}
            size={{ xs: 12 / 7 }}
          >
            <Typography
              variant="subtitle2"
              align="center"
              sx={{
                fontWeight: 700,
              }}
            >
              {weekday}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={1}>
        {days.map((day) => (
          <Grid
            key={day.date.toISOString()}
            size={{ xs: 12 / 7 }}
          >
            <CalendarDay 
              day={day} 
              onClick={() => onSelect(day.date)} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}