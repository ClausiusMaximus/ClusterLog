import type { Attack } from "@/features/attacks/types/attack";

export type AttackGroup = {
  title: string;
  attacks: Attack[];
};

export function groupAttacks(
  attacks: Attack[],
): AttackGroup[] {
  const groups = new Map<string, Attack[]>();

  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  for (const attack of attacks) {
    const date = new Date(attack.start);

    let title = date.toLocaleDateString("de-DE");

    if (date.toDateString() === today.toDateString()) {
      title = "Heute";
    } else if (
      date.toDateString() === yesterday.toDateString()
    ) {
      title = "Gestern";
    }

    const current = groups.get(title) ?? [];

    current.push(attack);

    groups.set(title, current);
  }

  return Array.from(groups.entries()).map(
    ([title, attacks]) => ({
      title,
      attacks,
    }),
  );
}