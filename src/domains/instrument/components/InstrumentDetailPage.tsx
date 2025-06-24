import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, LineChart } from 'lucide-react';
import { ImageGallery } from '@/domains/instrument/components/ImageGallery';
import { StoreLocation } from '@/domains/store/components/StoreLocation';
import { PurchaseSection } from '@/domains/payment/components/PurchaseSection';
import { PriceComparisonPopup } from '@/domains/instrument/components/PriceComparisonPopup';
import { FloatingFavoriteButton } from '@/domains/profile/components/FloatingFavoriteButton';
import { mockInstruments } from '@/domains/instrument/constants/mockInstruments';

export function InstrumentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const instrument = mockInstruments.find(i => i.id === id);
  const [showPriceComparison, setShowPriceComparison] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!instrument) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">악기를 찾을 수 없습니다</h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2" size={20} />
            뒤로 가기
          </button>
        </div>
      </div>
    );
  }

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2" size={20} />
          뒤로 가기
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold dark:text-white">{instrument.name}</h1>
            
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
                      {instrument.grade && ` • ${instrument.grade}등급`}
                    </span>
                  </div>
                </div>

                <PurchaseSection instrument={instrument} />
                {instrument.store && <StoreLocation store={instrument.store} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating buttons */}
      <div className="fixed right-6 bottom-6 flex flex-col space-y-4">
        <button
          onClick={() => setShowPriceComparison(true)}
          className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <LineChart size={24} />
        </button>
      </div>

      <FloatingFavoriteButton
        isFavorite={isFavorite}
        onClick={handleFavoriteClick}
      />

      {showPriceComparison && (
        <PriceComparisonPopup
          instrument={instrument}
          onClose={() => setShowPriceComparison(false)}
        />
      )}
    </>
  );
}