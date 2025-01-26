import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone } from 'lucide-react';
import { InstrumentGrid } from '../components/InstrumentGrid';
import { mockInstruments } from '../mockInstruments';

export function StoreDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 해당 매장의 악기들과 매장 정보를 찾습니다
  const storeInstruments = mockInstruments.filter(i => i.store?.id === id);
  const store = storeInstruments[0]?.store;

  if (!store) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">매장을 찾을 수 없습니다</h2>
          <button
            onClick={() => navigate('/stores')}
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2" size={20} />
            매장 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/stores')}
        className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft className="mr-2" size={20} />
        매장 목록으로 돌아가기
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">{store.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{store.address}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="w-5 h-5 mr-2" />
              <a href={`tel:${store.phone}`} className="text-blue-600 hover:text-blue-800">
                {store.phone}
              </a>
            </div>
          </div>
          
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${store.coordinates.lat},${store.coordinates.lng}`}
              className="w-full h-full rounded-lg"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">보유 악기 목록</h2>
        <InstrumentGrid
          instruments={storeInstruments}
          onInstrumentClick={(instrument) => navigate(`/instrument/${instrument.id}`)}
          onFavoriteClick={() => {}}
          favoriteInstruments={[]}
        />
      </div>
    </div>
  );
}