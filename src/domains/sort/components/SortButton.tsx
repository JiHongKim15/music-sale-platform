import { SlidersHorizontal } from "lucide-react";

type SortButtonProps = {
  onClick: () => void;
  currentLabel?: string;
};

export default function SortButton({ onClick, currentLabel }: SortButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 px-3 py-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm"
    >
      <SlidersHorizontal className="w-4 h-4 text-gray-500" />
      <span>{currentLabel ?? "정렬"}</span>
    </button>
  );
}
