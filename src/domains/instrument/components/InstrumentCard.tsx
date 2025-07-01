import React from 'react';
import { MapPin, Heart, Eye, Store as StoreIcon, Shield, Clock, Star } from 'lucide-react';
import { Instrument } from '@/domains/common/types';
import { Card } from '@/components/ui/card';

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
      <Card
        className="group flex gap-4 p-5 cursor-pointer hover:shadow-xl hover:scale-[1.02] active:scale-100 transition-all duration-200 items-center"
        onClick={onClick}
      >
        <div className="relative flex-shrink-0">
          <img
            src={imageUrl}
            alt={instrument.name}
            className="w-20 h-20 object-cover rounded-xl bg-gray-100 group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleFavoriteClick}
            className={`absolute -top-2 -right-2 p-2 rounded-full bg-white/90 border border-[#E0E7EF] shadow hover:scale-110 transition-all duration-200 ${
              isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          {isHot && (
            <span className="absolute top-2 left-2 px-2 py-1 bg-primary text-white text-xs font-semibold rounded-full shadow">HOT</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-text-primary truncate group-hover:text-primary transition-colors duration-200">{instrument.name}</h3>
            <span className="text-xl font-bold text-primary ml-4">₩{instrument.price.toLocaleString()}</span>
          </div>
          <p className="text-base text-text-secondary mb-2">{instrument.brand}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-sm text-text-secondary">
              {instrument.store ? (
                <>
                  <div className="flex items-center">
                    <StoreIcon className="w-4 h-4 mr-1" />
                    <span>{instrument.store.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-primary fill-current mr-1" />
                    <span>{rating}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>개인 판매</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{responseTime}</span>
                  </div>
                </>
              )}
            </div>
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
      </Card>
    );
  }

  return (
    <Card
      className="group cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-100 rounded-2xl p-4"
      onClick={onClick}
    >
      <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
        <img
          src={imageUrl}
          alt={instrument.name}
          className="object-cover w-full h-full"
        />
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 border border-[#E0E7EF] shadow hover:scale-110 transition-all duration-200 ${
            isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        {isHot && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-white text-xs font-semibold rounded-full shadow">HOT</span>
        )}
        {!instrument.store && (
          <span className="absolute bottom-3 left-3 px-2 py-1 bg-secondary text-white text-xs font-semibold rounded-full shadow">개인 판매</span>
        )}
      </div>
      <div className="px-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-text-primary line-clamp-2 group-hover:text-primary transition-colors duration-200">{instrument.name}</h3>
        </div>
        <p className="text-base text-text-secondary mb-2">{instrument.brand}</p>
        {instrument.store ? (
          <div className="flex items-center text-text-secondary mb-2">
            <StoreIcon className="w-4 h-4 mr-2" />
            <span className="text-base">{instrument.store.name}</span>
            <Star className="w-4 h-4 text-primary fill-current ml-2 mr-1" />
            <span className="text-base text-text-primary">{rating}</span>
            <Shield className="w-4 h-4 text-secondary ml-2 mr-1" />
            <span className="text-base text-secondary">인증 업체</span>
          </div>
        ) : (
          <div className="flex items-center text-text-secondary mb-2">
            <Star className="w-4 h-4 text-primary fill-current mr-1" />
            <span className="text-base text-text-primary">{rating}</span>
            <Clock className="w-4 h-4 ml-2 mr-1" />
            <span className="text-base">{responseTime}</span>
          </div>
        )}
        <div className="flex items-center text-text-secondary mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-base">{instrument.store?.location || '개인 판매'}</span>
        </div>
        <div className="flex items-center text-text-secondary mb-2">
          <Eye className="w-4 h-4 mr-1" />
          <span className="text-base">조회 {instrument.viewCount || 0}</span>
          {(instrument.currentViewers || 0) > 0 && (
            <span className="ml-2 text-base text-red-500">
              • {instrument.currentViewers}명이 보는 중
            </span>
          )}
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold text-primary">₩{instrument.price.toLocaleString()}</span>
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
    </Card>
  );
}