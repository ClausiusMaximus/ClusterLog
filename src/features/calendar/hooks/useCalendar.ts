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

function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

export function useCalendar() {
  const { attacks } = useAttacks();

  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const title = useMemo(() => {
    return `${MONTHS[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
  }, [currentMonth]);

  const days = useMemo(() => {
    return buildCalendar(currentMonth).map((day) => {
      const attackCount = attacks.filter((attack) => isSameDay(new Date(attack.start), day.date)).length;

      const isSelected = selectedDate !== null && isSameDay(selectedDate, day.date);

      return {
        ...day,
        attackCount,
        hasAttack: attackCount > 0,
        isSelected,
      };
    });
  }, [currentMonth, attacks, selectedDate]);

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