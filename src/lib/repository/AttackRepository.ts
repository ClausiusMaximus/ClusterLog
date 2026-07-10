import { db } from "../db";
import type { Attack } from "../../features/attacks/types/attack";

export class AttackRepository {
  async save(attack: Attack): Promise<void> {
    await db.attacks.add(attack);
  }

  async getAll(): Promise<Attack[]> {
    return db.attacks.toArray();
  }

  async delete(id: string): Promise<void> {
    await db.attacks.delete(id);
  }

  async getById(id: string) {
    return db.attacks.get(id);
  }
}