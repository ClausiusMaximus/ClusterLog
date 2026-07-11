import Stack from "@mui/material/Stack";

import { PageTitle } from "@/components/common";

import CalendarGrid from "./components/CalendarGrid";
import CalendarHeader from "./components/CalendarHeader";
import { useCalendar } from "./hooks/useCalendar";

export default function CalendarPage() {
  const {
    title,
    days,
    previousMonth,
    nextMonth,
    selectDate,
  } = useCalendar();

  return (
    <Stack spacing={3}>
      <PageTitle>
        Kalender
      </PageTitle>

      <CalendarHeader
        title={title}
        onPrevious={previousMonth}
        onNext={nextMonth}
      />

      <CalendarGrid 
          days={days}
          onSelect={selectDate} 
        />
    </Stack>
  );
}