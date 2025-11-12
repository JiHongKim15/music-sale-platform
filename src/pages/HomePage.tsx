import React from "react";
import ProductCard from "@/domains/products/components/ProductCard";
import mockProducts from "@/domains/products/mocks/mockProduct";

// 홈 페이지 컴포넌트
export function HomePage() {
  return (
    <>
      <div className="p-2">
        <div className=" grid grid-cols-2  md:grid-cols-3 gap-4 ">
          {mockProducts.map((item) => (
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
                item.status as "RESERVED" | "AVAILABLE" | "SOLD" | "INACTIVE"
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}
