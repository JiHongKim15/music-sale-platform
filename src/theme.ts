import { createTheme } from '@mui/material/styles';
import { useRecoilValue } from 'recoil';
import { darkModeState } from '@/stores/atoms';

export function useTheme() {
  const isDarkMode = useRecoilValue(darkModeState);

  return createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#2EC4F1',
        light: '#A0E9F6',
        dark: '#1A9ED9',
      },
      secondary: {
        main: '#00D8B0',
        light: '#5FFFE1',
        dark: '#00B894',
      },
      error: {
        main: '#FF5A5F',
      },
      warning: {
        main: '#FFC542',
      },
      info: {
        main: '#2EC4F1',
      },
      success: {
        main: '#22C55E',
      },
      background: {
        default: isDarkMode ? '#181F2A' : '#F8FAFC',
        paper: isDarkMode ? '#232B3B' : '#FFFFFF',
      },
      text: {
        primary: isDarkMode ? '#FFFFFF' : '#1A2A3A',
        secondary: isDarkMode ? '#A3B8CC' : '#7B8FA1',
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        'Pretendard',
        'Apple SD Gothic Neo',
        'sans-serif',
      ].join(','),
    },
    shape: {
      borderRadius: 16,
    },
    spacing: 8,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 16,
            minHeight: 48,
            fontWeight: 600,
            fontSize: '1rem',
            letterSpacing: '0.01em',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 16,
              minHeight: 48,
              fontSize: '1rem',
            },
          },
        },
      },
    },
  });
}