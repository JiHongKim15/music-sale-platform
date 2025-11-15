import ProductCardSkeleton from "@/domains/products/components/ProductCardSkeleton";

export default function ProductListSkeleton() {
  return (
    <div className="p-2 space-y-4 animate-pulse">
      {/* 상품 카드 스켈레톤 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
