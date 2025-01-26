import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const getVariant = () => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return 'contained';
      case 'outlined':
        return 'outlined';
      case 'text':
        return 'text';
      default:
        return 'contained';
    }
  };

  const getColor = () => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  return (
    <MuiButton
      variant={getVariant()}
      color={getColor()}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? '로딩 중...' : children}
    </MuiButton>
  );
} 