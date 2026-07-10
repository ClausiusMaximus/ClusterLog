import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AppCard({ children }: Props) {
  return (
    <Card elevation={2}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}