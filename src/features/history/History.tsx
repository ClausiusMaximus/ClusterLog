import { useMemo, useState } from "react";

import { useAttacks } from "@/features/attacks/hooks/useAttacks";

import CalendarView from "./components/CalendarView";
import DayHistory from "./components/DayHistory";

function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

export default function HistoryPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { attacks, loading } = useAttacks();

  const filteredAttacks = useMemo(() => {
    if (!selectedDate) {
      return [];
    }

    return attacks.filter((attack) => isSameDay(new Date(attack.start), selectedDate));
  }, [attacks, selectedDate]);

  if (selectedDate) {
    return (
      <DayHistory
        date={selectedDate}
        attacks={filteredAttacks}
        loading={loading}
        onBack={() => setSelectedDate(null)}
      />
    );
  }

  return <CalendarView onSelect={setSelectedDate} />;
}