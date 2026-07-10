import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AppCard, NumberButton } from "@/components/common";

export type Side = "left" | "both" | "right";

type SideSelectorProps = {
  value: Side;
  onChange: (side: Side) => void;
};

export default function SideSelector({
  value,
  onChange,
}: SideSelectorProps) {
  return (
    <AppCard>
      <Typography variant="h6" gutterBottom>
        Kopfseite
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
        }}
      >
        <NumberButton
          label="Links"
          selected={value === "left"}
          onClick={() => onChange("left")}
        />

        <NumberButton
          label="Beid."
          selected={value === "both"}
          onClick={() => onChange("both")}
        />

        <NumberButton
          label="Rechts"
          selected={value === "right"}
          onClick={() => onChange("right")}
        />
      </Box>
    </AppCard>
  );
}