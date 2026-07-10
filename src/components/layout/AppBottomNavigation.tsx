import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

import { useLocation, useNavigate } from "react-router-dom";

const routes = [
  { label: "Home", path: "/", icon: <HomeIcon /> },
  { label: "Verlauf", path: "/history", icon: <HistoryIcon /> },
  { label: "Statistik", path: "/statistics", icon: <BarChartIcon /> },
  { label: "Einstellungen", path: "/settings", icon: <SettingsIcon /> },
];

export default function AppBottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

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
      <BottomNavigation
        value={location.pathname}
        onChange={(_, value) => navigate(value)}
      >
        {routes.map((route) => (
          <BottomNavigationAction
            key={route.path}
            value={route.path}
            label={route.label}
            icon={route.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}