import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

type RepeatButtonProps = {
  label: React.ReactNode;
  onPress: () => void;
  sx?: object;
};

export default function RepeatButton({
  label,
  onPress,
  sx,
}: RepeatButtonProps) {
  return (
    <ButtonBase
      onClick={onPress}
      sx={{
        width: 72,
        height: 40,
        borderRadius: 2,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "&:hover": {
          bgcolor: "action.hover",
        },

        ...sx,
      }}
    >
      <Typography component="span" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
    </ButtonBase>
  );
}