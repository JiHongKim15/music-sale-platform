import { useQuery } from '@tanstack/react-query';
import { ProductOutput } from '@/domains/common/types/api';
import { ProductApiService } from '@/domains/instrument/services/productApi';

export const useProductDetail = (productId: string) => {
  return useQuery<ProductOutput, Error>({
    queryKey: ['product', 'detail', productId],
    queryFn: async () => {
      if (!productId) throw new Error('상품 ID가 없습니다.');
      // 실제 API 호출
      return await ProductApiService.getProductDetail(productId);
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}; 