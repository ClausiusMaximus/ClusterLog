import {
  useCallback,
  useEffect,
  useRef,
} from "react";

import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

type RepeatButtonProps = {
  label: React.ReactNode;
  onPress: () => void;

  delay?: number;
  interval?: number;

  sx?: object;
};

export default function RepeatButton({
  label,
  onPress,
  delay = 500,
  interval = 100,
  sx,
}: RepeatButtonProps) {
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const pressedRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);

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

    if (targetRef.current && pointerIdRef.current !== null) {
      if (typeof targetRef.current.releasePointerCapture === "function") {
        try {
          targetRef.current.releasePointerCapture(pointerIdRef.current);
        } catch {
          // ignore release failures
        }
      }

      pointerIdRef.current = null;
      targetRef.current = null;
    }

    clearTimers();
  }, [clearTimers]);

  const startTimers = useCallback(() => {
    if (pressedRef.current) {
      return;
    }

    pressedRef.current = true;

    onPress();

    timeoutRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        if (pressedRef.current) {
          onPress();
        }
      }, interval);
    }, delay);
  }, [delay, interval, onPress]);

  const startFromTouch = useCallback(
    (event: React.TouchEvent<HTMLElement>) => {
      if (pressedRef.current) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      startTimers();
    },
    [startTimers],
  );

  const startFromPointer = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (event.pointerType === "touch") {
        return;
      }

      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      if (pressedRef.current) {
        return;
      }

      pressedRef.current = true;
      pointerIdRef.current = event.pointerId;
      targetRef.current = event.currentTarget;

      if (typeof event.currentTarget.setPointerCapture === "function") {
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
          // ignore capture failures
        }
      }

      event.preventDefault();

      startTimers();
    },
    [startTimers],
  );

  useEffect(() => {
    const handlePointerUp = () => {
      stop();
    };

    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);

      stop();
    };
  }, [stop]);

  return (
    <ButtonBase
      onPointerDown={startFromPointer}
      onTouchStart={startFromTouch}
      onTouchEnd={stop}
      onTouchCancel={stop}
      onContextMenu={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      sx={{
        width: 72,
        height: 40,
        borderRadius: 2,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        touchAction: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",

        "&:hover": {
          bgcolor: "action.hover",
        },

        ...sx,
      }}
    >
      <Typography component="span" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
    </ButtonBase>
  );
}