import { useQuery } from '@tanstack/react-query';
import { CategoryApiService } from '../services/categoryApi';
import { buildCategoryTree } from '../utils/categoryTree';
import { CategoryDisplayItem } from '@/domains/common/types/category';

// Query Keys
export const CATEGORY_QUERY_KEYS = {
  all: ['categories'] as const,
  list: () => [...CATEGORY_QUERY_KEYS.all, 'list'] as const,
} as const;

/**
 * 전체 카테고리 조회 훅
 */
export function useCategories() {
  return useQuery({
    queryKey: CATEGORY_QUERY_KEYS.list(),
    queryFn: () => CategoryApiService.getAllCategories(),
    staleTime: 5 * 60 * 1000, // 5분간 fresh
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    retry: 2,
    refetchOnWindowFocus: false,
  });
}

/**
 * UI 표시용 카테고리 목록 조회 훅
 */
export function useCategoryDisplayItems(): {
  categories: CategoryDisplayItem[];
  allCategories: CategoryDisplayItem[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
} {
  const { 
    data: rawCategories, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useCategories();

  // flat 리스트를 트리로 변환
  const allCategories = rawCategories ? buildCategoryTree(rawCategories) : [];
  
  // 우선순위 기반 카테고리 필터링 (상위 6개만 표시)
  const categories = allCategories.slice(0, 6);

  return {
    categories,
    allCategories,
    isLoading,
    isError,
    error,
    refetch,
  };
} 