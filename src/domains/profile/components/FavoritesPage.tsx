import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { mockInstruments } from '@/domains/instrument/constants/mockInstruments';
import { InstrumentGrid } from '@/domains/instrument/components/InstrumentGrid';
import { CommonHeader } from '@/components/organisms/Header/CommonHeader';

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
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* 공통 헤더 사용 */}
        <CommonHeader
          variant="back"
          title="찜한 악기"
          showBackButton={true}
          showUserMenu={true}
        />

        {/* 메인 콘텐츠 */}
        <div className="px-6 py-8">
          {/* 페이지 제목 */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">찜한 악기</h1>
            <p className="text-lg text-gray-600">관심 있는 악기들을 한눈에 확인하세요</p>
          </div>

          {favoriteInstruments.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">찜한 악기가 없습니다</h3>
              <p className="text-gray-600 mb-6">관심 있는 악기를 찜해보세요</p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 hover:scale-105 font-medium"
              >
                악기 둘러보기
              </button>
            </div>
          ) : (
            <InstrumentGrid
              instruments={favoriteInstruments}
              onInstrumentClick={(instrument) => navigate(`/instrument/${instrument.id}`)}
              onFavoriteClick={() => {/* TODO: Implement favorite toggle */}}
              favoriteInstruments={user.favoriteInstruments}
            />
          )}
        </div>
      </div>
    </div>
  );
}