import type { ElementType } from "react";

import BedtimeIcon from "@mui/icons-material/Bedtime";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import HomeIcon from "@mui/icons-material/Home";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import WorkIcon from "@mui/icons-material/Work";

import type { Activity } from "./activities";
import type { Side } from "./sides";

export type Option<T extends string | number> = {
  value: T;
  label: string;
  icon?: ElementType | string;
  color?: string;
};

export const SIDE_OPTIONS: ReadonlyArray<Option<Side>> = [
  {
    value: "left",
    label: "Links",
    icon: "🔴",
  },
  {
    value: "both",
    label: "Beidseitig",
    icon: "🟣",
  },
  {
    value: "right",
    label: "Rechts",
    icon: "🔵",
  },
];

export const ACTIVITY_OPTIONS: ReadonlyArray<Option<Activity>> = [
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
    icon: DirectionsWalkIcon,
  },
  {
    value: "driving",
    label: "Autofahren",
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
    icon: SportsGymnasticsIcon,
  },
  {
    value: "other",
    label: "Sonstiges",
    icon: MoreHorizIcon,
  },
];

export const KIP_OPTIONS: ReadonlyArray<Option<number>> = [
  {
    value: 1,
    label: "1",
    color: "#ffeb3b",
  },
  {
    value: 2,
    label: "2",
    color: "#fdd835",
  },
  {
    value: 3,
    label: "3",
    color: "#ffca28",
  },
  {
    value: 4,
    label: "4",
    color: "#ffc107",
  },
  {
    value: 5,
    label: "5",
    color: "#ffb300",
  },
  {
    value: 6,
    label: "6",
    color: "#fb8c00",
  },
  {
    value: 7,
    label: "7",
    color: "#f57c00",
  },
  {
    value: 8,
    label: "8",
    color: "#ef6c00",
  },
  {
    value: 9,
    label: "9",
    color: "#e53935",
  },
  {
    value: 10,
    label: "10",
    color: "#b71c1c",
  },
];
