"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig, type PlatformConfig } from "@/config";
import { animationVariants, viewportConfig } from "@/animation-config";
import { Badge } from "@/components/ui/badge";
import { Counter } from "@/components/manual/counter";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const BAR_HEIGHTS = [
  { height: "h-9", color: "bg-purple-600" },
  { height: "h-13", color: "bg-purple-500" },
  { height: "h-18", color: "bg-purple-400" },
  { height: "h-24", color: "bg-purple-300" },
] as const;

const TIMELINE_STEPS = [
  { color: "bg-brand", ring: "ring-brand/30", glow: "shadow-brand/40" },
  { color: "bg-sky-400", ring: "ring-sky-400/30", glow: "shadow-sky-400/40" },
  { color: "bg-emerald-400", ring: "ring-emerald-400/30", glow: "shadow-emerald-400/40" },
  { color: "bg-amber-400", ring: "ring-amber-400/30", glow: "shadow-amber-400/40" },
] as const;

export interface PlatformProps {
  data?: PlatformConfig;
  className?: string;
}

export function Platform({
  data = siteConfig.platform,
  className = "",
}: PlatformProps) {
  const { badge, title, description, cards } = data;

  return (
    <section className={cn("w-full bg-dark-bg py-16 text-white sm:py-20 lg:py-28", className)}>
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
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

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>

          {description && (
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              {description}
            </p>
          )}
        </motion.div>

        {/* 2 Platform Cards with Staggered Entrance */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animationVariants.staggerContainer}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 sm:mt-16"
        >
          {/* Card 1: Workflow Automation */}
          <motion.div
            variants={animationVariants.fadeInUp}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35 }}
          >
            <Card variant="dark" padding="lg" className="h-full justify-between">
              <CardHeader className="p-0 gap-0">
                <CardTitle className="text-xl font-bold text-white sm:text-2xl">
                  {cards.workflow.title}
                </CardTitle>
                <CardDescription className="mt-3 text-sm text-white/60 sm:text-base">
                  {cards.workflow.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0">
                {/* Workflow Timeline Pipeline Graphic with Sequential Flow Animations */}
                <div className="mt-8 flex items-center justify-between rounded-xl bg-[#0b0f19] px-6 py-7">
                  {TIMELINE_STEPS.map((step, idx) => (
                    <React.Fragment key={idx}>
                      {/* Timeline Node */}
                      <motion.div
                        custom={idx}
                        variants={animationVariants.timelineNode}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        className="relative flex items-center justify-center"
                      >
                        {/* Continuous Ambient Glow Pulse */}
                        <motion.span
                          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: idx * 0.75,
                            ease: "easeInOut",
                          }}
                          className={cn(
                            "absolute h-6 w-6 rounded-full blur-[2px]",
                            step.color
                          )}
                        />
                        <span
                          className={cn(
                            "relative z-10 h-5 w-5 rounded-full ring-4 shadow-lg transition-transform",
                            step.color,
                            step.ring,
                            step.glow
                          )}
                        />
                      </motion.div>

                      {/* Connecting Line between nodes */}
                      {idx < TIMELINE_STEPS.length - 1 && (
                        <div className="relative mx-3 h-0.5 flex-1 overflow-hidden rounded-full bg-white/15">
                          <motion.span
                            custom={idx}
                            variants={animationVariants.timelineLineGrowth}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportConfig}
                            className="absolute inset-0 h-full w-full rounded-full bg-linear-to-r from-purple-400 via-sky-400 to-emerald-400"
                          />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 2: Intelligent Insights */}
          <motion.div
            variants={animationVariants.fadeInUp}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35 }}
          >
            <Card variant="dark" padding="lg" className="h-full justify-between">
              <CardHeader className="p-0 gap-0">
                <CardTitle className="text-xl font-bold text-white sm:text-2xl">
                  {cards.insights.title}
                </CardTitle>
                <CardDescription className="mt-3 text-sm text-white/60 sm:text-base">
                  {cards.insights.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0">
                {/* Intelligent Insights Bar Chart Graphic with Growth Animation */}
                <div className="mt-8 flex min-h-23 items-end justify-between rounded-xl bg-[#0b0f19] px-6 py-6">
                  {/* Ascending Metric Bars */}
                  <div className="flex items-end gap-2.5">
                    {BAR_HEIGHTS.map((bar, idx) => (
                      <motion.span
                        key={idx}
                        custom={idx}
                        variants={animationVariants.barGrowth}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        className={cn("w-4 rounded-sm sm:w-5", bar.height, bar.color)}
                      />
                    ))}
                  </div>

                  {/* Efficiency Stat Text with Counter Animation */}
                  <motion.span
                    variants={animationVariants.fadeIn}
                    className="text-xs font-semibold text-white/80 sm:text-sm"
                  >
                    <Counter value={cards.insights.efficiencyText} />
                  </motion.span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Platform;
