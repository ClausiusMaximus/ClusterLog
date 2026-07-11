export type CalendarCell = {
  date: Date;
  day: number;

  isCurrentMonth: boolean;
  isToday: boolean;
};

export type CalendarDay = CalendarCell & {
  attackCount: number;
  hasAttack: boolean;
  isSelected: boolean;
};