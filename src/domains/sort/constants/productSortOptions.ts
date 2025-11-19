export interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  conditionGrade: string;
  storeLocation: string;
  createdAt: string;
  wishlistCount: number;
  viewCount: number;
  chats: number;
  imageId: number;
  status: string;
}

export type SortOptionValue =
  | "latest"
  | "priceLow"
  | "priceHigh"
  | "distance"
  | "likes"
  | "views";

export interface SortOption {
  label: string;
  value: SortOptionValue;
}

export const PRODUCT_SORT_OPTIONS: SortOption[] = [
  { label: "최신순", value: "latest" },
  { label: "낮은 가격순", value: "priceLow" },
  { label: "높은 가격순", value: "priceHigh" },
  { label: "가까운순", value: "distance" }, //지역 정렬은 아직 구현 할 수 없어서 "최신순"과 동일하게 둠.
  { label: "좋아요순", value: "likes" },
  { label: "조회순", value: "views" },
];
