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

const SIDE_OPTION_VALUES = [
  ["left", "Links", "⬅", Icons.side.left],
  ["right", "Rechts", "➡", Icons.side.right],
  ["both", "Beidseitig", "⬌", Icons.side.both],
] as const;

export const sideOptions: readonly SideOption[] = SIDE_OPTION_VALUES.map(
  ([value, label, emoji, icon]) => ({
    value: value as Side,
    label,
    emoji,
    icon,
  }),
);

export function getSideOption(
  side: Side | null,
): SideOption | undefined {
  return (
    sideOptions.find(
      (option) => option.value === side,
    )
  );
}
