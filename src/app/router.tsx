import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/components/layout/MainLayout";

import AttackPage from "@/features/attacks/AttackPage";
import HistoryPage from "@/features/history/History";
import StatisticsPage from "@/features/statistics/Statistics";
import AttackDetailsPage from "@/features/history/AttackDetailsPage";

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
        path: "/statistics",
        element: <StatisticsPage />,
      },

      {
        path: "/history/:id",
        element: <AttackDetailsPage />,
      },
    ],
  },
]);