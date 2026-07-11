import Stack from "@mui/material/Stack";

import { PageTitle } from "@/components/common";

import CalendarGrid from "@/features/calendar/components/CalendarGrid";
import CalendarHeader from "@/features/calendar/components/CalendarHeader";
import { useCalendar } from "@/features/calendar/hooks/useCalendar";

type Props = {
  onSelect: (date: Date) => void;
};

export default function CalendarView({
  onSelect,
}: Props) {
  const {
    title,
    days,
    previousMonth,
    nextMonth,
  } = useCalendar();

  return (
    <Stack spacing={3}>
      <PageTitle>
        Verlauf
      </PageTitle>

      <CalendarHeader
        title={title}
        onPrevious={previousMonth}
        onNext={nextMonth}
      />

      <CalendarGrid
        days={days}
        onSelect={onSelect}
      />
    </Stack>
  );
}