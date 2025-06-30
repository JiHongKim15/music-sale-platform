// API 기본 설정
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081',
  TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  RETRY_COUNT: Number(import.meta.env.VITE_API_RETRY_COUNT) || 3,
} as const;

// API 엔드포인트
export const API_ENDPOINTS = {
  PRODUCT: {
    SEARCH: '/product/search',
    DETAIL: '/product',
    CREATE: '/product',
    UPDATE: '/product',
    DELETE: '/product',
  },
  CATEGORY: {
    LIST: '/category',
  },
  USER: {
    PROFILE: '/user/profile',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },
} as const; 