import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import { AttackService } from "@/lib/services/AttackService";
import type { Attack } from "@/features/attacks/types/attack";

export default function AttackList() {
  const [attacks, setAttacks] = useState<Attack[]>([]);

  useEffect(() => {
    async function load() {
      const result = await AttackService.getAll();
      setAttacks(result);
    }

    load();
  }, []);

  if (attacks.length === 0) {
    return <Typography>Noch keine Attacken gespeichert.</Typography>;
  }

  return (
    <>
      {attacks.map((attack) => (
        <Typography key={attack.id}>
          {attack.start.toLocaleString("de-DE")} · KIP {attack.kip}
        </Typography>
      ))}
    </>
  );
}