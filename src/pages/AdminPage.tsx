import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Package,
  Store,
  PlusCircle,
  Filter,
  LineChart,
  TrendingUp,
  Settings
} from 'lucide-react';
import { mockInstruments } from '../data/mockInstruments';
import { InstrumentGrid } from '../components/InstrumentGrid';
import { FilterPanel } from '../components/FilterPanel';
import { SearchBar } from '../components/SearchBar';
import { SearchFilters } from '../types';

export function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'instruments' | 'settings' | 'analytics'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  // 모든 악기 데이터 (판매자 상품 + 중고 상품)
  const filteredInstruments = mockInstruments.filter(instrument => {
    const matchesSearch = instrument.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         instrument.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !filters.type || instrument.type === filters.type;
    const matchesSubtype = !filters.subtype || instrument.subtype === filters.subtype;
    const matchesBrand = !filters.brand || instrument.brand === filters.brand;
    const matchesCondition = !filters.condition || instrument.condition === filters.condition;
    const matchesGrade = !filters.grade || instrument.grade === filters.grade;
    const matchesPrice = (!filters.minPrice || instrument.price >= filters.minPrice) &&
                        (!filters.maxPrice || instrument.price <= filters.maxPrice);

    return matchesSearch && matchesType && matchesSubtype &&
           matchesBrand && matchesCondition && matchesGrade && matchesPrice;
  });

  // 통계 데이터 계산
  const totalInstruments = mockInstruments.length;
  const totalStores = new Set(mockInstruments.filter(i => i.store).map(i => i.store!.id)).size;
  const totalUsers = 150; // 임시 데이터
  const totalSales = mockInstruments.reduce((sum, i) => sum + i.price, 0);

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">총 악기</h3>
          <Package className="h-8 w-8 text-blue-500" />
        </div>
        <p className="text-3xl font-bold mt-2">{totalInstruments}개</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">총 매장</h3>
          <Store className="h-8 w-8 text-green-500" />
        </div>
        <p className="text-3xl font-bold mt-2">{totalStores}개</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">총 사용자</h3>
          <Users className="h-8 w-8 text-purple-500" />
        </div>
        <p className="text-3xl font-bold mt-2">{totalUsers}명</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">총 판매액</h3>
          <TrendingUp className="h-8 w-8 text-red-500" />
        </div>
        <p className="text-3xl font-bold mt-2">₩{totalSales.toLocaleString()}</p>
      </div>
    </div>
  );

  const renderInstruments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-xl">
          <SearchBar onSearch={setSearchQuery} />
        </div>
        <button
          onClick={() => navigate('/register/instrument')}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-4"
        >
          <PlusCircle size={20} className="mr-2" />
          악기 등록
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className={`
          lg:col-span-1
          ${showFilters ? 'fixed inset-0 z-50 bg-white lg:relative lg:bg-transparent' : 'hidden lg:block'}
        `}>
          <FilterPanel
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>

        <div className="lg:col-span-3">
          <InstrumentGrid
            instruments={filteredInstruments}
            onInstrumentClick={(instrument) => navigate(`/instrument/${instrument.id}`)}
            onFavoriteClick={() => {}}
            favoriteInstruments={[]}
          />
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">관리자 설정</h2>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/admin/users')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center">
              <Users className="h-6 w-6 text-gray-500 mr-3" />
              <div>
                <h3 className="font-medium">사용자 관리</h3>
                <p className="text-sm text-gray-500">사용자 권한 및 계정 관리</p>
              </div>
            </div>
          </button>

          <button
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center">
              <Settings className="h-6 w-6 text-gray-500 mr-3" />
              <div>
                <h3 className="font-medium">시스템 설정</h3>
                <p className="text-sm text-gray-500">시스템 환경 설정</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">판매 통계</h2>
        <div className="h-80 flex items-center justify-center border rounded">
          <BarChart3 size={48} className="text-gray-400" />
          <p className="ml-4 text-gray-500">차트 컴포넌트 개발 중...</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">가격 동향</h2>
        <div className="h-80 flex items-center justify-center border rounded">
          <LineChart size={48} className="text-gray-400" />
          <p className="ml-4 text-gray-500">차트 컴포넌트 개발 중...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">관리자 대시보드</h1>

      <div className="mb-8">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'overview'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            개요
          </button>
          <button
            onClick={() => setActiveTab('instruments')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'instruments'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            악기 관리
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'settings'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            설정
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'analytics'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            통계
          </button>
        </nav>
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'instruments' && renderInstruments()}
      {activeTab === 'settings' && renderSettings()}
      {activeTab === 'analytics' && renderAnalytics()}
    </div>
  );
}