import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type PayloadItem = {
  value: number;
  payload: {
    kip: number;
    color?: string;
  };
};

type Props = {
  active?: boolean;
  payload?: PayloadItem[];
};

export default function KipDistributionTooltip({
  active,
  payload,
}: Props) {
  if (
    !active ||
    !payload ||
    payload.length === 0
  ) {
    return null;
  }

  const item = payload[0];

  return (
    <Paper
      elevation={4}
      sx={{
        p: 2,
        borderRadius: 2,
        minWidth: 160,
      }}
    >
      <Stack spacing={1}>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center" }}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor:
                item.payload.color ??
                "primary.main",
            }}
          />

          <Typography
            sx={{ fontWeight: 700 }}
          >
            KIP {item.payload.kip}
          </Typography>
        </Stack>

        <Typography variant="body2">
          {item.value} Attacken
        </Typography>
      </Stack>
    </Paper>
  );
}