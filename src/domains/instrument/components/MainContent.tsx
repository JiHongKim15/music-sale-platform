import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { SearchBar } from '@/domains/instrument/components/SearchBar';
import { FilterPanel } from '@/domains/instrument/components/FilterPanel';
import { InstrumentGrid } from '@/domains/instrument/components/InstrumentGrid';
import { InstrumentList } from '@/domains/instrument/components/InstrumentList';
import { ViewToggle } from '@/components/atoms/ViewToggle';
import { SearchFilters, Instrument } from '@/domains/common/types';

interface MainContentProps {
  searchQuery: string;
  filters: SearchFilters;
  filteredInstruments: Instrument[];
  onSearch: (query: string) => void;
  onFilterChange: (filters: SearchFilters) => void;
  onInstrumentClick: (instrument: Instrument) => void;
  onFavoriteClick: (id: string) => void;
  favoriteInstruments: string[];
  showMarketplace: boolean;
  showStores: boolean;
  onToggleMarketplace: () => void;
  onToggleStores: () => void;
}

export function MainContent({
  searchQuery,
  filters,
  filteredInstruments,
  onSearch,
  onFilterChange,
  onInstrumentClick,
  onFavoriteClick,
  favoriteInstruments,
  showMarketplace,
  showStores,
  onToggleMarketplace,
  onToggleStores
}: MainContentProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex-1 max-w-2xl">
          <SearchBar onSearch={onSearch} />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={showStores}
                onChange={onToggleStores}
                className="form-checkbox h-4 w-4 text-blue-600 rounded dark:bg-gray-700"
              />
              <span>판매점</span>
            </label>
            <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={showMarketplace}
                onChange={onToggleMarketplace}
                className="form-checkbox h-4 w-4 text-blue-600 rounded dark:bg-gray-700"
              />
              <span>중고장터</span>
            </label>
          </div>
          <ViewToggle view={view} onViewChange={setView} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className={`
          lg:col-span-1
          ${showFilters ? 'fixed inset-0 z-50 bg-white dark:bg-gray-800 lg:relative lg:bg-transparent' : 'hidden lg:block'}
        `}>
          <FilterPanel
            filters={filters}
            onFilterChange={onFilterChange}
            onApply={() => setShowFilters(false)}
            isMobile={showFilters}
          />
        </div>

        <div className="lg:col-span-3">
          {view === 'grid' ? (
            <InstrumentGrid
              instruments={filteredInstruments}
              onInstrumentClick={onInstrumentClick}
              onFavoriteClick={onFavoriteClick}
              favoriteInstruments={favoriteInstruments}
            />
          ) : (
            <InstrumentList
              instruments={filteredInstruments}
              onInstrumentClick={onInstrumentClick}
              onFavoriteClick={onFavoriteClick}
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