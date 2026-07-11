import type { Attack } from "@/features/attacks/types/attack";

import {
  calculateCounts,
  type CountStatistics,
} from "./calculateCounts";

import {
  calculateAverages,
  type AverageStatistics,
} from "./calculateAverages";

import {
  calculateSideDistribution,
  type SideDistribution,
} from "./calculateSideDistribution";

import {
  calculateActivityDistribution,
  type ActivityDistribution,
} from "./calculateActivityDistribution";

import {
  calculateDailyCounts,
  type DailyCount,
} from "./calculateDailyCounts";

import {
  calculateWeeklyCounts,
  type WeeklyCount,
} from "./calculateWeeklyCounts";

import {
  calculateMonthlyCounts,
  type MonthlyCount,
} from "./calculateMonthlyCounts";



export type Statistics =
  CountStatistics &
  AverageStatistics & {
    sideDistribution: SideDistribution;
    activityDistribution: ActivityDistribution;
    dailyCounts: DailyCount[];
    weeklyCounts: WeeklyCount[];
    monthlyCounts: MonthlyCount[];
   
  };

export function calculateStatistics(
  attacks: Attack[],
): Statistics {
    const counts = 
    calculateCounts(attacks);

    const averages =
    calculateAverages(attacks);

    const sideDistribution =
    calculateSideDistribution(attacks);

    const activityDistribution =
    calculateActivityDistribution(attacks);
    
    const dailyCounts = 
    calculateDailyCounts(attacks);

    const monthlyCounts =
    calculateMonthlyCounts(attacks);

    const weeklyCounts =
    calculateWeeklyCounts(attacks);

  return {
    ...counts,

    ...averages,

    sideDistribution,

    activityDistribution,

    dailyCounts,
    weeklyCounts,
    monthlyCounts,
    
  };
}