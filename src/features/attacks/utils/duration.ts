export function secondsToDuration(
  totalSeconds: number,
) {
  const hours = Math.floor(
    totalSeconds / 3600,
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60,
  );

  const seconds =
    totalSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
  };
}

export function durationToSeconds(
  hours: number,
  minutes: number,
  seconds: number,
) {
  return (
    hours * 3600 +
    minutes * 60 +
    seconds
  );
}

export function pad(
  value: number,
) {
  return value
    .toString()
    .padStart(2, "0");
}