import { useMemo, useState } from "react";

import { useAttacks } from "@/features/attacks/hooks/useAttacks";

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
  const { attacks } = useAttacks();

  const [currentMonth, setCurrentMonth] =
    useState(() => {
      const today = new Date();

      return new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
      );
    });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);


  const title = useMemo(() => {
    return `${MONTHS[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
  }, [currentMonth]);

  const days = useMemo(() => {
    return buildCalendar(currentMonth).map(
      (day) => {
        const attackCount = attacks.filter(
          (attack) => {
            const date = new Date(
              attack.start,
            );

            return (
              date.getFullYear() ===
                day.date.getFullYear() &&
              date.getMonth() ===
                day.date.getMonth() &&
              date.getDate() ===
                day.date.getDate()
            );
          },
        ).length;

        return {
          ...day,
          attackCount,
          hasAttack: attackCount > 0,

          isSelected:
            selectedDate !== null &&
            selectedDate.getFullYear() ===
              day.date.getFullYear() &&
            selectedDate.getMonth() ===
              day.date.getMonth() &&
            selectedDate.getDate() ===
              day.date.getDate(),
        };
      },
    );
  }, [currentMonth, attacks, selectedDate]);

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
  const selectDate = (date: Date) => {
    setSelectedDate(date);
  }

  return {
    currentMonth,
    title,
    days,
    previousMonth,
    nextMonth,
    
    selectedDate,
    selectDate,
  };
}