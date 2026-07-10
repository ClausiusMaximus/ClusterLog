import { useAttackForm } from "../hooks/useAttackForm";

import StartTimePicker from "./StartTimePicker";
import DurationPicker from "./DurationPicker";
import KipSelector from "./KipSelector";
import SideSelector from "./SideSelector";
import ActivitySelector from "./ActivitySelector";
import SaveButton from "./SaveButton";

export default function AttackForm() {
  const attack = useAttackForm();

  return (
    <>
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

      <SideSelector
        //value={attack.side}
        //onChange={attack.setSide}
      />

      <ActivitySelector
        //value={attack.activity}
        //onChange={attack.setActivity}
      />

      <SaveButton
        onClick={attack.save}
      />
    </>
  );
}