import type { Attack } from "../types/attack";

export function createEmptyAttack(): Attack {
  const now = new Date();

  return {
    id: "",

    start: now,

    duration: 0,

    kip: 0,

    side: "left",

    activity: "other",

    createdAt: now,

    updatedAt: now,
  };
}