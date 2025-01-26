import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../../types';
import { mockInstruments } from '../mockInstruments';
import { StoreCard } from '../components/StoreCard';
import { regions } from '../regions';
import { Pagination } from '../../../common/ui/Pagination';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">악기점 찾기</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            placeholder="악기점 이름으로 검색"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="sm:w-48">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="">전체 지역</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      {paginatedStores.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedStores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                instruments={getStoreInstruments(store.id)}
                onClick={() => navigate(`/store/${store.id}`)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8">
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
  );
}