"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig, type CustomerStoryConfig } from "@/config";
import { animationVariants, viewportConfig } from "@/animation-config";
import { Badge } from "@/components/ui/badge";
import { Counter } from "@/components/manual/counter";
import { cn } from "@/lib/utils";

export interface CustomerStoryProps {
  data?: CustomerStoryConfig;
  className?: string;
}

export function CustomerStory({
  data = siteConfig.customerStory,
  className = "",
}: CustomerStoryProps) {
  const { badge, quote, author, role, company, metric } = data;

  return (
    <section
      className={cn(
        "w-full bg-secondary/30 py-20 sm:py-24 lg:py-32 transition-colors",
        className
      )}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={animationVariants.staggerContainer}
        className="mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-12"
      >
        {/* Eyebrow Badge using shadcn Badge */}
        {badge && (
          <motion.div variants={animationVariants.fadeInUp}>
            <Badge variant="eyebrow" className="mb-4 inline-block">
              {badge}
            </Badge>
          </motion.div>
        )}

        {/* Large Quote Headline */}
        <motion.blockquote
          variants={animationVariants.fadeInUp}
          className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl leading-snug"
        >
          {quote}
        </motion.blockquote>

        {/* Author Attribution */}
        <motion.p
          variants={animationVariants.fadeInUp}
          className="mt-8 text-xs font-medium text-muted-foreground sm:text-sm"
        >
          {author} · {role}, {company}
        </motion.p>

        {/* Big Metric Stat Highlight with Animated Counter */}
        <motion.div
          variants={animationVariants.scaleUp}
          className="mt-6"
        >
          <p className="font-sans text-5xl font-extrabold tracking-tight text-brand sm:text-6xl lg:text-7xl">
            <Counter value={metric.value} />
          </p>
          <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
            {metric.label}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default CustomerStory;
