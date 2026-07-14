import type { CalendarCell } from "../types/calendar";

const CALENDAR_GRID_SIZE = 42;
const FIRST_DAY_OFFSET = 6;

export function buildCalendar(currentMonth: Date): CalendarCell[] {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const firstWeekday = (firstDay.getDay() + FIRST_DAY_OFFSET) % 7;

  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - firstWeekday);

  const today = new Date();

  return Array.from({ length: CALENDAR_GRID_SIZE }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    return {
      date,
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isToday:
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear(),
    };
  });
}