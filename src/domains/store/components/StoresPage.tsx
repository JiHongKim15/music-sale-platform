import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '@/domains/common/types';
import { mockInstruments } from '@/domains/instrument/constants/mockInstruments';
import { StoreCard } from '../components/StoreCard';
import { regions } from '@/domains/instrument/constants/regions';
import { Pagination } from '@/components/atoms/Pagination';
import { Search, MapPin, Store as StoreIcon } from 'lucide-react';
import { CommonHeader } from '@/components/organisms/Header/CommonHeader';

const ITEMS_PER_PAGE = 12;

// 유니크한 매장 목록 추출
const stores = mockInstruments
  .filter(i => i.store) // 매장 정보가 있는 악기만 필터링
  .reduce((acc: Store[], instrument) => {
    if (instrument.store && !acc.find(s => s.id === instrument.store!.id)) {
      acc.push(instrument.store);
    }
    return acc;
  }, []);

export function StoresPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = !selectedRegion || store.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const totalPages = Math.ceil(filteredStores.length / ITEMS_PER_PAGE);
  const paginatedStores = filteredStores.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getStoreInstruments = (storeId: string) => {
    return mockInstruments.filter(i => i.store?.id === storeId);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* 공통 헤더 사용 */}
        <CommonHeader
          variant="back"
          title="악기점 찾기"
          showBackButton={true}
          showUserMenu={true}
        />

        {/* 메인 콘텐츠 */}
        <div className="px-6 py-8">
          {/* 페이지 제목 */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300">
              <StoreIcon className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">악기점 찾기</h1>
            <p className="text-lg text-gray-600">전국의 신뢰할 수 있는 악기점을 찾아보세요</p>
          </div>

          {/* 검색 및 필터 */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative group">
                <input
                  type="text"
                  placeholder="악기점 이름으로 검색하세요"
                  className="w-full px-6 py-4 text-base bg-gray-50 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-300 placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-600 transition-colors duration-300" />
              </div>
              
              <div className="sm:w-48 relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-6 py-4 text-base bg-gray-50 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-300 appearance-none"
                >
                  <option value="">전체 지역</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* 검색 결과 */}
          <div className="max-w-6xl mx-auto">
            {paginatedStores.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <Search className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">검색 결과가 없습니다</h3>
                <p className="text-gray-600 mb-6">다른 검색어나 지역을 선택해보세요</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedRegion('');
                  }}
                  className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 hover:scale-105 font-medium"
                >
                  전체 보기
                </button>
              </div>
            ) : (
              <>
                {/* 결과 개수 */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">악기점 목록</h2>
                    <p className="text-gray-600">총 {filteredStores.length}개의 악기점</p>
                  </div>
                </div>

                {/* 매장 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {paginatedStores.map((store, index) => (
                    <div
                      key={store.id}
                      className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <StoreCard
                        store={store}
                        instruments={getStoreInstruments(store.id)}
                        onClick={() => navigate(`/store/${store.id}`)}
                      />
                    </div>
                  ))}
                </div>

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}