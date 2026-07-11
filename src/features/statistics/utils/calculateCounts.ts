import type { Attack } from "@/features/attacks/types/attack";

export type CountStatistics = {
  total: number;
  today: number;
  week: number;
  month: number;
};

export function calculateCounts(
  attacks: Attack[],
): CountStatistics {
  const now = new Date();

  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const weekStart = new Date(today);

  const day = weekStart.getDay();

  // Montag = Wochenbeginn
  weekStart.setDate(
    weekStart.getDate() -
      (day === 0 ? 6 : day - 1),
  );

  const monthStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
  );

  let todayCount = 0;
  let weekCount = 0;
  let monthCount = 0;

  attacks.forEach((attack) => {
    const start = new Date(attack.start);

    if (start >= today) {
      todayCount++;
    }

    if (start >= weekStart) {
      weekCount++;
    }

    if (start >= monthStart) {
      monthCount++;
    }
  });

  return {
    total: attacks.length,
    today: todayCount,
    week: weekCount,
    month: monthCount,
  };
}