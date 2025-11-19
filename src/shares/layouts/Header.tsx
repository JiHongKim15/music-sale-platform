import { Bell } from "lucide-react";
import SearchBar from "@/domains/filter/components/SearchBar";

export default function Header() {
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[672px] shadow-sm z-[100]">
      <header className="flex flex-col gap-3 px-4 py-3 bg-white">
        <div className="flex items-center justify-between">
          <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">RE:BUY</h1>
          <button className="relative active:scale-95 transition-transform">
            <Bell className="w-6 h-6 text-gray-700" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full" />
          </button>
        </div>
        <SearchBar />
      </header>
    </div>
  );
}
