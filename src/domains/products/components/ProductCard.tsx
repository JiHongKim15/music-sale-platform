import { FC, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import sampleImage from "../mocks/sampleImage.png";

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

export const timeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`;
  return `${Math.floor(diff / 2592000)}달 전`;
};

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
      className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-[23px] overflow-hidden cursor-pointer w-full"
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
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute right-3 top-3 transition-transform active:scale-90"
        >
          <Heart
            className={`w-6 h-6 transition-colors ${
              liked ? "fill-red-500 text-white " : "fill-[#D9D9D9] text-white "
            }`}
            strokeWidth={1}
          />
        </button>
      </div>

      {/* 상품 정보 */}
      <div className="p-2.5 space-y-0.5">
        <h3 className="font-medium text-xs line-clamp-1">{name}</h3>

        <div className="flex gap-1 pt-1">
          <span className="flex items-center justify-center h-[10px] py-1 px-2 rounded-md bg-[#BBF246] text-[0.4rem] text-[#111111] font-medium">
            {brand}
          </span>
          <span className="flex items-center justify-center h-[10px] py-1 px-2 rounded-md bg-[#BBF246] text-[0.4rem] text-[#111111] font-medium">
            {conditionGrade} 등급
          </span>
        </div>

        <p className="text-[0.5rem] text-gray-400">
          {storeLocation} | {time}
        </p>

        {/* 가격 */}
        <p className="font-semibold text-base pt-2">
          ₩ {price.toLocaleString()}
        </p>

        {/* 아래 아이콘 부분 */}
        <div className="flex items-center justify-end gap-1 text-[#D9D9D9] text-[0.6rem]">
          <span className="flex items-center gap-1">
            <MessageCircle className="w-3 h-3 fill-[#D9D9D9]" />
            {chats}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3 fill-[#D9D9D9]" />
            {wishlistCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
