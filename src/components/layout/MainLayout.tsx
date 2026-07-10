import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";

import Header from "@/components/layout/Header";
import AppBottomNavigation from "@/components/layout/AppBottomNavigation";

export default function MainLayout() {
  return (
    <Box sx={{ minHeight: "100vh", pb: 10 }}>
      <Header />

      <Container maxWidth="sm" sx={{ mt: 3 }}>
        <Outlet />
      </Container>


      <AppBottomNavigation />
    </Box>
  );
}