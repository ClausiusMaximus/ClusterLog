import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type { Option } from "@/features/attacks/options/options";

import AppCard from "./AppCard";
import NumberButton from "./NumberButton";

const DEFAULT_COLUMNS = 2;

type AppSelectorProps<T extends string | number> = {
  title: string;
  value: T;
  options: readonly Option<T>[];
  columns?: number;
  onChange: (value: T) => void;
};

export default function AppSelector<T extends string | number>({
  title,
  value,
  options,
  columns = DEFAULT_COLUMNS,
  onChange,
}: AppSelectorProps<T>) {
  return (
    <AppCard>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 1,
        }}
      >
        {options.map((option) => (
          <NumberButton
            key={String(option.value)}
            label={option.label}
            icon={typeof option.icon === "string" ? undefined : option.icon}
            color={option.color}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </Box>
    </AppCard>
  );
}