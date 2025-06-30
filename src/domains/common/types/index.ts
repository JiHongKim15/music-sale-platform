export type Region = 
  | '서울'
  | '부산'
  | '대구'
  | '인천'
  | '광주'
  | '대전'
  | '울산'
  | '세종'
  | '경기'
  | '강원'
  | '충북'
  | '충남'
  | '전북'
  | '전남'
  | '경북'
  | '경남'
  | '제주';

export interface Store {
  id: string;
  name: string;
  location: string;
  rating?: number;
  region: Region;
  address: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Instrument {
  id: string;
  name: string;
  brand: string;
  type: string;
  subtype: string;
  price: number;
  condition: 'new' | 'used';
  grade?: 'S' | 'A' | 'B' | 'C';
  purchaseDate?: string;
  images: string[];
  description: string;
  features?: string[];
  specifications?: Record<string, string>;
  delivery: {
    available: boolean;
    fee?: number;
    estimatedDays?: number;
  };
  store?: Store;
  viewCount?: number;
  currentViewers?: number;
  rating?: number;
  createdAt?: string;
}

export interface SearchFilters {
  type?: string;
  subtype?: string;
  item?: string;
  brand?: string;
  condition?: 'new' | 'used';
  grade?: 'S' | 'A' | 'B' | 'C';
  region?: Region;
  minPrice?: number;
  maxPrice?: number;
}

export interface InstrumentCategory {
  name: string;
  subcategories: {
    name: string;
    items: string[];
  }[];
}

export interface Notification {
  id: string;
  instrumentId: string;
  instrumentName: string;
  message: string;
  createdAt: string;
  read: boolean;
  type: 'price_change' | 'sold' | 'new_item';
}