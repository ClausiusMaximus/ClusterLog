export type Trigger =
  | "alcohol"
  | "stress"
  | "heat"
  | "cold"
  | "sleep"
  | "exercise"
  | "food"
  | "other";

export const TRIGGER_VALUES = [
  "alcohol",
  "stress",
  "heat",
  "cold",
  "sleep",
  "exercise",
  "food",
  "other",
] as const satisfies readonly Trigger[];