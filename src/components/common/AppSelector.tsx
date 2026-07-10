import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import AppCard from "./AppCard";
import NumberButton from "./NumberButton";

type Option<T extends string | number> = {
  value: T;
  label: string;
};

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
  columns = 2,
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
            selected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </Box>
    </AppCard>
  );
}