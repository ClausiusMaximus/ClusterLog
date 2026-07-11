import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type Props = {
  title: string;
  onPrevious: () => void;
  onNext: () => void;
};

export default function CalendarHeader({
  title,
  onPrevious,
  onNext,
}: Props) {
  return (
    <Stack
      direction="row"
      sx={{ 
        aligneItems: "center",
        justifyContent: "space-between",
        mb: 3,
     }}
    >
      <IconButton onClick={onPrevious}>
        <ChevronLeftIcon />
      </IconButton>

      <Typography
        variant="h5"
        sx={{
            fontWeight: 600,
        }}
      >
        {title}
      </Typography>

      <IconButton onClick={onNext}>
        <ChevronRightIcon />
      </IconButton>
    </Stack>
  );
}