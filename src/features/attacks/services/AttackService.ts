import { saveAttack } from "../repository/AttackRepository";
import type { Attack } from "../types/attack";

export async function createAttack(
  attack: Attack,
) {
  await saveAttack(attack);
}