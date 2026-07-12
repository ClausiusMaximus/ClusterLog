import { alpha, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import type {
  HeatmapEntry,
} from "../utils/calculateAttackHeatmap";

type Props = {
  entry: HeatmapEntry;
};

export default function HeatmapCell({
  entry,
}: Props) {
  const theme = useTheme();

  return (
    <Tooltip
      title={`${entry.count} Attacken um ${entry.hour
        .toString()
        .padStart(2, "0")}:00 Uhr`}
      arrow
    >
      <Paper
        elevation={0}
        sx={{
          p: 1,
          borderRadius: 2,

          bgcolor: alpha(
            theme.palette.error.main,
            Math.max(
              entry.intensity,
              0.08,
            ),
          ),

          transition:
            "transform .2s ease",

          "&:hover": {
            transform:
              "scale(1.05)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            alignItems: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontWeight: 700 }}
          >
            {entry.hour
              .toString()
              .padStart(2, "0")}
          </Typography>

          <Box
            sx={{
              height: 22,
            }}
          />

          <Typography
            variant="caption"
          >
            {entry.count}
          </Typography>
        </Box>
      </Paper>
    </Tooltip>
  );
}