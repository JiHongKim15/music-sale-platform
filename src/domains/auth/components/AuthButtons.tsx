import React from 'react';

interface AuthButtonsProps {
  onGoogle: () => void;
  onNaver: () => void;
  onKakao: () => void;
}

export function AuthButtons({ onGoogle, onNaver, onKakao }: AuthButtonsProps) {
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={onKakao}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-yellow-300 text-gray-900 font-bold hover:bg-yellow-400 transition"
        aria-label="카카오로 시작하기"
      >
        <span className="w-5 h-5"><svg viewBox="0 0 24 24" fill="currentColor"><ellipse cx="12" cy="12" rx="12" ry="12"/></svg></span>
        카카오로 시작하기
      </button>
      <button
        type="button"
        onClick={onNaver}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition"
        aria-label="네이버로 시작하기"
      >
        <span className="w-5 h-5"><svg viewBox="0 0 24 24" fill="currentColor"><rect width="24" height="24" rx="6"/></svg></span>
        네이버로 시작하기
      </button>
      <button
        type="button"
        onClick={onGoogle}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 font-bold hover:bg-gray-50 transition"
        aria-label="구글로 시작하기"
      >
        <span className="w-5 h-5"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#fff"/><path d="M21.6 12.227c0-.818-.073-1.597-.209-2.345H12v4.44h5.377a4.6 4.6 0 0 1-2.004 3.018v2.5h3.24c1.898-1.75 2.987-4.33 2.987-7.613z" fill="#4285F4"/><path d="M12 22c2.7 0 4.97-.89 6.627-2.41l-3.24-2.5c-.9.6-2.05.96-3.387.96-2.6 0-4.8-1.75-5.59-4.09H3.05v2.57A9.997 9.997 0 0 0 12 22z" fill="#34A853"/><path d="M6.41 13.96A5.99 5.99 0 0 1 6 12c0-.68.12-1.34.34-1.96V7.47H3.05A9.997 9.997 0 0 0 2 12c0 1.64.39 3.19 1.05 4.53l3.36-2.57z" fill="#FBBC05"/><path d="M12 6.44c1.47 0 2.78.51 3.81 1.51l2.86-2.86C16.97 3.89 14.7 3 12 3A9.997 9.997 0 0 0 3.05 7.47l3.36 2.57C7.2 8.19 9.4 6.44 12 6.44z" fill="#EA4335"/></svg></span>
        구글로 시작하기
      </button>
    </div>
  );
}