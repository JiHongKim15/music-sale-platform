import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchFilters, Grade, Region } from '../types';
import { regions } from '../data/regions';
import { instrumentCategories } from '../data/categories';
import { ChevronDown, ChevronUp, Search, LineChart } from 'lucide-react';

interface FilterPanelProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onApply?: () => void;
  isMobile?: boolean;
}

export function FilterPanel({ filters, onFilterChange, onApply, isMobile }: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    instrument: true,
    condition: true,
    brand: true,
    region: true,
    price: true
  });
  const [regionInput, setRegionInput] = useState('');
  const [filteredRegions, setFilteredRegions] = useState<string[]>([]);
  const [localFilters, setLocalFilters] = useState(filters);

  // 지역 검색어에 따른 필터링
  useEffect(() => {
    if (regionInput) {
      const filtered = regions.filter(region =>
        region.toLowerCase().includes(regionInput.toLowerCase())
      );
      setFilteredRegions(filtered);
    } else {
      setFilteredRegions([]);
    }
  }, [regionInput]);

  // 필터 섹션 토글
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // 필터 적용
  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    if (onApply) {
      onApply();
    }
  };

  // 필터 초기화
  const handleResetFilters = () => {
    setLocalFilters({});
    setRegionInput('');
    if (!isMobile) {
      onFilterChange({});
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md divide-y dark:divide-gray-700">
      {/* 악기 종류 필터 */}
      <div className="p-4">
        <button
          className="w-full flex justify-between items-center text-lg font-medium dark:text-white"
          onClick={() => toggleSection('instrument')}
        >
          <span>악기 종류</span>
          {expandedSections.instrument ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {expandedSections.instrument && (
          <div className="mt-4 space-y-4">
            <select
              value={localFilters.type || ''}
              onChange={(e) => {
                const type = e.target.value || undefined;
                setLocalFilters(prev => ({ ...prev, type, subtype: undefined }));
                if (!isMobile) {
                  onFilterChange({ ...localFilters, type, subtype: undefined });
                }
              }}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">전체</option>
              {instrumentCategories.map(category => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            {localFilters.type && (
              <select
                value={localFilters.subtype || ''}
                onChange={(e) => {
                  const subtype = e.target.value || undefined;
                  setLocalFilters(prev => ({ ...prev, subtype }));
                  if (!isMobile) {
                    onFilterChange({ ...localFilters, subtype });
                  }
                }}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">전체</option>
                {instrumentCategories
                  .find(c => c.name === localFilters.type)
                  ?.subcategories.map(sub => (
                    <option key={sub.name} value={sub.name}>
                      {sub.name}
                    </option>
                  ))}
              </select>
            )}
          </div>
        )}
      </div>

      {/* 지역 필터 */}
      <div className="p-4">
        <button
          className="w-full flex justify-between items-center text-lg font-medium dark:text-white"
          onClick={() => toggleSection('region')}
        >
          <span>지역</span>
          {expandedSections.region ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {expandedSections.region && (
          <div className="mt-4 space-y-4">
            <div className="relative">
              <input
                type="text"
                value={regionInput}
                onChange={(e) => setRegionInput(e.target.value)}
                placeholder="지역을 입력하세요"
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {regionInput && filteredRegions.length > 0 && (
              <div className="max-h-48 overflow-y-auto border rounded-lg dark:border-gray-600">
                {filteredRegions.map(region => (
                  <button
                    key={region}
                    onClick={() => {
                      setLocalFilters(prev => ({ ...prev, region }));
                      setRegionInput('');
                      if (!isMobile) {
                        onFilterChange({ ...localFilters, region });
                      }
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                  >
                    {region}
                  </button>
                ))}
              </div>
            )}

            {localFilters.region && (
              <div className="flex items-center">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-lg">
                  {localFilters.region}
                </span>
                <button
                  onClick={() => {
                    setLocalFilters(prev => ({ ...prev, region: undefined }));
                    if (!isMobile) {
                      onFilterChange({ ...localFilters, region: undefined });
                    }
                  }}
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 상태 필터 */}
      <div className="p-4">
        <button
          className="w-full flex justify-between items-center text-lg font-medium dark:text-white"
          onClick={() => toggleSection('condition')}
        >
          <span>상태</span>
          {expandedSections.condition ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {expandedSections.condition && (
          <div className="mt-4 space-y-4">
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  const condition = undefined;
                  setLocalFilters(prev => ({ ...prev, condition, grade: undefined }));
                  if (!isMobile) {
                    onFilterChange({ ...localFilters, condition, grade: undefined });
                  }
                }}
                className={`flex-1 px-3 py-2 rounded-lg transition-colors ${
                  !localFilters.condition
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => {
                  const condition = 'new';
                  setLocalFilters(prev => ({ ...prev, condition, grade: undefined }));
                  if (!isMobile) {
                    onFilterChange({ ...localFilters, condition, grade: undefined });
                  }
                }}
                className={`flex-1 px-3 py-2 rounded-lg transition-colors ${
                  localFilters.condition === 'new'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
              >
                새 제품
              </button>
              <button
                onClick={() => {
                  const condition = 'used';
                  setLocalFilters(prev => ({ ...prev, condition }));
                  if (!isMobile) {
                    onFilterChange({ ...localFilters, condition });
                  }
                }}
                className={`flex-1 px-3 py-2 rounded-lg transition-colors ${
                  localFilters.condition === 'used'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
              >
                중고
              </button>
            </div>

            {localFilters.condition === 'used' && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">등급</h4>
                <div className="grid grid-cols-2 gap-2">
                  {(['S', 'A', 'B', 'C'] as Grade[]).map(grade => (
                    <button
                      key={grade}
                      onClick={() => {
                        const newGrade = localFilters.grade === grade ? undefined : grade;
                        setLocalFilters(prev => ({ ...prev, grade: newGrade }));
                        if (!isMobile) {
                          onFilterChange({ ...localFilters, grade: newGrade });
                        }
                      }}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        localFilters.grade === grade
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                      }`}
                    >
                      {grade}등급
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 가격 필터 */}
      <div className="p-4 overflow-hidden">
        <button
          className="w-full flex justify-between items-center text-lg font-medium dark:text-white"
          onClick={() => toggleSection('price')}
        >
          <span>가격</span>
          {expandedSections.price ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {expandedSections.price && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-[45%]">
                <input
                  type="number"
                  placeholder="최소"
                  value={localFilters.minPrice || ''}
                  onChange={(e) => {
                    const value = e.target.value ? Number(e.target.value) : undefined;
                    setLocalFilters(prev => ({ ...prev, minPrice: value }));
                    if (!isMobile) {
                      onFilterChange({ ...localFilters, minPrice: value });
                    }
                  }}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">~</span>
              <div className="w-[45%]">
                <input
                  type="number"
                  placeholder="최대"
                  value={localFilters.maxPrice || ''}
                  onChange={(e) => {
                    const value = e.target.value ? Number(e.target.value) : undefined;
                    setLocalFilters(prev => ({ ...prev, maxPrice: value }));
                    if (!isMobile) {
                      onFilterChange({ ...localFilters, maxPrice: value });
                    }
                  }}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            
            <Link
              to="/price-comparison"
              className="flex items-center justify-center w-full px-4 py-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <LineChart className="w-4 h-4 mr-2" />
              가격 비교하기
            </Link>
          </div>
        )}
      </div>

      {/* 모바일에서만 보이는 하단 버튼 */}
      {isMobile && (
        <div className="sticky bottom-0 p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <div className="flex space-x-4">
            <button
              onClick={handleResetFilters}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              초기화
            </button>
            <button
              onClick={handleApplyFilters}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              적용하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}