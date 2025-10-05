import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-primary-600 text-white hover:bg-primary-700 focus:ring-lime-accent dark:bg-primary-500 dark:text-black dark:hover:bg-primary-600 dark:focus:ring-primary-500",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-400",
        secondary:
          "bg-neutral-200 text-neutral-900 hover:bg-neutral-300 focus:ring-neutral-500 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800",
        outline:
          "border border-neutral-300 bg-white hover:bg-neutral-50 focus:ring-lime-accent dark:border-neutral-700 dark:bg-transparent dark:hover:bg-neutral-800 dark:text-neutral-100",
        ghost:
          "hover:bg-neutral-100 focus:ring-lime-accent dark:hover:bg-neutral-800 dark:text-neutral-100",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-primary-400 dark:hover:text-primary-500",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
