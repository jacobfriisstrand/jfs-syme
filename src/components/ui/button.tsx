import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-baseDark focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "px-10 py-2 border border-baseDark gap-4 hover:bg-baseDark hover:text-baseLight transition-colors",
        cta: "text-md flex font-semibold cursor-pointer border border-baseDark px-10 gap-3 rounded-full text-baseDark py-4 md:text-lg transition-all items-center justify-center hover:bg-baseDark hover:text-baseLight [&>span]:ease-in [&>span]:size-2 [&>span]:transition-color hover:-translate-y-2 ease-in-out duration-300 hover:shadow-2xl",
        icon: "bg-transparent hover:opacity-50 transition-opacity",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
