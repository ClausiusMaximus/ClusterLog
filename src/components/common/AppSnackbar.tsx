import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

type Props = {
  open: boolean;
  message: string;
  severity?: "success" | "error" | "warning" | "info";
  onClose: () => void;
};

const SNACKBAR_AUTO_HIDE_DURATION = 3000;

export default function AppSnackbar({
  open,
  message,
  severity = "success",
  onClose,
}: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={onClose}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}