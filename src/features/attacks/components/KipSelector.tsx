import { AppSelector } from "@/components/common";

import { KIP_OPTIONS } from "../options/options";

type Props = {
  value: number;
  onChange: (kip: number) => void;
};

export default function KipSelector(props: Props) {
  return (
    <AppSelector
      title="KIP-Skala"
      columns={5}
      options={KIP_OPTIONS}
      {...props}
    />
  );
}