import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import {
  pad,
  secondsToDuration,
} from "../utils/duration";

type Props = {
  seconds: number;
};

export default function TimeDisplay({
  seconds,
}: Props) {
  const {
    hours,
    minutes,
    seconds: secs,
  } = secondsToDuration(seconds);

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 520,

        px: 3,
        py: 2.5,

        borderRadius: 999,

        bgcolor: "background.default",

        border: "1px solid",
        borderColor: "divider",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",

          fontFamily: "monospace",
          fontSize: "2.6rem",
          fontWeight: 700,

          letterSpacing: 2,

          userSelect: "none",
        }}
      >
        <Box component="span">
          {pad(hours)}
        </Box>

        <Box
          component="span"
          sx={{
            mx: 1,
            opacity: 0.5,
          }}
        >
          :
        </Box>

        <Box component="span">
          {pad(minutes)}
        </Box>

        <Box
          component="span"
          sx={{
            mx: 1,
            opacity: 0.5,
          }}
        >
          :
        </Box>

        <Box component="span">
          {pad(secs)}
        </Box>
      </Typography>
    </Paper>
  );
}