import { useState } from "react";

import Stack from "@mui/material/Stack";

import type { Attack } from "@/features/attacks/types/attack";
import EditAttackDialog from "@/features/attacks/EditAttackDialog";
import { useAttacks } from "@/features/attacks/hooks/useAttacks";

import AttackDrawer from "./AttackDrawer";
import AttackGroup from "./AttackGroup";
import EmptyState from "./EmptyState";

import { useSelectedAttack } from "../hooks/useSelectedAttack";
import { groupAttacks } from "../utils/groupAttacks";

export default function AttackList() {
  const { attacks, loading } = useAttacks();

  const drawer = useSelectedAttack();

  const [editingAttack, setEditingAttack] =
    useState<Attack | null>(null);

  if (loading) {
    return <>Lade Attacken…</>;
  }

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