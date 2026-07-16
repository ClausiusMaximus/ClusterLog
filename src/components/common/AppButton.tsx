import type { ButtonProps } from "@mui/material/Button";

import ActionSelectionButton from "./ActionSelectionButton";

type Props = Omit<ButtonProps, "variant">;

export default function AppButton({ sx, ...props }: Props) {
  return (
    <ActionSelectionButton
      size="large"
      fullWidth
      sx={{
        borderRadius: 3,
        minHeight: 56,
        ...sx,
      }}
      {...props}
    />
  );
}
