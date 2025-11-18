import { useState, useMemo } from "react";
import { SortOptionValue, Product, SORT_OPTIONS } from "../constants/sortOption";

export function useSort(data: Product[]) {
  const [sortOption, setSortOption] = useState<SortOptionValue>("latest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const openSort = () => setIsSortOpen(true);
  const closeSort = () => setIsSortOpen(false);

  const selectSort = (value: SortOptionValue) => {
    setSortOption(value);
    closeSort();
  };

  const sortedData = useMemo(() => {
    if (!data || data.length === 0) return data;

    const sortableData = [...data];

    const secondarySort = (a: Product, b: Product): number =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

    const comparator = (a: Product, b: Product): number => {
      switch (sortOption) {
        case "price_low":
          return a.price - b.price || secondarySort(a, b);
        case "price_high":
          return b.price - a.price || secondarySort(a, b);
        case "likes":
          if (b.wishlistCount !== a.wishlistCount) {
            return b.wishlistCount - a.wishlistCount;
          }
          return secondarySort(a, b);

        case "views":
          if (b.viewCount !== a.viewCount) {
            return b.viewCount - a.viewCount;
          }
          return secondarySort(a, b);

        case "latest":
        case "distance":
        default:
          return secondarySort(a, b);
      }
    };

    return sortableData.sort(comparator);
  }, [data, sortOption]);

  const currentLabel = SORT_OPTIONS.find((opt) => opt.value === sortOption)?.label;

  return {
    sortOption,
    isSortOpen,
    openSort,
    closeSort,
    selectSort,
    sortedData,
    currentLabel,
  };
}
