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
  const rootRef = useRef<HTMLButtonElement | null>(null);

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
    const element = rootRef.current;

    if (!element) {
      return;
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (pressedRef.current) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      startTimers();
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
    };

    const handleTouchEnd = (event: TouchEvent) => {
      event.preventDefault();
      stop();
    };

    const handleTouchCancel = (event: TouchEvent) => {
      event.preventDefault();
      stop();
    };

    const handleContextMenu = (event: Event) => {
      event.preventDefault();
    };

    element.addEventListener("touchstart", handleTouchStart, { passive: false });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd, { passive: false });
    element.addEventListener("touchcancel", handleTouchCancel, { passive: false });
    element.addEventListener("contextmenu", handleContextMenu);

    const handleMouseUp = () => {
      stop();
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseUp);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
      element.removeEventListener("touchcancel", handleTouchCancel);
      element.removeEventListener("contextmenu", handleContextMenu);

      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseUp);

      stop();
    };
  }, [startTimers, stop]);

  return (
    <ButtonBase
      ref={rootRef}
      onMouseDown={startFromMouse}
      onMouseUp={stop}
      onMouseLeave={stop}
      onContextMenu={(event) => {
        event.preventDefault();
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