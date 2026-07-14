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

let instanceCounter = 0;

export default function RepeatButtonDiagnostic({
  label,
  onPress,
  delay = 500,
  interval = 100,
  sx,
}: RepeatButtonProps) {
  const idRef = useRef<number>(() => {
    instanceCounter += 1;
    return instanceCounter;
  }) as React.MutableRefObject<number>;

  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const pressedRef = useRef(false);
  const renderCount = useRef(0);

  renderCount.current += 1;

  const log = useCallback((...args: any[]) => {
    // eslint-disable-next-line no-console
    console.log(`[RepeatButton#${idRef.current}]`, ...args);
  }, []);

  const stop = useCallback(() => {
    log("stop called, renderCount=", renderCount.current);

    pressedRef.current = false;

    if (timeoutRef.current !== null) {
      log("clearTimeout");
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (intervalRef.current !== null) {
      log("clearInterval");
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [log]);

  const start = useCallback((ev?: any) => {
    log("onPointerDown", { pressed: pressedRef.current, pointerType: ev?.pointerType, button: ev?.button });

    if (pressedRef.current) return;

    pressedRef.current = true;

    log("invoke onPress immediate");
    onPress();

    log("start timeout for repeat", { delay, interval });
    timeoutRef.current = window.setTimeout(() => {
      log("timeout fired, start interval");
      intervalRef.current = window.setInterval(() => {
        log("interval tick, pressed=", pressedRef.current);
        if (pressedRef.current) {
          onPress();
        }
      }, interval);
    }, delay);
  }, [delay, interval, onPress, log]);

  useEffect(() => {
    log("mount, renderCount=", renderCount.current);

    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);

    return () => {
      log("unmount");
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
      stop();
    };
  }, [stop, log]);

  return (
    <ButtonBase
      onPointerDown={start}
      onPointerUp={() => log("onPointerUp")}
      onPointerCancel={() => log("onPointerCancel")}
      onPointerMove={() => log("onPointerMove")}
      onClick={() => log("onClick")}
      sx={{
        width: 72,
        height: 40,
        borderRadius: 2,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

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
