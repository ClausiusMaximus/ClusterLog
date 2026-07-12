import BedtimeIcon from "@mui/icons-material/Bedtime";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import type { SvgIconComponent } from "@mui/icons-material";

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
  icon: SvgIconComponent;
};

export const activityOptions: readonly ActivityOption[] = [
  {
    value: "sleep",
    label: "Schlaf",
    icon: BedtimeIcon,
  },
  {
    value: "work",
    label: "Arbeit",
    icon: WorkIcon,
  },
  {
    value: "household",
    label: "Haushalt",
    icon: HomeIcon,
  },
  {
    value: "leisure",
    label: "Freizeit",
    icon: SportsEsportsIcon,
  },
  {
    value: "driving",
    label: "Autofahrt",
    icon: DirectionsCarIcon,
  },
  {
    value: "eating",
    label: "Essen",
    icon: RestaurantIcon,
  },
  {
    value: "sport",
    label: "Sport",
    icon: FitnessCenterIcon,
  },
  {
    value: "other",
    label: "Sonstiges",
    icon: QuestionMarkIcon,
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