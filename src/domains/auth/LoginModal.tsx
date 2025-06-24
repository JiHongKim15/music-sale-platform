import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleLogin: () => void;
  onNaverLogin: () => void;
  onKakaoLogin: () => void;
}

export function LoginModal({
  isOpen,
  onClose,
  onGoogleLogin,
  onNaverLogin,
  onKakaoLogin,
}: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">로그인</h2>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={onGoogleLogin}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Google로 계속하기
          </button>

          <button
            onClick={onNaverLogin}
            className="w-full flex items-center justify-center px-4 py-2 border border-[#03C75A] rounded-md shadow-sm text-sm font-medium text-white bg-[#03C75A] hover:bg-[#02b350]"
          >
            NAVER로 계속하기
          </button>

          <button
            onClick={onKakaoLogin}
            className="w-full flex items-center justify-center px-4 py-2 border border-[#FEE500] rounded-md shadow-sm text-sm font-medium text-[#000000] bg-[#FEE500] hover:bg-[#FDD800]"
          >
            카카오로 계속하기
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                또는
              </span>
            </div>
          </div>

          <Link
            to="/signup"
            onClick={onClose}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            이메일로 회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}