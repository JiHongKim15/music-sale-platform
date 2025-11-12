import { FC } from "react";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  liked: boolean;
  onToggle: () => void;
}

const LikeButton: FC<LikeButtonProps> = ({ liked, onToggle }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="transition-transform active:scale-90"
    >
      <Heart
        className={`w-6 h-6 transition-colors ${
          liked ? "fill-red-500 text-white" : "fill-[#D9D9D9] text-white"
        }`}
        strokeWidth={1}
      />
    </button>
  );
};

export default LikeButton;
