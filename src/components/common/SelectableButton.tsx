import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";

type Props = Omit<ButtonProps, "variant"> & {
  selected?: boolean;
};

export default function SelectableButton({
  selected = false,
  ...props
}: Props) {
  return (
    <Button
      {...props}
      aria-pressed={selected}
      variant={selected ? "contained" : "outlined"}
    />
  );
}
