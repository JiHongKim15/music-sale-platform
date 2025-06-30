import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryProvider } from '@/providers/QueryProvider';
import App from '@/app/App.tsx';
import { useTheme } from './theme';
import './index.css';

// 초기 다크모드 설정
const initialDarkMode = localStorage.getItem('darkMode') === 'true';
if (initialDarkMode) {
  document.documentElement.classList.add('dark');
}

function ThemedApp() {
  const theme = useTheme();
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <QueryProvider>
        <ThemedApp />
      </QueryProvider>
    </RecoilRoot>
  </StrictMode>
);