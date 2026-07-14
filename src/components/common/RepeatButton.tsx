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

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      if (pressedRef.current) return;

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

      onPress();

      timeoutRef.current = window.setTimeout(() => {
        intervalRef.current = window.setInterval(() => {
          if (pressedRef.current) {
            onPress();
          }
        }, interval);
      }, delay);
    },
    [delay, interval, onPress],
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

  return (
    <ButtonBase
      onPointerDown={start}
      sx={{
        width: 72,
        height: 40,
        borderRadius: 2,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        touchAction: "none",
        userSelect: "none",
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