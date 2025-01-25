import { Instrument } from '../types';

export const mockInstruments: Instrument[] = [
  {
    id: "1",
    name: "Stratocaster American Professional II",
    brand: "Fender",
    type: "기타",
    subtype: "일렉트릭 기타",
    price: 2199000,
    condition: "new",
    images: [
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f",
      "https://images.unsplash.com/photo-1550985616-10810253b84d",
      "https://images.unsplash.com/photo-1555638138-012b9e57492c"
    ],
    description: "The American Professional II Stratocaster는 60년 이상의 혁신, 영감, 진화를 바탕으로 현대 연주자의 요구를 충족시키는 최고의 일렉트릭 기타입니다.",
    features: [
      "Deep \"C\" 넥 프로파일",
      "Push-Push 톤 포트",
      "V-Mod II 싱글코일 픽업",
      "콜드 롤드 스틸 블록 브릿지",
      "슈퍼 내추럴 새틴 피니시"
    ],
    specifications: {
      "바디": "알더",
      "넥": "메이플",
      "지판": "로즈우드",
      "프렛": "22개",
      "스케일": "25.5\" (648 mm)",
      "픽업": "SSS"
    },
    delivery: {
      available: true,
      fee: 0,
      estimatedDays: 2
    },
    store: {
      id: "store1",
      name: "서울 뮤직센터",
      location: "서울 강남구",
      region: "서울",
      address: "서울특별시 강남구 삼성동 123-45",
      phone: "02-1234-5678",
      coordinates: {
        lat: 37.5665,
        lng: 126.9780
      }
    },
    viewCount: 245,
    currentViewers: 3
  },
  {
    id: "2",
    name: "Les Paul Standard 60s",
    brand: "Gibson",
    type: "기타",
    subtype: "일렉트릭 기타",
    price: 1850000,
    condition: "used",
    grade: "S",
    purchaseDate: "2023-08-15",
    images: [
      "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02",
      "https://images.unsplash.com/photo-1558098329-44e410b8b417",
      "https://images.unsplash.com/photo-1572126712996-f68c3e5916f8"
    ],
    description: "최상급 컨디션의 Gibson Les Paul Standard 60s입니다. 1960년대 Les Paul의 분위기를 현대적인 기능과 연주성으로 재현했습니다.",
    features: [
      "솔리드 마호가니 바디와 AA 등급 메이플 탑",
      "로즈우드 지판과 트라페조이드 인레이",
      "Burstbucker 61R & 61T 픽업",
      "Orange Drop 캐패시터가 적용된 수제작 일렉트로닉스"
    ],
    delivery: {
      available: false
    },
    store: {
      id: "store2",
      name: "부산 기타 갤러리",
      location: "부산 해운대구",
      region: "부산",
      address: "부산광역시 해운대구 우동 456-78",
      phone: "051-9876-5432",
      coordinates: {
        lat: 35.1796,
        lng: 129.0756
      }
    },
    viewCount: 189,
    currentViewers: 2
  },
  {
    id: "3",
    name: "Yamaha U3 업라이트 피아노",
    brand: "Yamaha",
    type: "피아노",
    subtype: "어쿠스틱 피아노",
    price: 4500000,
    condition: "used",
    grade: "A",
    purchaseDate: "2020-03-15",
    images: [
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0",
      "https://images.unsplash.com/photo-1552422535-c45813c61732"
    ],
    description: "10년 사용한 Yamaha U3 피아노입니다. 정기적으로 조율을 받았으며, 소리와 터치감이 매우 좋습니다.",
    features: [
      "일본 제작",
      "정기 조율 관리",
      "습도 조절기 포함",
      "의자 포함"
    ],
    delivery: {
      available: true,
      fee: 150000,
      estimatedDays: 7
    },
    viewCount: 156,
    currentViewers: 1
  },
  {
    id: "4",
    name: "Roland TD-17KVX 전자드럼",
    brand: "Roland",
    type: "드럼",
    subtype: "전자 드럼",
    price: 1200000,
    condition: "used",
    grade: "B",
    purchaseDate: "2022-01-10",
    images: [
      "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7",
      "https://images.unsplash.com/photo-1524230659092-07f99a75c013"
    ],
    description: "가정용으로 사용하던 전자드럼입니다. 패드 상태 양호하며, 소음이 적어 아파트에서도 연주 가능합니다.",
    features: [
      "메쉬 헤드 패드",
      "프리미엄 사운드 모듈",
      "블루투스 연결 지원",
      "헤드폰 포함"
    ],
    delivery: {
      available: true,
      fee: 50000,
      estimatedDays: 3
    },
    viewCount: 98,
    currentViewers: 4
  },
  {
    id: "5",
    name: "Selmer Mark VI 알토 색소폰",
    brand: "Selmer",
    type: "관악기",
    subtype: "색소폰",
    price: 8500000,
    condition: "used",
    grade: "S",
    purchaseDate: "2018-06-20",
    images: [
      "https://images.unsplash.com/photo-1573871669414-010dbf73ca84",
      "https://images.unsplash.com/photo-1573871669409-e053c1c7a2a3"
    ],
    description: "1965년산 Mark VI 알토 색소폰입니다. 오버홀 완료했으며, 빈티지 특유의 따뜻한 음색이 일품입니다.",
    features: [
      "프랑스 제작",
      "오리지널 케이스",
      "최근 오버홀 완료",
      "빈티지 마우스피스 포함"
    ],
    delivery: {
      available: true,
      fee: 30000,
      estimatedDays: 2
    },
    viewCount: 234,
    currentViewers: 2
  }
];