import React from 'react';
import { MapPin, Music } from 'lucide-react';
import { Store, Instrument } from '../types';

interface StoreCardProps {
  store: Store;
  instruments: Instrument[];
  onClick: () => void;
}

export function StoreCard({ store, instruments, onClick }: StoreCardProps) {
  const instrumentTypes = Array.from(new Set(instruments.map(i => i.type)));

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{store.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{store.address}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Music className="w-4 h-4 mr-1" />
            <span>취급 악기: {instrumentTypes.join(', ')}</span>
          </div>
          
          <p className="text-sm text-gray-500">
            보유 악기: {instruments.length}개
          </p>
        </div>
      </div>
    </div>
  );
}