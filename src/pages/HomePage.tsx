import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainContent } from '../components/MainContent';
import { SearchFilters, Instrument } from '../types';
import { mockInstruments } from '../data/mockInstruments';

interface LocationState {
  selectedCategory?: string;
  selectedSubcategory?: string;
  selectedItem?: string;
}

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [favoriteInstruments, setFavoriteInstruments] = useState<string[]>([]);
  const [showMarketplace, setShowMarketplace] = useState(true);
  const [showStores, setShowStores] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  useEffect(() => {
    if (state?.selectedCategory) {
      setFilters(prev => ({
        ...prev,
        type: state.selectedCategory,
        subtype: state.selectedSubcategory,
        item: state.selectedItem
      }));
    }
  }, [state?.selectedCategory, state?.selectedSubcategory, state?.selectedItem]);

  const filteredInstruments = mockInstruments.filter(instrument => {
    // 판매처 필터링
    if (!showMarketplace && !instrument.store) return false;
    if (!showStores && instrument.store) return false;

    const matchesSearch = instrument.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         instrument.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !filters.type || instrument.type === filters.type;
    const matchesSubtype = !filters.subtype || instrument.subtype === filters.subtype;
    const matchesItem = !filters.item || instrument.name.includes(filters.item);
    const matchesBrand = !filters.brand || instrument.brand === filters.brand;
    const matchesCondition = !filters.condition || instrument.condition === filters.condition;
    const matchesGrade = !filters.grade || instrument.grade === filters.grade;
    const matchesRegion = !filters.region || (instrument.store?.region === filters.region);
    const matchesPrice = (!filters.minPrice || instrument.price >= filters.minPrice) &&
                        (!filters.maxPrice || instrument.price <= filters.maxPrice);

    return matchesSearch && matchesType && matchesSubtype && matchesItem &&
           matchesBrand && matchesCondition && matchesGrade && 
           matchesPrice && matchesRegion;
  });

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
    <MainContent
      searchQuery={searchQuery}
      filters={filters}
      filteredInstruments={filteredInstruments}
      onSearch={setSearchQuery}
      onFilterChange={setFilters}
      onInstrumentClick={handleInstrumentClick}
      onFavoriteClick={handleFavoriteClick}
      favoriteInstruments={favoriteInstruments}
      showMarketplace={showMarketplace}
      showStores={showStores}
      onToggleMarketplace={() => setShowMarketplace(!showMarketplace)}
      onToggleStores={() => setShowStores(!showStores)}
    />
  );
}