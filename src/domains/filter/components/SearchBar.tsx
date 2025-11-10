import { FormEvent } from "react";
import { Search } from "lucide-react";
import { useSearch } from "../hooks/useSearch";
import SearchResultList from "./SearchResultList";

export default function SearchBar() {
  const { keyword, setKeyword, handleSearch, results } = useSearch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div>
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

      {/* 검색 결과 표시 */}
      <SearchResultList results={results} />
    </div>
  );
}
