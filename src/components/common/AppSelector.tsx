import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type { Option } from "@/features/attacks/options/options";

import AppCard from "./AppCard";
import NumberButton from "./NumberButton";

const DEFAULT_COLUMNS = 2;

type AppSelectorProps<T extends string | number> = {
  title: string;
  value: T | null;
  options: readonly Option<T>[];
  columns?: number;
  fitOptionsToGrid?: boolean;
  onChange: (value: T) => void;
};

export default function AppSelector<T extends string | number>({
  title,
  value,
  options,
  columns = DEFAULT_COLUMNS,
  fitOptionsToGrid = false,
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
          gridTemplateColumns: fitOptionsToGrid
            ? `repeat(${columns}, minmax(0, 1fr))`
            : `repeat(${columns}, 1fr)`,
          gap: fitOptionsToGrid ? { xs: 0.5, sm: 1 } : 1,
        }}
      >
        {options.map((option) => (
          <NumberButton
            key={String(option.value)}
            label={option.label}
            icon={typeof option.icon === "string" ? undefined : option.icon}
            color={option.color}
            selected={value === option.value}
            fillGridCell={fitOptionsToGrid}
            onClick={() => onChange(option.value)}
          />
        ))}
      </Box>
    </AppCard>
  );
}
