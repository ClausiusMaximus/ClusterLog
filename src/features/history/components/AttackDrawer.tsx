import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NotesIcon from "@mui/icons-material/Notes";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { Attack } from "@/features/attacks/types/attack";

import { formatDuration } from "@/features/attacks/utils/formatters";

import {
  formatAttackDate,
  formatAttackTime,
  getActivityOption,
  getKipColor,
  getSideOption,
} from "@/features/attacks/utils/display";

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
  onDelete,
}: Props) {
  if (!attack) {
    return null;
  }

  const activity = getActivityOption(attack.activity);

  const side = getSideOption(attack.side);
  const triggers = attack.triggers ?? [];
  const notes = attack.notes ?? "";
  const ActivityIcon = activity.icon;
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
          maxWidth: 640,
          width: "100%",
          mx: "auto",
        }}
      >
        <Stack spacing={3}>
          {/* Header */}

          <Stack
            spacing={0.5}
            sx={{
              alignItems: "center",
            }}
          >
            <LocalFireDepartmentIcon
              sx={{
                fontSize: 42,
                color: "error.main",
              }}
            />

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
              }}
            >
              Attacke
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
              }}
            >
              {formatAttackTime(attack.start)}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {formatAttackDate(attack.start)}
            </Typography>
          </Stack>

          {/* KIP */}

          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <CardContent>
              <Stack
                spacing={1}
                sx={{
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  KIP-Skala
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 700,
                    lineHeight: 1,
                    color: getKipColor(
                      attack.kip,
                    ),
                  }}
                >
                  {attack.kip}
                </Typography>

                <Chip
                  label={`KIP ${attack.kip}`}
                  sx={{
                    bgcolor: getKipColor(
                      attack.kip,
                    ),
                    color: "#fff",
                    fontWeight: 700,
                  }}
                />
              </Stack>
            </CardContent>
          </Card>

          <Divider />

          {/* Informationen */}

          <Stack spacing={2}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      alignItems: "center",
                    }}
                  >
                    <AccessTimeIcon color="action" />

                    <Typography
                      variant="subtitle2"
                    >
                      Dauer
                    </Typography>
                  </Stack>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {formatDuration(
                      attack.duration,
                    )}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>

            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                    >
                      Aktivität
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                alignItems: "center",
                            }}
                        >
                            <ActivityIcon fontSize="small" />

                            <Typography>
                                {activity.label}
                            </Typography>
                        </Stack>

                    </Typography>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                    >
                      Seite
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {side.emoji} {side.label}

                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {(triggers.length > 0 ||
              attack.notes) && (
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    {triggers.length >
                      0 && (
                      <>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                        >
                          Auslöser
                        </Typography>

                        <Stack
                          direction="row"
                          spacing={1}
                          useFlexGap
                          sx={{ flexWrap: "wrap" }}
                        >
                          {triggers.map(
                            (
                              trigger,
                            ) => (
                              <Chip
                                key={
                                  trigger
                                }
                                label={
                                  trigger
                                }
                                size="small"
                              />
                            ),
                          )}
                        </Stack>

                        {notes && (
                          <Divider />
                        )}
                      </>
                    )}

                    {notes && (
                      <>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{
                            alignItems:
                              "center",
                          }}
                        >
                          <NotesIcon color="action" />

                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            Notizen
                          </Typography>
                        </Stack>

                        <Typography
                          sx={{
                            whiteSpace:
                              "pre-wrap",
                          }}
                        >
                          {notes}
                        </Typography>
                      </>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Stack>

          <Divider />

          <Stack spacing={2}>
            <Button
              variant="contained"
              size="large"
              startIcon={<EditIcon />}
              onClick={() => onEdit(attack)}
            >
              Bearbeiten
            </Button>

            <Button
              variant="outlined"
              color="error"
              size="large"
              startIcon={<DeleteIcon />}
              onClick={() => onDelete(attack)}
            >
              Löschen
            </Button>

            <Button
              variant="text"
              size="large"
              onClick={onClose}
            >
              Schließen
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
}