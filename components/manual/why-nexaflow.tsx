"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig, type WhyNexaflowConfig } from "@/config";
import { animationVariants, viewportConfig } from "@/animation-config";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Counter } from "@/components/manual/counter";

export interface WhyNexaflowProps {
  data?: WhyNexaflowConfig;
  className?: string;
}

export function WhyNexaflow({
  data = siteConfig.whyNexaflow,
  className = "",
}: WhyNexaflowProps) {
  const { badge, title, description, cards } = data;

  return (
    <section className={cn("relative w-full bg-background py-16 sm:py-20 lg:py-28 overflow-hidden", className)}>
      {/* Subtle Background Radial Glow */}
      <div
        className="pointer-events-none absolute -top-40 right-10 h-96 w-96 rounded-full bg-brand/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header Content with Fade Up */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animationVariants.fadeInUp}
          className="max-w-3xl"
        >
          {badge && (
            <Badge variant="eyebrow" className="mb-3">
              {badge}
            </Badge>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h2>

          {description && (
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
        </motion.div>

        {/* 3 Feature Cards Grid with Staggered Entrance & Interactive Hover Effects */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animationVariants.staggerContainer}
          className="mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 sm:mt-16"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={animationVariants.fadeInUp}
              custom={idx}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="group relative h-full"
            >
              <Card
                variant="elevated"
                padding="lg"
                className="relative h-full justify-between overflow-hidden border border-border/80 transition-all duration-300 group-hover:border-brand/40 group-hover:shadow-2xl group-hover:shadow-brand/10"
              >
                {/* Top Glowing Gradient Accent Bar on Card Hover */}
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand via-purple-400 to-indigo-500 transition-transform duration-500 ease-out group-hover:scale-x-100" />

                <CardHeader className="p-0 gap-0">
                  {/* Number Accent with animated counter & pulsing pill background on hover */}
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-2xl font-bold tracking-tight text-brand transition-transform duration-300 group-hover:scale-110 sm:text-3xl">
                      <Counter value={card.number} />
                    </span>
                    <span className="h-2 w-2 rounded-full bg-brand/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Card Title */}
                  <CardTitle className="mt-4 text-lg font-bold transition-colors duration-200 group-hover:text-brand sm:text-xl">
                    {card.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0 mt-3">
                  {/* Card Description */}
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground transition-colors duration-200 group-hover:text-foreground/80 sm:text-base">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default WhyNexaflow;
