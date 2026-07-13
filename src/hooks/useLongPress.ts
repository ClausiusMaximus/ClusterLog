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
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const pressedRef = useRef(false);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    pressedRef.current = false;
    clearTimers();
  }, [clearTimers]);

  const start = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      // Nur primäre Maustaste zulassen.
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      // Doppelte PointerDowns verhindern.
      if (pressedRef.current) {
        return;
      }

      pressedRef.current = true;

      // Pointer auch außerhalb des Buttons weiter verfolgen.
      event.currentTarget.setPointerCapture?.(event.pointerId);

      // Sofort einmal ausführen.
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

  const end = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (
        event.currentTarget.hasPointerCapture?.(event.pointerId)
      ) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      stop();
    },
    [stop],
  );

  useEffect(() => {
      const handlePointerUp = () => stop();

      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);

      return () => {
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerUp);
        stop();
      };
  }, [stop]);

  return {
    onPointerDown: start,
  };
}