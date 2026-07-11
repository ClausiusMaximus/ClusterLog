import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

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
      component="div"
      spacing={0.5}
      sx={{
        minWidth: 90,
        alignItems: "center",
      }}
    >
      <Button
        variant="text"
        startIcon={<RemoveIcon />}
        onClick={onMinusOne}
        sx={{
          width: 72,
          height: 40,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        1
      </Button>

      <Button
        variant="text"
        onClick={onMinusTen}
        sx={{
          width: 72,
          height: 40,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        -10
      </Button>
    </Stack>
  );
}