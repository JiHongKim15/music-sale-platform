import { Page } from '@/domains/common/types/api';
import { SearchProductRequest, ProductOutput } from '@/domains/instrument/types/search';
import { ProductCondition, ProductConditionGrade, ProductStatus } from '@/domains/common/types/api';
import { mockInstruments } from '@/domains/instrument/constants/mockInstruments';
import { Instrument } from '@/domains/common/types';

// Instrument을 ProductOutput으로 변환하는 함수
function convertInstrumentToProduct(instrument: Instrument, index: number): ProductOutput {
  return {
    id: parseInt(instrument.id) || index,
    name: instrument.name,
    catalog: {
      id: index % 4 + 1,
      category: {
        id: index % 4 + 1,
        name: instrument.type,
        type: 'PRODUCT',
        path: `/${index % 4 + 1}`,
        depth: 0,
        isActive: true,
        isRoot: true,
        isLeaf: true,
      }
    },
    price: instrument.price,
    seller: null,
    store: null,
    condition: instrument.condition === 'new' ? ProductCondition.NEW : ProductCondition.USED,
    conditionGrade: instrument.grade as ProductConditionGrade,
    stockQuantity: 1,
    status: ProductStatus.SELLING,
    attributes: {
      brand: instrument.brand,
      model: instrument.subtype,
      color: 'Black',
      year: '2023'
    },
  };
}

export class MockProductApiService {
  private static mockProducts: ProductOutput[] = mockInstruments.map(convertInstrumentToProduct);

  /**
   * Mock 상품 검색 API
   */
  static async searchProducts(request: SearchProductRequest): Promise<Page<ProductOutput>> {
    // 검색 지연 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    let filteredProducts = [...this.mockProducts];

    // 키워드 검색
    if (request.keyword) {
      const keyword = request.keyword.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(keyword) ||
        (product.attributes?.brand as string)?.toLowerCase().includes(keyword) ||
        (product.attributes?.model as string)?.toLowerCase().includes(keyword)
      );
    }

    // 카테고리 필터
    if (request.categoryId) {
      filteredProducts = filteredProducts.filter(product => 
        product.catalog.category.id === request.categoryId
      );
    }

    // 상태 필터
    if (request.condition) {
      filteredProducts = filteredProducts.filter(product => 
        product.condition === request.condition
      );
    }

    // 등급 필터
    if (request.conditionGrade) {
      filteredProducts = filteredProducts.filter(product => 
        product.conditionGrade === request.conditionGrade
      );
    }

    // 가격 범위 필터
    if (request.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= request.minPrice!
      );
    }
    if (request.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= request.maxPrice!
      );
    }

    // 정렬
    if (request.sort) {
      filteredProducts.sort((a, b) => {
        switch (request.sort) {
          case 'PRICE':
            return request.sortDirection === 'ASC' 
              ? a.price - b.price 
              : b.price - a.price;
          case 'NAME':
            return request.sortDirection === 'ASC' 
              ? a.name.localeCompare(b.name) 
              : b.name.localeCompare(a.name);
          case 'CREATED_AT':
          default: {
            // attributes의 year로 대체하거나 id로 정렬
            const aYear = (a.attributes?.year as string) || '2023';
            const bYear = (b.attributes?.year as string) || '2023';
            return request.sortDirection === 'ASC' 
              ? aYear.localeCompare(bYear)
              : bYear.localeCompare(aYear);
          }
        }
      });
    }

    // 페이지네이션
    const pageNumber = request.pageNumber || 1;
    const pageSize = request.pageSize || 10;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    console.log(`🎭 Mock API: 총 ${filteredProducts.length}개 상품 중 ${paginatedProducts.length}개 반환`);

    return {
      content: paginatedProducts,
      totalElements: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / pageSize),
      size: pageSize,
      number: pageNumber,
      first: pageNumber === 1,
      last: pageNumber >= Math.ceil(filteredProducts.length / pageSize),
      numberOfElements: paginatedProducts.length,
    };
  }

  /**
   * Mock 상품 상세 조회 API
   */
  static async getProductDetail(id: string): Promise<ProductOutput> {
    // 검색 지연 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));

    const productId = parseInt(id);
    const product = this.mockProducts.find(p => p.id === productId);
    
    if (!product) {
      throw new Error('상품을 찾을 수 없습니다.');
    }

    console.log(`🎭 Mock API: 상품 상세 조회 - ${product.name}`);
    return product;
  }
} 