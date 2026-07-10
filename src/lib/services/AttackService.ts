import type { Attack } from "@/features/attacks/types/attack";

import { attackRepository } from "../repositories/AttackRepository";

class AttackService {
  async getAll(): Promise<Attack[]> {
    return attackRepository.getAll();
  }

  async getById(
    id: string,
  ): Promise<Attack | undefined> {
    return attackRepository.getById(id);
  }

  async create(
    attack: Attack,
  ): Promise<string> {
    return attackRepository.create(attack);
  }

  async update(
    attack: Attack,
  ): Promise<void> {
    return attackRepository.update(attack);
  }

  async delete(
    id: string,
  ): Promise<void> {
    return attackRepository.delete(id);
  }

  async clear(): Promise<void> {
    return attackRepository.clear();
  }

  async count(): Promise<number> {
    return attackRepository.count();
  }

  async exists(
    id: string,
  ): Promise<boolean> {
    return attackRepository.exists(id);
  }
}

export const attackService = new AttackService();