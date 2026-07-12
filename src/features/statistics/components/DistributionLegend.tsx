import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { DistributionItem } from "./DistributionChart";

type Props = {
  data: DistributionItem[];
};

export default function DistributionLegend({
  data,
}: Props) {
  const total = data.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  return (
    <Stack
      spacing={1.5}
      sx={{
        mt: 3,
      }}
    >
      {data.map((item) => {
        const Icon = item.icon;

        const percent =
          total === 0
            ? 0
            : (item.value / total) * 100;

        return (
          <Stack
            key={item.label}
            spacing={0.75}
          >
            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor:
                    item.color ??
                    "primary.main",
                  flexShrink: 0,
                }}
              />

              {Icon && (
                <Icon
                  fontSize="small"
                  color="action"
                />
              )}

              <Typography
                sx={{
                  flexGrow: 1,
                }}
              >
                {item.label}
              </Typography>

              <Typography
                sx={{
                  minWidth: 32,
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                {item.value}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  minWidth: 48,
                  textAlign: "right",
                }}
              >
                {percent.toFixed(0)} %
              </Typography>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={percent}
              sx={{
                height: 6,
                borderRadius: 3,

                "& .MuiLinearProgress-bar": {
                  backgroundColor:
                    item.color ??
                    "primary.main",
                },
              }}
            />
          </Stack>
        );
      })}
    </Stack>
  );
}