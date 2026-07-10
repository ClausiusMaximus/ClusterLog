import type { Attack } from "@/features/attacks/types/attack";

type AttackGroup = {
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

  attacks.forEach((attack) => {
    const date = new Date(attack.start);

    let key = date.toLocaleDateString("de-DE");

    if (date.toDateString() === today.toDateString()) {
      key = "Heute";
    } else if (
      date.toDateString() === yesterday.toDateString()
    ) {
      key = "Gestern";
    }

    const current = groups.get(key) ?? [];

    current.push(attack);

    groups.set(key, current);
  });

  return Array.from(groups.entries()).map(
    ([title, attacks]) => ({
      title,
      attacks,
    }),
  );
}