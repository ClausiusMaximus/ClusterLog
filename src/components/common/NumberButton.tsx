import Button from "@mui/material/Button";

type NumberButtonProps = {
  label: string | number;
  selected?: boolean;
  color?: string;
  onClick?: () => void;
};

export default function NumberButton({
  label,
  selected = false,
  color = "#1976d2",
  onClick,
}: NumberButtonProps) {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        minWidth: 72,
        minHeight: 72,

        px: 2,
        py: 1,

        fontSize: "1.1rem",
        fontWeight: 700,

        borderRadius: 3,

        textTransform: "none",
        whiteSpace: "nowrap",

        borderWidth: 2,
        borderColor: color,

        backgroundColor: selected
          ? color
          : `${color}22`,

        color: selected ? "#fff" : color,

        transition:
          "all .15s ease",

        "&:hover": {
          backgroundColor: color,
          borderColor: color,
          color: "#fff",
          transform: "scale(1.03)",
          boxShadow: 3,
        },

        "&:active": {
          transform: "scale(.97)",
        },
      }}
    >
      {label}
    </Button>
  );
}