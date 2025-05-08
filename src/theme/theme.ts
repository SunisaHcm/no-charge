import { createTheme } from '@mui/material/styles';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#2D8EAD',
      light: '#4AA5C1',
      dark: '#1C6E89',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00A896',
      light: '#33B7A8',
      dark: '#007F6E',
      contrastText: '#ffffff',
    },
    error: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828',
    },
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    info: {
      main: '#CBF8F1',
      light: '#E0FBF7',
      dark: '#A9F0E6',
      contrastText: '#07090A',
    },
    text: {
      primary: '#07090A',
      secondary: '#52595F',
    },
    background: {
      default: '#F5F7F9',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.2,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2D8EAD',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.info.main,
          color: theme.palette.info.contrastText,
          '& .MuiChip-deleteIcon': {
            color: theme.palette.info.contrastText,
            '&:hover': {
              color: theme.palette.info.dark,
            },
          },
        }),
      },
    },
  },
});

export default theme;