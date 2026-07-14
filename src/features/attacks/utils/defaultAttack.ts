import { generateId } from "@/shared/generateId";

import type { Attack } from "../types/attack";

const DEFAULT_DURATION = 0;
const DEFAULT_KIP = 0;
const DEFAULT_SIDE = "left";
const DEFAULT_ACTIVITY = "other";

export function createEmptyAttack(): Attack {
  const now = new Date();

  return {
    id: generateId(),
    start: now,
    duration: DEFAULT_DURATION,
    kip: DEFAULT_KIP,
    side: DEFAULT_SIDE,
    activity: DEFAULT_ACTIVITY,
    triggers: [],
    notes: "",
    createdAt: now,
    updatedAt: now,
  };
}
