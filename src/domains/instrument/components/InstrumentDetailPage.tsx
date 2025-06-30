import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, Eye, Clock, CreditCard, ShoppingCart, MessageCircle, Truck, Shield } from 'lucide-react';
import { useProductDetail } from '@/domains/instrument/hooks/useProductDetail';
import { ProductCondition, ProductConditionGrade } from '@/domains/common/types/api';
import { CommonHeader } from '@/components/organisms/Header/CommonHeader';

export function InstrumentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: product, isLoading, error } = useProductDetail(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <CommonHeader
          variant="back"
          title="상품 상세"
          showBackButton={true}
          showUserMenu={true}
        />
        <div className="flex items-center justify-center h-96">
          <div className="inline-flex items-center gap-3 text-orange-600 bg-orange-50 px-6 py-3 rounded-full">
            <div className="w-4 h-4 border-2 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
            <span className="text-sm font-medium">상품 정보를 불러오는 중...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <CommonHeader
          variant="back"
          title="상품 상세"
          showBackButton={true}
          showUserMenu={true}
        />
        <div className="flex flex-col items-center justify-center h-96">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">😵</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">상품을 찾을 수 없습니다</h3>
          <p className="text-gray-600">삭제되었거나 존재하지 않는 상품입니다</p>
        </div>
      </div>
    );
  }

  // 이미지 처리 - ProductOutput에는 images 필드가 없으므로 기본 이미지 사용
  const images = ['/api/placeholder/400/400'];

  // 컨디션 관련 함수들
  const getConditionText = (condition: ProductCondition, grade?: ProductConditionGrade) => {
    if (condition === ProductCondition.NEW) return '새 제품';
    return grade ? `중고 (${grade}급)` : '중고';
  };

  const getConditionColor = (condition: ProductCondition, grade?: ProductConditionGrade) => {
    if (condition === ProductCondition.NEW) return 'bg-blue-100 text-blue-800';
    
    switch (grade) {
      case ProductConditionGrade.S: return 'bg-purple-100 text-purple-800';
      case ProductConditionGrade.A: return 'bg-green-100 text-green-800';
      case ProductConditionGrade.B: return 'bg-yellow-100 text-yellow-800';
      case ProductConditionGrade.C: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // 핸들러 함수들
  const handleBuyNow = () => {
    navigate(`/purchase/${product.id}`, { 
      state: { 
        product: product,
        quantity: quantity 
      } 
    });
  };

  const handleAddToCart = () => {
    console.log('장바구니에 추가:', { productId: product.id, quantity });
    // TODO: 장바구니 API 연동
  };

  const handleContact = () => {
    console.log('판매자에게 문의:', product.id);
    // TODO: 채팅/메시지 기능 연동
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <CommonHeader
        variant="back"
        title={product.name}
        showBackButton={true}
        showUserMenu={true}
      />
      
      {/* 메인 콘텐츠 */}
      <div className="px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 상품 이미지 */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden group">
              <img
                src={images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-110 ${
                      selectedImageIndex === index 
                        ? 'ring-2 ring-orange-400 scale-105' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 상품 정보 */}
          <div className="space-y-8">
            {/* 기본 정보 */}
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-center space-x-3 mb-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getConditionColor(product.condition, product.conditionGrade || undefined)}`}> 
                      {getConditionText(product.condition, product.conditionGrade || undefined)}
                    </span>
                    <span className="text-sm text-orange-700 bg-orange-100 px-4 py-2 rounded-full">
                      {product.catalog.category.name}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-6">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                      isFavorite 
                        ? 'text-red-500 bg-red-50' 
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 rounded-full text-gray-400 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300 hover:scale-110">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <div className="text-4xl font-bold text-gray-900 mb-3">
                  ₩{product.price.toLocaleString()}
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span className="flex items-center bg-blue-50 px-3 py-2 rounded-full">
                    <Eye className="w-3 h-3 mr-1" />
                    재고 {product.stockQuantity}개
                  </span>
                  <span className="flex items-center bg-green-50 px-3 py-2 rounded-full">
                    <Clock className="w-3 h-3 mr-1" />
                    판매중
                  </span>
                </div>
              </div>
            </div>

            {/* 판매자 정보 */}
            {product.store && (
              <div className="bg-gray-50 rounded-3xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">판매자 정보</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">상점명</span>
                    <span className="font-medium text-gray-900">{product.store.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">평점</span>
                    <span className="font-medium text-orange-600">⭐ 4.8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">응답시간</span>
                    <span className="font-medium text-green-600">평균 30분</span>
                  </div>
                </div>
              </div>
            )}

            {/* 수량 선택 */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">수량 선택</label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-gray-50 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-orange-50 transition-colors text-orange-600 font-bold hover:scale-110"
                  >
                    −
                  </button>
                  <span className="w-16 text-center font-semibold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-orange-50 transition-colors text-orange-600 font-bold hover:scale-110"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  최대 {product.stockQuantity}개
                </span>
              </div>
            </div>

            {/* 구매 버튼들 */}
            <div className="space-y-4">
              <button
                onClick={handleBuyNow}
                disabled={product.stockQuantity === 0}
                className="w-full bg-orange-500 text-white py-4 rounded-full font-semibold hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                바로 구매하기
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stockQuantity === 0}
                  className="bg-gray-50 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  <ShoppingCart className="w-3 h-3 mr-2" />
                  장바구니
                </button>
                
                <button
                  onClick={handleContact}
                  className="bg-gray-50 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  <MessageCircle className="w-3 h-3 mr-2" />
                  문의하기
                </button>
              </div>
            </div>

            {/* 배송 & 안전거래 정보 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-3xl p-6">
                <div className="flex items-center text-gray-900 mb-4">
                  <Truck className="w-4 h-4 mr-2 text-orange-600" />
                  <span className="font-semibold">배송 정보</span>
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <div>무료배송 (5만원 이상)</div>
                  <div>평균 2-3일 소요</div>
                  <div>전국 배송 가능</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-3xl p-6">
                <div className="flex items-center text-gray-900 mb-4">
                  <Shield className="w-4 h-4 mr-2 text-green-600" />
                  <span className="font-semibold">안전거래</span>
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <div>구매자 보호</div>
                  <div>7일 무료 반품</div>
                  <div>정품 보장</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 상세 설명 */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">상품 설명</h3>
          <div className="bg-gray-50 rounded-3xl p-8">
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-6 text-lg">
                <strong className="text-orange-700">{product.name}</strong>은(는) 
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full mx-2 text-sm">
                  {product.catalog.category.name}
                </span> 
                카테고리의 {product.condition === ProductCondition.NEW ? '새 제품' : '중고 제품'}입니다.
              </p>
              {product.store && (
                <p className="text-lg">
                  <strong className="text-green-700">{product.store.name}</strong>에서 판매하는 
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full mx-1 text-sm">
                    정품 보장
                  </span> 
                  상품으로, 안전하고 믿을 수 있는 거래를 약속드립니다.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}