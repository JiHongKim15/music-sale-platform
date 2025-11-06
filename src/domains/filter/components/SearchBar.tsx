// src/domains/filter/components/SearchBar.tsx
import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("검색어:", keyword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center px-3 py-2 bg-gray-100 rounded-lg"
    >
      <Search className="w-4 h-4 text-gray-500" />
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색어를 입력하세요"
        className="w-full ml-2 bg-transparent outline-none"
      />
    </form>
  );
}
