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
  emoji: string;
};

export const activityOptions: readonly ActivityOption[] = [
  {
    value: "sleep",
    label: "Schlaf",
    emoji: "😴",
  },
  {
    value: "work",
    label: "Arbeit",
    emoji: "💼",
  },
  {
    value: "household",
    label: "Haushalt",
    emoji: "🏠",
  },
  {
    value: "leisure",
    label: "Freizeit",
    emoji: "🎮",
  },
  {
    value: "driving",
    label: "Autofahrt",
    emoji: "🚗",
  },
  {
    value: "eating",
    label: "Essen",
    emoji: "🍽️",
  },
  {
    value: "sport",
    label: "Sport",
    emoji: "🏃",
  },
  {
    value: "other",
    label: "Sonstiges",
    emoji: "❓",
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