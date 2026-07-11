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
        Math.max(
          0,
          durationToSeconds(
            newHours,
            newMinutes,
            newSeconds,
          ),
        )
    );
  };

  const changeHours = (delta: number) => {
      updateDuration(
        hours + delta,
        minutes,
        seconds,
      );
  };

  const changeMinutes = (delta: number) => {
      updateDuration(
        hours,
        minutes + delta,
        seconds,
      );
   };

   const changeSeconds = (delta: number) => {
      updateDuration(
        hours,
        minutes,
        seconds + delta,
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
            onPlusTen={() => changeHours(10)}
            onPlusOne={() => changeHours(1)}
          />

          <TimeStepperTop
            label="Min"
            onPlusTen={() => changeMinutes(10)}
            onPlusOne={() => changeMinutes(1)}
          />

          <TimeStepperTop
            label="Sek"
            onPlusTen={() => changeSeconds(10)}
            onPlusOne={() => changeSeconds(1)}
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
            onMinusOne={() => changeHours(-1)}
            onMinusTen={() => changeHours(-10)}
          />

          <TimeStepperBottom
            onMinusOne={() => changeMinutes(-1)}
            onMinusTen={() => changeMinutes(-10)}
          />

          <TimeStepperBottom
            onMinusOne={() => changeSeconds(-1)}
            onMinusTen={() => changeSeconds(-10)}
          />
        </Stack>
      </AppCard>
    );
}