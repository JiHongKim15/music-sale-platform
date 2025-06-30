import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, LayoutGrid, List, Search, ShoppingBag } from 'lucide-react';
import { SearchFiltersComponent } from '@/components/molecules/SearchFilters';
import { InstrumentCard } from '@/components/molecules/InstrumentCard';
import { useInfiniteProductSearch, flattenInfiniteData, getTotalElements } from '@/domains/instrument/hooks/useInfiniteProductSearch';
import { ProductSortableField, SortDirection, ProductStatus } from '@/domains/common/types/api';
import { ProductOutput } from '@/domains/instrument/types/search';
import { SearchFilters } from '@/domains/instrument/types/search';
import { Instrument } from '@/domains/common/types';

interface LocationState {
  searchQuery?: string;
  selectedCategory?: string;
  filters?: SearchFilters;
}

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

export function MarketplacePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  // 상태 관리
  const [searchQuery, setSearchQuery] = useState(state?.searchQuery || '');
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: state?.searchQuery || '',
    category: state?.selectedCategory,
    location: undefined,
    condition: undefined,
    conditionGrade: undefined,
    priceRange: { min: undefined, max: undefined },
    sortBy: ProductSortableField.CREATED_AT,
    sortDirection: SortDirection.DESC,
    ...state?.filters,
  });
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [favoriteInstruments, setFavoriteInstruments] = useState<string[]>([]);

  // 검색 파라미터 생성
  const searchParams = {
    keyword: filters.keyword || undefined,
    categoryId: getCategoryId(filters.category),
    location: filters.location,
    condition: filters.condition,
    conditionGrade: filters.conditionGrade,
    minPrice: filters.priceRange.min,
    maxPrice: filters.priceRange.max,
    status: ProductStatus.SELLING,
    pageSize: 20,
    sort: filters.sortBy,
    sortDirection: filters.sortDirection,
  };

  // 카테고리명을 실제 API의 카테고리 ID로 변환하는 함수
  function getCategoryId(categoryName?: string): number | undefined {
    if (!categoryName) return undefined;
    
    // 실제 DB의 카테고리 구조에 맞게 매핑
    const categoryMap: Record<string, number> = {
      // 루트 카테고리 (depth=0)
      '기타': 1,
      '베이스': 2,
      '드럼': 3,
      '건반악기': 4,
      '관악기': 5,
      // 하위 카테고리 (depth=1)
      '일렉기타': 6,
      '어쿠스틱기타': 7,
      '클래식기타': 8,
      '일렉베이스': 9,
      '어쿠스틱베이스': 10,
      '어쿠스틱드럼': 11,
      '전자드럼': 12,
      '피아노': 13,
      '신디사이저': 14,
      '색소폰': 15,
      '트럼펫': 16,
    };
    
    return categoryMap[categoryName];
  }

  // 무한 스크롤 쿼리
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteProductSearch(searchParams);

  // 데이터 변환
  const allProducts = flattenInfiniteData(data?.pages);
  const instruments = allProducts.map(convertProductToInstrument);
  const totalCount = getTotalElements(data?.pages);

  // 초기 상태 설정
  useEffect(() => {
    if (state?.searchQuery) {
      setSearchQuery(state.searchQuery);
      setFilters(prev => ({ ...prev, keyword: state.searchQuery || '' }));
    }
  }, [state]);

  // 무한 스크롤 핸들러
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

  // 스크롤 이벤트 등록
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 검색 핸들러
  const handleSearch = () => {
    setFilters(prev => ({ ...prev, keyword: searchQuery }));
  };

  // 필터 변경 핸들러
  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setSearchQuery(newFilters.keyword);
  };

  // 필터 초기화 핸들러
  const handleClearFilters = () => {
    const clearedFilters: SearchFilters = {
      keyword: '',
      category: undefined,
      location: undefined,
      condition: undefined,
      conditionGrade: undefined,
      priceRange: { min: undefined, max: undefined },
      sortBy: ProductSortableField.CREATED_AT,
      sortDirection: SortDirection.DESC,
    };
    setFilters(clearedFilters);
    setSearchQuery('');
  };

  // 즐겨찾기 핸들러
  const handleFavoriteClick = (id: string) => {
    setFavoriteInstruments(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      }
      return [...prev, id];
    });
  };

  // 악기 클릭 핸들러
  const handleInstrumentClick = (instrument: Instrument) => {
    navigate(`/instrument/${instrument.id}`);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* 헤더 - HomePage와 통일 */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm px-6 py-3">
          <div className="flex items-center gap-6 h-16">
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-2 group transition-all duration-300 hover:scale-105"
            >
              <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">🎸</span>
              <span className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">뮤직마켓</span>
            </button>
            
            <div className="flex-1" />
            
            <button
              onClick={() => navigate('/marketplace/register')}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 hover:scale-105 font-medium text-sm"
            >
              <Plus className="w-3 h-3" />
              중고악기 등록
            </button>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="px-6 py-8">
          {/* 페이지 제목 */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">중고장터</h1>
            <p className="text-lg text-gray-600">
              {totalCount > 0 ? `총 ${totalCount.toLocaleString()}개의 중고 악기` : '믿을 수 있는 중고 악기를 찾아보세요'}
            </p>
          </div>

          {/* 검색바 */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full px-6 py-4 text-base bg-gray-50 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-300 placeholder:text-gray-400"
                placeholder="어떤 중고 악기를 찾고 계신가요? 🎵"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-orange-600 transition-colors duration-300 hover:scale-110"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 사이드바 필터 */}
            <div className="lg:col-span-1">
              <SearchFiltersComponent
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                className="sticky top-4"
              />
            </div>

            {/* 메인 컨텐츠 */}
            <div className="lg:col-span-3">
              {/* 정렬 및 뷰 모드 */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <select
                    value={`${filters.sortBy}_${filters.sortDirection}`}
                    onChange={(e) => {
                      const [sortBy, sortDirection] = e.target.value.split('_');
                      setFilters(prev => ({
                        ...prev,
                        sortBy: sortBy as ProductSortableField,
                        sortDirection: sortDirection as SortDirection,
                      }));
                    }}
                    className="px-4 py-2 bg-gray-50 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                  >
                    <option value={`${ProductSortableField.CREATED_AT}_${SortDirection.DESC}`}>
                      최신순
                    </option>
                    <option value={`${ProductSortableField.PRICE}_${SortDirection.ASC}`}>
                      낮은 가격순
                    </option>
                    <option value={`${ProductSortableField.PRICE}_${SortDirection.DESC}`}>
                      높은 가격순
                    </option>
                    <option value={`${ProductSortableField.VIEW_COUNT}_${SortDirection.DESC}`}>
                      인기순
                    </option>
                  </select>
                </div>

                <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-white text-orange-600 shadow-sm' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <LayoutGrid className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      viewMode === 'list' 
                        ? 'bg-white text-orange-600 shadow-sm' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <List className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* 로딩 상태 */}
              {isLoading && (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-orange-600">상품을 불러오는 중...</p>
                  </div>
                </div>
              )}

              {/* 에러 상태 */}
              {isError && (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">상품을 불러올 수 없습니다</h3>
                  <p className="text-gray-600 mb-6">
                    {error?.message || '잠시 후 다시 시도해주세요.'}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 hover:scale-105 font-medium"
                  >
                    다시 시도
                  </button>
                </div>
              )}

              {/* 상품 목록 */}
              {!isLoading && !isError && (
                <>
                  {instruments.length > 0 ? (
                    <div className={`
                      ${viewMode === 'grid' 
                        ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' 
                        : 'space-y-4'
                      }
                    `}>
                      {instruments.map((instrument, index) => (
                        <div
                          key={instrument.id}
                          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <InstrumentCard
                            instrument={instrument}
                            isFavorite={favoriteInstruments.includes(instrument.id)}
                            onFavoriteClick={handleFavoriteClick}
                            onClick={handleInstrumentClick}
                            layout={viewMode}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <Search className="w-8 h-8 text-orange-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">검색 조건에 맞는 상품이 없습니다</h3>
                      <p className="text-gray-600 mb-6">다른 검색어나 필터를 시도해보세요</p>
                      <button
                        onClick={handleClearFilters}
                        className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 hover:scale-105 font-medium"
                      >
                        필터 초기화
                      </button>
                    </div>
                  )}

                  {/* 무한 스크롤 로딩 */}
                  {isFetchingNextPage && (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center gap-3 text-orange-600 bg-orange-50 px-6 py-3 rounded-full">
                        <div className="w-4 h-4 border-2 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                        <span className="text-sm">더 많은 상품을 불러오는 중...</span>
                      </div>
                    </div>
                  )}

                  {/* 더 이상 불러올 데이터가 없을 때 */}
                  {!hasNextPage && instruments.length > 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">모든 상품을 확인했습니다.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}