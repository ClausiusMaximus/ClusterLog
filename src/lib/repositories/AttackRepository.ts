import { db } from "../db";

import type { Attack } from "@/features/attacks/types/attack";

export class AttackRepository {
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
}