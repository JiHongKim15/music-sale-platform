import { FC, useState } from "react";
import sampleImage from "../mocks/sampleImage.png";
import { timeAgo } from "@/core/utils/format";
import LikeButton from "@/shares/buttons/LikeButton";
import ProductBadge from "./ProductBadge";
import ProductStats from "./ProductStats";

interface ProductCardProps {
  name: string;
  price: number;
  brand: string;
  conditionGrade: string;
  storeLocation: string;
  createdAt: string;
  wishlistCount: number;
  chats: number;
  imageId: number;
  status: "AVAILABLE" | "RESERVED" | "SOLD" | "INACTIVE";
  onClick?: () => void;
}

const ProductCard: FC<ProductCardProps> = ({
  name,
  price,
  brand,
  conditionGrade,
  storeLocation,
  createdAt,
  wishlistCount,
  chats,
  imageId,
  status,
  onClick,
}) => {
  // const imageUrl = `/images/${imageId}.jpg`;
  const imageUrl = sampleImage; //임시 이미지
  const isReserved = status === "RESERVED";
  const time = timeAgo(createdAt);
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-[23px] overflow-hidden cursor-pointer w-full animate-fadeIn"
      onClick={onClick}
    >
      {/* 상품 이미지와 하트*/}
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-[129px] object-cover"
        />
        {/* 예약중 오버레이 */}
        {isReserved && (
          <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm bg-black/40">
            예약 중
          </span>
        )}

        {/* 하트 아이콘 */}
        <div className="absolute right-3 top-3">
          <LikeButton liked={liked} onToggle={() => setLiked(!liked)} />
        </div>
      </div>

      {/* 상품 정보 */}
      <div className="p-2.5 space-y-0.5">
        <h3 className="font-medium text-xs line-clamp-1">{name}</h3>

        <div className="flex gap-1 pt-1">
          <ProductBadge>{brand}</ProductBadge>
          <ProductBadge>{conditionGrade} 등급</ProductBadge>
        </div>

        <p className="text-[0.5rem] text-gray-400">
          {storeLocation} | {time}
        </p>

        {/* 가격 */}
        <p className="font-semibold text-base pt-2">
          ₩ {price.toLocaleString()}
        </p>

        {/* 아래 아이콘 부분 */}
        <ProductStats chats={chats} wishlistCount={wishlistCount} />
      </div>
    </div>
  );
};

export default ProductCard;
