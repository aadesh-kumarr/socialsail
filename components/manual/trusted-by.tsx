"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig, type TrustedByConfig } from "@/config";
import { animationVariants, viewportConfig } from "@/animation-config";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface TrustedByProps {
  data?: TrustedByConfig;
  className?: string;
}

export function TrustedBy({
  data = siteConfig.trustedBy,
  className = "",
}: TrustedByProps) {
  const { title, logos } = data;

  return (
    <section className={cn("relative w-full overflow-hidden bg-background py-16 sm:py-20 lg:py-24", className)}>
      {/* Subtle Ambient Radial Backlight */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-[700px] rounded-full bg-gradient-to-r from-purple-500/10 via-brand/10 to-indigo-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center sm:px-8 lg:px-12">
        {/* Section Header with Eyebrow Badge & Subtle Side Lines */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animationVariants.fadeInUp}
          className="mb-12 flex items-center justify-center gap-4 sm:mb-14"
        >
          <span className="hidden h-px w-14 bg-gradient-to-r from-transparent to-border sm:block" />
          {title && (
            <Badge variant="eyebrow" className="tracking-widest text-muted-foreground">
              {title}
            </Badge>
          )}
          <span className="hidden h-px w-14 bg-gradient-to-l from-transparent to-border sm:block" />
        </motion.div>

        {/* 5-Logos Centered Grid with Animated Gradient Colors & Glow */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animationVariants.staggerContainer}
          className="flex flex-wrap items-center justify-center gap-10 sm:gap-14 md:gap-18 lg:gap-24"
        >
          {logos.map((logo, idx) => (
            <motion.div
              key={idx}
              variants={animationVariants.fadeInUp}
              custom={idx}
              whileHover={{ y: -5, scale: 1.1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group relative cursor-pointer"
            >
              {/* Animated Color Pulse Aura behind each logo */}
              <motion.span
                animate={{
                  opacity: [0.1, 0.4, 0.1],
                  scale: [0.95, 1.15, 0.95],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.7,
                }}
                className="pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500/30 via-brand/30 to-indigo-500/30 blur-xl transition-all group-hover:opacity-80 group-hover:scale-125"
                aria-hidden="true"
              />

              {/* Logo Text with Smooth Animated Gradient Shimmer on Hover & Ambient Shine */}
              <span
                className={cn(
                  "relative block text-2xl font-bold tracking-tight text-muted-foreground/80 transition-all duration-300 select-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:via-brand group-hover:to-indigo-600 group-hover:drop-shadow-sm sm:text-3xl",
                  logo.styleClass
                )}
              >
                {logo.name}
              </span>

              {/* Animated Gradient Underline Bar on Hover */}
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-purple-500 via-brand to-indigo-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default TrustedBy;
