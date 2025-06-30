import {
  SearchProductKeywordType,
  ProductCondition,
  ProductConditionGrade,
  ProductStatus,
  ProductSortableField,
  SortDirection
} from '@/domains/common/types/api';

// 검색 요청 파라미터 (백엔드 SearchProductRequest와 매핑)
export interface SearchProductRequest {
  // 검색 키워드 ("펜더", "텔레캐스터")
  keyword?: string;
  keywordType?: SearchProductKeywordType;
  // 카테고리 ID (ProductCategory.GUITAR)
  categoryId?: number;
  // 지역 ("서울")
  location?: string;
  // 상품 상태 (true: 새 제품, false: 중고)
  condition?: ProductCondition;
  // 상품 등급 (S, A, B, C)
  conditionGrade?: ProductConditionGrade;
  // 가격 범위
  minPrice?: number;
  maxPrice?: number;
  // 판매 상태
  status?: ProductStatus;
  // 페이지네이션
  pageNumber?: number;
  pageSize?: number;
  // 정렬
  sort?: ProductSortableField;
  sortDirection?: SortDirection;
  categoryName?: string; // 카테고리명으로 필터링
}

// 검색 필터 상태 (UI에서 사용)
export interface SearchFilters {
  keyword: string;
  category?: string;
  location?: string;
  condition?: ProductCondition;
  conditionGrade?: ProductConditionGrade;
  priceRange: {
    min?: number;
    max?: number;
  };
  sortBy: ProductSortableField;
  sortDirection: SortDirection;
}

// 카테고리 정보
export interface CategoryInfo {
  id: number;
  name: string;
  type: string;
  parent?: CategoryInfo;
  path: string;
  depth: number;
  isActive: boolean;
  isRoot: boolean;
  isLeaf: boolean;
}

// 카탈로그 정보
export interface CatalogInfo {
  id: number;
  category: CategoryInfo;
}

// 검색 결과 상품 정보 (실제 API 응답 구조)
export interface ProductOutput {
  id: number;
  name: string;
  catalog: CatalogInfo;
  price: number;
  seller?: unknown;
  store?: unknown;
  condition: ProductCondition;
  conditionGrade?: ProductConditionGrade;
  stockQuantity: number;
  status: ProductStatus;
  attributes: Record<string, unknown>;
} 