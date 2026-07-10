import { useState } from "react";

import Stack from "@mui/material/Stack";
import { ConfirmDialog } from "@/components/common";
import { attackService } from "@/lib/services";
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

  const [deletingAttack, setDeletingAttack] =
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
          drawer.close();
          setDeletingAttack(attack);
        }}
      />

      <EditAttackDialog
        open={editingAttack !== null}
        attack={editingAttack}
        onClose={() => setEditingAttack(null)}
      />
      <ConfirmDialog
        open={deletingAttack !== null}
        title="Attacke löschen"
        message="Diese Attacke wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden."
        onCancel={() => setDeletingAttack(null)}
        onConfirm={async () => {
          if (!deletingAttack) {
            return;
          }

          await attackService.delete(deletingAttack.id);

          setDeletingAttack(null);
        }}
      />
    </>
  );
}