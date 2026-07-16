import { getActivityOption } from "../options/activities";
import { getSideOption } from "../options/sides";

export { getActivityOption, getSideOption };

const KIP_COLOR_THRESHOLDS = [2, 4, 6, 9] as const;

export function getKipColor(kip: number | null) {
  if (kip === null) return "text.disabled";
  if (kip <= KIP_COLOR_THRESHOLDS[0]) return "success.main";
  if (kip <= KIP_COLOR_THRESHOLDS[1]) return "warning.light";
  if (kip <= KIP_COLOR_THRESHOLDS[2]) return "warning.main";
  if (kip <= KIP_COLOR_THRESHOLDS[3]) return "error.main";

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
