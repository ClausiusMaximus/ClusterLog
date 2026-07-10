import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/components/layout/MainLayout";

import AttackPage from "@/features/attacks/components";
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
        path: "/statistics",
        element: <StatisticsPage />,
      },
    ],
  },
]);