// src/domains/filter/hooks/useSearch.ts
import { useState } from "react";
import { searchProductsMock } from "../services/mockSearchApi";

// 검색 관련 로직을 관리하는 훅
export const useSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<any[]>([]);

  // 검색 실행 함수
  const handleSearch = async () => {
    if (!keyword.trim()) return;
    const data = await searchProductsMock(keyword);
    setResults(data);
    console.log("검색 결과:", data); // ✅ 테스트용 콘솔 출력
  };

  return {
    keyword,
    setKeyword,
    results,
    handleSearch,
  };
};
