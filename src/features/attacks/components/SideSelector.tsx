import { AppSelector } from "@/components/common";

import type { Side } from "../options/sides";
import { SIDE_OPTIONS } from "../utils/options";

type Props = {
  value: Side;
  onChange: (side: Side) => void;
};

export default function SideSelector(props: Props) {
  return (
    <AppSelector
      title="Kopfseite"
      columns={3}
      options={SIDE_OPTIONS}
      {...props}
    />
  );
}