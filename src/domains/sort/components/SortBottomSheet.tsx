import { X } from "lucide-react";
import { SORT_OPTIONS, SortOptionValue } from "../constants/sortOption";
import { BottomSheet } from "@/shares/overlays/BottomSheet";

type SortBottomSheetProps = {
  isOpen: boolean;
  currentValue: SortOptionValue;
  onClose: () => void;
  onSelect: (value: SortOptionValue) => void;
};

export default function SortBottomSheet({
  isOpen,
  currentValue,
  onClose,
  onSelect,
}: SortBottomSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold">정렬</h2>
        <button onClick={onClose}>
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`px-3 py-3 text-sm text-left rounded-lg ${
              currentValue === opt.value
                ? "bg-gray-100 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </BottomSheet>
  );
}
