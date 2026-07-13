import { useCallback, useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

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
  const pressedRef = useRef(false);

  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    pressedRef.current = false;
    clearTimers();
  }, [clearTimers]);

  const start = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      // Desktop: nur linke Maustaste
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      if (pressedRef.current) {
        return;
      }

      pressedRef.current = true;

      // einmal sofort
      action();

      timeoutRef.current = window.setTimeout(() => {
        intervalRef.current = window.setInterval(() => {
          if (pressedRef.current) {
            action();
          }
        }, interval);
      }, delay);
    },
    [action, delay, interval],
  );

  useEffect(() => {
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);

    return () => {
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
      stop();
    };
  }, [stop]);

  return {
    onPointerDown: start,
  };
}