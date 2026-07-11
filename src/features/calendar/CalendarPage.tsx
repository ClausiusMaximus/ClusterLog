import Stack from "@mui/material/Stack";

import { PageTitle } from "@/components/common";

import CalendarHeader from "./components/CalendarHeader";
import { useCalendar } from "./hooks/useCalendar";

export default function CalendarPage() {
  const {
    title,
    previousMonth,
    nextMonth,
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
    </Stack>
  );
}