import { useRef, useState } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { AppButton, AppCard, AppSnackbar } from "@/components/common";

import type { Attack } from "../types/attack";
import { db } from "@/lib/db";

const BACKUP_VERSION = "1.0";

export default function BackupRestore() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  const handleExport = async () => {
    try {
      const attacks = await db.attacks.toArray();

      const payload = {
        version: BACKUP_VERSION,
        exportedAt: new Date().toISOString(),
        attacks: attacks.map((a) => ({
          ...a,
          start: a.start instanceof Date ? a.start.toISOString() : a.start,
          createdAt:
            a.createdAt instanceof Date
              ? a.createdAt.toISOString()
              : a.createdAt,
          updatedAt:
            a.updatedAt instanceof Date
              ? a.updatedAt.toISOString()
              : a.updatedAt,
        })),
      };

      const json = JSON.stringify(payload, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `clusterlog-backup-${new Date()
        .toISOString()
        .replace(/[:.]/g, "-")}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setSnackbar({ open: true, message: "Backup gespeichert", severity: "success" });
    } catch (err) {
      setSnackbar({ open: true, message: "Backup fehlgeschlagen", severity: "error" });
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as any;

      if (!parsed || typeof parsed !== "object") {
        throw new Error("Ungültiges Backup-Format");
      }

      // Optional: validate version
      const version = parsed.version ?? "";

      if (!Array.isArray(parsed.attacks)) {
        throw new Error("Ungültige Attack-Daten");
      }

      const attacks: Attack[] = parsed.attacks.map((a: any) => ({
        id: String(a.id),
        start: new Date(a.start),
        duration: Number(a.duration) || 0,
        kip: Number(a.kip) || 0,
        side: a.side,
        activity: a.activity,
        triggers: Array.isArray(a.triggers) ? a.triggers : [],
        notes: a.notes ?? "",
        createdAt: a.createdAt ? new Date(a.createdAt) : new Date(),
        updatedAt: a.updatedAt ? new Date(a.updatedAt) : new Date(),
      }));

      await db.transaction("rw", db.attacks, async () => {
        await db.attacks.clear();
        if (attacks.length > 0) {
          await db.attacks.bulkAdd(attacks);
        }
      });

      setSnackbar({ open: true, message: `Import erfolgreich (v${version})`, severity: "success" });
    } catch (err) {
      setSnackbar({ open: true, message: "Import fehlgeschlagen", severity: "error" });
    } finally {
      // reset input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <AppCard>
      <Typography variant="h6" gutterBottom>
        Backup & Restore
      </Typography>

      <Stack spacing={2}>
        <AppButton onClick={handleExport}>Backup exportieren</AppButton>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <AppButton onClick={handleImportClick}>Backup importieren</AppButton>
      </Stack>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </AppCard>
  );
}
