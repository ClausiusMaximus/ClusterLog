import { PageTitle } from "@/components/common";

import { useAttackForm } from "./hooks/useAttackForm";

import StartTimePicker from "./components/StartTimePicker";

export default function AttackPage() {
  const attack = useAttackForm();

  return (
    <>
      <PageTitle>Neue Attacke</PageTitle>

      <StartTimePicker
        value={attack.start}
        onChange={attack.setStart}
      />
    </>
  );
}