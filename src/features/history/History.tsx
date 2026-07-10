import { PageTitle } from "@/components/common";

import AttackList from "./components/AttackList";

export default function HistoryPage() {
  return (
    <>
      <PageTitle>Verlauf</PageTitle>

      <AttackList />
    </>
  );
}