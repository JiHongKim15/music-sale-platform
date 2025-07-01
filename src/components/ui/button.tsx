import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:pointer-events-none disabled:opacity-50 min-h-[48px] px-6 py-3 shadow-sm active:scale-95 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary/90 focus:bg-primary/80",
        secondary: "bg-secondary text-white hover:bg-secondary/90 focus:bg-secondary/80",
        outline: "border-2 border-primary text-primary bg-white hover:bg-primary/5 focus:bg-primary/10",
        ghost: "bg-transparent text-primary hover:bg-primary/10 focus:bg-primary/20",
        danger: "bg-error text-white hover:bg-error/90 focus:bg-error/80",
        link: "bg-transparent text-primary hover:text-primary/80 underline-offset-4 hover:underline",
      },
      size: {
        sm: "min-h-[40px] px-4 py-2 text-sm",
        md: "min-h-[48px] px-6 py-3 text-base",
        lg: "min-h-[56px] px-8 py-4 text-lg",
        icon: "min-h-[48px] min-w-[48px] p-0 rounded-full justify-center",
      },
      loading: {
        true: "opacity-70 cursor-wait",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      loading: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, leftIcon, rightIcon, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, loading, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <span className="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
        ) : leftIcon ? (
          <span className="mr-2">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
