import React, { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCondition, ProductConditionGrade } from '@/domains/common/types/api';
import { SearchFilters } from '@/domains/instrument/types/search';

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
  className?: string;
}

export function SearchFiltersComponent({
  filters,
  onFiltersChange,
  onClearFilters,
  className = ""
}: SearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof SearchFilters, value: unknown) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handlePriceRangeChange = (type: 'min' | 'max', value: string) => {
    const numValue = value ? parseInt(value.replace(/,/g, '')) : undefined;
    onFiltersChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [type]: numValue,
      },
    });
  };

  const formatPrice = (value: number | undefined): string => {
    if (!value) return '';
    return value.toLocaleString();
  };

  const hasActiveFilters = !!(
    filters.category ||
    filters.location ||
    filters.condition ||
    filters.conditionGrade ||
    filters.priceRange.min ||
    filters.priceRange.max
  );

  return (
    <Card className={`${className}`}>
      <CardContent className="p-4">
        {/* 필터 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-600" />
            <span className="font-medium text-gray-900">필터</span>
            {hasActiveFilters && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                활성
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-gray-500 hover:text-gray-700 p-1 h-auto"
              >
                <X size={16} />
                초기화
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden p-1 h-auto"
            >
              <ChevronDown
                size={16}
                className={`transform transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </Button>
          </div>
        </div>

        {/* 필터 내용 */}
        <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
          {/* 카테고리 필터 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리
            </label>
            <select
              value={filters.category || ''}
              onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">전체</option>
              <option value="기타">기타</option>
              <option value="피아노">피아노</option>
              <option value="드럼">드럼</option>
              <option value="관악기">관악기</option>
              <option value="현악기">현악기</option>
            </select>
          </div>

          {/* 지역 필터 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              지역
            </label>
            <select
              value={filters.location || ''}
              onChange={(e) => handleFilterChange('location', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">전체</option>
              <option value="서울">서울</option>
              <option value="부산">부산</option>
              <option value="대구">대구</option>
              <option value="인천">인천</option>
              <option value="광주">광주</option>
              <option value="대전">대전</option>
              <option value="경기">경기</option>
            </select>
          </div>

          {/* 상태 필터 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              상태
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="condition"
                  value=""
                  checked={!filters.condition}
                  onChange={() => handleFilterChange('condition', undefined)}
                  className="mr-2"
                />
                전체
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="condition"
                  value={ProductCondition.NEW}
                  checked={filters.condition === ProductCondition.NEW}
                  onChange={() => handleFilterChange('condition', ProductCondition.NEW)}
                  className="mr-2"
                />
                새 제품
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="condition"
                  value={ProductCondition.USED}
                  checked={filters.condition === ProductCondition.USED}
                  onChange={() => handleFilterChange('condition', ProductCondition.USED)}
                  className="mr-2"
                />
                중고
              </label>
            </div>
          </div>

          {/* 등급 필터 (중고일 때만 표시) */}
          {filters.condition === ProductCondition.USED && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                등급
              </label>
              <select
                value={filters.conditionGrade || ''}
                onChange={(e) => handleFilterChange('conditionGrade', e.target.value as ProductConditionGrade || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">전체</option>
                <option value={ProductConditionGrade.S}>S급 (최상)</option>
                <option value={ProductConditionGrade.A}>A급 (상)</option>
                <option value={ProductConditionGrade.B}>B급 (중)</option>
                <option value={ProductConditionGrade.C}>C급 (하)</option>
              </select>
            </div>
          )}

          {/* 가격 범위 필터 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              가격 범위
            </label>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="최소 가격"
                value={formatPrice(filters.priceRange.min)}
                onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="최대 가격"
                value={formatPrice(filters.priceRange.max)}
                onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 