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

      event.stopPropagation();
      startTimers();
    },
    [startTimers],
  );

  const startFromMouse = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (event.button !== 0) {
        return;
      }

      if (pressedRef.current) {
        return;
      }

      event.preventDefault();
      startTimers();
    },
    [startTimers],
  );

  useEffect(() => {
    const handleMouseUp = () => {
      stop();
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseUp);
      stop();
    };
  }, [stop]);

  return (
    <ButtonBase
      onMouseDown={startFromMouse}
      onMouseUp={stop}
      onMouseLeave={stop}
      onTouchStart={startFromTouch}
      onTouchEnd={stop}
      onTouchCancel={stop}
      onContextMenu={(event) => {
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