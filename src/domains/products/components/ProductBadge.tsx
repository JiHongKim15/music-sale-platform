import { FC, ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
}

const ProductBadge: FC<BadgeProps> = ({ children }) => {
  return (
    <span className="flex items-center justify-center h-[10px] py-1 px-2 rounded-md bg-[#BBF246] text-[0.4rem] text-[#111111] font-medium">
      {children}
    </span>
  );
};

export default ProductBadge;
