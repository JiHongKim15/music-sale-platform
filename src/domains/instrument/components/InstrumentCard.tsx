import React from 'react';
import { MapPin, Heart, Eye, Store as StoreIcon, Shield, Clock, Star } from 'lucide-react';
import { Instrument } from '@/domains/common/types';

interface InstrumentCardProps {
  instrument: Instrument;
  onClick: () => void;
  onFavoriteClick: (id: string) => void;
  isFavorite: boolean;
  isHot?: boolean;
  layout?: 'list' | 'grid';
}

export function InstrumentCard({ 
  instrument, 
  onClick, 
  onFavoriteClick, 
  isFavorite, 
  isHot = false,
  layout = 'grid' 
}: InstrumentCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteClick(instrument.id);
  };
  
  const defaultRating = 4.8;
  const rating = instrument.store?.rating || defaultRating;
  const responseTime = "평균 30분";

  const defaultImage = `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop`;
  const imageUrl = instrument.images?.[0] || defaultImage;

  if (layout === 'list') {
    return (
      <div
        className="group flex gap-3 p-3 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:-translate-y-1"
        onClick={onClick}
      >
        <div className="relative flex-shrink-0">
          <img
            src={imageUrl}
            alt={instrument.name}
            className="w-16 h-16 object-cover rounded-lg bg-gray-100 group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleFavoriteClick}
            className={`absolute -top-1 -right-1 p-1 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow hover:scale-110 transition-all duration-300 ${
              isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart className={`w-3 h-3 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          {isHot && (
            <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-orange-500 text-white text-xs font-semibold rounded-full shadow">HOT</span>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-orange-600 transition-colors duration-300">{instrument.name}</h3>
            <span className="text-lg font-bold text-orange-600 ml-4">₩{instrument.price.toLocaleString()}</span>
          </div>
          <p className="text-sm text-gray-500 mb-2">{instrument.brand}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              {instrument.store ? (
                <>
                  <div className="flex items-center">
                    <StoreIcon className="w-3 h-3 mr-1" />
                    <span>{instrument.store.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-orange-400 fill-current mr-1" />
                    <span>{rating}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>개인 판매</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{responseTime}</span>
                  </div>
                </>
              )}
            </div>
            <span className={`px-2 py-1 rounded-full text-xs ${
              instrument.condition === 'new' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-700'
            }`}>
              {instrument.condition === 'new' ? '새 제품' : '중고'}
              {instrument.grade && ` • ${instrument.grade}등급`}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-2 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md"
      onClick={onClick}
    >
      <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
        <img
          src={imageUrl}
          alt={instrument.name}
          className="object-cover w-full h-full"
        />
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow hover:scale-110 transition-all duration-300 ${
            isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        {isHot && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full shadow">HOT</span>
        )}
        {!instrument.store && (
          <span className="absolute bottom-3 left-3 px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full shadow">개인 판매</span>
        )}
      </div>
      
      <div className="p-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">{instrument.name}</h3>
        </div>
        <p className="text-sm text-gray-500 mb-2">{instrument.brand}</p>
        {instrument.store ? (
          <div className="flex items-center text-gray-500 mb-2">
            <StoreIcon className="w-3 h-3 mr-2" />
            <span className="text-sm">{instrument.store.name}</span>
            <Star className="w-3 h-3 text-orange-400 fill-current ml-2 mr-1" />
            <span className="text-sm text-gray-700">{rating}</span>
            <Shield className="w-3 h-3 text-green-600 ml-2 mr-1" />
            <span className="text-sm text-green-600">인증 업체</span>
          </div>
        ) : (
          <div className="flex items-center text-gray-500 mb-2">
            <Star className="w-3 h-3 text-orange-400 fill-current mr-1" />
            <span className="text-sm text-gray-700">{rating}</span>
            <Clock className="w-3 h-3 ml-2 mr-1" />
            <span className="text-sm">{responseTime}</span>
          </div>
        )}
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin className="w-3 h-3 mr-1" />
          <span className="text-sm">{instrument.store?.location || '개인 판매'}</span>
        </div>
        <div className="flex items-center text-gray-500 mb-2">
          <Eye className="w-3 h-3 mr-1" />
          <span className="text-sm">조회 {instrument.viewCount || 0}</span>
          {(instrument.currentViewers || 0) > 0 && (
            <span className="ml-2 text-sm text-red-500">
              • {instrument.currentViewers}명이 보는 중
            </span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-orange-600">₩{instrument.price.toLocaleString()}</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            instrument.condition === 'new' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {instrument.condition === 'new' ? '새 제품' : '중고'}
            {instrument.grade && ` • ${instrument.grade}등급`}
          </span>
        </div>
      </div>
    </div>
  );
}