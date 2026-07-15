import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#1976d2",
    },

    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "none",
          minHeight: 52,
          fontWeight: 600,
        },
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
          "&.Mui-selected:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }),
      },
    },

    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 72,
        },
      },
    },
  },
});

export default theme;
