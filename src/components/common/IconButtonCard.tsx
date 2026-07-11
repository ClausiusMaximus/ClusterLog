import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ElementType } from "react";

type Props = {
  icon: ElementType;
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

export default function IconButtonCard({
  icon: Icon,
  label,
  selected = false,
  onClick,
}: Props) {
  return (
    <Stack
      spacing={1}
      sx={{ alignItems: "center" }}
    >
      <IconButton
        onClick={onClick}
        sx={{
          width: 64,
          height: 64,

          transition: "all .2s ease",

          bgcolor: selected
            ? "primary.main"
            : "transparent",

          color: selected
            ? "primary.contrastText"
            : "text.secondary",

          "&:hover": {
            bgcolor: selected
              ? "primary.dark"
              : "action.hover",

            transform: "scale(1.08)",
          },
        }}
      >
        <Icon
          sx={{
            fontSize: 34,
          }}
        />
      </IconButton>

      <Typography
        variant="caption"
        align="center"
        sx={{
          fontWeight: selected ? 700 : 500,
          color: selected
            ? "primary.main"
            : "text.primary",
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
}