import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // 기본 스타일 - 스케치 느낌의 자연스러운 애니메이션
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95",
  {
    variants: {
      variant: {
        // Primary - 주요 액션 (오렌지 계열)
        primary: "bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 shadow-sm hover:shadow-md",
        
        // Secondary - 보조 액션 (회색 계열)
        secondary: "bg-gray-50 text-gray-700 hover:bg-white hover:text-orange-600 hover:scale-105 hover:shadow-sm",
        
        // Admin - 관리자 액션 (파란색 계열)
        admin: "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-sm hover:shadow-md",
        
        // Danger - 위험한 액션 (빨간색 계열)
        danger: "bg-red-500 text-white hover:bg-red-600 hover:scale-105 shadow-sm hover:shadow-md",
        
        // Ghost - 투명한 버튼
        ghost: "text-gray-600 hover:text-orange-600 hover:bg-orange-50 hover:scale-105",
        
        // Outline - 테두리 버튼
        outline: "border border-gray-200 text-gray-700 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50 hover:scale-105",
        
        // Menu - 드롭다운 메뉴 아이템
        menu: "w-full text-left text-gray-700 hover:text-orange-600 hover:bg-orange-50 justify-start",
        
        // Icon - 아이콘 전용 버튼
        icon: "text-gray-600 hover:text-orange-600 hover:bg-orange-50 hover:scale-105",
        
        // Badge - 작은 배지 버튼
        badge: "text-xs font-medium text-white bg-red-500 animate-pulse",
        
        // Link - 링크 스타일
        link: "text-orange-600 hover:text-orange-800 hover:scale-105 underline-offset-4 hover:underline",
      },
      
      size: {
        // 크기 variants
        xs: "px-2 py-1 text-xs",
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
        xl: "px-8 py-4 text-lg",
        
        // 아이콘 전용 크기
        icon_xs: "w-6 h-6 p-1",
        icon_sm: "w-8 h-8 p-2",
        icon_md: "w-10 h-10 p-2.5",
        icon_lg: "w-12 h-12 p-3",
      },
      
      shape: {
        // 모양 variants
        rounded: "rounded-md",
        pill: "rounded-full",
        square: "rounded-none",
        circle: "rounded-full aspect-square",
      },
    },
    
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "pill", // 기본적으로 둥근 모양 (스케치 느낌)
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    shape, 
    asChild = false, 
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? 'span' : 'button';
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, shape }), className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {!loading && leftIcon && leftIcon}
        {children}
        {!loading && rightIcon && rightIcon}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

// 편의를 위한 특화된 버튼 컴포넌트들
export const PrimaryButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="primary" {...props} />
);

export const SecondaryButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="secondary" {...props} />
);

export const AdminButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="admin" shape="rounded" {...props} />
);

export const DangerButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="danger" {...props} />
);

export const IconButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'shape'>>(
  (props, ref) => <Button ref={ref} variant="icon" shape="circle" {...props} />
);

export const MenuButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'shape'>>(
  (props, ref) => <Button ref={ref} variant="menu" shape="rounded" {...props} />
);

export const BadgeButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'size' | 'shape'>>(
  (props, ref) => <Button ref={ref} variant="badge" size="xs" shape="pill" {...props} />
);

PrimaryButton.displayName = "PrimaryButton";
SecondaryButton.displayName = "SecondaryButton";
AdminButton.displayName = "AdminButton";
DangerButton.displayName = "DangerButton";
IconButton.displayName = "IconButton";
MenuButton.displayName = "MenuButton";
BadgeButton.displayName = "BadgeButton"; 