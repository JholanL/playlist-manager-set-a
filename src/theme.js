import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1DB954',
      light: '#32D76A',
      contrastText: '#07140B',
    },
    background: {
      default: '#0B0F0C',
      paper: '#151A17',
    },
    text: {
      primary: '#F5F7F5',
      secondary: '#A7B0AA',
    },
    error: {
      main: '#FF6B6B',
    },
    divider: '#303832',
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    button: {
      fontWeight: 750,
      textTransform: 'none',
    },
    h3: {
      fontWeight: 850,
      letterSpacing: '-0.04em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999, paddingInline: 22 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
  },
})
