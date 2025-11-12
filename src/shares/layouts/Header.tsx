import { Bell } from "lucide-react";
import SearchBar from "@/domains/filter/components/SearchBar";

export default function Header() {
  return (
    <header className="flex flex-col gap-3 px-5 py-3 bg-white">
      {/* 상단 로고 + 알림 */}
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">
          RE:BUY
        </h1>

        <button className="relative">
          <Bell className="w-6 h-6 text-gray-700" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full" />
        </button>
      </div>

      {/* 검색창 */}
      <SearchBar />
    </header>
  );
}
