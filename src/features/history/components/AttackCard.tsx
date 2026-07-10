import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PsychologyIcon from "@mui/icons-material/Psychology";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { Attack } from "@/features/attacks/types/attack";

import {
  formatDuration,
  formatKip,
  formatTime,
} from "@/features/attacks/utils/formatters";

import {
  getActivityLabel,
  getSideLabel,
} from "@/features/attacks/utils/labels";

type Props = {
  attack: Attack;
  onClick: (attack: Attack) => void;
};

export default function AttackCard({ attack, onClick }: Props) {
  return (
    <Card elevation={2}
      onClick={() => onClick(attack)}
      sx={{
        cursor: "pointer",
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            {formatTime(attack.start)}
          </Typography>

          <Divider />

          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <PsychologyIcon color="error" />

            <Typography
              sx={{
                fontWeight: 600,
              }}
            >
              {formatKip(attack.kip)}
            </Typography>
          </Stack>

          <Typography>
            {getSideLabel(attack.side)}
          </Typography>

          <Typography>
            {getActivityLabel(attack.activity)}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <AccessTimeIcon color="action" />

            <Typography>
              {formatDuration(attack.duration)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}