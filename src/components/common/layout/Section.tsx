import Box from "@mui/material/Box";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Section({ children }: Props) {
  return (
    <Box
      sx={{
        mt: 3,
      }}
    >
      {children}
    </Box>
  );
}