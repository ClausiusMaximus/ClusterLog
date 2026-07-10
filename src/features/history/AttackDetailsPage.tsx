import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { PageTitle } from "@/components/common";

import { AttackService } from "@/lib/services/AttackService";

import type { Attack } from "@/features/attacks/types/attack";

import {
  formatDateTime,
  formatDuration,
  formatKip,
} from "@/features/attacks/utils/formatters";

import {
  getActivityLabel,
  getSideLabel,
} from "@/features/attacks/utils/labels";

export default function AttackDetailsPage() {
  const { id } = useParams();

  const [attack, setAttack] = useState<Attack>();

  useEffect(() => {
    async function load() {
      if (!id) return;

      const result = await AttackService.getById(id);

      if (result) {
        setAttack(result);
      }
    }

    load();
  }, [id]);

  if (!attack) {
    return <Typography>Attacke nicht gefunden.</Typography>;
  }

  return (
    <>
      <PageTitle>Attacke</PageTitle>

      <Stack spacing={2}>
        <Typography>{formatDateTime(attack.start)}</Typography>

        <Typography>{formatKip(attack.kip)}</Typography>

        <Typography>{getSideLabel(attack.side)}</Typography>

        <Typography>{getActivityLabel(attack.activity)}</Typography>

        <Typography>{formatDuration(attack.duration)}</Typography>
      </Stack>
    </>
  );
}