import { useState } from "react";
import type { MouseEvent } from "react";

import type { ButtonProps } from "@mui/material/Button";

import SelectableButton from "./SelectableButton";

type Props = Omit<ButtonProps, "onClick" | "variant"> & {
  onClick?: (
    event: MouseEvent<HTMLButtonElement>,
  ) => void | Promise<void>;
  resetAfterClick?: boolean;
};

export default function ActionSelectionButton({
  onClick,
  resetAfterClick = false,
  ...props
}: Props) {
  const [selected, setSelected] = useState(false);

  const handleClick = async (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    setSelected(true);
    await onClick?.(event);

    if (resetAfterClick) {
      setSelected(false);
    }
  };

  return (
    <SelectableButton
      {...props}
      selected={selected}
      onClick={handleClick}
    />
  );
}
