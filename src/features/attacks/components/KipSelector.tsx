import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AppCard, NumberButton } from "@/components/common/Index";

type KipSelectorProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function KipSelector({
  value,
  onChange,
}: KipSelectorProps) {
  return (
    <AppCard>
      <Typography variant="h6" gutterBottom>
        KIP-Skala
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
        }}
      >
        {Array.from({ length: 11 }, (_, i) => (
          <NumberButton
            key={i}
            label={i}
            selected={value === i}
            onClick={() => onChange(i)}
          />
        ))}
      </Box>
    </AppCard>
  );
}