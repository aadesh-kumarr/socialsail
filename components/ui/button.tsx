import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button relative z-0 inline-flex shrink-0 items-center justify-center overflow-hidden border border-transparent text-sm font-medium whitespace-nowrap outline-none select-none transition-all duration-300 ease-out focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer hover:-translate-y-0.5 before:absolute before:inset-0 before:-z-10 before:h-full before:w-full before:origin-left before:scale-x-0 before:transition-transform before:duration-300 before:ease-out hover:before:scale-x-100",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground before:bg-gradient-to-r before:from-[#1d194c] before:via-[#4c1d95] before:to-[#7c3aed] hover:text-white shadow-md hover:shadow-lg hover:shadow-purple-500/25 rounded-full font-semibold",
        brand:
          "bg-brand text-brand-foreground before:bg-gradient-to-r before:from-[#121330] before:via-[#1d194c] before:to-[#4c1d95] hover:text-white shadow-md hover:shadow-lg hover:shadow-brand/25 rounded-full font-semibold",
        secondary:
          "bg-secondary text-secondary-foreground before:bg-gradient-to-r before:from-purple-500/15 before:to-violet-500/25 hover:text-foreground hover:shadow-md rounded-full",
        outline:
          "border-border bg-background before:bg-gradient-to-r before:from-purple-500/10 before:to-violet-500/15 hover:text-foreground hover:shadow-md rounded-full",
        ghost:
          "hover:bg-muted hover:text-foreground rounded-lg hover:-translate-y-0 before:hidden",
        link:
          "text-primary underline-offset-4 hover:underline hover:-translate-y-0 before:hidden",
        white:
          "bg-white text-[#121330] before:bg-gradient-to-r before:from-[#121330] before:via-[#1d194c] before:to-[#601fb5] hover:text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/20 rounded-full font-semibold",
        glass:
          "border-white/30 bg-white/10 text-white backdrop-blur-sm before:bg-gradient-to-r before:from-white before:via-purple-50 before:to-white hover:text-[#121330] hover:border-white hover:shadow-lg rounded-full font-medium",
        destructive:
          "bg-destructive text-white before:bg-gradient-to-r before:from-rose-600 before:to-red-700 hover:shadow-lg rounded-full",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm",
        xs: "h-6 px-2 text-xs",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6 text-sm",
        pill: "h-11 px-7 text-sm",
        "pill-lg": "h-12 px-8 text-sm",
        icon: "size-9 hover:-translate-y-0 before:hidden",
        "icon-sm": "size-7 hover:-translate-y-0 before:hidden",
        "icon-lg": "size-10 hover:-translate-y-0 before:hidden",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
