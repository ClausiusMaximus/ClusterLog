import type { ElementType } from "react";

import { Icons } from "@/shared/icons";

export type Side =
  | "left"
  | "right"
  | "both";

export type SideOption = {
  value: Side;
  label: string;
  emoji: string;
  icon: ElementType;
};

export const sideOptions: readonly SideOption[] = [
  {
    value: "left",
    label: "Links",
    emoji: "⬅",
    icon: Icons.side.left,
  },
  {
    value: "right",
    label: "Rechts",
    emoji: "➡",
    icon: Icons.side.right,
  },
  {
    value: "both",
    label: "Beidseitig",
    emoji: "⬌",
    icon: Icons.side.both,
  },
] as const;

export function getSideOption(
  side: Side,
): SideOption {
  return (
    sideOptions.find(
      (option) => option.value === side,
    ) ?? sideOptions[0]
  );
}