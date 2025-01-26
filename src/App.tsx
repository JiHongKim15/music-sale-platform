import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatButton } from '@/domain/message/components/ChatButton';

// Instrument related pages
import { HomePage } from '@/domain/instrument/pages/HomePage';
import { InstrumentDetailPage } from '@/domain/instrument/pages/InstrumentDetailPage';
import { StoresPage } from '@/domain/instrument/pages/StoresPage';
import { StoreDetailPage } from '@/domain/instrument/pages/StoreDetailPage';
import { RegisterInstrumentPage } from '@/domain/instrument/pages/RegisterInstrumentPage';
import { RegisterStorePage } from '@/domain/instrument/pages/RegisterStorePage';
import { MarketplacePage } from '@/domain/instrument/pages/MarketplacePage';
import { RegisterMarketItemPage } from '@/domain/instrument/pages/RegisterMarketItemPage';
import { PriceComparisonPage } from '@/domain/instrument/pages/PriceComparisonPage';

// User related pages
import { SignupPage } from '@/domain/user/auth/pages/SignupPage';
import { ProfilePage } from '@/domain/user/profile/pages/ProfilePage';
import { FavoritesPage } from '@/domain/FavoritesPage';
import { RecentViewsPage } from '@/domain/RecentViewsPage';
import { PurchasePage } from '@/domain/PurchasePage';
import { AdminPage } from '@/domain/AdminPage';
import { UserManagementPage } from '@/domain/UserManagementPage';
import { AdminCategoryPage } from '@/domain/AdminCategoryPage';
import { Header } from './common/Header/Header';


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