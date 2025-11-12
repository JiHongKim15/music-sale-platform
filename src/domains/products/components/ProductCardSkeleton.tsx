export default function ProductCardSkeleton() {
  return (
    <div className="w-full animate-pulse rounded-[23px] bg-white shadow-sm">
      {/* 이미지 박스 */}
      <div className="relative w-full h-[129px] bg-gray-200 rounded-t-[23px] overflow-hidden shimmer" />

      {/* 내용 영역 */}
      <div className="p-2.5 space-y-2">
        {/* 제목 */}
        <div className="h-3 w-3/4 bg-gray-200 rounded shimmer" />

        {/* 뱃지 2개 */}
        <div className="flex gap-1 pt-1">
          <div className="h-[10px] w-[36px] bg-gray-200 rounded shimmer" />
          <div className="h-[10px] w-[50px] bg-gray-200 rounded shimmer" />
        </div>

        {/* 위치/시간 */}
        <div className="h-2 w-1/2 bg-gray-200 rounded shimmer" />

        {/* 가격 */}
        <div className="h-4 w-1/3 bg-gray-200 rounded pt-2 shimmer" />

        {/* 아이콘 영역 */}
        <div className="flex justify-end gap-2 pt-1">
          <div className="h-3 w-6 bg-gray-200 rounded shimmer" />
          <div className="h-3 w-6 bg-gray-200 rounded shimmer" />
        </div>
      </div>
    </div>
  );
}
