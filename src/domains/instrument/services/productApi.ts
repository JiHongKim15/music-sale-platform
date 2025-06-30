import apiClient from '@/domains/common/services/api/client';
import { API_ENDPOINTS } from '@/domains/common/services/api/config';
import { Page, ApiResponse, ProductOutput } from '@/domains/common/types/api';
import { SearchProductRequest } from '@/domains/instrument/types/search';

export class ProductApiService {
  /**
   * 상품 검색 API 호출
   * GET /product/search
   */
  static async searchProducts(request: SearchProductRequest): Promise<Page<ProductOutput>> {
    try {
      // 검색 파라미터 정리 (undefined 값 제거)
      const cleanParams = Object.entries(request).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, unknown>);

      console.log('🔍 상품 검색 요청:', cleanParams);

      const response = await apiClient.get<Page<ProductOutput>>(
        API_ENDPOINTS.PRODUCT.SEARCH,
        cleanParams
      );

      if (!response.success) {
        throw new Error(response.message || '상품 검색에 실패했습니다.');
      }

      console.log('✅ 상품 검색 성공:', response.data);
      return response.data;

    } catch (error) {
      console.error('❌ 상품 검색 실패:', error);
      
      // 개발 환경에서는 에러를 다시 던지고, 프로덕션에서는 빈 결과 반환
      if (process.env.NODE_ENV === 'development') {
        throw error;
      }
      
      // 프로덕션에서는 빈 페이지 반환
      return {
        content: [],
        totalElements: 0,
        totalPages: 0,
        size: request.pageSize || 10,
        number: request.pageNumber || 1,
        first: true,
        last: true,
        numberOfElements: 0,
      };
    }
  }

  /**
   * 상품 상세 정보 조회
   * GET /product/{id}
   */
  static async getProductDetail(id: string): Promise<ProductOutput> {
    try {
      const response = await apiClient.get<ProductOutput>(`${API_ENDPOINTS.PRODUCT.DETAIL}/${id}`);
      
      if (!response.success) {
        throw new Error(response.message || '상품 정보를 불러올 수 없습니다.');
      }

      return response.data;
    } catch (error) {
      console.error('❌ 상품 상세 조회 실패:', error);
      throw error;
    }
  }
}

// 편의를 위한 기본 export
export default ProductApiService;

// 상품 상세보기 조회
export const getProductById = async (id: number): Promise<ProductOutput> => {
  const response = await apiClient.get<ApiResponse<ProductOutput>>(`/products/${id}`);
  return response.data.data;
}; 