import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PsychologyIcon from "@mui/icons-material/Psychology";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Button from "@mui/material/Button";

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

type Props = {
  attack: Attack | null;
  open: boolean;
  onClose: () => void;

  onEdit: (attack: Attack) => void;
  onDelete: (attack: Attack) => void;
};

export default function AttackDrawer({
  attack,
  open,
  onClose,
  onEdit,
  onDelete
}: Props) {
  if (!attack) {
    return null;
  }

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          p: 3,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          minHeight: 320,
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 3 }}
        >
          Attacke
        </Typography>

        <Stack spacing={2}>
          <Typography>
            {formatDateTime(attack.start)}
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

            <Typography>
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
        <Divider sx={{ my: 3 }} />

        <Stack spacing={2}>
        <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => {if (attack) onEdit(attack)}}
        >
            Bearbeiten
        </Button>

        <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => {
              if (attack) {
              onDelete(attack);
            }
            }}
        >
            Löschen
        </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}