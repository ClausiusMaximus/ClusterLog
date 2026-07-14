import { useCallback, useState } from "react";

import { attackRepository } from "@/lib/repositories";

import type { Attack } from "../types/attack";
import { createEmptyAttack } from "../utils/defaultAttack";

type Mode = "create" | "edit";

function buildLoadedAttack(existingAttack: Attack): Attack {
  return {
    ...existingAttack,
    start: new Date(existingAttack.start),
  };
}

export function useAttackForm() {
  const [mode, setMode] = useState<Mode>("create");
  const [attack, setAttack] = useState<Attack>(createEmptyAttack());

  /**
   * Einzelnes Feld aktualisieren
   */
  const update = <K extends keyof Attack>(
    key: K,
    value: Attack[K],
  ) => {
    setAttack((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * Formular mit bestehender Attacke befüllen
   */
  const load = useCallback((existingAttack: Attack) => {
    setAttack(buildLoadedAttack(existingAttack));
    setMode("edit");
  }, []);

  /**
   * Formular zurücksetzen
   */
  const reset = useCallback(() => {
    setAttack(createEmptyAttack());
    setMode("create");
  }, []);

  /**
   * Speichern
   */
  async function save(): Promise<
    "created" | "updated"
  > {
    const attackToSave: Attack = {
      ...attack,
      updatedAt: new Date(),
    };

    if (mode === "create") {
      await attackRepository.create(
        attackToSave,
      );

      reset();

      return "created";
    }

    await attackRepository.update(
      attackToSave,
    );

    reset();

    return "updated";
  }

  return {
    mode,
    attack,
    update,
    load,
    save,
    reset,
  };
}
