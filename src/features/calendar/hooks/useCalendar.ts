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

  const [selectedDate, setSelectedDate] =
    useState<Date | null>(new Date());

  const title = useMemo(() => {
    return `${MONTHS[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
  }, [currentMonth]);

  const days = useMemo(() => {
    return buildCalendar(currentMonth).map(
      (day) => {
        const attackCount = attacks.filter(
          (attack) => {
            const attackDate = new Date(
              attack.start,
            );

            return (
              attackDate.getFullYear() ===
                day.date.getFullYear() &&
              attackDate.getMonth() ===
                day.date.getMonth() &&
              attackDate.getDate() ===
                day.date.getDate()
            );
          },
        ).length;

        const isSelected =
          selectedDate !== null &&
          selectedDate.getFullYear() ===
            day.date.getFullYear() &&
          selectedDate.getMonth() ===
            day.date.getMonth() &&
          selectedDate.getDate() ===
            day.date.getDate();

        return {
          ...day,
          attackCount,
          hasAttack: attackCount > 0,
          isSelected,
        };
      },
    );
  }, [
    currentMonth,
    attacks,
    selectedDate,
  ]);

  const previousMonth = () => {
    setCurrentMonth(
      (prev) =>
        new Date(
          prev.getFullYear(),
          prev.getMonth() - 1,
          1,
        ),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      (prev) =>
        new Date(
          prev.getFullYear(),
          prev.getMonth() + 1,
          1,
        ),
    );
  };

  const selectDate = (
    date: Date,
  ) => {
    setSelectedDate(date);
  };

  return {
    currentMonth,
    title,
    days,

    selectedDate,

    previousMonth,
    nextMonth,
    selectDate,
  };
}