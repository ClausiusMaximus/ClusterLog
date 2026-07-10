import { useEffect, useState } from "react";
import EditAttackDialog from "@/features/attacks/EditAttackDialog";
import Stack from "@mui/material/Stack";

import { AttackService } from "@/lib/services/AttackService";

import type { Attack } from "@/features/attacks/types/attack";

import AttackGroup from "./AttackGroup";
import EmptyState from "./EmptyState";

import { groupAttacks } from "../utils/groupAttacks";

import AttackDrawer from "./AttackDrawer";
import { useSelectedAttack } from "../hooks/useSelectedAttack";

export default function AttackList() {
  const [attacks, setAttacks] = useState<Attack[]>([]);

  const drawer = useSelectedAttack();
  const [editingAttack, setEditingAttack] =
  useState<Attack | null>(null);

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
        <>
      <Stack spacing={3}>
        {groups.map((group) => (
          <AttackGroup
            key={group.title}
            title={group.title}
            attacks={group.attacks}
            onSelect={drawer.open}
          />
        ))}
      </Stack>

      <AttackDrawer
        attack={drawer.selectedAttack}
        open={drawer.isOpen}
        onClose={drawer.close}
        onEdit={(attack) => {
          drawer.close();
          setEditingAttack(attack);
        }}
        onDelete={(attack) => {
          console.log("Delete", attack.id);
        }}
      />
      <EditAttackDialog
        open={editingAttack !== null}
        attack={editingAttack}
        onClose={() => setEditingAttack(null)}
      />
    </>
  );
}