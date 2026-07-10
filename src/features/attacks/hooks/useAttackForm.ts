import { useState } from "react";

import { attackService } from "@/lib/services/AttackService";

import type { Attack } from "../types/attack";
import { createEmptyAttack } from "../utils/defaultAttack";

type Mode = "create" | "edit";

export function useAttackForm() {
  const [mode, setMode] = useState<Mode>("create");

  const [attack, setAttack] = useState<Attack>(
    createEmptyAttack(),
  );

  /**
   * Einzelnes Feld aktualisieren
   */
  function update<K extends keyof Attack>(
    key: K,
    value: Attack[K],
  ) {
    setAttack((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  /**
   * Formular mit bestehender Attacke befüllen
   */
  function load(existingAttack: Attack) {
    setAttack({
      ...existingAttack,
      start: new Date(existingAttack.start),
    });

    setMode("edit");
  }

  /**
   * Formular zurücksetzen
   */
  function reset() {
    setAttack(createEmptyAttack());
    setMode("create");
  }

  /**
   * Speichern
   */
  async function save() {
    if (mode === "create") {
      await attackService.create(attack);
    } else {
      await attackService.update(attack);
    }

    reset();
  }

  return {
    // Zustand
    mode,
    attack,

    // Aktionen
    update,
    load,
    save,
    reset,
  };
}