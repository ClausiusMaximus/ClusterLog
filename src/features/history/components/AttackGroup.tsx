import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { Attack } from "@/features/attacks/types/attack";

import AttackCard from "./AttackCard";

type Props = {
  title: string;
  attacks: Attack[];
  onSelect: (attack: Attack) => void;
};

export default function AttackGroup({
  title,
  attacks,
  onSelect,
}: Props) {
  return (
    <Stack spacing={2}>
      <Typography
        variant="h5"
        sx={{
          mt: 2,
          mb: 1,
          fontWeight: 700,
        }}
      >
        {title}
      </Typography>

      {attacks.map((attack) => (
        <AttackCard
          key={attack.id}
          attack={attack}
          onClick={() => onSelect?.(attack)}

        />     
      ))}
    </Stack>
  );
}