import { useState } from "react";
import { AppSnackbar, PageTitle } from "@/components/common";
import AttackForm from "./components/AttackForm";
import { useAttackForm } from "./hooks/useAttackForm";
import BackupRestore from "./components/BackupRestore";

export default function AttackPage() {
  const form = useAttackForm();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  return (
    <>
      <PageTitle>Neue Attacke</PageTitle>

      <AttackForm
        attack={form.attack}
        update={form.update}
        onSubmit={async () => {
          const result = await form.save();

          setSnackbar({
            open: true,
            severity: "success",
            message:
              result === "created"
                ? "✓ Attacke gespeichert"
                : "✏️ Attacke aktualisiert",
          });
        }}
      />

      <BackupRestore />
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
}