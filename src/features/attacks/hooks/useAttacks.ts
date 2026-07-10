import { useLiveQuery } from "dexie-react-hooks";

import { attackRepository } from "@/lib/repositories";

export function useAttacks() {
  const attacks = useLiveQuery(
    () => attackRepository.getAll(),
    [],
  );

  return {
    attacks: attacks ?? [],
    loading: attacks === undefined,
  };
}