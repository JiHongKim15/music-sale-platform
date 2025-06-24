import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { Store } from '@/domains/common/types';

interface StoreLocationProps {
  store: Store;
}

export function StoreLocation({ store }: StoreLocationProps) {
  const mapUrl = `https://www.google.com/maps?q=${store.coordinates.lat},${store.coordinates.lng}`;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">매장 정보</h3>
      
      <div className="space-y-3">
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-gray-500 mt-1 mr-2" />
          <div>
            <p className="font-medium">{store.name}</p>
            <p className="text-gray-600">{store.address}</p>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm mt-1 inline-block"
            >
              지도에서 보기
            </a>
          </div>
        </div>
        
        <div className="flex items-center">
          <Phone className="w-5 h-5 text-gray-500 mr-2" />
          <a
            href={`tel:${store.phone}`}
            className="text-blue-600 hover:text-blue-800"
          >
            {store.phone}
          </a>
        </div>
      </div>
    </div>
  );
}