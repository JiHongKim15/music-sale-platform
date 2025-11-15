import { Suspense } from "react";
import ProductList from "@/domains/products/components/ProductList";
import mockProducts from "@/domains/products/mocks/mockProduct";
import ProductListSkeleton from "@/domains/products/components/ProductListSkeleton";

// 홈 페이지 컴포넌트
export function HomePage() {
  return (
    <div className="p-2">
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList products={mockProducts} />
      </Suspense>
    </div>
  );
}
