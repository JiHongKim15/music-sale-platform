import React from "react";

interface SearchResultListProps {
  results: { id: number; name: string; price: number }[];
}

export default function SearchResultList({ results }: SearchResultListProps) {
  if (!results.length)
    return (
      <p className="mt-4 text-sm text-center text-gray-500">
        검색 결과가 없습니다.
      </p>
    );

  return (
    <ul className="mt-4 space-y-2">
      {results.map((item) => (
        <li
          key={item.id}
          className="flex justify-between p-3 border rounded-lg shadow-sm"
        >
          <span className="font-medium">{item.name}</span>
          <span className="text-gray-600">₩ {item.price.toLocaleString()}</span>
        </li>
      ))}
    </ul>
  );
}
