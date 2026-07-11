import { useState } from "react";

import { useAttacks } from "@/features/attacks/hooks/useAttacks";

import CalendarView from "./components/CalendarView";
import DayHistory from "./components/DayHistory";

export default function HistoryPage() {
  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);

  const { attacks, loading } =
    useAttacks();
  
  const filteredAttacks =
  selectedDate === null
    ? []
    : attacks.filter((attack) => {
        const attackDate = new Date(
          attack.start,
        );

        return (
          attackDate.getFullYear() ===
            selectedDate.getFullYear() &&
          attackDate.getMonth() ===
            selectedDate.getMonth() &&
          attackDate.getDate() ===
            selectedDate.getDate()
        );
      });  

  if (selectedDate) {
    return (
      <DayHistory
        date={selectedDate}
        attacks={filteredAttacks}
        loading={loading}
        onBack={() =>
          setSelectedDate(null)
        }
      />
    );
  }

  return (
    <CalendarView
      onSelect={setSelectedDate}
    />
  );
}