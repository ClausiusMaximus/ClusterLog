import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { CardProps } from "@mui/material/Card";
import type { ReactNode } from "react";

type Props = CardProps & {
  children: ReactNode;
};

export default function AppCard({ children, ...props }: Props) {
  return (
    <Card elevation={2} {...props}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}