import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { instrumentCategories } from '../categories';

export function RegisterInstrumentPage() {
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    type: '',
    subtype: '',
    price: '',
    condition: 'new',
    grade: '',
    description: '',
    features: [''],
    specifications: [{ key: '', value: '' }]
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setSelectedImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { key: '', value: '' }]
    }));
  };

  const removeSpecification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement instrument registration logic
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="mr-2" size={20} />
        뒤로 가기
      </button>

      <h1 className="text-3xl font-bold mb-8">악기 등록</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 기본 정보 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">기본 정보</h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                악기 이름
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
                브랜드
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.brand}
                onChange={e => setFormData({ ...formData, brand: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  종류
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="">선택해주세요</option>
                  {instrumentCategories.map(category => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  세부 종류
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.subtype}
                  onChange={e => setFormData({ ...formData, subtype: e.target.value })}
                >
                  <option value="">선택해주세요</option>
                  {formData.type && instrumentCategories
                    .find(c => c.name === formData.type)
                    ?.subcategories.map(sub => (
                      <option key={sub.name} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                가격
              </label>
              <input
                type="number"
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  상태
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.condition}
                  onChange={e => setFormData({ ...formData, condition: e.target.value })}
                >
                  <option value="new">새 제품</option>
                  <option value="used">중고</option>
                </select>
              </div>

              {formData.condition === 'used' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    등급
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={formData.grade}
                    onChange={e => setFormData({ ...formData, grade: e.target.value })}
                  >
                    <option value="">선택해주세요</option>
                    <option value="S">S</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 이미지 업로드 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">이미지</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`업로드 이미지 ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {selectedImages.length < 5 && (
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">
                  <Upload size={24} className="text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">이미지 추가</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    multiple
                  />
                </label>
              )}
            </div>
            <p className="text-sm text-gray-500">
              최대 5장까지 업로드 가능합니다.
            </p>
          </div>
        </div>

        {/* 상세 정보 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">상세 정보</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                설명
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  특징
                </label>
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + 추가
                </button>
              </div>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      value={feature}
                      onChange={e => {
                        const newFeatures = [...formData.features];
                        newFeatures[index] = e.target.value;
                        setFormData({ ...formData, features: newFeatures });
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  제품 사양
                </label>
                <button
                  type="button"
                  onClick={addSpecification}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + 추가
                </button>
              </div>
              <div className="space-y-2">
                {formData.specifications.map((spec, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="항목"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      value={spec.key}
                      onChange={e => {
                        const newSpecs = [...formData.specifications];
                        newSpecs[index].key = e.target.value;
                        setFormData({ ...formData, specifications: newSpecs });
                      }}
                    />
                    <input
                      type="text"
                      placeholder="값"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      value={spec.value}
                      onChange={e => {
                        const newSpecs = [...formData.specifications];
                        newSpecs[index].value = e.target.value;
                        setFormData({ ...formData, specifications: newSpecs });
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeSpecification(index)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
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
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}