import type { Attack } from "@/features/attacks/types/attack";

export type DailyCount = {
  date: string;
  label: string;
  count: number;
};

export function calculateDailyCounts(
  attacks: Attack[],
): DailyCount[] {
  const counts = new Map<
    string,
    DailyCount
  >();

  attacks.forEach((attack) => {
    const date = new Date(attack.start);

    // ISO-Datum für korrekte Sortierung
    const key = date
      .toISOString()
      .slice(0, 10);

    // Deutsches Datum für die Anzeige
    const label =
      date.toLocaleDateString("de-DE");

    const current = counts.get(key);

    if (current) {
      current.count++;
    } else {
      counts.set(key, {
        date: key,
        label,
        count: 1,
      });
    }
  });

  return Array.from(counts.values()).sort(
    (a, b) =>
      a.date.localeCompare(b.date),
  );
}