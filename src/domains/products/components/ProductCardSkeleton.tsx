import Skeleton from "@/shares/loadings/Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="w-full rounded-[23px] bg-white shadow-sm p-0.5">
      {/* 이미지 영역 */}
      <Skeleton className="w-full h-[129px] rounded-[20px]" />

      {/* 내용 영역 */}
      <div className="p-2.5 space-y-2">
        {/* 제목 */}
        <Skeleton className="h-3 w-3/4" />

        {/* 뱃지 2개 */}
        <div className="flex gap-1 pt-1">
          <Skeleton className="h-[10px] w-[36px]" />
          <Skeleton className="h-[10px] w-[50px]" />
        </div>

        {/* 위치/시간 */}
        <Skeleton className="h-2 w-1/2" />

        {/* 가격 */}
        <Skeleton className="h-4 w-1/3 pt-2" />

        {/* 아이콘 영역 */}
        <div className="flex justify-end gap-2">
          <Skeleton className="h-3 w-6" />
          <Skeleton className="h-3 w-6" />
        </div>
      </div>
    </div>
  );
}
