import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ChatButton } from '@/domains/message/components/ChatButton';
import { BottomNavBar } from '@/components/atoms/BottomNavBar';

// Instrument related pages
import { HomePage } from '@/domains/instrument/components/HomePage';
import { InstrumentDetailPage } from '@/domains/instrument/components/InstrumentDetailPage';
import { StoresPage } from '@/domains/store/components/StoresPage';
import { StoreDetailPage } from '@/domains/store/components/StoreDetailPage';
import { RegisterInstrumentPage } from '@/domains/instrument/components/RegisterInstrumentPage';
import { RegisterStorePage } from '@/domains/store/components/RegisterStorePage';
import { MarketplacePage } from '@/domains/marketplace/components/MarketplacePage';
import { RegisterMarketItemPage } from '@/domains/marketplace/components/RegisterMarketItemPage';
import { PriceComparisonPage } from '@/domains/instrument/components/PriceComparisonPage';

// User related pages
import { SignupPage } from '@/domains/auth/pages/SignupPage';
import { ProfilePage } from '@/domains/profile/pages/ProfilePage';
import { FavoritesPage } from '@/domains/profile/components/FavoritesPage';
import { RecentViewsPage } from '@/domains/profile/components/RecentViewsPage';
import { PurchasePage } from '@/domains/payment/components/PurchasePage';
import { AdminPage } from '@/domains/admin/components/AdminPage';
import { UserManagementPage } from '@/domains/admin/components/UserManagementPage';
import { AdminCategoryPage } from '@/domains/admin/components/AdminCategoryPage';
import { Header } from '@/components/organisms/Header/Header';
import LoginPage from '@/domains/auth/pages/LoginPage';

function AppContent() {
  const location = useLocation();
  
  // 자체 헤더가 있는 페이지들 (Header 컴포넌트 숨김)
  const pagesWithOwnHeader = [
    '/',
    '/instrument',
    '/stores',
    '/marketplace',
    '/signup'
  ];
  
  const shouldShowHeader = !pagesWithOwnHeader.some(path => 
    location.pathname === path || location.pathname.startsWith(path)
  );
  
  // 하단 네비게이션을 숨길 페이지들
  const hideBottomNav = [
    '/signup',
    '/admin',
    '/admin/users', 
    '/admin/categories',
    '/register/instrument',
    '/register/store',
    '/marketplace/register'
  ].some(path => location.pathname.startsWith(path));

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/instrument/:id" element={<InstrumentDetailPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/store/:id" element={<StoreDetailPage />} />
        <Route path="/register/instrument" element={<RegisterInstrumentPage />} />
        <Route path="/register/store" element={<RegisterStorePage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/marketplace/register" element={<RegisterMarketItemPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/recent-views" element={<RecentViewsPage />} />
        <Route path="/purchase/:id" element={<PurchasePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/users" element={<UserManagementPage />} />
        <Route path="/admin/categories" element={<AdminCategoryPage />} />
        <Route path="/price-comparison" element={<PriceComparisonPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      
      {/* 채팅 버튼 */}
      <ChatButton />
      
      {/* 하단 네비게이션 */}
      {!hideBottomNav && <BottomNavBar />}
      
      {/* 하단 네비게이션 공간 확보 */}
      {!hideBottomNav && <div className="h-20" />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App; 