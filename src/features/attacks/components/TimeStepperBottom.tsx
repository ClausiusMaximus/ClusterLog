import RemoveIcon from "@mui/icons-material/Remove";
import Stack from "@mui/material/Stack";

import RepeatButton from "@/components/common/RepeatButton";

type Props = {
  onMinusOne: () => void;
  onMinusTen: () => void;
};

export default function TimeStepperBottom({
  onMinusOne,
  onMinusTen,
}: Props) {
  return (
    <Stack
      spacing={0.5}
      sx={{
        minWidth: 90,
        alignItems: "center",
      }}
    >
      <RepeatButton
        onPress={onMinusOne}
        label={
          <Stack
            direction="row"
            spacing={0.25}
            sx={{ alignItems: "center" }}
          >
            <RemoveIcon fontSize="small" />
            <span>1</span>
          </Stack>
        }
      />

      <RepeatButton
        label="-10"
        onPress={onMinusTen}
      />
    </Stack>
  );
}