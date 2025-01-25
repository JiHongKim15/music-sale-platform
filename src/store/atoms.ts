import { atom } from 'recoil';
import type { User } from '../types/auth';
import type { InstrumentCategory, Notification } from '../types';

export const userState = atom<User | null>({
  key: 'userState',
  default: {
    id: '1',
    name: '판매자',
    email: 'seller@example.com',
    is_seller: true,
    favoriteInstruments: []
  }
});

export const favoriteInstrumentsState = atom<string[]>({
  key: 'favoriteInstrumentsState',
  default: [],
});

export const recentViewsState = atom<string[]>({
  key: 'recentViewsState',
  default: [],
});

export const notificationsState = atom<Notification[]>({
  key: 'notificationsState',
  default: [
    {
      id: '1',
      type: 'price_change',
      instrumentId: '1',
      instrumentName: 'Stratocaster American Professional II',
      message: '가격이 2,199,000원에서 2,099,000원으로 변경되었습니다.',
      read: false,
      createdAt: '2024-03-14T10:30:00Z'
    },
    {
      id: '2',
      type: 'sold',
      instrumentId: '2',
      instrumentName: 'Les Paul Standard 60s',
      message: '찜한 상품이 판매되었습니다.',
      read: true,
      createdAt: '2024-03-13T15:45:00Z'
    }
  ]
});

export const searchFiltersState = atom({
  key: 'searchFiltersState',
  default: {
    type: '',
    subtype: '',
    brand: '',
    condition: '',
    grade: '',
    minPrice: '',
    maxPrice: '',
    region: '',
    search: '',
  },
});

export const instrumentsState = atom({
  key: 'instrumentsState',
  default: [],
});

export const instrumentCategoriesState = atom<InstrumentCategory[]>({
  key: 'instrumentCategoriesState',
  default: [],
});

export const darkModeState = atom<boolean>({
  key: 'darkModeState',
  default: localStorage.getItem('darkMode') === 'true',
});