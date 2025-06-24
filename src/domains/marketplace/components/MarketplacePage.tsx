import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter } from 'lucide-react';
import { FilterPanel } from '@/domains/instrument/components/FilterPanel';
import { InstrumentGrid } from '@/domains/instrument/components/InstrumentGrid';
import { SearchBar } from '@/domains/instrument/components/SearchBar';
import { mockInstruments } from '@/domains/instrument/constants/mockInstruments';
import { SearchFilters } from '../../../types';

export function MarketplacePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [favoriteInstruments, setFavoriteInstruments] = useState<string[]>([]);

  // 중고 상품만 필터링 (store가 없는 중고 상품만)
  const marketplaceInstruments = mockInstruments.filter(
    instrument => instrument.condition === 'used' && !instrument.store
  );

  const filteredInstruments = marketplaceInstruments.filter(instrument => {
    const matchesSearch = instrument.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         instrument.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !filters.type || instrument.type === filters.type;
    const matchesSubtype = !filters.subtype || instrument.subtype === filters.subtype;
    const matchesBrand = !filters.brand || instrument.brand === filters.brand;
    const matchesGrade = !filters.grade || instrument.grade === filters.grade;
    const matchesPrice = (!filters.minPrice || instrument.price >= filters.minPrice) &&
                        (!filters.maxPrice || instrument.price <= filters.maxPrice);

    return matchesSearch && matchesType && matchesSubtype && 
           matchesBrand && matchesGrade && matchesPrice;
  });

  const handleFavoriteClick = (id: string) => {
    setFavoriteInstruments(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      }
      return [...prev, id];
    });
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">중고장터</h1>
        <button
          onClick={() => navigate('/marketplace/register')}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={20} className="mr-2" />
          중고악기 등록
        </button>
      </div>

      <div className="flex justify-center mb-8">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className={`
          lg:col-span-1
          ${showFilters ? 'fixed inset-0 z-50 bg-white lg:relative lg:bg-transparent' : 'hidden lg:block'}
        `}>
          {showFilters && (
            <div className="lg:hidden flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">필터</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                닫기
              </button>
            </div>
          )}
          <div className="p-4 lg:p-0 overflow-y-auto max-h-screen lg:max-h-none">
            <FilterPanel
              filters={filters}
              onFilterChange={(newFilters) => {
                setFilters(newFilters);
                if (window.innerWidth < 1024) {
                  setShowFilters(false);
                }
              }}
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          {filteredInstruments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">등록된 중고 악기가 없습니다.</p>
            </div>
          ) : (
            <InstrumentGrid 
              instruments={filteredInstruments}
              onInstrumentClick={(instrument) => navigate(`/instrument/${instrument.id}`)}
              onFavoriteClick={handleFavoriteClick}
              favoriteInstruments={favoriteInstruments}
            />
          )}
        </div>
      </div>

      {/* Fixed filter button */}
      <button
        onClick={() => setShowFilters(true)}
        className="lg:hidden fixed left-4 bottom-4 w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 z-40"
      >
        <Filter size={24} />
      </button>

      {/* Overlay for mobile filter */}
      {showFilters && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowFilters(false)}
        />
      )}
    </main>
  );
}