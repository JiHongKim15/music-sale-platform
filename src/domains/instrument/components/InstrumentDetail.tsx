import React from 'react';
import { X, Clock, Eye, Heart } from 'lucide-react';
import { ImageGallery } from '@/domains/instrument/components/ImageGallery';
import { StoreLocation } from '@/domains/instrument/components/StoreLocation';
import { Instrument } from '@/domains/common/types';
import { PurchaseSection } from '../../payment/components/PurchaseSection';

interface InstrumentDetailProps {
  instrument: Instrument;
  onClose: () => void;
  onFavoriteClick: () => void;
  isFavorite: boolean;
}

export function InstrumentDetail({ instrument, onClose, onFavoriteClick, isFavorite }: InstrumentDetailProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold dark:text-white">{instrument.name}</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={onFavoriteClick}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isFavorite ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <Eye size={20} className="mr-1" />
                <span>조회 {instrument.viewCount || 0}</span>
              </div>
              {instrument.currentViewers && instrument.currentViewers > 0 && (
                <span className="text-red-500">
                  • {instrument.currentViewers}명이 보는 중
                </span>
              )}
            </div>
          </div>

          <ImageGallery images={instrument.images} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">상세 설명</h3>
                <p className="text-gray-600 dark:text-gray-300">{instrument.description}</p>
              </div>

              {instrument.features && (
                <div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">특징</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    {instrument.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {instrument.specifications && (
                <div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">제품 사양</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(instrument.specifications).map(([key, value]) => (
                      <div key={key} className="py-2 border-b dark:border-gray-700">
                        <span className="font-medium dark:text-white">{key}:</span>{' '}
                        <span className="text-gray-600 dark:text-gray-300">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    instrument.condition === 'new'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {instrument.condition === 'new' ? '새 제품' : '중고'}
                  </span>
                  {instrument.condition === 'used' && instrument.grade && (
                    <span className={`
                      px-2 py-1 text-sm font-semibold rounded
                      ${instrument.grade === 'S' && 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'}
                      ${instrument.grade === 'A' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}
                      ${instrument.grade === 'B' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}
                      ${instrument.grade === 'C' && 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}
                    `}>
                      등급 {instrument.grade}
                    </span>
                  )}
                </div>
              </div>

              <PurchaseSection instrument={instrument} />
              {instrument.store && <StoreLocation store={instrument.store} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}