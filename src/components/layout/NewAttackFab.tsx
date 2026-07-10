import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NewAttackFab() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/attack/new");
  };

  return (
    <Fab
      color="primary"
      size="large"
      aria-label="Neue Attacke erfassen"
      onClick={handleClick}
      sx={{
        position: "fixed",
        bottom: 72,
        right: 24,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <AddIcon />
    </Fab>
  );
}