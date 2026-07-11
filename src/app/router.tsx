import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/components/layout/MainLayout";

import AttackPage from "@/features/attacks/AttackPage";
import CalendarPage from "@/features/calendar/CalendarPage";
import HistoryPage from "@/features/history/History";
import StatisticsPage from "@/features/statistics/Statistics";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <AttackPage />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
      {
        path: "/calendar",
        element: <CalendarPage />,
      },
      {
        path: "/statistics",
        element: <StatisticsPage />,
      },
    ],
  },
]);