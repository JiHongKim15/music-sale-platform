import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockInstruments } from './instrument/mockInstruments';
import { Instrument } from '@/types';
import { InstrumentGrid } from './instrument/components/InstrumentGrid';

export function RecentViewsPage() {
  const navigate = useNavigate();
  // TODO: Replace with actual user data
  const user = {
    recentlyViewed: ['2', '1']
  };

  const recentInstruments = user.recentlyViewed
    .map(id => mockInstruments.find((instrument: Instrument) => instrument.id === id))
    .filter((instrument): instrument is NonNullable<typeof instrument> => instrument != null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="mr-2" size={20} />
        뒤로 가기
      </button>

      <h1 className="text-3xl font-bold mb-8">최근 본 악기</h1>

      {recentInstruments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">최근 본 악기가 없습니다.</p>
        </div>
      ) : (
        <InstrumentGrid
          instruments={recentInstruments}
          onInstrumentClick={(instrument: Instrument) => navigate(`/instrument/${instrument.id}`)}
          onFavoriteClick={() => {}}
          favoriteInstruments={[]}
        />
      )}
    </div>
  );
}