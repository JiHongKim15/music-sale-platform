import { Outlet } from "react-router-dom";
import Header from "@/shares/layouts/Header";
import Footer from "@/shares/layouts/Footer";

// 전체 레이아웃 컴포넌트
export function Layout() {
  return (
    <div className="flex justify-center w-full min-h-screen bg-gray-50">
      {/* 중앙 고정된 박스 */}
      <div className="relative flex flex-col w-[672px] min-h-screen shadow-[0_4px_20px_rgba(0,0,0,0.1)] bg-white">
        {/* 헤더 */}
        <Header />

        {/* 메인 */}
        <main className="flex-1 overflow-y-auto px-4 pt-[120px] pb-[90px] animate-[fadeIn_0.3s_ease-out]">
          <Outlet />
        </main>
        {/* 푸터 */}
        <Footer />
      </div>
    </div>
  );
}
