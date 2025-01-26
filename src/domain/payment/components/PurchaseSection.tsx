import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Calendar, AlertCircle } from 'lucide-react';
import { Instrument } from '@/types';

interface PurchaseSectionProps {
  instrument: Instrument;
}

export function PurchaseSection({ instrument }: PurchaseSectionProps) {
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const navigate = useNavigate();

  const handlePurchase = () => {
    navigate(`/purchase/${instrument.id}`);
  };

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement reservation logic
    alert(`예약이 완료되었습니다.\n날짜: ${reservationDate}\n시간: ${reservationTime}`);
    setShowReservationForm(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <div className="text-3xl font-bold">
        ₩{instrument.price.toLocaleString()}
      </div>

      {instrument.delivery.available ? (
        <div className="space-y-4">
          <div className="flex items-start space-x-3 text-green-600">
            <Truck className="w-5 h-5 mt-0.5" />
            <div>
              <p className="font-medium">배송 가능</p>
              {instrument.delivery.fee ? (
                <p className="text-sm text-gray-600">
                  배송비: ₩{instrument.delivery.fee.toLocaleString()}
                </p>
              ) : (
                <p className="text-sm text-gray-600">무료 배송</p>
              )}
              {instrument.delivery.estimatedDays && (
                <p className="text-sm text-gray-600">
                  예상 배송 기간: {instrument.delivery.estimatedDays}일
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handlePurchase}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            바로 구매하기
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-start space-x-3 text-yellow-600">
            <AlertCircle className="w-5 h-5 mt-0.5" />
            <div>
              <p className="font-medium">방문 구매 전용</p>
              <p className="text-sm text-gray-600">
                이 상품은 매장 방문 후 구매 가능합니다.
              </p>
            </div>
          </div>

          {!showReservationForm ? (
            <button
              onClick={() => setShowReservationForm(true)}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              방문 예약하기
            </button>
          ) : (
            <form onSubmit={handleReservation} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  방문 날짜
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  방문 시간
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={reservationTime}
                  onChange={(e) => setReservationTime(e.target.value)}
                >
                  <option value="">시간 선택</option>
                  {Array.from({ length: 9 }, (_, i) => i + 10).map((hour) => (
                    <option key={hour} value={`${hour}:00`}>
                      {hour}:00
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  예약하기
                </button>
                <button
                  type="button"
                  onClick={() => setShowReservationForm(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  취소
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}