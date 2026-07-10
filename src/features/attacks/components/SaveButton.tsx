import { AppButton } from "@/components/common";

type SaveButtonProps = {
  onClick: () => void;
};

export default function SaveButton({
  onClick,
}: SaveButtonProps) {
  return (
    <AppButton onClick={onClick}>
      Speichern
    </AppButton>
  );
}