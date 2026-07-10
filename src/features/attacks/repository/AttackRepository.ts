import { db } from "@/lib/db";
import type { Attack } from "../types/attack";

export async function saveAttack(
  attack: Attack,
): Promise<void> {
  await db.attacks.add(attack);
}