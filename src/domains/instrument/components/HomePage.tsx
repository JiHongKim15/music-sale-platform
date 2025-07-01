import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { InstrumentCard } from '@/components/molecules/InstrumentCard';
import { useInfiniteProductSearch, flattenInfiniteData } from '@/domains/instrument/hooks/useInfiniteProductSearch';
import { ProductSortableField, SortDirection, ProductStatus } from '@/domains/common/types/api';
import { SearchProductRequest, ProductOutput } from '@/domains/instrument/types/search';
import { useCategoryDisplayItems } from '@/domains/instrument/hooks/useCategories';
import { CategoryDisplayItem } from '@/domains/common/types/category';
import { Instrument } from '@/domains/common/types';
import { ChevronDown, LayoutGrid, List, Search } from 'lucide-react';
import { LoginModal } from '@/domains/auth/LoginModal';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { CommonHeader } from '@/components/organisms/Header/CommonHeader';

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
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const navigate = useNavigate();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { allCategories } = useCategoryDisplayItems();

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
    if (expandedCategory === category.id) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category.id);
    }
    setSelectedCategory(category);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryClick = (subCategory: CategoryDisplayItem) => {
    setSelectedSubCategory(subCategory);
    setExpandedCategory(null);
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

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* 공통 헤더 사용 */}
        <CommonHeader
          variant="default"
          showLogo={true}
          showSearch={true}
          showUserMenu={true}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearch}
        />

        {/* 메인 콘텐츠 */}
        {(!selectedCategory && !searchQuery.trim()) && (
          <>
            {/* 카테고리 그리드 */}
            <div className="px-4 py-4">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-4">
                  {allCategories.slice(0, showAllCategories ? allCategories.length : 8).map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category)}
                      className="flex flex-col items-center focus:outline-none"
                      type="button"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                        <span className="text-xl text-primary">{category.icon}</span>
                      </div>
                      <span className="text-sm text-text-primary mt-0.5">{category.name}</span>
                    </button>
                  ))}
                </div>
                <div className="text-center mb-2">
                  <Button
                    variant="link"
                    size="lg"
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    rightIcon={<ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showAllCategories ? 'rotate-180' : ''}`} />}
                  >
                    {showAllCategories ? '접기' : '더보기'}
                  </Button>
                </div>
              </div>
            </div>

            {/* 상품 목록 */}
            <div className="px-6 pb-8">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary mb-1">최신 상품</h2>
                    <p className="text-sm text-text-secondary">{items.length}개의 상품</p>
                  </div>
                  
                  {/* 뷰모드 토글 */}
                  <div className="flex items-center gap-1 bg-primary/5 rounded-full p-1">
                    <IconButton
                      size="icon_sm"
                      onClick={() => setViewMode('grid')}
                      className={viewMode === 'grid' 
                        ? 'bg-primary/10 text-primary shadow-sm' 
                        : 'text-text-secondary hover:text-primary hover:bg-primary/10'
                      }
                    >
                      <LayoutGrid className="w-3 h-3" />
                    </IconButton>
                    <IconButton
                      size="icon_sm"
                      onClick={() => setViewMode('list')}
                      className={viewMode === 'list' 
                        ? 'bg-primary/10 text-primary shadow-sm' 
                        : 'text-text-secondary hover:text-primary hover:bg-primary/10'
                      }
                    >
                      <List className="w-3 h-3" />
                    </IconButton>
                  </div>
                </div>

                <div className={viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'
                  : 'space-y-3'}>
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

                {/* 무한스크롤 로딩 */}
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

        {/* 카테고리 선택시 */}
        {selectedCategory && (
          <div className="px-6 py-8">
            <div className="max-w-5xl mx-auto">
              {/* 브레드크럼 */}
              <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="hover:text-orange-600 transition-colors"
                >
                  홈
                </button>
                <span>/</span>
                <span className="text-gray-900 font-medium">{selectedCategory.name}</span>
              </div>

              {/* 하위 카테고리 드롭다운 */}
              <div className="mb-8">
                <select
                  value={selectedSubCategory?.id ?? ''}
                  onChange={e => {
                    const found = selectedCategory.children?.find(child => child.id === Number(e.target.value));
                    if (found) handleSubCategoryClick(found);
                  }}
                  className="w-full p-3 rounded-lg border border-gray-300 bg-white text-base shadow-sm focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition"
                >
                  <option value="">상세 카테고리를 선택하세요</option>
                  {selectedCategory.children?.map(subCategory => (
                    <option key={subCategory.id} value={subCategory.id}>
                      {subCategory.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 상품 목록 */}
              <div className={viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'
                : 'space-y-3'}>
                {items.length > 0 ? (
                  items.map((instrument, index) => (
                    <InstrumentCard
                      key={instrument.id}
                      instrument={instrument}
                      isHot={index < 2}
                      isFavorite={favoriteInstruments.includes(instrument.id)}
                      onFavoriteClick={handleFavoriteClick}
                      onClick={handleInstrumentClick}
                      layout={viewMode}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">해당 카테고리에 상품이 없습니다</h3>
                    <p className="text-gray-600">다른 카테고리를 확인해보세요</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 검색 결과 */}
        {searchQuery.trim() && (
          <div className="px-6 py-8">
            <div className="max-w-5xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  '{searchQuery}' 검색 결과
                </h2>
                <p className="text-sm text-gray-600">{items.length}개의 상품</p>
              </div>

              <div className={viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'
                : 'space-y-3'}>
                {items.length > 0 ? (
                  items.map((instrument, index) => (
                    <InstrumentCard
                      key={instrument.id}
                      instrument={instrument}
                      isHot={index < 2}
                      isFavorite={favoriteInstruments.includes(instrument.id)}
                      onFavoriteClick={handleFavoriteClick}
                      onClick={handleInstrumentClick}
                      layout={viewMode}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
                    <p className="text-gray-600">다른 검색어를 시도해보세요</p>
                  </div>
                )}
              </div>
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