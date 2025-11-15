import { useParams } from "react-router-dom";
import mockProducts from "@/domains/products/mocks/mockProduct";
import { timeAgo } from "@/core/utils/format";

export default function ProductDetailPage() {
  const { id } = useParams();
  const productId = Number(id);
  const product = mockProducts.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="p-4 text-center text-gray-500">
        상품을 찾을 수 없습니다.
      </div>
    );
  }

  const time = timeAgo(product.createdAt);
  return (
    <div className="p-4 space-y-3">
      <h2 className="text-xl font-bold">{product.name}</h2>

      <p className="text-gray-700">브랜드: {product.brand}</p>
      <p className="text-gray-700">가격: {product.price.toLocaleString()}</p>
      <p className="text-gray-700">상태 등급: {product.conditionGrade}</p>
      <p className="text-gray-700">위치: {product.storeLocation}</p>
      <p className="text-gray-700">
        찜 {product.wishlistCount}개 · 채팅 {product.chats}개
      </p>

      <p className="text-gray-500 text-sm">
        조회수 {product.viewCount} | 등록일 {time}
      </p>
    </div>
  );
}
