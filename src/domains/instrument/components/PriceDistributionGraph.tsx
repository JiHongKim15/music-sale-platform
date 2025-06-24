import React, { useRef, useEffect } from 'react';
import { Instrument } from '../../../types';

interface PriceDistribution {
  minPrice: number;
  maxPrice: number;
  count: number;
  instruments: Instrument[];
  condition: 'new' | 'used';
}

interface PriceDistributionGraphProps {
  distribution: PriceDistribution[];
  onHover: (price: number | null) => void;
  showNew: boolean;
  showUsed: boolean;
}

export function PriceDistributionGraph({ distribution, onHover, showNew, showUsed }: PriceDistributionGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas 크기 설정
    const { width, height } = container.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    // 여백 설정
    const padding = {
      top: 20,
      right: 40,
      bottom: 40,
      left: 60
    };

    // 그래프 영역 크기
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;

    // 최대값 찾기
    const maxCount = Math.max(...distribution.map(d => d.count));

    // 배경 지우기
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Y축 그리기
    ctx.beginPath();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (graphHeight * (5 - i)) / 5;
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      
      // Y축 레이블
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(
        Math.round(maxCount * i / 5).toString(),
        padding.left - 10,
        y + 4
      );
    }
    ctx.stroke();

    // X축 레이블
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    const uniquePricePoints = Array.from(new Set(distribution.map(d => d.minPrice))).sort((a, b) => a - b);
    uniquePricePoints.forEach((price, i) => {
      const x = padding.left + (graphWidth * i) / (uniquePricePoints.length - 1);
      ctx.fillText(
        `₩${Math.round(price / 1000000)}M`,
        x,
        height - padding.bottom + 20
      );
    });

    // 새 제품 그래프 그리기
    if (showNew) {
      const newProducts = distribution.filter(d => d.condition === 'new');
      if (newProducts.length > 0) {
        ctx.beginPath();
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        newProducts.forEach((d, i) => {
          const x = padding.left + (graphWidth * i) / (newProducts.length - 1);
          const y = padding.top + graphHeight - (graphHeight * d.count) / maxCount;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();

        // 데이터 포인트 그리기
        newProducts.forEach((d, i) => {
          const x = padding.left + (graphWidth * i) / (newProducts.length - 1);
          const y = padding.top + graphHeight - (graphHeight * d.count) / maxCount;
          
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#3b82f6';
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
        });
      }
    }

    // 중고 제품 그래프 그리기
    if (showUsed) {
      const usedProducts = distribution.filter(d => d.condition === 'used');
      if (usedProducts.length > 0) {
        ctx.beginPath();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        usedProducts.forEach((d, i) => {
          const x = padding.left + (graphWidth * i) / (usedProducts.length - 1);
          const y = padding.top + graphHeight - (graphHeight * d.count) / maxCount;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();

        // 데이터 포인트 그리기
        usedProducts.forEach((d, i) => {
          const x = padding.left + (graphWidth * i) / (usedProducts.length - 1);
          const y = padding.top + graphHeight - (graphHeight * d.count) / maxCount;
          
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#f59e0b';
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
        });
      }
    }

    // 마우스 이벤트 처리
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 그래프 영역 내부인지 확인
      if (
        x >= padding.left &&
        x <= width - padding.right &&
        y >= padding.top &&
        y <= height - padding.bottom
      ) {
        const relativeX = x - padding.left;
        const bucketWidth = graphWidth / (distribution.length / 2 - 1);
        const index = Math.floor(relativeX / bucketWidth);
        
        if (index >= 0 && index < distribution.length / 2) {
          const bucket = distribution[index];
          if (bucket) {
            const price = bucket.minPrice + (bucket.maxPrice - bucket.minPrice) / 2;
            onHover(price);
            canvas.style.cursor = 'pointer';
            return;
          }
        }
      }
      
      onHover(null);
      canvas.style.cursor = 'default';
    };

    const handleMouseLeave = () => {
      onHover(null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [distribution, onHover, showNew, showUsed]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}