import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatButton } from '@/domains/message/components/ChatButton';

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


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/instrument/:id" element={<InstrumentDetailPage />} />
          <Route path="/signup" element={<SignupPage />} />
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
        <ChatButton />
      </div>
    </Router>
  );
}

export default App; 