import { PageTitle } from "@/components/common";

import AttackForm from "./components/AttackForm";
import { useAttackForm } from "./hooks/useAttackForm";

export default function AttackPage() {
  const form = useAttackForm();

  return (
    <>
      <PageTitle>Neue Attacke</PageTitle>

      <AttackForm
        attack={form.attack}
        update={form.update}
        onSubmit={form.save}
      />
    </>
  );
}