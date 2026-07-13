import { useCallback, useEffect, useRef } from "react";

type LongPressOptions = {
  delay?: number;
  interval?: number;
};

export function useLongPress(
  action: () => void,
  {
    delay = 500,
    interval = 100,
  }: LongPressOptions = {},
) {
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const pressedRef = useRef(false);

  const stop = useCallback(() => {
    pressedRef.current = false;

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (pressedRef.current) {
      return;
    }

    pressedRef.current = true;

    // Sofort einmal ausführen
    action();

    timeoutRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        action();
      }, interval);
    }, delay);
  }, [action, delay, interval]);

  useEffect(() => stop, [stop]);

  return {
    onPointerDown: start,
    onPointerUp: stop,
    onPointerCancel: stop,
  };
}