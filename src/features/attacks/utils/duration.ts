const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MINUTE = 60;

export function durationToSeconds(hours: number, minutes: number, seconds: number): number {
  return hours * SECONDS_PER_HOUR + minutes * SECONDS_PER_MINUTE + seconds;
}

export function secondsToDuration(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds);

  const hours = Math.floor(safeSeconds / SECONDS_PER_HOUR);
  const minutes = Math.floor((safeSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  const seconds = safeSeconds % SECONDS_PER_MINUTE;

  return {
    hours,
    minutes,
    seconds,
  };
}

export function pad(value: number) {
  return value.toString().padStart(2, "0");
}