import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import DashboardPage from "../features/dashboard/Dashboard";
import HistoryPage from "../features/history/History";
import StatisticsPage from "../features/statistics/Statistics";
import SettingsPage from "../features/settings/Settings";
import AttackPage from "@/features/attacks";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
      {
        path: "/statistics",
        element: <StatisticsPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/attack/new",
        element: <AttackPage />,
      },
    ],
  },
]);