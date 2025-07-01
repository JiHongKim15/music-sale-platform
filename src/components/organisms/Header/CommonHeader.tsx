import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, User, Music } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { userState } from '@/stores/atoms';
import { Button } from '@/components/ui/button';

interface CommonHeaderProps {
  variant?: 'default' | 'simple' | 'search' | 'back';
  title?: string;
  showBackButton?: boolean;
  showLogo?: boolean;
  showSearch?: boolean;
  showUserMenu?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: () => void;
  customContent?: React.ReactNode;
  className?: string;
}

export function CommonHeader({
  variant = 'default',
  title,
  showBackButton = false,
  showLogo = true,
  showSearch = false,
  showUserMenu = true,
  searchValue = '',
  onSearchChange,
  onSearchSubmit,
  customContent,
  className = '',
}: CommonHeaderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [showUserMenuDropdown, setShowUserMenuDropdown] = React.useState(false);
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenuDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSearch = () => {
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Variant별 레이아웃 개선
  const renderContent = () => {
    switch (variant) {
      case 'simple':
        return (
          <div className="flex items-center gap-4 px-4 py-3 bg-white/90 rounded-2xl shadow-sm">
            {showBackButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="hover:bg-primary/10 text-primary transition-all duration-200"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
            )}
            <div className="flex-1">
              {title && <h1 className="text-2xl font-bold text-text-primary tracking-tight">{title}</h1>}
              {customContent}
            </div>
            {showUserMenu && renderUserMenu()}
          </div>
        );
      case 'search':
        return (
          <div className="flex items-center gap-4 px-4 py-3 bg-white/90 rounded-2xl shadow-sm">
            {showBackButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="hover:bg-primary/10 text-primary transition-all duration-200"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
            )}
            <div className="flex-1">
              {renderSearchBar()}
            </div>
            {showUserMenu && renderUserMenu()}
          </div>
        );
      case 'back':
        return (
          <div className="flex items-center gap-4 px-4 py-3 bg-white/90 rounded-2xl shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-primary/10 text-primary transition-all duration-200"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex-1">
              {title && <h1 className="text-2xl font-bold text-text-primary tracking-tight">{title}</h1>}
              {customContent}
            </div>
            {showUserMenu && renderUserMenu()}
          </div>
        );
      default:
        return (
          <div className="flex items-center w-full px-4 py-3 gap-3 bg-surface/90 rounded-2xl shadow-sm">
            {showLogo && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogoClick}
                leftIcon={<Music className="w-7 h-7 text-primary group-hover:rotate-12 transition-transform duration-300" />}
                className="flex-shrink-0 hover:bg-primary/10"
              />
            )}
            {showSearch && (
              <div className="flex-1 flex justify-center items-center min-w-0">
                {renderSearchBar()}
              </div>
            )}
            {showUserMenu && (
              <div className="flex-shrink-0 flex items-center">
                {renderUserMenu()}
              </div>
            )}
          </div>
        );
    }
  };

  // 검색창 스타일 개선
  const renderSearchBar = () => (
    <div className={`relative group transition-all duration-300 ${isSearchFocused ? 'scale-[1.03]' : ''}`}>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
        onKeyPress={handleSearchKeyPress}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
        className={`w-full px-7 py-3 text-lg rounded-full transition-all duration-300 placeholder:text-text-secondary bg-[#F8FAFC] border-2 border-[#E0E7EF] focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm ${isSearchFocused ? 'ring-2 ring-primary/30 bg-white' : ''}`}
        placeholder="검색"
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSearch}
        className={`absolute right-2 top-1/2 -translate-y-1/2 bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200`}
      >
        <Search className="w-5 h-5" />
      </Button>
    </div>
  );

  const renderUserMenu = () => (
    <div className="flex items-center gap-3 ml-auto">
      {user ? (
        <div className="relative" ref={userMenuRef}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowUserMenuDropdown(!showUserMenuDropdown)}
          >
            <User className="w-5 h-5" />
          </Button>
          {showUserMenuDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg py-2 animate-in slide-in-from-top-2 duration-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigate('/profile');
                  setShowUserMenuDropdown(false);
                }}
              >
                내 프로필
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigate('/favorites');
                  setShowUserMenuDropdown(false);
                }}
              >
                찜 목록
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setUser(null);
                  setShowUserMenuDropdown(false);
                }}
                className="text-gray-700 hover:text-red-500 hover:bg-red-50"
              >
                로그아웃
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/login')}
          className="ml-auto"
        >
          <User className="w-6 h-6" />
        </Button>
      )}
    </div>
  );

  return (
    <header className={`w-full z-40 bg-transparent ${className}`}>
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        {renderContent()}
      </div>
    </header>
  );
} 