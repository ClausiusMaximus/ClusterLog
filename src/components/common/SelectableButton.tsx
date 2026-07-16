import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";

const selectableButtonStyles = (theme: Theme) => ({
  borderColor: alpha(theme.palette.primary.main, 0.55),
  backgroundColor: "transparent",
  color: alpha(theme.palette.primary.main, 0.78),
  transition: "background-color 220ms ease, border-color 220ms ease, color 220ms ease, transform 220ms ease",
  "&:hover": {
    borderColor: alpha(theme.palette.primary.main, 0.7),
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
});

const selectedButtonStyles = (theme: Theme) => ({
  borderColor: alpha(theme.palette.primary.main, 0.55),
  backgroundColor: alpha(theme.palette.primary.main, 0.4),
  color: theme.palette.common.white,
  "&:hover": {
    borderColor: alpha(theme.palette.primary.main, 0.7),
    backgroundColor: alpha(theme.palette.primary.main, 0.46),
  },
});

type Props = Omit<ButtonProps, "variant"> & {
  selected?: boolean;
};

export default function SelectableButton({
  selected = false,
  ...props
}: Props) {
  const sx: SxProps<Theme> = [
    selectableButtonStyles,
    ...(selected ? [selectedButtonStyles] : []),
    ...(Array.isArray(props.sx)
      ? props.sx
      : props.sx
        ? [props.sx]
        : []),
  ];

  return (
    <Button
      {...props}
      aria-pressed={selected}
      variant={selected ? "contained" : "outlined"}
      sx={sx}
    />
  );
}
