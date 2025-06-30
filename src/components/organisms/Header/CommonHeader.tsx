import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, User, Music } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { userState } from '@/stores/atoms';
import { 
  Button, 
  PrimaryButton, 
  IconButton, 
  MenuButton 
} from '@/components/atoms';

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

  // Variant별 레이아웃
  const renderContent = () => {
    switch (variant) {
      case 'simple':
        return (
          <div className="flex items-center gap-4">
            {showBackButton && (
              <IconButton
                size="icon_md"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-5 h-5" />
              </IconButton>
            )}
            <div className="flex-1">
              {title && <h1 className="text-xl font-bold text-gray-900">{title}</h1>}
              {customContent}
            </div>
            {showUserMenu && renderUserMenu()}
          </div>
        );

      case 'search':
        return (
          <div className="flex items-center gap-4">
            {showBackButton && (
              <IconButton
                size="icon_md"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-5 h-5" />
              </IconButton>
            )}
            <div className="flex-1">
              {renderSearchBar()}
            </div>
            {showUserMenu && renderUserMenu()}
          </div>
        );

      case 'back':
        return (
          <div className="flex items-center gap-4">
            <IconButton
              size="icon_md"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </IconButton>
            <div className="flex-1">
              {title && <h1 className="text-xl font-bold text-gray-900">{title}</h1>}
              {customContent}
            </div>
            {showUserMenu && renderUserMenu()}
          </div>
        );

      default: // 'default'
        return (
          <div className="flex items-center gap-2">
            {/* 로고 */}
            {showLogo && (
              <Button
                variant="ghost"
                size="lg"
                shape="pill"
                onClick={handleLogoClick}
                leftIcon={<Music className="w-6 h-6 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />}
                className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 hover:bg-transparent focus:bg-transparent active:bg-transparent"
              >
              </Button>
            )}

            {/* 검색창 */}
            {showSearch && (
              <div className="flex-1 max-w-2xl mx-auto">
                {renderSearchBar()}
              </div>
            )}

            {/* 커스텀 콘텐츠 */}
            {customContent && (
              <div className="flex-1">
                {customContent}
              </div>
            )}

            {/* 사용자 메뉴 */}
            {showUserMenu && renderUserMenu()}
          </div>
        );
    }
  };

  const renderSearchBar = () => (
    <div className={`relative group transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
        onKeyPress={handleSearchKeyPress}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
        className={`w-full px-6 py-3 text-base rounded-full transition-all duration-300 placeholder:text-gray-400 ${
          isSearchFocused 
            ? 'bg-white ring-2 ring-orange-200 shadow-md' 
            : 'bg-gray-50 hover:bg-white hover:shadow-sm'
        } focus:outline-none`}
        placeholder="어떤 악기를 찾고 계신가요?"
      />
      <IconButton
        size="icon_sm"
        onClick={handleSearch}
        className={`absolute right-2 top-1/2 -translate-y-1/2 ${
          isSearchFocused 
            ? 'text-orange-600 bg-orange-50 scale-105' 
            : 'text-gray-400 hover:text-orange-600 hover:bg-orange-50'
        }`}
      >
        <Search className="w-4 h-4" />
      </IconButton>
    </div>
  );

  const renderUserMenu = () => (
    <div className="flex items-center gap-3">
      {user ? (
        <div className="relative" ref={userMenuRef}>
          <IconButton
            size="icon_md"
            onClick={() => setShowUserMenuDropdown(!showUserMenuDropdown)}
          >
            <User className="w-4 h-4" />
          </IconButton>
          {showUserMenuDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg py-2 animate-in slide-in-from-top-2 duration-200">
              <MenuButton
                size="sm"
                onClick={() => {
                  navigate('/profile');
                  setShowUserMenuDropdown(false);
                }}
              >
                내 프로필
              </MenuButton>
              <MenuButton
                size="sm"
                onClick={() => {
                  navigate('/favorites');
                  setShowUserMenuDropdown(false);
                }}
              >
                찜 목록
              </MenuButton>
              <MenuButton
                size="sm"
                onClick={() => {
                  setUser(null);
                  setShowUserMenuDropdown(false);
                }}
                className="text-gray-700 hover:text-red-500 hover:bg-red-50"
              >
                로그아웃
              </MenuButton>
            </div>
          )}
        </div>
      ) : (
        <PrimaryButton
          size="lg"
          onClick={() => navigate('/login')}
        >
          로그인
        </PrimaryButton>
      )}
    </div>
  );

  return (
    <div className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm px-6 py-3 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="h-16 flex items-center">
          {renderContent()}
        </div>
      </div>
    </div>
  );
} 