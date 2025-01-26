import React from 'react';

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="recent">최근등록순</option>
      <option value="default">기본 정렬</option>
      <option value="price-asc">가격 낮은순</option>
      <option value="price-desc">가격 높은순</option>
    </select>
  );
}