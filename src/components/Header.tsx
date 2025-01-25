import React, { useState, useRef } from 'react';
import { Music, Store, Plus, ShoppingBag, Heart, Clock, User, LogOut, Menu, X, Settings, LineChart, UserCircle, Bell } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { instrumentCategories } from '../data/categories';
import { AuthButtons } from './AuthButtons';
import { LoginModal } from './LoginModal';
import { DarkModeToggle } from './DarkModeToggle';
import { NotificationsPopover } from './NotificationsPopover';
import { userState } from '../store/atoms';
import type { Notification } from '../types/notifications';

export function Header() {
  const [user, setUser] = useRecoilState(userState);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showInstrumentMenu, setShowInstrumentMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const registerMenuRef = useRef<HTMLDivElement>(null);
  const instrumentMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickOutside = (event: MouseEvent) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
      setShowUserMenu(false);
    }
    if (registerMenuRef.current && !registerMenuRef.current.contains(event.target as Node)) {
      setShowRegisterMenu(false);
    }
    if (instrumentMenuRef.current && !instrumentMenuRef.current.contains(event.target as Node)) {
      setShowInstrumentMenu(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setUser(null);
    setShowUserMenu(false);
    navigate('/');
  };

  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleNotificationClick = (notification: Notification) => {
    navigate(`/instrument/${notification.instrumentId}`);
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleInstrumentSelect = (category: string, subcategory?: string, item?: string) => {
    navigate('/', {
      state: {
        selectedCategory: category,
        selectedSubcategory: subcategory,
        selectedItem: item
      }
    });
    setShowInstrumentMenu(false);
  };

  return (
    <header className="bg-white shadow-sm dark:bg-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center group hover:opacity-80 transition-all duration-300"
            >
              <Music className="h-8 w-8 text-blue-600 transform group-hover:scale-110 transition-transform duration-300" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                악기 찾기
              </h1>
            </button>
          </div>

          {/* Primary Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-8">
            <div 
              className="relative group"
              onMouseEnter={() => setShowInstrumentMenu(true)}
              onMouseLeave={() => setShowInstrumentMenu(false)}
            >
              <button className="px-3 py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                악기
              </button>
              
              {showInstrumentMenu && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-[800px] grid grid-cols-3 gap-6">
                  {instrumentCategories.map(category => (
                    <div key={category.name} className="space-y-3">
                      <button
                        onClick={() => handleInstrumentSelect(category.name)}
                        className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {category.name}
                      </button>
                      <div className="space-y-2">
                        {category.subcategories.map(subcategory => (
                          <div key={subcategory.name}>
                            <button
                              onClick={() => handleInstrumentSelect(category.name, subcategory.name)}
                              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              {subcategory.name}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/price-comparison"
              className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <LineChart className="w-5 h-5 mr-2" />
              가격 비교
            </Link>
            <Link
              to="/stores"
              className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <Store className="w-5 h-5 mr-2" />
              악기점
            </Link>
            <Link
              to="/marketplace"
              className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              중고장터
            </Link>
          </nav>

          {/* Secondary Navigation */}
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            {user ? (
              <>
                <NotificationsPopover onNotificationClick={handleNotificationClick} />
                {user.is_seller && (
                  <div className="relative" ref={registerMenuRef}>
                    <button
                      className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      onClick={() => setShowRegisterMenu(!showRegisterMenu)}
                    >
                      <Plus size={20} />
                    </button>
                    {showRegisterMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg py-1">
                        <Link
                          to="/register/store"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                          악기점 등록
                        </Link>
                        <Link
                          to="/register/instrument"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                          악기 등록
                        </Link>
                      </div>
                    )}
                  </div>
                )}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center"
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </div>
                    )}
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg py-1">
                      <div className="px-4 py-2 border-b dark:border-gray-600">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                          프로필
                        </Link>
                        <Link
                          to="/favorites"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                          찜한 악기
                        </Link>
                        <Link
                          to="/recent-views"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                          최근 본 악기
                        </Link>
                      </div>
                      {user.is_seller && (
                        <div className="py-1 border-t dark:border-gray-600">
                          <Link
                            to="/admin"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                          >
                            관리자
                          </Link>
                        </div>
                      )}
                      <div className="py-1 border-t dark:border-gray-600">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                          로그아웃
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <AuthButtons onLogin={handleLogin} />
            )}
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onGoogleLogin={() => {}}
        onNaverLogin={() => {}}
        onKakaoLogin={() => {}}
      />
    </header>
  );
}