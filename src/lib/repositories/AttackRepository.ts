import { db } from "../db";

import type { Attack } from "@/features/attacks/types/attack";

class AttackRepository {
  async getAll(): Promise<Attack[]> {
    return db.attacks
      .orderBy("start")
      .reverse()
      .toArray();
  }

  async getById(id: string): Promise<Attack | undefined> {
    return db.attacks.get(id);
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