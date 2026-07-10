import { useState } from "react";

// Local fallback for creating an attack. Keeps this hook self-contained
// in environments where the external AttackService module isn't available.
const createAttack = async (attack: Attack) => {
  // replace with real service call when available
  console.log("createAttack (local):", attack);
  return Promise.resolve(attack);
};

import type { Activity, Side, Attack } from "../types/attack";
import { createEmptyAttack } from "../utils/defaultAttack";

export function useAttackForm() {
  const [attack, setAttack] = useState<Attack>(createEmptyAttack());

  const setStart = (start: Date) => {
    setAttack((prev) => ({
      ...prev,
      start,
    }));
  };

  const setDuration = (duration: number) => {
    setAttack((prev) => ({
      ...prev,
      duration,
    }));
  };

  const setKip = (kip: number) => {
    setAttack((prev) => ({
      ...prev,
      kip,
    }));
  };

  const setSide = (side: Side) => {
    setAttack((prev) => ({
      ...prev,
      side,
    }));
  };

  const setActivity = (activity: Activity) => {
    setAttack((prev) => ({
      ...prev,
      activity,
    }));
  };

  const save = async () => {
    const newAttack: Attack = {
      ...attack,

      id: crypto.randomUUID(),

      createdAt: new Date(),

      updatedAt: new Date(),
    };

    await createAttack(newAttack);

    console.log("Gespeichert:", newAttack);

    setAttack(createEmptyAttack());
  };

  return {
    attack,

    start: attack.start,
    duration: attack.duration,
    kip: attack.kip,
    side: attack.side,
    activity: attack.activity,

    setStart,
    setDuration,
    setKip,
    setSide,
    setActivity,

    save,
  };
}