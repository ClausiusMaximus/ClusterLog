import { useCallback, useEffect, useRef } from "react";

type LongPressOptions = {
  delay?: number;
  interval?: number;
};

export function useLongPress(
  action: () => void,
  {
    delay = 500,
    interval = 80,
  }: LongPressOptions = {},
) {
  const timeoutRef = useRef<number | undefined>(undefined);
  const intervalRef = useRef<number | undefined>(undefined);

  const stop = useCallback(() => {
    if (timeoutRef.current !== undefined) {
      window.clearTimeout(timeoutRef.current);
    }

    if (intervalRef.current !== undefined) {
      window.clearInterval(intervalRef.current);
    }
  }, []);

  const start = useCallback(() => {
    action();

    timeoutRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        action();
      }, interval);
    }, delay);
  }, [action, delay, interval]);

  useEffect(() => {
    return stop;
  }, [stop]);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,

    onTouchStart: start,
    onTouchEnd: stop,
    onTouchCancel: stop,
  };
}