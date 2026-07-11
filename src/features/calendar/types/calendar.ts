export type CalendarDay = {
    date: Date;
    day: number;
    isCurrentMonth: boolean;
    isToday: boolean;

    attackCount: number;
    hasAttack: boolean;
};