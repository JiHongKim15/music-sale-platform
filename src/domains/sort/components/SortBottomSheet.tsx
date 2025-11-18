import { X } from "lucide-react";
import { SORT_OPTIONS, SortOptionValue } from "../constants/sortOption";

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
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[200] flex items-end justify-center bg-black/40 transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl p-5 bg-white rounded-t-2xl shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-[100%]"
        }`}
      >
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
                currentValue === opt.value ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
