export function durationToSeconds(
  hours: number,
  minutes: number,
  seconds: number,
): number {
  return (
    hours * 3600 +
    minutes * 60 +
    seconds
  );
}

export function secondsToDuration(
  totalSeconds: number,
) {
  const safeSeconds = Math.max(0, totalSeconds);

  const hours = Math.floor(
    safeSeconds / 3600,
  );

  const minutes = Math.floor(
    (safeSeconds % 3600) / 60,
  );

  const seconds =
    safeSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
  };
}

export function pad(
  value: number,
) {
  return value
    .toString()
    .padStart(2, "0");
}