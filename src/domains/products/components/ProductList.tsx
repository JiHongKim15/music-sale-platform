import ProductCard from "@/domains/products/components/ProductCard";

interface ProductListProps {
  products: Array<{
    id: number;
    name: string;
    price: number;
    brand: string;
    conditionGrade: string;
    storeLocation: string;
    createdAt: string;
    wishlistCount: number;
    chats: number;
    imageId: number;
    status: string;
  }>;
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((item) => (
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
          status={item.status as "AVAILABLE" | "RESERVED" | "SOLD" | "INACTIVE"}
        />
      ))}
    </div>
  );
}
