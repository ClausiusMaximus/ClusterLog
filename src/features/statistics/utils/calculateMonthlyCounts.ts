import type { Attack } from "@/features/attacks/types/attack";

export type MonthlyCount = {
  month: string;
  label: string;
  count: number;
};

export function calculateMonthlyCounts(
  attacks: Attack[],
): MonthlyCount[] {
  const counts = new Map<string, MonthlyCount>();

  attacks.forEach((attack) => {
    const date = new Date(attack.start);

    const key = `${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, "0")}`;

    const label = date.toLocaleDateString(
      "de-DE",
      {
        month: "short",
        year: "2-digit",
      },
    );

    const current = counts.get(key);

    if (current) {
      current.count++;
    } else {
      counts.set(key, {
        month: key,
        label,
        count: 1,
      });
    }
  });

  return Array.from(counts.values()).sort(
    (a, b) =>
      a.month.localeCompare(b.month),
  );
}