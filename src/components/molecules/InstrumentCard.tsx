import React from 'react';
import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Instrument } from '@/domains/common/types';

interface InstrumentCardProps {
  instrument: Instrument;
  isHot?: boolean;
  isFavorite: boolean;
  onFavoriteClick: (id: string) => void;
  onClick: (instrument: Instrument) => void;
  layout?: 'list' | 'grid';
  className?: string;
}

export function InstrumentCard({
  instrument,
  isHot = false,
  isFavorite,
  onFavoriteClick,
  onClick,
  layout = 'list',
  className = ""
}: InstrumentCardProps) {
  if (layout === 'grid') {
    return (
      <Card
        className={`cursor-pointer border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg bg-white ${className}`}
        onClick={() => onClick(instrument)}
      >
        <CardContent className="p-4">
          <div className="relative mb-4">
            <img
              src={instrument.images[0]}
              alt={instrument.name}
              className="w-full h-48 object-cover rounded-lg border border-gray-200"
            />
            {isHot && (
              <div className="absolute -top-2 -right-2">
                <Badge 
                  variant="destructive" 
                  className="text-xs px-2 py-1 bg-red-500 text-white rounded-full"
                >
                  HOT
                </Badge>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteClick(instrument.id);
              }}
              className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm"
            >
              <Heart
                size={16}
                className={isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}
              />
            </Button>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
              {instrument.name}
            </h3>
            <p className="text-xs text-gray-500 mb-2">
              {instrument.brand}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900 text-sm">
                {instrument.price.toLocaleString()}원
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // List layout (기본)
  return (
    <Card
      className={`cursor-pointer border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-sm bg-white ${className}`}
      onClick={() => onClick(instrument)}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={instrument.images[0]}
              alt={instrument.name}
              className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border border-gray-200"
            />
            {isHot && (
              <div className="absolute -top-2 -right-2">
                <Badge 
                  variant="destructive" 
                  className="text-xs px-1.5 py-0.5 bg-red-500 text-white rounded-full text-[10px]"
                >
                  HOT
                </Badge>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">
              {instrument.name}
            </h3>
            <p className="text-xs text-gray-500 mb-2">
              {instrument.brand}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900 text-sm">
                {instrument.price.toLocaleString()}원
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onFavoriteClick(instrument.id);
                }}
                className="p-1 h-auto"
              >
                <Heart
                  size={16}
                  className={isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}
                />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 