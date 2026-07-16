import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import type { Attack } from "@/features/attacks/types/attack";

import { AppCard } from "@/components/common";

import AttackList from "./AttackList";

type Props = {
  date: Date;
  attacks: Attack[];
  loading: boolean;
  onBack: () => void;
};

export default function DayHistory({
  date,
  attacks,
  loading,
  onBack,
}: Props) {
  const title = date.toLocaleDateString(
    "de-DE",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  const selectedKips = attacks
    .map((attack) => attack.kip)
    .filter((kip): kip is number => kip !== null);

  const averageKip =
    selectedKips.length === 0
      ? 0
      : selectedKips.reduce(
          (sum, kip) => sum + kip,
          0,
        ) / selectedKips.length;

  const averageDuration =
    attacks.length === 0
      ? 0
      : attacks.reduce(
          (sum, attack) =>
            sum + attack.duration,
          0,
        ) / attacks.length;

  return (
    <Stack spacing={3}>
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: "center" }}
      >
        <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h5">
          {title}
        </Typography>
      </Stack>

      <AppCard>
        <Stack spacing={1}>
          <Typography variant="h6">
            Tagesübersicht
          </Typography>

          <Divider />

          <Typography>
            Attacken: {attacks.length}
          </Typography>

          <Typography>
            Ø KIP: {averageKip.toFixed(1)}
          </Typography>

          <Typography>
            Ø Dauer:{" "}
            {averageDuration.toFixed(0)} min
          </Typography>
        </Stack>
      </AppCard>

      <AttackList
        attacks={attacks}
        loading={loading}
        selectedDate={date}
      />
    </Stack>
  );
}
