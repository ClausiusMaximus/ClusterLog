import type { Attack } from "@/features/attacks/types/attack";

export type WeeklyCount = {
  week: string;
  label: string;
  count: number;
};

function getWeekStart(date: Date): Date {
  const start = new Date(date);

  const day = start.getDay();

  start.setDate(
    start.getDate() -
      (day === 0 ? 6 : day - 1),
  );

  start.setHours(0, 0, 0, 0);

  return start;
}

export function calculateWeeklyCounts(
  attacks: Attack[],
): WeeklyCount[] {
  const counts = new Map<
    string,
    WeeklyCount
  >();

  attacks.forEach((attack) => {
    const start = getWeekStart(
      new Date(attack.start),
    );

    const key = start
      .toISOString()
      .slice(0, 10);

    const label =
      start.toLocaleDateString("de-DE");

    const current = counts.get(key);

    if (current) {
      current.count++;
    } else {
      counts.set(key, {
        week: key,
        label,
        count: 1,
      });
    }
  });

  return Array.from(counts.values()).sort(
    (a, b) =>
      a.week.localeCompare(b.week),
  );
}