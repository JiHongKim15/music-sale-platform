import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockInstruments } from '@/domain/instrument/mockInstruments';
import { InstrumentGrid } from '@/domain/instrument/components/InstrumentGrid';

export function FavoritesPage() {
  const navigate = useNavigate();
  // TODO: Replace with actual user data
  const user = {
    favoriteInstruments: ['1', '2']
  };

  const favoriteInstruments = mockInstruments.filter(
    instrument => user.favoriteInstruments.includes(instrument.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="mr-2" size={20} />
        뒤로 가기
      </button>

      <h1 className="text-3xl font-bold mb-8">찜한 악기</h1>

      {favoriteInstruments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">찜한 악기가 없습니다.</p>
        </div>
      ) : (
        <InstrumentGrid
          instruments={favoriteInstruments}
          onInstrumentClick={(instrument) => navigate(`/instrument/${instrument.id}`)}
          onFavoriteClick={(id) => {/* TODO: Implement favorite toggle */}}
          favoriteInstruments={user.favoriteInstruments}
        />
      )}
    </div>
  );
}