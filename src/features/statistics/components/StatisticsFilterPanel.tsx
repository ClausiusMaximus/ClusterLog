import FilterAltIcon from "@mui/icons-material/FilterAlt";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import {
  activityOptions,
} from "@/features/attacks/options/activities";

import {
  sideOptions,
} from "@/features/attacks/options/sides";

import type {
  StatisticsFilter,
  StatisticsPeriod,
} from "../types/statisticsFilter";

type Props = {
  filter: StatisticsFilter;

  onChange: (
    changes: Partial<StatisticsFilter>,
  ) => void;

    onReset: () => void;
};

export default function StatisticsFilterPanel({
  filter,
  onChange,
  onReset,
}: Props) {

  const hasActiveFilters =
  filter.period !== "all" ||
  filter.minKip !== 1 ||
  filter.activities.length > 0 ||
  filter.sides.length > 0;

  return (
    <Accordion
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",

        "&:before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
          expandIcon={<FilterAltIcon />}
        >
          <Stack
            direction="row"
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              pr: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
              }}
            >
              Statistikfilter
            </Typography>

            <Button
              size="small"
              variant="contained"
              disabled={!hasActiveFilters}
              onClick={(event) => {
                event.stopPropagation();
                onReset();
              }}
            >
              Zurücksetzen
            </Button>
          </Stack>
        </AccordionSummary>

      <AccordionDetails>
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="subtitle2"
              gutterBottom
            >
              Zeitraum
            </Typography>

            <Select
              fullWidth
              value={filter.period}
              onChange={(event) =>
                onChange({
                  period:
                    event.target
                      .value as StatisticsPeriod,
                })
              }
            >
              <MenuItem value="all">
                Gesamte Zeit
              </MenuItem>

              <MenuItem value="30d">
                Letzte 30 Tage
              </MenuItem>

              <MenuItem value="90d">
                Letzte 90 Tage
              </MenuItem>

              <MenuItem value="year">
                Letztes Jahr
              </MenuItem>
            </Select>
          </Box>

          <Box>
            <Typography
              variant="subtitle2"
              gutterBottom
            >
              Mindest-KIP
            </Typography>

            <Slider
              value={filter.minKip}
              min={1}
              max={10}
              step={1}
              marks
              valueLabelDisplay="auto"
              onChange={(_, value) =>
                onChange({
                  minKip:
                    value as number,
                })
              }
            />
          </Box>

          <Box>
            <Typography
              variant="subtitle2"
              gutterBottom
            >
              Aktivitäten
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ flexWrap: "wrap" }}
            >
              {activityOptions.map(
                (activity) => {
                  const Icon =
                    activity.icon;

                  const selected =
                    filter.activities.includes(
                      activity.value,
                    );

                  return (
                    <Chip
                      key={
                        activity.value
                      }
                      icon={
                        <Icon
                          fontSize="small"
                        />
                      }
                      label={
                        activity.label
                      }
                      clickable
                      variant={selected ? "filled" : "outlined"}
                      color={
                        selected
                          ? "primary"
                          : "default"
                      }
                      onClick={() => {
                        onChange({
                          activities:
                            selected
                              ? filter.activities.filter(
                                (
                                    value: typeof activity.value,
                                ) =>
                                    value !==
                                    activity.value,
                                )
                              : [
                                  ...filter.activities,
                                  activity.value,
                                ],
                        });
                      }}
                    />
                  );
                },
              )}
            </Stack>
          </Box>

          <Box>
            <Typography
              variant="subtitle2"
              gutterBottom
            >
              Seiten
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ flexWrap: "wrap" }}
            >
              {sideOptions.map(
                (side) => {
                  const Icon =
                    side.icon;

                  const selected =
                    filter.sides.includes(
                      side.value,
                    );

                  return (
                    <Chip
                      key={side.value}
                      icon={
                        <Icon
                          fontSize="small"
                        />
                      }
                      label={side.label}
                      clickable
                      variant={selected ? "filled" : "outlined"}
                      color={
                        selected
                          ? "primary"
                          : "default"
                      }
                      onClick={() => {
                        onChange({
                          sides:
                            selected
                              ? filter.sides.filter(
                                (
                                    value: typeof side.value,
                                ) =>
                                    value !==
                                    side.value,
                                )
                              : [
                                  ...filter.sides,
                                  side.value,
                                ],
                        });
                      }}
                    />
                  );
                },
              )}
            </Stack>
          </Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
