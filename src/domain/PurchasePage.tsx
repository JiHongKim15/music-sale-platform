import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { mockInstruments } from './instrument/mockInstruments';
import { Instrument } from '@/types';

export function PurchasePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const instrument = mockInstruments.find((i: Instrument) => i.id === id);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    detailAddress: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardOwner: '',
    deliveryRequest: ''
  });

  if (!instrument) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">상품을 찾을 수 없습니다</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2" size={20} />
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement purchase logic
    alert('구매가 완료되었습니다.');
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="mr-2" size={20} />
        뒤로 가기
      </button>

      <h1 className="text-3xl font-bold mb-8">주문/결제</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">주문 상품</h2>
        <div className="flex items-center">
          <img
            src={instrument.images[0]}
            alt={instrument.name}
            className="w-24 h-24 object-cover rounded"
          />
          <div className="ml-4">
            <h3 className="font-medium">{instrument.name}</h3>
            <p className="text-gray-600">{instrument.brand}</p>
            <p className="text-lg font-bold mt-2">
              ₩{instrument.price.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">배송 정보</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이름
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                연락처
              </label>
              <input
                type="tel"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  우편번호
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.zipCode}
                  onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  &nbsp;
                </label>
                <button
                  type="button"
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  우편번호 찾기
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                주소
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                상세주소
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.detailAddress}
                onChange={e => setFormData({ ...formData, detailAddress: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                배송 요청사항
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.deliveryRequest}
                onChange={e => setFormData({ ...formData, deliveryRequest: e.target.value })}
                placeholder="예: 부재시 경비실에 맡겨주세요"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">결제 정보</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                카드번호
              </label>
              <div className="flex items-center">
                <CreditCard className="text-gray-400 mr-2" size={20} />
                <input
                  type="text"
                  required
                  maxLength={19}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.cardNumber}
                  onChange={e => {
                    let value = e.target.value.replace(/\D/g, '');
                    value = value.replace(/(\d{4})/g, '$1 ').trim();
                    setFormData({ ...formData, cardNumber: value });
                  }}
                  placeholder="0000 0000 0000 0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  유효기간
                </label>
                <input
                  type="text"
                  required
                  maxLength={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.cardExpiry}
                  onChange={e => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length >= 2) {
                      value = value.slice(0, 2) + '/' + value.slice(2);
                    }
                    setFormData({ ...formData, cardExpiry: value });
                  }}
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="password"
                  required
                  maxLength={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.cardCVC}
                  onChange={e => {
                    const value = e.target.value.replace(/\D/g, '');
                    setFormData({ ...formData, cardCVC: value });
                  }}
                  placeholder="000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                카드 소유자
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.cardOwner}
                onChange={e => setFormData({ ...formData, cardOwner: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">결제 금액</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>상품 금액</span>
              <span>₩{instrument.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>배송비</span>
              <span>₩{(instrument.delivery.fee || 0).toLocaleString()}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-lg font-bold">
                <span>총 결제 금액</span>
                <span>₩{(instrument.price + (instrument.delivery.fee || 0)).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            결제하기
          </button>
        </div>
      </form>
    </div>
  );
}