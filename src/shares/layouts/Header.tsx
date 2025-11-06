import React from "react";
import { Bell } from "lucide-react"; // 아이콘용
// 나중에 SearchBar를 추가할 예정이에요.
// import SearchBar from "@/domains/filter/components/SearchBar";

export default function Header() {
  return (
    <header className="flex flex-col gap-2 px-4 py-2 border-b border-gray-200">
      {/* 상단 로고 + 알림 */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">RE:BUY</h1>
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-700" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>

      {/* 검색창 자리 */}
      <div>{/* <SearchBar /> */}</div>
    </header>
  );
}
