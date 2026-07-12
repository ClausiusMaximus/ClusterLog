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

export const activityOptions: readonly ActivityOption[] = [
  {
    value: "sleep",
    label: "Schlaf",
    icon: Icons.activity.sleep,
  },
  {
    value: "work",
    label: "Arbeit",
    icon: Icons.activity.work,
  },
  {
    value: "household",
    label: "Haushalt",
    icon: Icons.activity.household,
  },
  {
    value: "leisure",
    label: "Freizeit",
    icon: Icons.activity.leisure,
  },
  {
    value: "driving",
    label: "Autofahrt",
    icon: Icons.activity.driving,
  },
  {
    value: "eating",
    label: "Essen",
    icon: Icons.activity.eating,
  },
  {
    value: "sport",
    label: "Sport",
    icon: Icons.activity.sport,
  },
  {
    value: "other",
    label: "Sonstiges",
    icon: Icons.activity.other,
  },
] as const;

export function getActivityOption(
  activity: Activity,
): ActivityOption {
  return (
    activityOptions.find(
      (option) => option.value === activity,
    ) ?? activityOptions[activityOptions.length - 1]
  );
}