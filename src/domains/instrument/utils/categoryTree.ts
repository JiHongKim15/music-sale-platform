import { CategoryResponse, CategoryDisplayItem } from '@/domains/common/types/category';
import { mapCategoryToDisplayItem } from './categoryMapper';

/**
 * flat 카테고리 리스트를 트리 구조로 변환
 */
export function buildCategoryTree(flat: CategoryResponse[]): CategoryDisplayItem[] {
  const idMap = new Map<number, CategoryDisplayItem>();
  const roots: CategoryDisplayItem[] = [];

  // 1. 모든 카테고리를 DisplayItem으로 변환
  flat.forEach(cat => {
    idMap.set(cat.id, { ...mapCategoryToDisplayItem(cat), children: [] });
  });

  // 2. parent 정보로 트리 구성
  flat.forEach(cat => {
    const item = idMap.get(cat.id)!;
    if (cat.parent && idMap.has(cat.parent.id)) {
      idMap.get(cat.parent.id)!.children!.push(item);
    } else if (cat.isRoot) {
      roots.push(item);
    }
  });

  return roots;
} 