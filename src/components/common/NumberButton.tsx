import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ElementType } from "react";

import SelectableButton from "./SelectableButton";

type NumberButtonProps = {
  label: string | number;
  icon?: ElementType;
  selected?: boolean;
  color?: string;
  fillGridCell?: boolean;
  onClick?: () => void;
};

export default function NumberButton({
  label,
  icon: Icon,
  selected = false,
  color,
  fillGridCell = false,
  onClick,
}: NumberButtonProps) {
  return (
    <SelectableButton
      selected={selected}
      onClick={onClick}
      sx={{
        minWidth: fillGridCell ? 0 : 72,
        minHeight: fillGridCell ? 0 : 72,
        width: fillGridCell ? "100%" : undefined,
        aspectRatio: fillGridCell ? "1 / 1" : undefined,

        px: fillGridCell ? 0 : 2,
        py: fillGridCell ? 0 : 1,

        fontSize: "1.1rem",
        fontWeight: 700,

        borderRadius: color ? "50%" : 3,

        textTransform: "none",
        whiteSpace: "nowrap",

        borderWidth: 2,

        ...(color && {
          borderColor: color,
          backgroundColor: "transparent",
          color,
          boxShadow: "none",
          ...(selected && {
            borderWidth: 3,
          }),
        }),

        "&:hover": {
          ...(color && {
            borderColor: color,
            backgroundColor: "transparent",
            boxShadow: "none",
          }),
          transform: "scale(1.03)",
        },

        "&.Mui-disabled": {
          borderColor: "action.disabled",
          color: "action.disabled",
        },

        "&:active": {
          transform: "scale(.97)",
        },
      }}
    >
      <Stack
          spacing={0.5}
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Icon && (
            <Icon
              sx={{
                fontSize: 28,
              }}
            />
          )}

          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {label}
          </Typography>
      </Stack>
    </SelectableButton>
  );
}
