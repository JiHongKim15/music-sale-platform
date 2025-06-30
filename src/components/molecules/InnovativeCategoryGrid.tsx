import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CategoryDisplayItem } from '@/domains/common/types/category';
import { useCategoryDisplayItems } from '@/domains/instrument/hooks/useCategories';

interface InnovativeCategoryGridProps {
  onCategoryClick: (category: CategoryDisplayItem) => void;
  className?: string;
  categories?: CategoryDisplayItem[];
}

// 3D 인터랙티브 카드 컴포넌트 (children 타입 명시)
const CategoryCard3D: React.FC<{
  category: CategoryDisplayItem;
  onClick: () => void;
  index: number;
}> = ({ category, onClick, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17.5deg', '17.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // 랜덤 아이콘/이모지 사용
  const icons = [category.icon, '🎵', '🎸', '🎹', '🥁', '🎷', '🎺'];
  const iconToShow = icons[index % icons.length];

  return (
    <motion.div
      ref={ref}
      className={`relative group cursor-pointer sketch-border sketch-shadow ${index % 2 === 0 ? 'sketch-rotate' : 'sketch-rotate2'}`}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* 글로우 효과 */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${category.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
      />
      {/* 메인 카드 - 컴팩트 사이즈 */}
      <div
        className={`
          relative h-20 md:h-24 lg:h-28 
          bg-white/10 backdrop-blur-xl 
          rounded-2xl border border-white/20
          ${category.shadowColor} shadow-xl
          overflow-hidden
          transition-all duration-500
          group-hover:bg-white/20
        `}
        style={{ transform: 'translateZ(50px)' }}
      >
        {/* 배경 그라데이션 */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
        {/* 플로팅 파티클 효과 */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%', scale: 0 }}
              animate={isHovered ? { y: [null, -20, -40], scale: [0, 1, 0], opacity: [0, 1, 0] } : {}}
              transition={{ duration: 2, delay: i * 0.2, repeat: isHovered ? Infinity : 0, repeatType: 'loop' }}
            />
          ))}
        </div>
        {/* 컨텐츠 - 컴팩트 */}
        <div className="relative h-full flex flex-col items-center justify-center p-2 text-center">
          {/* 아이콘 - 작은 크기 */}
          <motion.div
            className="text-2xl md:text-3xl lg:text-4xl mb-1 font-sketch"
            style={{ transform: 'translateZ(25px)' }}
            animate={isHovered ? { rotateY: 360, scale: 1.1 } : {}}
            transition={{ duration: 0.6 }}
          >
            {iconToShow}
          </motion.div>
          {/* 카테고리 이름 - 작은 크기 */}
          <motion.h3
            className="text-xs md:text-sm font-bold text-gray-900 mb-0.5 font-sketch"
            style={{ transform: 'translateZ(15px)' }}
          >
            {category.name}
          </motion.h3>
          {/* 상품 수 - 작은 크기 */}
          <motion.p
            className="text-xs text-gray-600 font-medium"
            style={{ transform: 'translateZ(15px)' }}
          >
            {category.count?.toLocaleString()}
          </motion.p>
          {/* Featured 배지 - 작은 크기 */}
          {category.featured && (
            <motion.div
              className="absolute top-1 right-1 px-1.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-full"
              style={{ transform: 'translateZ(15px)' }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <span className="text-xs font-bold text-white">HOT</span>
            </motion.div>
          )}
        </div>
        {/* 홀로그램 효과 */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          animate={isHovered ? { x: '100%' } : { x: '-100%' }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </motion.div>
  );
};

export const InnovativeCategoryGrid: React.FC<InnovativeCategoryGridProps> = ({
  onCategoryClick,
  className = '',
  categories: propCategories,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { categories: hookCategories, isLoading, isError } = useCategoryDisplayItems();
  
  // props로 받은 카테고리가 있으면 사용, 없으면 훅에서 가져온 것 사용
  const categories = (propCategories && propCategories.length > 0) ? propCategories : hookCategories;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* 배경 그라데이션 오브 */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl opacity-50"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`
        }}
      />
      {/* 로딩 상태 */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          <span className="ml-2 text-gray-600 text-sm">카테고리 로딩 중...</span>
        </div>
      )}
      {/* 에러 상태 */}
      {isError && (
        <div className="text-center py-8">
          <p className="text-red-600 text-sm">카테고리를 불러올 수 없습니다.</p>
        </div>
      )}
      {/* 3D 카테고리 그리드 - 컴팩트 */}
      {!isLoading && !isError && categories.length > 0 && (
        <div 
          className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 perspective-1000"
          style={{ perspective: '1000px' }}
        >
          {categories.map((category, index) => (
            <div key={category.id} className="relative">
              <CategoryCard3D
                category={category}
                index={index}
                onClick={() => onCategoryClick(category)}
              />
            </div>
          ))}
        </div>
      )}
      {/* 빈 상태 */}
      {!isLoading && !isError && categories.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">등록된 카테고리가 없습니다.</p>
        </div>
      )}
      {/* 플로팅 배경 요소들 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
            animate={{ x: [0, 100, 0], y: [0, -100, 0], scale: [1, 1.5, 1] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, repeatType: 'reverse', delay: i * 0.5 }}
            style={{ left: `${10 + i * 12}%`, top: `${20 + i * 8}%` }}
          />
        ))}
      </div>
    </div>
  );
}; 