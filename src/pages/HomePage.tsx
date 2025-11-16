import { Suspense } from "react";
import ProductList from "@/domains/products/components/ProductList";
import mockProducts from "@/domains/products/mocks/mockProduct";
import ProductListSkeleton from "@/domains/products/components/ProductListSkeleton";
import { useSort } from "@/domains/products/sort/hooks/useSort";
import SortButton from "@/domains/products/sort/components/SortButton";
import SortBottomSheet from "@/domains/products/sort/components/SortBottomSheet";
import { Product } from "@/domains/products/sort/sortOption";
export function HomePage() {
  const productsData: Product[] = mockProducts;

  const {
    isSortOpen,
    openSort,
    closeSort,
    selectSort,
    sortedData,
    sortOption,
    currentLabel,
  } = useSort(productsData);

  return (
    <div className="p-2">
      <div className="flex justify-end p-2 pb-0 mb-4">
        <SortButton onClick={openSort} currentLabel={currentLabel} />
      </div>

      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList products={sortedData} />
      </Suspense>
      <SortBottomSheet
        isOpen={isSortOpen}
        currentValue={sortOption}
        onClose={closeSort}
        onSelect={selectSort}
      />
    </div>
  );
}
