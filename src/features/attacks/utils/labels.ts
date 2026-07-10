import type { Activity, Side } from "../types/attack";

import {
  ACTIVITY_OPTIONS,
  SIDE_OPTIONS,
} from "./options";

export function getSideLabel(side: Side): string {
  return (
    SIDE_OPTIONS.find((option) => option.value === side)
      ?.label ?? side
  );
}

export function getActivityLabel(
  activity: Activity,
): string {
  return (
    ACTIVITY_OPTIONS.find(
      (option) => option.value === activity,
    )?.label ?? activity
  );
}