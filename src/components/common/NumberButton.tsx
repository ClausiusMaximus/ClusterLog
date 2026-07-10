import Button from "@mui/material/Button";

type NumberButtonProps = {
  label: string | number;
  selected?: boolean;
  onClick?: () => void;
};

export default function NumberButton({
  label,
  selected = false,
  onClick,
}: NumberButtonProps) {
  return (
    <Button
      variant={selected ? "contained" : "outlined"}
      onClick={onClick}
      sx={{
            minWidth: 72,
            minHeight: 72,
            fontSize: "1.25rem",
            fontWeight: 700,
            borderRadius: 3,

            transition: "all .15s ease",

            "&:hover": {
                transform: "scale(1.05)",
            },

            "&:active": {
                transform: "scale(.96)",
            },
        }}
    >
      {label}
    </Button>
  );
}