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
    <div className="flex flex-col w-full gap-2">
      {/* 검색창 */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full h-12 gap-2 px-4 bg-white shadow-md rounded-2xl"
      >
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search"
          className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
        />
      </form>

      {keyword && <SearchResultList results={results} />}
    </div>
  );
}
