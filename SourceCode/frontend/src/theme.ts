import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6C63FF',
      light: '#8B83FF',
      dark: '#4A42DB',
    },
    secondary: {
      main: '#00D9FF',
      light: '#33E0FF',
      dark: '#00A8C6',
    },
    background: {
      default: '#06060B',
      paper: '#0E0E16',
    },
    text: {
      primary: '#EAEAEF',
      secondary: '#8A8A9A',
    },
    error: {
      main: '#FF4D6A',
    },
    success: {
      main: '#00E676',
    },
    warning: {
      main: '#FFB800',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '0.95rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: ({ ownerState }: { ownerState: { color?: string } }) => ({
          ...(ownerState.color === 'primary' && {
            background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
            boxShadow: '0 4px 20px rgba(108, 99, 255, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #7B73FF 0%, #33E0FF 100%)',
              boxShadow: '0 6px 30px rgba(108, 99, 255, 0.5)',
              transform: 'translateY(-2px)',
            },
          }),
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(14, 14, 22, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 20,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            border: '1px solid rgba(108, 99, 255, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(108, 99, 255, 0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(6, 6, 11, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconFilled: {
          color: '#FFB800',
        },
        iconEmpty: {
          color: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
  },
});

export default theme;
