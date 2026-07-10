import type { Attack } from "@/features/attacks/types/attack";

import { AttackRepository } from "../repositories/AttackRepository";

class AttackService {
  private readonly repository = new AttackRepository();

  async getAll(): Promise<Attack[]> {
    return this.repository.getAll();
  }

  async getById(
    id: string,
  ): Promise<Attack | undefined> {
    return this.repository.getById(id);
  }

  async create(attack: Attack): Promise<string> {
    return this.repository.create(attack);
  }

  async update(attack: Attack): Promise<void> {
    return this.repository.update(attack);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async clear(): Promise<void> {
    return this.repository.clear();
  }
}

export const attackService = new AttackService();