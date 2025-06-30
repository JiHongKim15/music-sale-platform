import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// import { SearchInput } from '@/components/atoms/SearchInput';
import { InstrumentCard } from '@/components/molecules/InstrumentCard';
import { useInfiniteProductSearch, flattenInfiniteData } from '@/domains/instrument/hooks/useInfiniteProductSearch';
import { ProductSortableField, SortDirection, ProductStatus } from '@/domains/common/types/api';
import { SearchProductRequest, ProductOutput } from '@/domains/instrument/types/search';
import { useCategoryDisplayItems } from '@/domains/instrument/hooks/useCategories';
import { CategoryDisplayItem } from '@/domains/common/types/category';
import { Instrument } from '@/domains/common/types';
import { ChevronDown, LayoutGrid, List, Search, User, Music } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { userState } from '@/stores/atoms';
import { LoginModal } from '@/domains/auth/LoginModal';

// ProductOutput을 Instrument로 변환하는 함수
function convertProductToInstrument(product: ProductOutput): Instrument {
  const brand = (product.attributes?.brand as string) || product.name.split(' ')[0] || '브랜드 미상';
  const model = (product.attributes?.model as string) || product.name.split(' ').slice(1).join(' ') || '';
  
  return {
    id: product.id.toString(),
    name: product.name,
    brand: brand,
    type: product.catalog.category.name,
    subtype: model,
    price: product.price,
    condition: product.condition === 'NEW' ? 'new' : 'used',
    grade: product.conditionGrade as 'S' | 'A' | 'B' | 'C' | undefined,
    images: [],
    description: `${product.name} - ${product.catalog.category.name}`,
    delivery: {
      available: true,
      fee: 3000,
      estimatedDays: 3,
    },
    viewCount: 0,
    rating: 4.5,
    createdAt: new Date().toISOString(),
  };
}

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteInstruments, setFavoriteInstruments] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedCategory, setSelectedCategory] = useState<CategoryDisplayItem | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<CategoryDisplayItem | null>(null);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { allCategories } = useCategoryDisplayItems();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSubCategoryDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setShowSubCategoryDropdown(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const searchParams: SearchProductRequest = {
    pageSize: 12,
    sort: ProductSortableField.CREATED_AT,
    sortDirection: SortDirection.DESC,
    status: ProductStatus.SELLING,
    categoryId: selectedSubCategory?.id || selectedCategory?.id,
    ...(searchQuery.trim() && { keyword: searchQuery.trim() }),
  };

  const { 
    data: searchResult, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteProductSearch(searchParams);

  // 무한스크롤 개선
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1000 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const items = flattenInfiniteData(searchResult?.pages).map(convertProductToInstrument) || [];

  useEffect(() => {
    setViewMode(window.innerWidth >= 1024 ? 'grid' : 'list');
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('/marketplace', { state: { searchQuery } });
    }
  };

  const handleCategoryClick = (category: CategoryDisplayItem) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
  };

  const handleInstrumentClick = (instrument: Instrument) => {
    navigate(`/instrument/${instrument.id}`);
  };

  const handleFavoriteClick = (id: string) => {
    setFavoriteInstruments(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      }
      return [...prev, id];
    });
  };

  const handleLogoClick = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSearchQuery('');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* 헤더 - 스케치 느낌의 자연스러운 마이크로인터랙션 */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm px-6 py-3">
          <div className="flex items-center gap-6 h-16">
            {/* 로고 - 손그림 같은 자연스러운 애니메이션 */}
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
              aria-label="홈으로"
            >
              <Music className="w-6 h-6 text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
              </button>

            {/* 검색창 - 부드러운 포커스 효과 */}
            <div className="flex-1 max-w-2xl mx-auto">
              <div className={`relative group transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`w-full px-6 py-3 text-base rounded-full transition-all duration-300 placeholder:text-gray-400 ${
                    isSearchFocused 
                      ? 'bg-white ring-2 ring-orange-200 shadow-md' 
                      : 'bg-gray-50 hover:bg-white hover:shadow-sm'
                  } focus:outline-none`}
                  placeholder="어떤 악기를 찾고 계신가요?"
                />
                <button
                  onClick={handleSearch}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 ${
                    isSearchFocused 
                      ? 'text-orange-600 bg-orange-50 scale-105' 
                      : 'text-gray-400 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 사용자 메뉴 - 미니멀한 호버 효과 */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="p-3 text-gray-600 hover:text-orange-600 transition-all duration-300 hover:scale-105 hover:bg-orange-50 rounded-full"
                  >
                    <User className="w-4 h-4" />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg py-2 animate-in slide-in-from-top-2 duration-200">
                      <button
                        onClick={() => {
                          navigate('/profile');
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200"
                      >
                        내 프로필
                      </button>
                      <button
                        onClick={() => {
                          navigate('/favorites');
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200"
                      >
                        찜 목록
                      </button>
                      <button
                        onClick={() => {
                          setUser(null);
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
                      >
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-3 py-3 text-sm bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 hover:scale-105 font-medium"
                >
                  로그인
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        {(!selectedCategory && !searchQuery.trim()) && (
          <>
            {/* 카테고리 그리드 - 손그림 같은 자연스러운 애니메이션 */}
            <div className="px-6 py-8">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-8">
                  {(showAllCategories ? allCategories : allCategories.slice(0, 8)).map((category, index) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category)}
                      className="group flex flex-col items-center p-3 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                      style={{ 
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center mb-2 group-hover:shadow-lg group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-300">
                        <span className="text-xl group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                      </div>
                      <span className="text-xs text-gray-700 text-center leading-tight group-hover:text-orange-600 transition-colors duration-300 font-medium">
                        {category.name}
                      </span>
                      {category.count && (
                        <span className="text-xs text-orange-500 mt-1 opacity-70 group-hover:opacity-100 transition-opacity duration-300">{category.count}개</span>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* 더보기 버튼 - 미니멀한 디자인 */}
                <div className="text-center">
                  <button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm text-orange-600 hover:text-orange-800 transition-all duration-300 hover:scale-105 rounded-full hover:bg-orange-50 font-medium"
                  >
                    {showAllCategories ? '접기' : '더보기'}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showAllCategories ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* 상품 목록 - 자연스러운 등장 애니메이션 */}
            <div className="px-6 pb-8">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">최신 상품</h2>
                    <p className="text-sm text-gray-600">{items.length}개의 상품</p>
                  </div>
                  
                  {/* 뷰모드 토글 - 미니멀한 디자인 */}
                  <div className="flex items-center gap-1 bg-gray-50 rounded-full p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-full transition-all duration-300 hover:scale-105 ${
                        viewMode === 'grid' 
                          ? 'bg-white text-orange-600 shadow-sm' 
                          : 'text-gray-400 hover:text-gray-600 hover:bg-white'
                      }`}
                    >
                      <LayoutGrid className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 rounded-full transition-all duration-300 hover:scale-105 ${
                        viewMode === 'list' 
                          ? 'bg-white text-orange-600 shadow-sm' 
                          : 'text-gray-400 hover:text-gray-600 hover:bg-white'
                      }`}
                    >
                      <List className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className={viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'}>
                  {items.length > 0 ? (
                    items.map((instrument, index) => (
                      <div
                        key={instrument.id}
                        className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                        style={{ 
                          animationDelay: `${index * 100}ms`
                        }}
                      >
                        <InstrumentCard
                          instrument={instrument}
                          isHot={index < 2}
                          isFavorite={favoriteInstruments.includes(instrument.id)}
                          onFavoriteClick={handleFavoriteClick}
                          onClick={handleInstrumentClick}
                          layout={viewMode}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-16">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-orange-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">등록된 상품이 없습니다</h3>
                      <p className="text-gray-600">새로운 상품이 곧 등록될 예정입니다</p>
                    </div>
                  )}
                </div>

                {/* 무한스크롤 로딩 - 간단한 애니메이션 */}
                {isFetchingNextPage && (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center gap-3 text-orange-600 bg-orange-50 px-6 py-3 rounded-full">
                      <div className="w-4 h-4 border-2 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                      <span className="text-sm font-medium">더 많은 상품을 불러오는 중...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* 카테고리 선택 시 - 동일한 자연스러운 애니메이션 */}
        {selectedCategory && (
          <div className="px-6 py-8">
            <div className="max-w-5xl mx-auto">
              {/* 브레드크럼 */}
              <div className="flex items-center gap-2 mb-8 text-sm">
                <button
                  onClick={handleLogoClick}
                  className="text-orange-600 hover:text-orange-800 transition-all duration-300 hover:scale-105 hover:bg-orange-50 px-3 py-2 rounded-full"
                >
                  홈
                </button>
                <span className="text-gray-400">/</span>
                <span className="text-gray-700">{selectedCategory.name}</span>
                {selectedSubCategory && (
                  <>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-700">{selectedSubCategory.name}</span>
                  </>
                )}
              </div>

              {/* 하위 카테고리 */}
              {selectedCategory.children && selectedCategory.children.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">세부 카테고리</h3>
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setShowSubCategoryDropdown(!showSubCategoryDropdown)}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-full text-sm text-gray-700 hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-sm"
                      >
                        {selectedSubCategory ? selectedSubCategory.name : '전체'}
                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showSubCategoryDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showSubCategoryDropdown && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg py-2 animate-in slide-in-from-top-2 duration-200">
                          <button
                            onClick={() => {
                              setSelectedSubCategory(null);
                              setShowSubCategoryDropdown(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200"
                          >
                            전체
                          </button>
                          {selectedCategory.children.map(sub => (
                            <button
                              key={sub.id}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200"
                              onClick={() => {
                                setSelectedSubCategory(sub);
                                setShowSubCategoryDropdown(false);
                              }}
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 상품 목록 */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {selectedSubCategory ? selectedSubCategory.name : selectedCategory.name}
                  </h2>
                  <p className="text-sm text-gray-600">{items.length}개의 상품</p>
                </div>
                
                <div className="flex items-center gap-1 bg-gray-50 rounded-full p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-full transition-all duration-300 hover:scale-105 ${
                      viewMode === 'grid' 
                        ? 'bg-white text-orange-600 shadow-sm' 
                        : 'text-gray-400 hover:text-gray-600 hover:bg-white'
                    }`}
                  >
                    <LayoutGrid className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-full transition-all duration-300 hover:scale-105 ${
                      viewMode === 'list' 
                        ? 'bg-white text-orange-600 shadow-sm' 
                        : 'text-gray-400 hover:text-gray-600 hover:bg-white'
                    }`}
                  >
                    <List className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className={viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'}>
                {items.length > 0 ? (
                  items.map((instrument, index) => (
                    <div
                      key={instrument.id}
                      className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                      style={{ 
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <InstrumentCard
                        instrument={instrument}
                        isHot={index < 2}
                        isFavorite={favoriteInstruments.includes(instrument.id)}
                        onFavoriteClick={handleFavoriteClick}
                        onClick={handleInstrumentClick}
                        layout={viewMode}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">상품을 찾을 수 없습니다</h3>
                    <p className="text-gray-600">다른 카테고리를 선택해보세요</p>
                  </div>
                )}
              </div>

              {isFetchingNextPage && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center gap-3 text-orange-600 bg-orange-50 px-6 py-3 rounded-full">
                    <div className="w-4 h-4 border-2 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                    <span className="text-sm font-medium">더 많은 상품을 불러오는 중...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 검색 결과 - 동일한 자연스러운 애니메이션 */}
        {!selectedCategory && searchQuery.trim() && (
          <div className="px-6 py-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">검색 결과</h2>
                  <p className="text-sm text-gray-600">"{searchQuery}"에 대한 {items.length}개의 상품</p>
                </div>
                
                <div className="flex items-center gap-1 bg-gray-50 rounded-full p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-full transition-all duration-300 hover:scale-105 ${
                      viewMode === 'grid' 
                        ? 'bg-white text-orange-600 shadow-sm' 
                        : 'text-gray-400 hover:text-gray-600 hover:bg-white'
                    }`}
                  >
                    <LayoutGrid className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-full transition-all duration-300 hover:scale-105 ${
                      viewMode === 'list' 
                        ? 'bg-white text-orange-600 shadow-sm' 
                        : 'text-gray-400 hover:text-gray-600 hover:bg-white'
                    }`}
                  >
                    <List className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className={viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'}>
                {items.length > 0 ? (
                  items.map((instrument, index) => (
                    <div
                      key={instrument.id}
                      className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                      style={{ 
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <InstrumentCard
                        instrument={instrument}
                        isHot={index < 2}
                        isFavorite={favoriteInstruments.includes(instrument.id)}
                        onFavoriteClick={handleFavoriteClick}
                        onClick={handleInstrumentClick}
                        layout={viewMode}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
                    <p className="text-gray-600 mb-4">"{searchQuery}"에 대한 상품을 찾을 수 없습니다</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 hover:scale-105 font-medium"
                    >
                      검색어 지우기
                    </button>
                  </div>
                )}
              </div>

              {isFetchingNextPage && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center gap-3 text-orange-600 bg-orange-50 px-6 py-3 rounded-full">
                    <div className="w-4 h-4 border-2 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                    <span className="text-sm font-medium">더 많은 상품을 불러오는 중...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* 로그인 모달 */}
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onGoogleLogin={() => {
            console.log('Google 로그인');
            setIsLoginModalOpen(false);
          }}
          onNaverLogin={() => {
            console.log('Naver 로그인');
            setIsLoginModalOpen(false);
          }}
          onKakaoLogin={() => {
            console.log('Kakao 로그인');
            setIsLoginModalOpen(false);
          }}
        />
      )}
    </div>
  );
}