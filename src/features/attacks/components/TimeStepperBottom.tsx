import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { useLongPress } from "@/hooks/useLongPress";

type Props = {
  onMinusOne: () => void;
  onMinusTen: () => void;
};

export default function TimeStepperBottom({
  onMinusOne,
  onMinusTen,
}: Props) {
  const minusOneEvents = useLongPress(onMinusOne);

  const minusTenEvents = useLongPress(onMinusTen);

  return (
    <Stack
      spacing={0.5}
      sx={{
        minWidth: 90,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button
        {...minusOneEvents}
        variant="text"
        startIcon={<RemoveIcon />}
        sx={{
          width: 72,
          height: 40,
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 2,

          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
      >
        1
      </Button>

      <Button
        {...minusTenEvents}
        variant="text"
        sx={{
          width: 72,
          height: 40,
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 2,

          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
      >
        -10
      </Button>
    </Stack>
  );
}