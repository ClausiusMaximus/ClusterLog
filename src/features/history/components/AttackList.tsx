import { useState } from "react";

import Stack from "@mui/material/Stack";

import {
  AppSnackbar,
  ConfirmDialog,
} from "@/components/common";

import type { Attack } from "@/features/attacks/types/attack";
import EditAttackDialog from "@/features/attacks/EditAttackDialog";

import { attackService } from "@/lib/services";

import AttackDrawer from "./AttackDrawer";
import AttackGroup from "./AttackGroup";
import EmptyState from "./EmptyState";

import { useSelectedAttack } from "../hooks/useSelectedAttack";
import { groupAttacks } from "../utils/groupAttacks";

type AttackListProps = {
  attacks: Attack[];
  loading: boolean;
  selectedDate?: Date | null;
};

export default function AttackList({
  attacks,
  loading,
  selectedDate,
}: AttackListProps) {
  const drawer = useSelectedAttack();

  const [editingAttack, setEditingAttack] =
    useState<Attack | null>(null);

  const [deletingAttack, setDeletingAttack] =
    useState<Attack | null>(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as
      | "success"
      | "error"
      | "warning"
      | "info",
  });

  // selectedDate wird im nächsten Commit verwendet.
  void selectedDate;

  const handleEdit = (attack: Attack) => {
    drawer.close();
    setEditingAttack(attack);
  };

  const handleDelete = (attack: Attack) => {
    drawer.close();
    setDeletingAttack(attack);
  };

  const handleEditClose = () => {
    setEditingAttack(null);
  };

  const handleSaved = (
    result: "created" | "updated",
  ) => {
    setSnackbar({
      open: true,
      severity: "success",
      message:
        result === "created"
          ? "✅ Attacke erstellt"
          : "✅ Attacke aktualisiert",
    });
  };

  const handleDeleteCancel = () => {
    setDeletingAttack(null);
  };

  const handleDeleteConfirm =
    async () => {
      if (!deletingAttack) {
        return;
      }

      await attackService.delete(
        deletingAttack.id,
      );

      setDeletingAttack(null);

      setSnackbar({
        open: true,
        message: "🗑️ Attacke gelöscht",
        severity: "success",
      });
    };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

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
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EditAttackDialog
        open={editingAttack !== null}
        attack={editingAttack}
        onClose={handleEditClose}
        onSaved={handleSaved}
      />

      <ConfirmDialog
        open={deletingAttack !== null}
        title="Attacke löschen"
        message="Diese Attacke wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden."
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </>
  );
}