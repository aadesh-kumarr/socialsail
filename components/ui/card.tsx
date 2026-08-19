import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "group/card flex flex-col transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
        elevated:
          "rounded-2xl sm:rounded-3xl border border-border/70 bg-card text-card-foreground shadow-xl shadow-slate-200/40 hover:border-brand/30 hover:shadow-2xl hover:shadow-brand/5 dark:shadow-none",
        dark:
          "rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-dark-card text-white shadow-2xl",
        dashboard:
          "rounded-2xl sm:rounded-3xl border border-white/20 bg-card text-card-foreground shadow-2xl overflow-hidden",
        metric:
          "rounded-xl p-3 sm:p-3.5 border border-transparent transition-all",
      },
      padding: {
        none: "p-0",
        sm: "p-4 sm:p-5",
        default: "p-6 sm:p-8",
        lg: "p-8 sm:p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "none",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, padding, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, padding, className }))}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "font-sans text-xl font-bold leading-none tracking-tight text-card-foreground",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-content"
      className={cn("pt-0", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center pt-0", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
}
