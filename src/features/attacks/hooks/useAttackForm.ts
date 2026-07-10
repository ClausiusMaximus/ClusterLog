import { useState } from "react";

import type { Activity, Side } from "../types/attack";

export function useAttackForm() {
  const [start, setStart] = useState(new Date());

  const [duration, setDuration] = useState(0);

  const [kip, setKip] = useState(0);

  const [side, setSide] =
    useState<Side>("left");

  const [activity, setActivity] =
    useState<Activity>("other");

  const save = () => {
  console.log("Attacke speichern");
  };

  return {
    start,
    duration,
    kip,
    side,
    activity,

    setStart,
    setDuration,
    setKip,
    setSide,
    setActivity,

    save,
  };
}