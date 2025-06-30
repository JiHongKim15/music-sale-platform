import React from 'react';
import { Button } from '@/components/ui/button';

interface PopularKeywordsProps {
  keywords: string[];
  onKeywordClick: (keyword: string) => void;
  className?: string;
}

export function PopularKeywords({ keywords, onKeywordClick, className = "" }: PopularKeywordsProps) {
  return (
    <div className={`flex gap-2 overflow-x-auto scrollbar-hide ${className}`}>
      {keywords.map((keyword) => (
        <Button
          key={keyword}
          variant="outline"
          size="sm"
          onClick={() => onKeywordClick(keyword)}
          className="flex-shrink-0 px-3 py-1 text-sm border-gray-300 hover:border-gray-400 rounded-full whitespace-nowrap"
        >
          {keyword}
        </Button>
      ))}
    </div>
  );
} 