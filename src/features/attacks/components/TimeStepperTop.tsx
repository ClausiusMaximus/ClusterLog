import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Props = {
  label: string;

  onPlusOne: () => void;
  onPlusTen: () => void;
};

export default function TimeStepperTop({
  label,
  onPlusOne,
  onPlusTen,
}: Props) {
  return (
    <Stack
      spacing={0.5}
      sx={{
        minWidth: 90,
        alignItems: "center",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          mb: 1,
        }}
      >
        {label}
      </Typography>

      <Button
        variant="text"
        onClick={onPlusTen}
        sx={{
          width: 72,
          height: 40,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        +10
      </Button>

      <Button
        variant="text"
        startIcon={<AddIcon />}
        onClick={onPlusOne}
        sx={{
          width: 72,
          height: 40,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        1
      </Button>
    </Stack>
  );
}