import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import TimerIcon from "@mui/icons-material/Timer";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { Attack } from "@/features/attacks/types/attack";
import {
  pad,
  secondsToDuration,
} from "@/features/attacks/utils/duration";

type Props = {
  attack: Attack;
  onClick?: () => void;
};

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatSide(side: Attack["side"]) {
  switch (side) {
    case "left":
      return "⬅ Links";
    case "right":
      return "➡ Rechts";
    case "both":
      return "⬌ Beidseitig";
  }
}

function formatActivity(activity: Attack["activity"]) {
  switch (activity) {
    case "sleep":
      return "😴 Schlaf";
    case "work":
      return "💼 Arbeit";
    case "household":
      return "🏠 Haushalt";
    case "leisure":
      return "🎮 Freizeit";
    case "driving":
      return "🚗 Autofahrt";
    case "eating":
      return "🍽 Essen";
    case "sport":
      return "🏃 Sport";
    default:
      return "❓ Sonstiges";
  }
}

function getKipColor(kip: number) {
  if (kip <= 2) return "success.main";
  if (kip <= 4) return "warning.light";
  if (kip <= 6) return "warning.main";
  if (kip <= 9) return "error.main";

  return "error.dark";
}

export default function AttackCard({
  attack,
  onClick,
}: Props) {
  const duration = secondsToDuration(
    attack.duration,
  );

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
      }}
    >
      <CardActionArea onClick={onClick}>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Box
            sx={{
              width: 6,
              bgcolor: getKipColor(attack.kip),
            }}
          />

          <Box
            sx={{
              flex: 1,
              p: 2,
            }}
          >
            <Stack spacing={1.5}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <AccessTimeIcon
                    fontSize="small"
                    color="action"
                  />

                  <Typography
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {formatTime(attack.start)}
                  </Typography>
                </Stack>

                <ChevronRightIcon color="action" />
              </Stack>

              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <LocalFireDepartmentIcon
                    color="error"
                    fontSize="small"
                  />

                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: getKipColor(attack.kip),
                    }}
                  >
                    KIP {attack.kip}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <TimerIcon
                    color="action"
                    fontSize="small"
                  />

                  <Typography>
                    {pad(duration.hours)}:
                    {pad(duration.minutes)}:
                    {pad(duration.seconds)}
                  </Typography>
                </Stack>
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {formatActivity(attack.activity)}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {formatSide(attack.side)}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}