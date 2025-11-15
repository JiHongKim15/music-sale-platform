import { HomePage } from "@/pages/HomePage";
import { Layout } from "@/shares/layouts/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommunityPage from "@/pages/CommunityPage";
import MapPage from "@/pages/MapPage";
import ChatPage from "@/pages/ChatPage";
import ProfilePage from "@/pages/ProfilePage";
import ProductDetailPage from "@/pages/ProductDetailPage";

function AppContent() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
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
