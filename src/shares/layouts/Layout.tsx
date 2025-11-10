import { Outlet } from "react-router-dom";
import Header from "@/shares/layouts/Header";
import { Footer } from "@/shares/layouts/Footer";

//레이아웃 컴포넌트
export function Layout() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-200px)] px-4 py-8">
        <Outlet /> {/* 각 페이지가 여기로 들어감 */}
      </main>
      <Footer />
    </>
  );
}
