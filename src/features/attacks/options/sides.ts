export type Side =
  | "left"
  | "right"
  | "both";

export type SideOption = {
  value: Side;
  label: string;
  emoji: string;
};

export const sideOptions: readonly SideOption[] = [
  {
    value: "left",
    label: "Links",
    emoji: "⬅",
  },
  {
    value: "right",
    label: "Rechts",
    emoji: "➡",
  },
  {
    value: "both",
    label: "Beidseitig",
    emoji: "⬌",
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