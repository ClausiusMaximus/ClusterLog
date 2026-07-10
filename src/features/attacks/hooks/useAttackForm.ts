import { useState } from "react";

import { createAttack } from "../services/AttackService";

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

    console.log("Attacke gespeichert");

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