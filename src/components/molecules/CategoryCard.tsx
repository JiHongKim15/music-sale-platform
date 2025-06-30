import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryCardProps {
  name: string;
  emoji: string;
  sketchStyle?: string;
  onClick: () => void;
  className?: string;
}

export function CategoryCard({ 
  name, 
  emoji, 
  sketchStyle = '', 
  onClick, 
  className = "" 
}: CategoryCardProps) {
  return (
    <Card
      className={`cursor-pointer border-2 border-gray-300 hover:border-gray-400 transition-all duration-200 hover:shadow-md bg-white ${sketchStyle} ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-4 md:p-6 text-center">
        <div className="text-2xl md:text-3xl mb-2">{emoji}</div>
        <h3 className="font-medium text-gray-900 text-sm md:text-base">{name}</h3>
      </CardContent>
    </Card>
  );
} 