import { useMemo, useState } from "react";

const MONTHS = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

export function useCalendar() {
  const [currentMonth, setCurrentMonth] =
    useState(() => new Date());

  const title = useMemo(() => {
    return `${MONTHS[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
  }, [currentMonth]);

  const previousMonth = () => {
    setCurrentMonth((prev) =>
      new Date(
        prev.getFullYear(),
        prev.getMonth() - 1,
        1,
      ),
    );
  };

  const nextMonth = () => {
    setCurrentMonth((prev) =>
      new Date(
        prev.getFullYear(),
        prev.getMonth() + 1,
        1,
      ),
    );
  };

  return {
    currentMonth,
    title,
    previousMonth,
    nextMonth,
  };
}