

import {
  getActivityLabel,
  getSideLabel,
} from "@/features/attacks/utils/labels";

import {
  formatDateTime,
  formatDuration,
  formatKip,
} from "@/features/attacks/utils/formatters";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PsychologyIcon from "@mui/icons-material/Psychology";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { Attack } from "@/features/attacks/types/attack";

type Props = {
  attack: Attack;
};

export default function AttackCard({ attack }: Props) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>

        <Typography
          variant="h6"
          gutterBottom
        >
          {formatDateTime(attack.start)}
        </Typography>

        <Stack spacing={1}>

          <Typography>
            <PsychologyIcon
              fontSize="small"
              sx={{ mr: 1 }}
            />
            {formatKip(attack.kip)}
          </Typography>

          <Typography>
            {getSideLabel(attack.side)}
          </Typography>

          <Typography>
            {getActivityLabel(attack.activity)}
          </Typography>

          <Typography>
            <AccessTimeIcon
              fontSize="small"
              sx={{ mr: 1 }}
            />
            {formatDuration(attack.duration)}
          </Typography>

        </Stack>

      </CardContent>
    </Card>
  );
}