import type { ElementType } from "react";

import { Icons } from "@/shared/icons";

export type Activity =
  | "sleep"
  | "work"
  | "household"
  | "leisure"
  | "driving"
  | "eating"
  | "sport"
  | "other";

export type ActivityOption = {
  value: Activity;
  label: string;
  icon: ElementType;
};

const ACTIVITY_OPTION_VALUES = [
  ["sleep", "Schlaf", Icons.activity.sleep],
  ["work", "Arbeit", Icons.activity.work],
  ["household", "Haushalt", Icons.activity.household],
  ["leisure", "Freizeit", Icons.activity.leisure],
  ["driving", "Autofahrt", Icons.activity.driving],
  ["eating", "Essen", Icons.activity.eating],
  ["sport", "Sport", Icons.activity.sport],
  ["other", "Sonstiges", Icons.activity.other],
] as const;

export const activityOptions: readonly ActivityOption[] = ACTIVITY_OPTION_VALUES.map(
  ([value, label, icon]) => ({
    value: value as Activity,
    label,
    icon,
  }),
);

export function getActivityOption(
  activity: Activity | null,
): ActivityOption | undefined {
  return (
    activityOptions.find(
      (option) => option.value === activity,
    )
  );
}
