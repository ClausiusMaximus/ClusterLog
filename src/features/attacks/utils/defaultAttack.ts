import { generateId } from "@/shared/generateId";

import type { Attack } from "../types/attack";

const DEFAULT_DURATION = 0;

export function createEmptyAttack(): Attack {
  const now = new Date();

  return {
    id: generateId(),
    start: now,
    duration: DEFAULT_DURATION,
    kip: null,
    side: null,
    activity: null,
    triggers: [],
    notes: "",
    createdAt: now,
    updatedAt: now,
  };
}
