import { useCallback, useState } from "react";

import { attackService } from "@/lib/services";

import type { Attack } from "../types/attack";
import { createEmptyAttack } from "../utils/defaultAttack";

type Mode = "create" | "edit";

export function useAttackForm() {
  const [mode, setMode] =
    useState<Mode>("create");

  const [attack, setAttack] =
    useState<Attack>(
      createEmptyAttack(),
    );

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
  const load = useCallback(
    (existingAttack: Attack) => {
      setAttack({
        ...existingAttack,
        start: new Date(existingAttack.start),
      });

      setMode("edit");
    },
    [],
  );

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
      await attackService.create(
        attackToSave,
      );

      reset();

      return "created";
    }

    await attackService.update(
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