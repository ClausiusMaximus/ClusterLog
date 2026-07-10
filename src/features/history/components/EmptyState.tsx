import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function EmptyState() {
  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "text.secondary",
      }}
    >
      <SentimentSatisfiedAltIcon sx={{ fontSize: 72, mb: 2 }} />

      <Typography variant="h6">
        Noch keine Attacken gespeichert
      </Typography>

      <Typography variant="body2">
        Erfasse deine erste Attacke.
      </Typography>
    </Box>
  );
}