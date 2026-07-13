import { generateId } from "@/shared/generateId";

import type { Attack } from "../types/attack";

export function createEmptyAttack(): Attack {
  const now = new Date();

  return {
    id: generateId(),

    start: now,

    duration: 0,

    kip: 0,

    side: "left",

    activity: "other",

    triggers: [],

    notes: "",

    createdAt: now,

    updatedAt: now,
  };
}
