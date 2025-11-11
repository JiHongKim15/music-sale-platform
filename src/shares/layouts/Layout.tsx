import { Outlet } from "react-router-dom";
import Header from "@/shares/layouts/Header";
import { Footer } from "@/shares/layouts/Footer";

// 전체 레이아웃 컴포넌트
export function Layout() {
  return (
    <div className="flex justify-center w-full min-h-screen bg-gray-50">
      {/* 중앙 고정된 672px 박스 */}
      <div className="relative flex flex-col w-[672px] min-h-screen bg-white">
        {/* 헤더 */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <Header />
        </header>

        {/* 메인 */}
        <main className="flex-1 overflow-y-auto px-4 py-8">
          <Outlet />
        </main>

        {/* 푸터 */}
        <footer className="w-full border-t border-gray-200 bg-white">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
