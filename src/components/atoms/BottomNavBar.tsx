import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Store, Search, Heart, User } from 'lucide-react';

export function BottomNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { 
      icon: Home, 
      label: '홈', 
      path: '/',
      emoji: '🏠'
    },
    { 
      icon: Store, 
      label: '상점', 
      path: '/stores',
      emoji: '🏪'
    },
    { 
      icon: Search, 
      label: '검색', 
      path: '/marketplace',
      emoji: '🔍'
    },
    { 
      icon: Heart, 
      label: '찜', 
      path: '/favorites',
      emoji: '💝'
    },
    { 
      icon: User, 
      label: '내정보', 
      path: '/profile',
      emoji: '👤'
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`group flex flex-col items-center p-3 rounded-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                  isActive 
                    ? 'text-orange-600 bg-orange-50' 
                    : 'text-gray-400 hover:text-orange-600 hover:bg-orange-50'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`relative transition-all duration-300 ${
                  isActive ? 'scale-110' : 'group-hover:scale-110'
                }`}>
                  <span className="text-lg group-hover:animate-bounce">{item.emoji}</span>
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full animate-pulse"></div>
                  )}
                </div>
                <span className={`text-xs font-medium mt-1 transition-all duration-300 ${
                  isActive ? 'text-orange-600' : 'text-gray-500 group-hover:text-orange-600'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
} 