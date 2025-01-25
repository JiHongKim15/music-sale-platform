import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { ChatButton } from './components/ChatButton';
import { HomePage } from './pages/HomePage';
import { InstrumentDetailPage } from './pages/InstrumentDetailPage';
import { SignupPage } from './pages/SignupPage';
import { StoresPage } from './pages/StoresPage';
import { StoreDetailPage } from './pages/StoreDetailPage';
import { RegisterInstrumentPage } from './pages/RegisterInstrumentPage';
import { RegisterStorePage } from './pages/RegisterStorePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { RegisterMarketItemPage } from './pages/RegisterMarketItemPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { RecentViewsPage } from './pages/RecentViewsPage';
import { PurchasePage } from './pages/PurchasePage';
import { AdminPage } from './pages/AdminPage';
import { PriceComparisonPage } from './pages/PriceComparisonPage';
import { UserManagementPage } from './pages/UserManagementPage';
import { AdminCategoryPage } from './pages/AdminCategoryPage';
import { ProfilePage } from './pages/ProfilePage';

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