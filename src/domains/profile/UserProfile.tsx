import React from 'react';
import { User, LogOut, Heart } from 'lucide-react';
import { User as UserType } from '@/domains/common/types/user';
interface UserProfileProps {
  user: UserType;
  onLogout: () => void;
}

export function UserProfile({ user, onLogout }: UserProfileProps) {
  return (
    <div className="relative group">
      <button className="flex items-center space-x-2">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500" />
          </div>
        )}
        <span className="text-gray-700">{user.name}</span>
      </button>

      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
        <a
          href="/favorites"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Heart className="mr-2 h-4 w-4" />
          관심 악기
        </a>
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="mr-2 h-4 w-4" />
          로그아웃
        </button>
      </div>
    </div>
  );
}