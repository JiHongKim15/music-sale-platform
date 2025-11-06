// src/domains/filter/services/mockSearchApi.ts

// 🎸 임시 데이터
const mockResults = [
  { id: 1, name: "Fender Stratocaster", price: 1200000 },
  { id: 2, name: "Yamaha Drum Set", price: 800000 },
  { id: 3, name: "Korg Synthesizer", price: 1500000 },
  { id: 4, name: "Gibson Les Paul", price: 1700000 },
];

// 🧪 백엔드 API 대기 중: 가짜 검색 함수
export async function searchProductsMock(keyword: string) {
  // API 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 400));

  // keyword를 포함하는 데이터만 반환
  return mockResults.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );
}
