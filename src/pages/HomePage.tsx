import React from "react";
import ProductCard from "@/domains/products/components/ProductCard";
import mockProducts from "@/domains/products/mocks/mockProduct";
import ProductCardSkeleton from "@/domains/products/components/ProductCardSkeleton";

// 홈 페이지 컴포넌트
export function HomePage() {
  const isLoading = false;
  return (
    <>
      <div className="p-2">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : mockProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  brand={item.brand}
                  conditionGrade={item.conditionGrade}
                  storeLocation={item.storeLocation}
                  createdAt={item.createdAt}
                  wishlistCount={item.wishlistCount}
                  chats={item.chats}
                  imageId={item.imageId}
                  status={
                    item.status as
                      | "RESERVED"
                      | "AVAILABLE"
                      | "SOLD"
                      | "INACTIVE"
                  }
                />
              ))}
        </div>
      </div>
    </>
  );
}
