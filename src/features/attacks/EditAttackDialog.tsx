import { useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import type { Attack } from "./types/attack";

import AttackForm from "./components/AttackForm";
import { useAttackForm } from "./hooks/useAttackForm";

type EditAttackDialogProps = {
  open: boolean;
  attack: Attack | null;
  onClose: () => void;
};

export default function EditAttackDialog({
  open,
  attack,
  onClose,
}: EditAttackDialogProps) {
  const form = useAttackForm();

  useEffect(() => {
    if (attack) {
      form.load(attack);
    } else {
      form.reset();
    }
  }, [attack]);

  async function handleSubmit() {
    await form.save();
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Attacke bearbeiten
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <AttackForm
          attack={form.attack}
          update={form.update}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}