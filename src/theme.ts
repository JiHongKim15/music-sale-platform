import { createTheme } from '@mui/material/styles';
import { useRecoilValue } from 'recoil';
import { darkModeState } from './store/atoms';

export function useTheme() {
  const isDarkMode = useRecoilValue(darkModeState);

  return createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#3b82f6',
        light: '#60a5fa',
        dark: '#2563eb',
      },
      secondary: {
        main: '#f59e0b',
        light: '#fbbf24',
        dark: '#d97706',
      },
      error: {
        main: '#ef4444',
      },
      warning: {
        main: '#f97316',
      },
      info: {
        main: '#3b82f6',
      },
      success: {
        main: '#22c55e',
      },
      background: {
        default: isDarkMode ? '#121212' : '#f3f4f6',
        paper: isDarkMode ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#111827',
        secondary: isDarkMode ? '#9ca3af' : '#4b5563',
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '0.375rem',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '0.375rem',
            },
          },
        },
      },
    },
  });
}