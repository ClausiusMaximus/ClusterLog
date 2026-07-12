import { useState } from "react";

import {
  defaultStatisticsFilter,
  type StatisticsFilter,
} from "../types/statisticsFilter";

export function useStatisticsFilter() {
  const [filter, setFilter] =
    useState<StatisticsFilter>(
      defaultStatisticsFilter,
    );

  function updateFilter(
    changes: Partial<StatisticsFilter>,
  ) {
    setFilter((previous) => ({
      ...previous,
      ...changes,
    }));
  }

  function resetFilter() {
    setFilter(defaultStatisticsFilter);
  }

  return {
    filter,
    updateFilter,
    resetFilter,
  };
}