import React from 'react';
import { X, TrendingUp, ArrowRight } from 'lucide-react';
import { Instrument } from '@/types';
import { mockInstruments } from '../mockInstruments';


interface PriceComparisonPopupProps {
  instrument: Instrument;
  onClose: () => void;
}

export function PriceComparisonPopup({ instrument, onClose }: PriceComparisonPopupProps) {
  // 같은 종류의 악기들 필터링
  const similarInstruments = mockInstruments.filter(i => 
    i.type === instrument.type && 
    i.subtype === instrument.subtype &&
    i.id !== instrument.id
  );

  // 가격 통계 계산
  const newPrices = similarInstruments
    .filter((i: { condition: string; }) => i.condition === 'new')
    .map((i: { price: any; }) => i.price);
  
  const usedPrices = similarInstruments
    .filter((i: { condition: string; }) => i.condition === 'used')
    .map((i: { price: any; }) => i.price);

  const stats = {
    new: {
      min: Math.min(...newPrices),
      max: Math.max(...newPrices),
      avg: newPrices.reduce((a: any, b: any) => a + b, 0) / newPrices.length || 0
    },
    used: {
      min: Math.min(...usedPrices),
      max: Math.max(...usedPrices),
      avg: usedPrices.reduce((a: any, b: any) => a + b, 0) / usedPrices.length || 0
    }
  };

  // 현재 악기의 가격 위치 계산
  const getPricePosition = () => {
    const prices = instrument.condition === 'new' ? newPrices : usedPrices;
    const sortedPrices = [...prices, instrument.price].sort((a: any, b: any) => a - b);
    const position = sortedPrices.indexOf(instrument.price);
    const percentage = (position / sortedPrices.length) * 100;
    
    if (percentage <= 25) return '하위 25%';
    if (percentage <= 50) return '중하위';
    if (percentage <= 75) return '중상위';
    return '상위 25%';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold flex items-center dark:text-white">
                <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
                가격 비교
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{instrument.type} {instrument.subtype}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {/* 현재 상품 가격 정보 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-medium dark:text-white mb-2">현재 상품</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold dark:text-white">₩{instrument.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">가격대: {getPricePosition()}</p>
                </div>
                <span className={`px-2 py-1 rounded text-sm ${
                  instrument.condition === 'new'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}>
                  {instrument.condition === 'new' ? '새 제품' : '중고'}
                  {instrument.grade && ` • ${instrument.grade}등급`}
                </span>
              </div>
            </div>

            {/* 새 제품 가격 통계 */}
            {newPrices.length > 0 && (
              <div>
                <h3 className="font-medium dark:text-white mb-3">새 제품 가격대</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">최저가</p>
                    <p className="font-bold dark:text-white">₩{stats.new.min.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">평균가</p>
                    <p className="font-bold dark:text-white">₩{Math.round(stats.new.avg).toLocaleString()}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">최고가</p>
                    <p className="font-bold dark:text-white">₩{stats.new.max.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 중고 제품 가격 통계 */}
            {usedPrices.length > 0 && (
              <div>
                <h3 className="font-medium dark:text-white mb-3">중고 제품 가격대</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">최저가</p>
                    <p className="font-bold dark:text-white">₩{stats.used.min.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">평균가</p>
                    <p className="font-bold dark:text-white">₩{Math.round(stats.used.avg).toLocaleString()}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">최고가</p>
                    <p className="font-bold dark:text-white">₩{stats.used.max.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 가격 분석 */}
            <div className="border-t dark:border-gray-700 pt-4">
              <h3 className="font-medium dark:text-white mb-3">가격 분석</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                {instrument.condition === 'new' ? (
                  <>
                    <p>• 동일 제품군 새 제품 평균가 대비 {Math.round((instrument.price / stats.new.avg - 1) * 100)}% 
                      {instrument.price > stats.new.avg ? ' 비쌉니다' : ' 저렴합니다'}</p>
                    <p>• 최저가와의 차이: ₩{(instrument.price - stats.new.min).toLocaleString()}</p>
                  </>
                ) : (
                  <>
                    <p>• 동일 제품군 중고 평균가 대비 {Math.round((instrument.price / stats.used.avg - 1) * 100)}% 
                      {instrument.price > stats.used.avg ? ' 비쌉니다' : ' 저렴합니다'}</p>
                    <p>• 최저가와의 차이: ₩{(instrument.price - stats.used.min).toLocaleString()}</p>
                    {stats.new.avg > 0 && (
                      <p>• 새 제품 평균가 대비 {Math.round((1 - instrument.price / stats.new.avg) * 100)}% 절약 가능</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}