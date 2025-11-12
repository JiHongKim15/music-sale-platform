import { FC } from "react";
import { Heart, MessageCircle } from "lucide-react";

interface ProductStatsProps {
  wishlistCount: number;
  chats: number;
}

const ProductStats: FC<ProductStatsProps> = ({ wishlistCount, chats }) => {
  return (
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
  );
};

export default ProductStats;
