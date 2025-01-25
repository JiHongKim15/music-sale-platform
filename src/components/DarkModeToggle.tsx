import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Sun, Moon } from 'lucide-react';
import { darkModeState } from '../store/atoms';

export function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);

  useEffect(() => {
    // HTML 요소에 dark 클래스 토글
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // localStorage에 설정 저장
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label="다크모드 전환"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      ) : (
        <Moon className="h-5 w-5 text-gray-500" />
      )}
    </button>
  );
}