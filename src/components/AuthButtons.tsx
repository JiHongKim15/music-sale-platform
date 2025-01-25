import React from 'react';
import { LogIn } from 'lucide-react';

interface AuthButtonsProps {
  onLogin: () => void;
}

export function AuthButtons({ onLogin }: AuthButtonsProps) {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={onLogin}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <LogIn className="mr-2 h-4 w-4" />
        로그인
      </button>
    </div>
  );
}