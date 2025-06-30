import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ 
  value, 
  onChange, 
  onSearch, 
  placeholder = "어떤 악기를 찾고 계신가요?",
  className = "" 
}: SearchInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-full px-6 py-3 md:py-4 pr-12 text-base bg-gray-50 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-300 placeholder:text-gray-400 group-hover:bg-white"
      />
      <button
        onClick={onSearch}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-orange-600 transition-all duration-300 hover:scale-110 rounded-full hover:bg-orange-50"
      >
        <Search className="w-4 h-4" />
      </button>
    </div>
  );
} 