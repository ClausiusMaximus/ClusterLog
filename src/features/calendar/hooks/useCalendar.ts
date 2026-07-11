import { useMemo, useState } from "react";

import { buildCalendar } from "../utils/buildCalendar";

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
    useState(() => {
      const today = new Date();

      return new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
      );
    });

  const title = useMemo(() => {
    return `${MONTHS[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
  }, [currentMonth]);

  const days = useMemo(
    () => buildCalendar(currentMonth),
    [currentMonth],
  );

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
    days,
    previousMonth,
    nextMonth,
  };
}