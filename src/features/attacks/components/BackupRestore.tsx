import { useRef, useState } from "react";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { AppCard, AppSnackbar } from "@/components/common";

import type { Attack } from "../types/attack";
import { db } from "@/lib/db";

const BACKUP_VERSION = "1.0";

type BackupRecord = Record<string, unknown>;

function isBackupRecord(value: unknown): value is BackupRecord {
  return typeof value === "object" && value !== null;
}

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
    } catch {
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
      const parsed: unknown = JSON.parse(text);

      if (!isBackupRecord(parsed)) {
        throw new Error("Ungültiges Backup-Format");
      }

      // Optional: validate version
      const version = parsed.version ?? "";

      if (!Array.isArray(parsed.attacks)) {
        throw new Error("Ungültige Attack-Daten");
      }

      const attacks: Attack[] = parsed.attacks.map((value: unknown) => {
        if (!isBackupRecord(value)) {
          throw new Error("Invalid attack data");
        }

        return {
          id: String(value.id),
          start: new Date(String(value.start)),
          duration: Number(value.duration) || 0,
          kip: Number(value.kip) || 0,
          side: value.side as Attack["side"],
          activity: value.activity as Attack["activity"],
          triggers: Array.isArray(value.triggers)
            ? value.triggers as Attack["triggers"]
            : [],
          notes: (value.notes ?? "") as Attack["notes"],
          createdAt: value.createdAt
            ? new Date(String(value.createdAt))
            : new Date(),
          updatedAt: value.updatedAt
            ? new Date(String(value.updatedAt))
            : new Date(),
        };
      });

      await db.transaction("rw", db.attacks, async () => {
        await db.attacks.clear();
        if (attacks.length > 0) {
          await db.attacks.bulkAdd(attacks);
        }
      });

      setSnackbar({ open: true, message: `Import erfolgreich (v${version})`, severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Import fehlgeschlagen", severity: "error" });
    } finally {
      // reset input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <AppCard
      sx={{
        "& .MuiCardContent-root": {
          p: 1,
          "&:last-child": { pb: 1 },
        },
      }}
    >
      <Stack direction="row" spacing={1}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FileDownloadOutlinedIcon />}
          onClick={handleExport}
          sx={{ flex: 1, minWidth: 0 }}
        >
          Export
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <Button
          fullWidth
          variant="outlined"
          startIcon={<FileUploadOutlinedIcon />}
          onClick={handleImportClick}
          sx={{ flex: 1, minWidth: 0 }}
        >
          Import
        </Button>
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
