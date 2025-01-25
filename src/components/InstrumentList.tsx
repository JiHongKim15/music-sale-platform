import React from 'react';
import { MapPin, Heart, Eye, Store as StoreIcon } from 'lucide-react';
import { Instrument } from '../types';

interface InstrumentListProps {
  instruments: Instrument[];
  onInstrumentClick: (instrument: Instrument) => void;
  onFavoriteClick: (id: string) => void;
  favoriteInstruments: string[];
}

export function InstrumentList({
  instruments,
  onInstrumentClick,
  onFavoriteClick,
  favoriteInstruments
}: InstrumentListProps) {
  return (
    <div className="space-y-4">
      {instruments.map((instrument) => (
        <div
          key={instrument.id}
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onInstrumentClick(instrument)}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{instrument.name}</h3>
              <p className="text-gray-600">{instrument.brand}</p>
              
              <div className="flex items-center text-gray-500 mt-2">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm">{instrument.store?.location || '개인 판매'}</span>
                {instrument.store && (
                  <>
                    <span className="mx-2">•</span>
                    <StoreIcon size={16} className="mr-1" />
                    <span className="text-sm">{instrument.store.name}</span>
                  </>
                )}
              </div>

              <div className="flex items-center text-gray-500 mt-1">
                <Eye size={16} className="mr-1" />
                <span className="text-sm">조회 {instrument.viewCount || 0}</span>
                {instrument.currentViewers > 0 && (
                  <span className="ml-2 text-sm text-red-500">
                    • {instrument.currentViewers}명이 보는 중
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFavoriteClick(instrument.id);
                }}
                className={`p-2 rounded-full hover:bg-gray-100 ${
                  favoriteInstruments.includes(instrument.id) ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${
                  favoriteInstruments.includes(instrument.id) ? 'fill-current' : ''
                }`} />
              </button>
              
              <div className="mt-2 text-right">
                <span className="text-xl font-bold block">
                  ₩{instrument.price.toLocaleString()}
                </span>
                <span className={`inline-block px-2 py-1 rounded text-sm mt-1 ${
                  instrument.condition === 'new'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {instrument.condition === 'new' ? '새 제품' : '중고'}
                  {instrument.grade && ` • ${instrument.grade}등급`}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}