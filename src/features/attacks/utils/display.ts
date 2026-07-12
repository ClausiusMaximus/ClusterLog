import { getSideOption } from "../options/sides";
import { getActivityOption } from "../options/activities";


export { getActivityOption, getSideOption};

export function getKipColor(kip: number) {
  if (kip <= 2) return "success.main";
  if (kip <= 4) return "warning.light";
  if (kip <= 6) return "warning.main";
  if (kip <= 9) return "error.main";

  return "error.dark";
}

export function formatAttackDate(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatAttackTime(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
