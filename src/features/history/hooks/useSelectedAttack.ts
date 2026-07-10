import { useState } from "react";

import type { Attack } from "@/features/attacks/types/attack";

export function useSelectedAttack() {
  const [selectedAttack, setSelectedAttack] = useState<Attack | null>(null);

  function open(attack: Attack) {
    setSelectedAttack(attack);
  }

  function close() {
    setSelectedAttack(null);
  }

  return {
    selectedAttack,
    isOpen: selectedAttack !== null,

    open,
    close,
  };
}