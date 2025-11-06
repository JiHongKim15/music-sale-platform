import { HomePage } from "@/pages/HomePage";
import { Layout } from "@/shares/layouts/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppContent() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<div>Login Page</div>} />
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
