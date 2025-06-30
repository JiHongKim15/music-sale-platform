import { CategoryResponse } from './category';

// API 공통 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  code?: string;
  timestamp?: string;
}

// 페이지네이션 응답 타입
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}

// 정렬 방향
export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

// 상품 정렬 필드
export enum ProductSortableField {
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
  PRICE = 'PRICE',
  NAME = 'NAME',
  VIEW_COUNT = 'VIEW_COUNT'
}

// 검색 키워드 타입
export enum SearchProductKeywordType {
  NAME = 'NAME',
  BRAND = 'BRAND',
  MODEL = 'MODEL',
  DESCRIPTION = 'DESCRIPTION'
}

// 상품 상태
export enum ProductCondition {
  NEW = 'NEW',
  USED = 'USED'
}

// 상품 등급
export enum ProductConditionGrade {
  S = 'S',
  A = 'A',
  B = 'B',
  C = 'C'
}

// 상품 판매 상태
export enum ProductStatus {
  SELLING = 'SELLING',
  SOLD = 'SOLD',
  RESERVED = 'RESERVED',
  INACTIVE = 'INACTIVE'
}

export interface ProductOutput {
  id: number;
  name: string;
  catalog: ProductCatalog;
  price: number;
  seller: User | null;
  store: Store | null;
  condition: ProductCondition;
  conditionGrade: ProductConditionGrade | null;
  stockQuantity: number;
  status: ProductStatus;
  attributes: Record<string, string | number | boolean> | null;
}

export interface ProductCatalog {
  id: number;
  category: CategoryResponse;
}

export interface User {
  id: number;
  name: string;
  email: string;
  is_seller: boolean;
  profile_image?: string;
  phone?: string;
  rating?: number;
  created_at: string;
}

export interface Store {
  id: number;
  name: string;
  address: string;
  phone: string;
  description?: string;
  rating?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
} 