import { AttackRepository } from "../repository/AttackRepository";

import type { Attack } from "@/features/attacks/types/attack";

const repository = new AttackRepository();

export class AttackService {
  static async create(attack: Attack) {
    await repository.save(attack);
  }

  static async getAll() {
    return repository.getAll();
  }

  static async delete(id: string) {
    return repository.delete(id);
  }
  
  static async getById(id: string) {
    return repository.getById(id);
  }
}