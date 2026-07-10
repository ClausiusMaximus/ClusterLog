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
      aria-label="Neue Attacke"
      onClick={handleClick}
      sx={{
        position: "fixed",
        left: "50%",
        bottom: 28,
        transform: "translateX(-50%)",
        width: 72,
        height: 72,
        zIndex: (theme) => theme.zIndex.drawer + 2,
      }}
    >
      <AddIcon />
    </Fab>
  );
}