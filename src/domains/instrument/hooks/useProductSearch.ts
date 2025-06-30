import { useQuery } from '@tanstack/react-query';
import { ProductApiAdapter } from '@/domains/instrument/services/productApiAdapter';
import { SearchProductRequest } from '@/domains/instrument/types/search';

// 쿼리 키 상수
export const PRODUCT_QUERY_KEYS = {
  all: ['products'] as const,
  search: (params: SearchProductRequest) => ['products', 'search', params] as const,
  detail: (id: string) => ['products', 'detail', id] as const,
} as const;

/**
 * 상품 검색 훅
 */
export function useProductSearch(
  searchParams: SearchProductRequest,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  }
) {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.search(searchParams),
    queryFn: () => ProductApiAdapter.searchProducts(searchParams),
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5분
    gcTime: options?.gcTime ?? 10 * 60 * 1000, // 10분
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

/**
 * 상품 상세 정보 훅
 */
export function useProductDetail(
  productId: string,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  }
) {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.detail(productId),
    queryFn: () => ProductApiAdapter.getProductDetail(productId),
    enabled: (options?.enabled ?? true) && !!productId,
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5분
    gcTime: options?.gcTime ?? 10 * 60 * 1000, // 10분
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
} 