import { atom } from 'recoil';
import { User } from '@/domains/common/types/user';
import { Notification } from '@/domains/common/types';
import type { InstrumentCategory } from '../types';

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
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
  default: [],
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
  default: false,
});