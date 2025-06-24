import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface InputProps extends Omit<TextFieldProps, 'variant'> {
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
}

export function Input({
  error = false,
  helperText,
  fullWidth = true,
  ...props
}: InputProps) {
  return (
    <TextField
      variant="outlined"
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: error ? 'error.main' : 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover fieldset': {
            borderColor: error ? 'error.main' : 'rgba(0, 0, 0, 0.87)',
          },
          '&.Mui-focused fieldset': {
            borderColor: error ? 'error.main' : 'primary.main',
          },
        },
        ...props.sx
      }}
    />
  );
} 