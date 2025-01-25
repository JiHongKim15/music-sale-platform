import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockInstruments } from '../data/mockInstruments';
import { instrumentCategories } from '../data/categories';
import { PriceDistributionGraph } from '../components/PriceDistributionGraph';

export function PriceComparisonPage() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('');
  const [selectedSubtype, setSelectedSubtype] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [showNew, setShowNew] = useState(true);
  const [showUsed, setShowUsed] = useState(true);
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);

  const filteredInstruments = useMemo(() => {
    return mockInstruments.filter(instrument => {
      if (selectedType && instrument.type !== selectedType) return false;
      if (selectedSubtype && instrument.subtype !== selectedSubtype) return false;
      if (selectedItem && !instrument.name.includes(selectedItem)) return false;
      return true;
    });
  }, [selectedType, selectedSubtype, selectedItem]);

  // 가격대별 악기 분포 계산
  const priceDistribution = useMemo(() => {
    if (!filteredInstruments.length) return [];

    const prices = filteredInstruments.map(i => i.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min;
    const bucketCount = 10;
    const bucketSize = range / bucketCount || 1;

    const newDistribution = Array(bucketCount).fill(0).map((_, i) => ({
      minPrice: min + (bucketSize * i),
      maxPrice: min + (bucketSize * (i + 1)),
      count: 0,
      instruments: [] as typeof mockInstruments,
      condition: 'new' as const
    }));

    const usedDistribution = Array(bucketCount).fill(0).map((_, i) => ({
      minPrice: min + (bucketSize * i),
      maxPrice: min + (bucketSize * (i + 1)),
      count: 0,
      instruments: [] as typeof mockInstruments,
      condition: 'used' as const
    }));

    filteredInstruments.forEach(instrument => {
      const bucketIndex = Math.min(
        Math.floor((instrument.price - min) / bucketSize),
        bucketCount - 1
      );
      
      if (instrument.condition === 'new') {
        newDistribution[bucketIndex].count++;
        newDistribution[bucketIndex].instruments.push(instrument);
      } else {
        usedDistribution[bucketIndex].count++;
        usedDistribution[bucketIndex].instruments.push(instrument);
      }
    });

    return [...newDistribution, ...usedDistribution];
  }, [filteredInstruments]);

  // 호버된 가격대의 추천 악기들
  const recommendedInstruments = useMemo(() => {
    if (!hoveredPrice || !priceDistribution.length) return null;

    const bucket = priceDistribution.find(
      d => hoveredPrice >= d.minPrice && hoveredPrice <= d.maxPrice
    );

    if (!bucket) return null;

    return [...bucket.instruments]
      .sort((a, b) => Math.abs(a.price - hoveredPrice) - Math.abs(b.price - hoveredPrice))
      .slice(0, 3);
  }, [hoveredPrice, priceDistribution]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="mr-2" size={20} />
        뒤로 가기
      </button>

      <h1 className="text-3xl font-bold mb-8">악기 가격 비교</h1>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">악기 선택</h2>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showNew}
                  onChange={(e) => setShowNew(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">새 제품</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showUsed}
                  onChange={(e) => setShowUsed(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">중고</span>
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                종류
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setSelectedSubtype('');
                  setSelectedItem('');
                }}
              >
                <option value="">전체</option>
                {instrumentCategories.map(category => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedType && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  세부 종류
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={selectedSubtype}
                  onChange={(e) => {
                    setSelectedSubtype(e.target.value);
                    setSelectedItem('');
                  }}
                >
                  <option value="">전체</option>
                  {instrumentCategories
                    .find(c => c.name === selectedType)
                    ?.subcategories.map(sub => (
                      <option key={sub.name} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {selectedSubtype && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  모델
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                >
                  <option value="">전체</option>
                  {instrumentCategories
                    .find(c => c.name === selectedType)
                    ?.subcategories
                    .find(s => s.name === selectedSubtype)
                    ?.items.map(item => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {priceDistribution.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">가격 분포</h2>
            <div className="h-80">
              <PriceDistributionGraph
                distribution={priceDistribution}
                onHover={setHoveredPrice}
                showNew={showNew}
                showUsed={showUsed}
              />
            </div>
            <div className="flex justify-center space-x-8 mt-4">
              {showNew && (
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                  <span className="text-sm text-gray-600">새 제품</span>
                </div>
              )}
              {showUsed && (
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mr-2" />
                  <span className="text-sm text-gray-600">중고</span>
                </div>
              )}
            </div>
          </div>
        )}

        {recommendedInstruments && recommendedInstruments.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              ₩{hoveredPrice?.toLocaleString()} 가격대 추천 악기
            </h2>
            <div className="space-y-4">
              {recommendedInstruments.map(instrument => (
                <div
                  key={instrument.id}
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/instrument/${instrument.id}`)}
                >
                  <img
                    src={instrument.images[0]}
                    alt={instrument.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="font-medium">{instrument.name}</h3>
                    <p className="text-sm text-gray-500">{instrument.brand}</p>
                    <div className="flex items-center mt-1">
                      <span className={`px-2 py-1 rounded text-xs ${
                        instrument.condition === 'new'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {instrument.condition === 'new' ? '새 제품' : '중고'}
                        {instrument.grade && ` • ${instrument.grade}등급`}
                      </span>
                      {instrument.store && (
                        <span className="text-xs text-gray-500 ml-2">
                          {instrument.store.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ₩{instrument.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      조회 {instrument.viewCount || 0}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}