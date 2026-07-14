import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import RepeatButton from "@/components/common/RepeatButtonDiagnostic";

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

      <RepeatButton
        label="+10"
        onPress={onPlusTen}
      />

      <RepeatButton
        onPress={onPlusOne}
        label={
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <AddIcon fontSize="small" />
            <span>1</span>
          </span>
        }
      />
    </Stack>
  );
}