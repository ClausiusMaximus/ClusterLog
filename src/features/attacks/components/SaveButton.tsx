import { AppButton } from "@/components/common";

type Props = {
  onClick: () => void;
};

export default function SaveButton({ onClick }: Props) {
  return (
    <AppButton fullWidth onClick={onClick}>
      Attacke speichern
    </AppButton>
  );
}