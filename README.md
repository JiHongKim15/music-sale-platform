
```markdown:README.md
# Music Sale Platform

## 프로젝트 소개
악기 판매 사이트로 사용자들이 악기를 판매하고 구매할 수 있는 웹 사이트


## 기술 스택
- Frontend
  - React
  - TypeScript
  - Vite
  - Tailwind CSS

## 개발 환경 설정

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 9.0.0 이상

### 설치 방법

1. 의존성 설치
```bash
npm install
```

2. 환경 변수 설정
```bash
cp .env.example .env
```
`.env` 파일을 열어 필요한 환경 변수를 설정

## 실행 방법

### 개발 모드 실행
```bash
npm run dev
```
- 기본적으로 `http://localhost:5173`에서 실행

### 프로덕션 빌드
```bash
npm run build
```

### 프로덕션 모드 실행
```bash
npm run preview
```

## 프로젝트 구조
```
music-sale/
├── src/
│   ├── assets/        # 이미지, 폰트 등의 정적 파일
│   ├── components/    # 재사용 가능한 컴포넌트
│   ├── pages/         # 페이지 컴포넌트
│   ├── services/      # API 통신 관련 로직
│   ├── store/         # 상태 관리
│   ├── types/         # TypeScript 타입 정의
│   ├── utils/         # 유틸리티 함수
│   ├── App.tsx
│   └── main.tsx
├── public/            # 정적 파일
├── tests/             # 테스트 파일
├── .env.example       # 환경 변수 예시
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 주요 기능
- 사용자 인증 (로그인/회원가입)
- 음반 등록 및 수정
- 음반 검색 및 필터링
- 실시간 채팅
- 거래 내역 관리
- 리뷰 시스템

```
