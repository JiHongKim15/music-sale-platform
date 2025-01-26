import { selector } from 'recoil';
import { instrumentsState, searchFiltersState } from './atoms';

export const filteredInstrumentsState = selector({
  key: 'filteredInstrumentsState',
  get: ({ get }) => {
    const instruments = get(instrumentsState);
    const filters = get(searchFiltersState);

    return instruments.filter((instrument: {
      price: number;
      store: any;
      grade: string;
      condition: string;
      name: string;
      brand: string;
      type: string;
      subtype: string;
    }) => {
      const matchesSearch = !filters.search || 
        instrument.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        instrument.brand.toLowerCase().includes(filters.search.toLowerCase());

      const matchesType = !filters.type || instrument.type === filters.type;
      const matchesSubtype = !filters.subtype || instrument.subtype === filters.subtype;
      const matchesBrand = !filters.brand || instrument.brand === filters.brand;
      const matchesCondition = !filters.condition || instrument.condition === filters.condition;
      const matchesGrade = !filters.grade || instrument.grade === filters.grade;
      const matchesRegion = !filters.region || instrument.store?.region === filters.region;
      const matchesPrice = (!filters.minPrice || instrument.price >= Number(filters.minPrice)) &&
                          (!filters.maxPrice || instrument.price <= Number(filters.maxPrice));

      return matchesSearch && matchesType && matchesSubtype && matchesBrand &&
             matchesCondition && matchesGrade && matchesRegion && matchesPrice;
    });
  },
});