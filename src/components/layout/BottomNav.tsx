import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";

export default function BottomNav() {
  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Verlauf" icon={<HistoryIcon />} />
        <BottomNavigationAction label="Neu" icon={<AddCircleIcon />} />
        <BottomNavigationAction label="Statistik" icon={<BarChartIcon />} />
        <BottomNavigationAction label="Einstellungen" icon={<SettingsIcon />} />
      </BottomNavigation>
    </Paper>
  );
}