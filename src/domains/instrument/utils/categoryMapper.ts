import { CategoryResponse, CategoryDisplayItem } from '@/domains/common/types/category';

// 카테고리별 아이콘과 디자인 매핑
const CATEGORY_DESIGN_MAP: Record<string, {
  icon: string;
  gradient: string;
  shadowColor: string;
  featured?: boolean;
}> = {
  // 루트 카테고리 (depth=0)
  '기타': {
    icon: '🎸',
    gradient: 'from-orange-400 via-red-500 to-pink-500',
    shadowColor: 'shadow-orange-500/25',
    featured: true,
  },
  '베이스': {
    icon: '🎸',
    gradient: 'from-purple-400 via-blue-500 to-indigo-600',
    shadowColor: 'shadow-blue-500/25',
    featured: true,
  },
  '드럼': {
    icon: '🥁',
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
    shadowColor: 'shadow-orange-500/25',
    featured: true,
  },
  '건반악기': {
    icon: '🎹',
    gradient: 'from-purple-400 via-blue-500 to-indigo-600',
    shadowColor: 'shadow-blue-500/25',
    featured: true,
  },
  '관악기': {
    icon: '🎺',
    gradient: 'from-amber-400 via-yellow-500 to-orange-500',
    shadowColor: 'shadow-amber-500/25',
    featured: true,
  },
  // 하위 카테고리 (depth=1)
  '일렉기타': {
    icon: '🎸',
    gradient: 'from-orange-400 via-red-500 to-pink-500',
    shadowColor: 'shadow-orange-500/25',
  },
  '어쿠스틱기타': {
    icon: '🎸',
    gradient: 'from-amber-400 via-orange-500 to-red-500',
    shadowColor: 'shadow-amber-500/25',
  },
  '클래식기타': {
    icon: '🎸',
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
    shadowColor: 'shadow-yellow-500/25',
  },
  '일렉베이스': {
    icon: '🎸',
    gradient: 'from-purple-400 via-blue-500 to-indigo-600',
    shadowColor: 'shadow-blue-500/25',
  },
  '어쿠스틱베이스': {
    icon: '🎸',
    gradient: 'from-indigo-400 via-purple-500 to-blue-600',
    shadowColor: 'shadow-indigo-500/25',
  },
  '어쿠스틱드럼': {
    icon: '🥁',
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
    shadowColor: 'shadow-orange-500/25',
  },
  '전자드럼': {
    icon: '🥁',
    gradient: 'from-red-400 via-pink-500 to-purple-500',
    shadowColor: 'shadow-red-500/25',
  },
  '피아노': {
    icon: '🎹',
    gradient: 'from-purple-400 via-blue-500 to-indigo-600',
    shadowColor: 'shadow-blue-500/25',
  },
  '신디사이저': {
    icon: '🎹',
    gradient: 'from-cyan-400 via-blue-500 to-purple-600',
    shadowColor: 'shadow-cyan-500/25',
  },
  '색소폰': {
    icon: '🎷',
    gradient: 'from-amber-400 via-yellow-500 to-orange-500',
    shadowColor: 'shadow-amber-500/25',
  },
  '트럼펫': {
    icon: '🎺',
    gradient: 'from-rose-400 via-pink-500 to-purple-500',
    shadowColor: 'shadow-pink-500/25',
  },
  // 기존 카테고리들
  '바이올린': {
    icon: '🎻',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    shadowColor: 'shadow-teal-500/25',
  },
  '첼로': {
    icon: '🎻',
    gradient: 'from-teal-400 via-cyan-500 to-blue-500',
    shadowColor: 'shadow-teal-500/25',
  },
  '플루트': {
    icon: '🪈',
    gradient: 'from-sky-400 via-blue-500 to-indigo-500',
    shadowColor: 'shadow-sky-500/25',
  },
  '클라리넷': {
    icon: '🎶',
    gradient: 'from-violet-400 via-purple-500 to-pink-500',
    shadowColor: 'shadow-violet-500/25',
  },
};

// 기본 디자인 (매핑되지 않은 카테고리용)
const DEFAULT_DESIGN = {
  icon: '🎵',
  gradient: 'from-gray-400 via-gray-500 to-gray-600',
  shadowColor: 'shadow-gray-500/25',
};

/**
 * 백엔드 카테고리 응답을 UI 표시용 카테고리로 변환
 */
export function mapCategoryToDisplayItem(
  category: CategoryResponse,
  productCount?: number
): CategoryDisplayItem {
  const design = CATEGORY_DESIGN_MAP[category.name] || DEFAULT_DESIGN;
  
  return {
    id: category.id,
    name: category.name,
    icon: design.icon,
    gradient: design.gradient,
    shadowColor: design.shadowColor,
    count: productCount,
    featured: design.featured || false,
    depth: category.depth,
  };
}

/**
 * 카테고리 목록을 UI 표시용으로 변환
 */
export function mapCategoriesToDisplayItems(
  categories: CategoryResponse[],
  productCounts?: Record<number, number>
): CategoryDisplayItem[] {
  return categories
    .filter(category => category.isActive && category.isRoot) // 활성화된 루트 카테고리만
    .map(category => mapCategoryToDisplayItem(
      category, 
      productCounts?.[category.id]
    ))
    .sort((a, b) => {
      // featured 카테고리를 앞에 배치
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.name.localeCompare(b.name);
    });
} 