export type AttackSide = "left" | "right" | "both";

export type Activity =
  | "sleep"
  | "work"
  | "driving"
  | "meal"
  | "walking"
  | "exercise"
  | "relaxing"
  | "other";

export interface Attack {

  id: string;

  start: Date;

  duration: number;

  kip: number;

  side: AttackSide;

  activity: Activity;

  createdAt: Date;

  updatedAt: Date;
}