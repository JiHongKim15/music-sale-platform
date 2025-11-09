import { Outlet } from "react-router-dom";
import Header from "@/shares/layouts/Header";
import { Footer } from "@/shares/layouts/Footer";

// 전체 레이아웃 컴포넌트
export function Layout() {
  return (
    // 모바일에서는 꽉 차게, 웹에서는 672px로 고정 + 중앙 정렬
    <div className="flex flex-col w-full max-w-2xl min-h-screen mx-auto bg-white">
      {/* 헤더 */}
      <Header />

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 min-h-[calc(100vh-200px)] px-4 py-8">
        <Outlet /> {/* 각 페이지 내용 */}
      </main>

      {/* 푸터 */}
      <Footer />
    </div>
  );
}
