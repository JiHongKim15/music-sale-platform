import React from 'react';
import { MapPin, Heart, Eye, Store as StoreIcon, Shield, Clock, Star } from 'lucide-react';
import { Instrument } from '@/domains/common/types';

interface InstrumentCardProps {
  instrument: Instrument;
  onClick: () => void;
  onFavoriteClick: (id: string) => void;
  isFavorite: boolean;
}

export function InstrumentCard({ instrument, onClick, onFavoriteClick, isFavorite }: InstrumentCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteClick(instrument.id);
  };
  const defaultRating = 4.8;
  const rating = instrument.store?.rating || defaultRating;
  const responseTime = "평균 30분";

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative group"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={instrument.images[0]}
          alt={instrument.name}
          className="w-full h-48 object-cover group-hover:opacity-95 transition-opacity"
        />
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-md hover:bg-white dark:hover:bg-gray-700 z-10 ${
            isFavorite ? 'text-red-500' : 'text-gray-400'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        {!instrument.store && (
          <span className="absolute top-2 left-2 px-2 py-1 bg-orange-500 text-white text-sm font-medium rounded">
            중고장터
          </span>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-2 dark:text-white">{instrument.name}</h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-2">{instrument.brand}</p>
        
        {instrument.store ? (
          <div className="space-y-2 mb-3">
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <StoreIcon size={16} className="mr-1" />
              <span className="text-sm">{instrument.store.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm ml-1 dark:text-gray-300">{rating}</span>
              </div>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <div className="flex items-center text-green-600 dark:text-green-500">
                <Shield className="w-4 h-4 mr-1" />
                <span className="text-sm">인증 업체</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2 mb-3">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm ml-1 dark:text-gray-300">{rating}</span>
              </div>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">{responseTime}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{instrument.store?.location || '개인 판매'}</span>
        </div>

        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
          <Eye size={16} className="mr-1" />
          <span className="text-sm">조회 {instrument.viewCount || 0}</span>
          {(instrument.currentViewers || 0) > 0 && (
            <span className="ml-2 text-sm text-red-500">
              • {instrument.currentViewers}명이 보는 중
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold dark:text-white">₩{instrument.price.toLocaleString()}</span>
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
    </div>
  );
}