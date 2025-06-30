import apiClient from '@/domains/common/services/api/client';
import { API_ENDPOINTS } from '@/domains/common/services/api/config';
import { CategoryResponse } from '@/domains/common/types/category';

export class CategoryApiService {
  /**
   * 전체 카테고리 조회
   * GET /category
   */
  static async getAllCategories(): Promise<CategoryResponse[]> {
    try {
      console.log('🔍 카테고리 조회 요청');

      const response = await apiClient.get<CategoryResponse[]>(
        API_ENDPOINTS.CATEGORY.LIST
      );

      if (!response.success) {
        throw new Error(response.message || '카테고리 조회에 실패했습니다.');
      }

      console.log('✅ 카테고리 조회 성공:', response.data);
      return response.data;

    } catch (error) {
      console.error('❌ 카테고리 조회 실패:', error);
      throw error;
    }
  }
}

export default CategoryApiService; 