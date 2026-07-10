import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PageTitle({ children }: Props) {
  return (
    <Typography
      variant="h4"
      gutterBottom
      sx={{
        fontWeight: 700,
      }}
    >
      {children}
    </Typography>
  );
}