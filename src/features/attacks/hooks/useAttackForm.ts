import { useState } from "react";

import type { Activity, AttackSide } from "../types/attack";

export function useAttackForm() {
  const [start, setStart] = useState(new Date());

  const [duration, setDuration] = useState(0);

  const [kip, setKip] = useState(0);

  const [side, setSide] =
    useState<AttackSide>("left");

  const [activity, setActivity] =
    useState<Activity>("other");

  return {
    start,
    setStart,

    duration,
    setDuration,

    kip,
    setKip,

    side,
    setSide,

    activity,
    setActivity,
  };
}