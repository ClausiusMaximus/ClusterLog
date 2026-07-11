export type Side = "left" | "both" | "right";

export type Activity =
  | "sleep"
  | "work"
  | "household"
  | "leisure"
  | "driving"
  | "eating"
  | "sport"
  | "other";

export interface Attack {
  id: string;

  start: Date;

  duration: number; // seconds

  kip: number;

  side: Side;

  activity: Activity;

  createdAt: Date;

  updatedAt: Date;
}