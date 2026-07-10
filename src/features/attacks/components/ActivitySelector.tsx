import { AppSelector } from "@/components/common";

import type { Activity } from "../types/attack";
import { ACTIVITY_OPTIONS } from "../utils/options";

type Props = {
  value: Activity;
  onChange: (activity: Activity) => void;
};

export default function ActivitySelector(props: Props) {
  return (
    <AppSelector
      title="Tätigkeit"
      columns={2}
      options={ACTIVITY_OPTIONS}
      {...props}
    />
  );
}