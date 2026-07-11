import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useLongPress } from "@/hooks/useLongPress";

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

  const plusOneEvents = useLongPress(onPlusOne);

  const plusTenEvents = useLongPress(onPlusTen);

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
        {...plusTenEvents}
        variant="text"
        
        sx={{
          width: 72,
          height: 40,
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 2,

          "&:hover": {bgcolor: "action.hover",},
        }}
      >
        +10
      </Button>

      <Button
        {...plusOneEvents}
        variant="text"
        startIcon={<AddIcon />}
        sx={{
          width: 72,
          height: 40,
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 2,

          "&:hover": {bgcolor: "action.hover",},
        }}
      >
        1
      </Button>
    </Stack>
  );
}