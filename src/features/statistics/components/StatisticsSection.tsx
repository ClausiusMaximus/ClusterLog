import type { ReactNode } from "react";

import { AppCard, PageTitle } from "@/components/common";

type Props = {
  title: string;
  controls?: ReactNode;
  children: ReactNode;
};

export default function StatisticsSection({
  title,
  controls,
  children,
}: Props) {
  return (
    <AppCard>
      <PageTitle>{title}</PageTitle>

      {controls}

      {children}
    </AppCard>
  );
}