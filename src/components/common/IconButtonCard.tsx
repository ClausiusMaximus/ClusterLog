import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ElementType } from "react";

import SelectableButton from "./SelectableButton";

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
      <SelectableButton
        selected={selected}
        onClick={onClick}
        sx={{
          width: 64,
          height: 64,
          minWidth: 64,
          minHeight: 64,
          p: 0,
          borderRadius: "50%",

          transition: "all .2s ease",

          "&:hover": {
            transform: "scale(1.08)",
          },
        }}
      >
        <Icon
          sx={{
            fontSize: 34,
          }}
        />
      </SelectableButton>

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
