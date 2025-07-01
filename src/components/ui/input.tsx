import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error = false, helperText, className = '', ...props }, ref) => (
    <div className="w-full">
      <input
        ref={ref}
        className={`w-full px-5 py-3 rounded-2xl border-2 transition-all duration-200 text-base font-medium bg-[#F8FAFC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-text-secondary ${
          error ? 'border-error focus:ring-error/20' : 'border-[#E0E7EF]'
        } ${className}`}
        {...props}
      />
      {helperText && (
        <div className={`mt-1 text-xs ${error ? 'text-error' : 'text-text-secondary'}`}>{helperText}</div>
      )}
    </div>
  )
);
Input.displayName = 'Input'; 