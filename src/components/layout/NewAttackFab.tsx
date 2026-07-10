import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";

export default function NewAttackFab() {
  return (
    <Fab
      color="primary"
      size="large"
      sx={{
        position: "fixed",
        bottom: 72,
        right: 24,
      }}
    >
      <AddIcon />
    </Fab>
  );
}