import { db } from "../db";

import type { Attack } from "@/features/attacks/types/attack";

class AttackRepository {
  async getAll(): Promise<Attack[]> {
  const attacks = await db.attacks
    .orderBy("start")
    .reverse()
    .toArray();

  return attacks.map((attack) => ({
    ...attack,

    start: new Date(attack.start),

    createdAt: new Date(attack.createdAt),

    updatedAt: new Date(attack.updatedAt),

    triggers: attack.triggers ?? [],

    notes: attack.notes ?? "",
  }));
}
  async getById(id: string): Promise<Attack | undefined> {
  const attack = await db.attacks.get(id);

  if (!attack) {
    return undefined;
  }

  return {
    ...attack,

    start: new Date(attack.start),

    createdAt: new Date(attack.createdAt),

    updatedAt: new Date(attack.updatedAt),

    triggers: attack.triggers ?? [],

    notes: attack.notes ?? "",
  };
}

  async create(attack: Attack): Promise<string> {
    await db.attacks.add(attack);
    return attack.id;
  }

  async update(attack: Attack): Promise<void> {
    await db.attacks.put(attack);
  }

  async delete(id: string): Promise<void> {
    await db.attacks.delete(id);
  }

  async clear(): Promise<void> {
    await db.attacks.clear();
  }

  async count(): Promise<number> {
    return db.attacks.count();
  }

  async exists(id: string): Promise<boolean> {
    const attack = await db.attacks.get(id);
    return attack !== undefined;
  }
}

export const attackRepository = new AttackRepository();