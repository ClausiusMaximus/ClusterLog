import { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";

import { AttackService } from "@/lib/services/AttackService";
import type { Attack } from "@/features/attacks/types/attack";

import AttackGroup from "./AttackGroup";
import EmptyState from "./EmptyState";

import { groupAttacks } from "../utils/groupAttacks";

export default function AttackList() {
  const [attacks, setAttacks] = useState<Attack[]>([]);

  useEffect(() => {
    async function load() {
      const result = await AttackService.getAll();
      setAttacks(result);
    }

    load();
  }, []);

  if (attacks.length === 0) {
    return <EmptyState />;
  }

  const groups = groupAttacks(attacks);

  return (
    <Stack spacing={3}>
      {groups.map((group) => (
        <AttackGroup
          key={group.title}
          title={group.title}
          attacks={group.attacks}
        />
      ))}
    </Stack>
  );
}