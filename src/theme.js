import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8B7CFF',
      light: '#A99EFF',
      contrastText: '#0D1021',
    },
    secondary: {
      main: '#FF7A8A',
    },
    background: {
      default: '#0D1021',
      paper: '#171A33',
    },
    text: {
      primary: '#F7F7FC',
      secondary: '#A8ACC7',
    },
    error: {
      main: '#FF667A',
    },
    success: {
      main: '#44D7B6',
    },
    divider: '#34395F',
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
