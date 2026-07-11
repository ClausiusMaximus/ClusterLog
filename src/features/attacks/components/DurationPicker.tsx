import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { AppCard } from "@/components/common";

import TimeDisplay from "./TimeDisplay";
import TimeStepperTop from "./TimeStepperTop";
import TimeStepperBottom from "./TimeStepperBottom";

import {
  durationToSeconds,
  secondsToDuration,
} from "../utils/duration";

type DurationPickerProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function DurationPicker({
  value,
  onChange,
}: DurationPickerProps) {
  const {
    hours,
    minutes,
    seconds,
  } = secondsToDuration(value);

  const updateDuration = (
    newHours: number,
    newMinutes: number,
    newSeconds: number,
  ) => {
    onChange(
      durationToSeconds(
        Math.max(0, newHours),
        Math.max(0, Math.min(59, newMinutes)),
        Math.max(0, Math.min(59, newSeconds)),
      ),
    );
  };

  return (
    <AppCard>
      <Typography
        variant="h6"
        gutterBottom
      >
        Dauer
      </Typography>

      {/* obere Buttons */}

      <Stack
        direction="row"
        spacing={5}
        sx={{ justifyContent: "center" }}
      >
        <TimeStepperTop
          label="Std"
          onPlusTen={() =>
            updateDuration(
              hours + 10,
              minutes,
              seconds,
            )
          }
          onPlusOne={() =>
            updateDuration(
              hours + 1,
              minutes,
              seconds,
            )
          }
        />

        <TimeStepperTop
          label="Min"
          onPlusTen={() =>
            updateDuration(
              hours,
              Math.min(59, minutes + 10),
              seconds,
            )
          }
          onPlusOne={() =>
            updateDuration(
              hours,
              Math.min(59, minutes + 1),
              seconds,
            )
          }
        />

        <TimeStepperTop
          label="Sek"
          onPlusTen={() =>
            updateDuration(
              hours,
              minutes,
              Math.min(59, seconds + 10),
            )
          }
          onPlusOne={() =>
            updateDuration(
              hours,
              minutes,
              Math.min(59, seconds + 1),
            )
          }
        />
      </Stack>

      {/* Display */}

      <Stack
        sx={{
          my: 3,
          alignItems: "center",
        }}
      >
        <TimeDisplay
          seconds={value}
        />
      </Stack>

      {/* untere Buttons */}

      <Stack
        direction="row"
        spacing={5}
        sx={{ justifyContent: "center" }}
      >
        <TimeStepperBottom
          onMinusOne={() =>
            updateDuration(
              hours - 1,
              minutes,
              seconds,
            )
          }
          onMinusTen={() =>
            updateDuration(
              hours - 10,
              minutes,
              seconds,
            )
          }
        />

        <TimeStepperBottom
          onMinusOne={() =>
            updateDuration(
              hours,
              Math.max(0, minutes - 1),
              seconds,
            )
          }
          onMinusTen={() =>
            updateDuration(
              hours,
              Math.max(0, minutes - 10),
              seconds,
            )
          }
        />

        <TimeStepperBottom
          onMinusOne={() =>
            updateDuration(
              hours,
              minutes,
              Math.max(0, seconds - 1),
            )
          }
          onMinusTen={() =>
            updateDuration(
              hours,
              minutes,
              Math.max(0, seconds - 10),
            )
          }
        />
      </Stack>
    </AppCard>
  );
}