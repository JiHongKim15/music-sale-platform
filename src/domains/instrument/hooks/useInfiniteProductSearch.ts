import { useInfiniteQuery } from '@tanstack/react-query';
import { ProductApiAdapter } from '@/domains/instrument/services/productApiAdapter';
import { SearchProductRequest, ProductOutput } from '@/domains/instrument/types/search';
import { Page } from '@/domains/common/types/api';

// 무한 스크롤용 쿼리 키
export const INFINITE_PRODUCT_QUERY_KEYS = {
  infiniteSearch: (params: Omit<SearchProductRequest, 'pageNumber'>) => 
    ['products', 'infinite-search', params] as const,
} as const;

/**
 * 무한 스크롤 상품 검색 훅
 */
export function useInfiniteProductSearch(
  searchParams: Omit<SearchProductRequest, 'pageNumber'>,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  }
) {
  return useInfiniteQuery({
    queryKey: INFINITE_PRODUCT_QUERY_KEYS.infiniteSearch(searchParams),
    queryFn: async ({ pageParam = 0 }) => {
      console.log('🔍 API 호출 - pageParam:', pageParam);
      const params: SearchProductRequest = {
        ...searchParams,
        pageNumber: pageParam as number,
      };
      const result = await ProductApiAdapter.searchProducts(params);
      console.log('📦 API 응답:', result);
      return result;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: Page<ProductOutput>) => {
      console.log('🔄 getNextPageParam 호출:', {
        currentPage: lastPage.number,
        totalPages: lastPage.totalPages,
        isLast: lastPage.last,
        hasNext: !lastPage.last && lastPage.number + 1 < lastPage.totalPages
      });
      
      // 마지막 페이지가 아니면 다음 페이지 번호 반환
      if (!lastPage.last && lastPage.number + 1 < lastPage.totalPages) {
        const nextPage = lastPage.number + 1;
        console.log('✅ 다음 페이지:', nextPage);
        return nextPage;
      }
      console.log('❌ 더 이상 페이지 없음');
      return undefined;
    },
    getPreviousPageParam: (firstPage: Page<ProductOutput>) => {
      // 첫 번째 페이지가 아니면 이전 페이지 번호 반환
      if (!firstPage.first && firstPage.number > 1) {
        return firstPage.number - 1;
      }
      return undefined;
    },
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5분
    gcTime: options?.gcTime ?? 10 * 60 * 1000, // 10분
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

/**
 * 무한 스크롤 데이터를 평면 배열로 변환하는 유틸리티 함수
 */
export function flattenInfiniteData(data: Page<ProductOutput>[] | undefined): ProductOutput[] {
  if (!data) return [];
  return data.flatMap(page => page.content);
}

/**
 * 무한 스크롤 총 아이템 수를 계산하는 유틸리티 함수
 */
export function getTotalElements(data: Page<ProductOutput>[] | undefined): number {
  if (!data || data.length === 0) return 0;
  return data[0].totalElements;
} 