import React from 'react';
import { Heart } from 'lucide-react';

interface FloatingFavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

export function FloatingFavoriteButton({ isFavorite, onClick }: FloatingFavoriteButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed right-6 bottom-20 z-50 p-4 rounded-full shadow-lg transition-colors ${
        isFavorite
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
    </button>
  );
}