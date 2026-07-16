import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TimerIcon from "@mui/icons-material/Timer";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { Attack } from "@/features/attacks/types/attack";

import {
  formatAttackTime,
  getActivityOption,
  getKipColor,
  getSideOption,
} from "@/features/attacks/utils/display";

import { formatDuration } from "@/features/attacks/utils/formatters";

import { Icons } from "@/shared/icons";

type Props = {
  attack: Attack;
  onClick?: () => void;
};

export default function AttackCard({
  attack,
  onClick,
}: Props) {
  const activity = getActivityOption(
    attack.activity,
  );

  const side = getSideOption(
    attack.side,
  );

  const ActivityIcon = activity?.icon;

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
              bgcolor: getKipColor(
                attack.kip,
              ),
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
                  justifyContent:
                    "space-between",
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
                    {formatAttackTime(
                      attack.start,
                    )}
                  </Typography>
                </Stack>

                <ChevronRightIcon color="action" />
              </Stack>

              <Stack
                direction="row"
                sx={{
                  justifyContent:
                    "space-between",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <Icons.attack
                    color="error"
                    fontSize="small"
                  />

                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: getKipColor(
                        attack.kip,
                      ),
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
                    {formatDuration(
                      attack.duration,
                    )}
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "center",
                }}
              >
                {ActivityIcon && (
                  <ActivityIcon
                    fontSize="small"
                    color="action"
                  />
                )}

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {activity?.label ?? "Nicht ausgewählt"}
                </Typography>
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {side
                  ? `${side.emoji} ${side.label}`
                  : "Nicht ausgewählt"}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
