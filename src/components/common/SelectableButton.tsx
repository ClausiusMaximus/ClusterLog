import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";

const selectableButtonStyles = {
  borderColor: "rgba(59, 130, 246, 0.35)",
  backgroundColor: "transparent",
  color: "rgba(59, 130, 246, 0.60)",
  transition: "background-color 220ms ease, border-color 220ms ease, color 220ms ease, transform 220ms ease",
  "&:hover": {
    borderColor: "rgba(59, 130, 246, 0.35)",
    backgroundColor: "rgba(59, 130, 246, 0.08)",
  },
} as const;

const selectedButtonStyles = {
  borderColor: "rgba(30, 64, 175, 0.75)",
  backgroundColor: "rgba(30, 64, 175, 0.75)",
  color: "#fff",
  "&:hover": {
    borderColor: "rgba(30, 64, 175, 0.85)",
    backgroundColor: "rgba(30, 64, 175, 0.85)",
  },
} as const;

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
