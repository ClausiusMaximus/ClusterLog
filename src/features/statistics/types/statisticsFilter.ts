import type { Activity } from "@/features/attacks/options/activities";
import type { Side } from "@/features/attacks/options/sides";

export type StatisticsPeriod =
  | "all"
  | "30d"
  | "90d"
  | "year";

export type StatisticsFilter = {
  period: StatisticsPeriod;

  minKip: number;

  activities: Activity[];

  sides: Side[];
};

export const defaultStatisticsFilter: StatisticsFilter = {
  period: "all",

  minKip: 1,

  activities: [],

  sides: [],
};