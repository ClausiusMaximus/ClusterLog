import { ActionSelectionButton } from "@/components/common";

type Props = {
  onClick: () => void | Promise<void>;
};

export default function SaveButton({ onClick }: Props) {
  return (
    <ActionSelectionButton
      fullWidth
      size="large"
      resetAfterClick
      onClick={onClick}
      sx={{ borderRadius: 3, minHeight: 56 }}
    >
      Attacke speichern
    </ActionSelectionButton>
  );
}
