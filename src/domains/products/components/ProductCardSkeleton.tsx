import Skeleton from "@/shares/loadings/Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-[23px] shadow-md overflow-hidden w-full">
      {/* 이미지 영역 */}
      <Skeleton className="w-full h-[129px] rounded-none" />

      {/* 텍스트 영역 */}
      <div className="p-2.5 space-y-2">
        {/* 제목 */}
        <Skeleton className="w-3/4 h-3" />

        {/* 뱃지 2개 */}
        <div className="flex gap-2">
          <Skeleton className="w-8 h-3 rounded" />
          <Skeleton className="w-12 h-3 rounded" />
        </div>

        {/* 지역 | 시간 */}
        <Skeleton className="w-2/3 h-2" />

        {/* 가격 */}
        <Skeleton className="w-1/3 h-4 mt-2" />

        {/* 하단 아이콘 */}
        <div className="flex justify-end gap-3 mt-2">
          <Skeleton className="w-5 h-3" />
          <Skeleton className="w-5 h-3" />
        </div>
      </div>
    </div>
  );
}
