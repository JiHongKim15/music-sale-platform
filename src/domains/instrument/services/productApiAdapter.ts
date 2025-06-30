import { ProductApiService } from './productApi';
import { MockProductApiService } from './mockProductApi';
import { SearchProductRequest, ProductOutput } from '@/domains/instrument/types/search';
import { Page } from '@/domains/common/types/api';

// 환경 설정
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true' || false;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

// 백엔드 연결됨 - 실제 API 우선 사용
const FORCE_REAL_API = true;

// 디버깅: Mock API 강제 사용 (문제 해결 시 false로 변경)
const FORCE_MOCK_API = false;

/**
 * API 서비스 어댑터
 * 백엔드 서버 상태에 따라 실제 API 또는 Mock API를 자동 전환
 */
export class ProductApiAdapter {
  private static useMockApi = USE_MOCK_API;
  private static apiHealthChecked = false;

  /**
   * API 헬스 체크
   */
  private static async checkApiHealth(): Promise<boolean> {
    if (this.apiHealthChecked) {
      return !this.useMockApi;
    }

    try {
      // 간단한 헬스 체크 요청 (3초 타임아웃)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      this.useMockApi = !response.ok;
      this.apiHealthChecked = true;
      
      console.log(this.useMockApi ? '🎭 Mock API 사용' : '🌐 실제 API 사용');
      return response.ok;
    } catch (error) {
      console.warn('⚠️ 백엔드 서버에 연결할 수 없습니다. Mock API를 사용합니다.', error);
      this.useMockApi = true;
      this.apiHealthChecked = true;
      return false;
    }
  }

  /**
   * 상품 검색 (자동 API 전환)
   */
  static async searchProducts(request: SearchProductRequest): Promise<Page<ProductOutput>> {
    // 디버깅: Mock API 강제 사용
    if (FORCE_MOCK_API) {
      console.log('🎭 디버깅 모드 - Mock API 강제 사용');
      return MockProductApiService.searchProducts(request);
    }

    // 백엔드 연결됨 - 실제 API 우선 사용
    if (FORCE_REAL_API) {
      console.log('🌐 백엔드 연결됨 - 실제 API 사용');
      try {
        return await ProductApiService.searchProducts(request);
      } catch (error) {
        console.warn('⚠️ 실제 API 호출 실패, Mock API로 대체합니다.', error);
        return MockProductApiService.searchProducts(request);
      }
    }

    // 강제로 Mock API 사용하도록 설정된 경우
    if (USE_MOCK_API) {
      console.log('🎭 환경 변수로 인해 Mock API 사용');
      return MockProductApiService.searchProducts(request);
    }

    // API 헬스 체크 후 결정
    const isApiHealthy = await this.checkApiHealth();
    
    if (isApiHealthy && !this.useMockApi) {
      try {
        return await ProductApiService.searchProducts(request);
      } catch (error) {
        console.warn('⚠️ 실제 API 호출 실패, Mock API로 대체합니다.', error);
        this.useMockApi = true;
        return MockProductApiService.searchProducts(request);
      }
    } else {
      return MockProductApiService.searchProducts(request);
    }
  }

  /**
   * 상품 상세 조회 (자동 API 전환)
   */
  static async getProductDetail(id: string): Promise<ProductOutput> {
    // 백엔드 연결됨 - 실제 API 우선 사용
    if (FORCE_REAL_API) {
      console.log('🌐 백엔드 연결됨 - 실제 API 사용');
      try {
        return await ProductApiService.getProductDetail(id);
      } catch (error) {
        console.warn('⚠️ 실제 API 호출 실패, Mock API로 대체합니다.', error);
        return MockProductApiService.getProductDetail(id);
      }
    }

    // 강제로 Mock API 사용하도록 설정된 경우
    if (USE_MOCK_API) {
      console.log('🎭 환경 변수로 인해 Mock API 사용');
      return MockProductApiService.getProductDetail(id);
    }

    // API 헬스 체크 후 결정
    const isApiHealthy = await this.checkApiHealth();
    
    if (isApiHealthy && !this.useMockApi) {
      try {
        return await ProductApiService.getProductDetail(id);
      } catch (error) {
        console.warn('⚠️ 실제 API 호출 실패, Mock API로 대체합니다.', error);
        this.useMockApi = true;
        return MockProductApiService.getProductDetail(id);
      }
    } else {
      return MockProductApiService.getProductDetail(id);
    }
  }

  /**
   * API 상태 확인
   */
  static getApiStatus(): { useMockApi: boolean; healthChecked: boolean } {
    return {
      useMockApi: this.useMockApi,
      healthChecked: this.apiHealthChecked,
    };
  }

  /**
   * API 상태 리셋 (테스트용)
   */
  static resetApiStatus(): void {
    this.useMockApi = USE_MOCK_API;
    this.apiHealthChecked = false;
  }
} 