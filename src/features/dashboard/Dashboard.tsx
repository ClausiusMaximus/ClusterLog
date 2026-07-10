import { Typography } from "@mui/material";

import {
  AppButton,
  AppCard,
  PageTitle,
  Section,
} from "@/components/common";

export default function Dashboard() {
  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      <Section>
        <AppCard>
          <Typography gutterBottom>
            Willkommen bei ClusterLog.
          </Typography>

          <AppButton>
            Neue Attacke erfassen
          </AppButton>
        </AppCard>
      </Section>
    </>
  );
}