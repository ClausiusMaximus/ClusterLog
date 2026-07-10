import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";

export default function AppButton(props: ButtonProps) {
  return (
    <Button
      variant="contained"
      size="large"
      fullWidth
      sx={{
        borderRadius: 3,
        minHeight: 56,
      }}
      {...props}
    />
  );
}