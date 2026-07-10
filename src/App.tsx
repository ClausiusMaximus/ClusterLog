import { Box, Container, Paper, Typography } from "@mui/material";

function App() {
  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            ClusterLog
          </Typography>

          <Typography>
            Willkommen zum Neuaufbau der ClusterLog PWA.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;