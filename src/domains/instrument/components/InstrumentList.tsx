import React from 'react';
import { Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Instrument } from '@/domains/common/types';

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
        <Card
          key={instrument.id}
          className="flex items-center gap-5 p-5 cursor-pointer hover:shadow-xl hover:scale-[1.02] active:scale-100 transition-all duration-200"
          onClick={() => onInstrumentClick(instrument)}
        >
          <img
            src={instrument.images?.[0] || '/placeholder.png'}
            alt={instrument.name}
            className="w-20 h-20 object-cover rounded-xl bg-gray-100 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-text-primary truncate group-hover:text-primary transition-colors duration-200">{instrument.name}</h3>
              <span className="text-xl font-bold text-primary ml-4">₩{instrument.price.toLocaleString()}</span>
            </div>
            <p className="text-base text-text-secondary mb-2">{instrument.brand}</p>
            <div className="flex items-center space-x-3 text-sm text-text-secondary">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                instrument.condition === 'new' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {instrument.condition === 'new' ? '새 제품' : '중고'}
                {instrument.grade && ` • ${instrument.grade}등급`}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <button
              onClick={e => {
                e.stopPropagation();
                onFavoriteClick(instrument.id);
              }}
              className={`p-2 rounded-full hover:bg-gray-100 ${
                favoriteInstruments.includes(instrument.id) ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              } transition-all duration-200`}
            >
              <Heart className={`w-5 h-5 ${
                favoriteInstruments.includes(instrument.id) ? 'fill-current' : ''
              }`} />
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}