import React from "react";

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
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
        {children}
      </div>
    </div>
  );
}
