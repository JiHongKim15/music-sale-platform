// 백엔드 카테고리 응답 타입 (실제 API 구조에 맞게 수정)
export interface CategoryResponse {
  id: number;
  name: string;
  type: string;
  parent: CategoryResponse | null;
  path: string;
  depth: number;
  isActive: boolean;
  isRoot: boolean;
  isLeaf: boolean;
}

// 카테고리 계층 구조
export interface CategoryTree {
  id: string;
  name: string;
  description?: string;
  level: number;
  displayOrder: number;
  isActive: boolean;
  children: CategoryTree[];
  productCount?: number;
}

// 카테고리 UI 표시용 타입
export interface CategoryDisplayItem {
  id: number;
  name: string;
  icon: string;
  gradient: string;
  shadowColor: string;
  count?: number;
  featured?: boolean;
  depth: number;
  children?: CategoryDisplayItem[]; // 하위 카테고리
} 