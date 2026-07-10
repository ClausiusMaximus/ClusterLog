import { PageTitle } from "@/components/common/index";

import { useAttackForm } from "./hooks/useAttackForm";

import StartTimePicker from "./components/StartTimePicker";

import DurationPicker from "./components/DurationPicker";

import KipSelector from "./components/KipSelector";

export default function AttackPage() {
  const attack = useAttackForm();

  return (
    <>
      <PageTitle>Neue Attacke</PageTitle>

      <StartTimePicker
        value={attack.start}
        onChange={attack.setStart}
      />

      <DurationPicker
        value={attack.duration}
        onChange={attack.setDuration}
      />

      <KipSelector
        value={attack.kip}
        onChange={attack.setKip}
      />
    </>
  );
}