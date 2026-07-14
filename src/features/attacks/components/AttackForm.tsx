import Stack from "@mui/material/Stack";

import type { Attack } from "../types/attack";

import StartTimePicker from "./StartTimePicker";
import DurationPicker from "./DurationPicker";
import KipSelector from "./KipSelector";
import SideSelector from "./SideSelector";
import ActivitySelector from "./ActivitySelector";
import SaveButton from "./SaveButton";

type AttackFormProps = {
  attack: Attack;

  update: <K extends keyof Attack>(
    key: K,
    value: Attack[K],
  ) => void;

  onSubmit: () => void;
};

export default function AttackForm({
  attack,
  update,
  onSubmit,
}: AttackFormProps) {
  return (
    <Stack spacing={3}>
      <StartTimePicker
        start={attack.start}
        duration={attack.duration}
        onStartChange={(date) => update("start", date)}
        onDurationChange={(duration) => update("duration", duration)}
      />

      <DurationPicker
        value={attack.duration}
        onChange={(duration) =>
          update("duration", duration)
        }
      />

      <KipSelector
        value={attack.kip}
        onChange={(kip) =>
          update("kip", kip)
        }
      />

      <SideSelector
        value={attack.side}
        onChange={(side) =>
          update("side", side)
        }
      />

      <ActivitySelector
        value={attack.activity}
        onChange={(activity) =>
          update("activity", activity)
        }
      />

      <SaveButton onClick={onSubmit} />
    </Stack>
  );
}