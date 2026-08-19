"use client";

import React, { useRef, useCallback, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { siteConfig, type HeroConfig } from "@/config";
import { animationVariants } from "@/animation-config";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Counter } from "@/components/manual/counter";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  cn,
  getNormalizedMousePosition,
  resetScrollToTop,
} from "@/lib/utils";

const STAT_COLOR_STYLES = {
  purple: {
    bg: "bg-purple-500/[0.08] border-purple-500/10",
    label: "text-purple-600 dark:text-purple-400",
    value: "text-purple-700 dark:text-purple-300",
  },
  blue: {
    bg: "bg-sky-500/[0.08] border-sky-500/10",
    label: "text-sky-600 dark:text-sky-400",
    value: "text-sky-700 dark:text-sky-300",
  },
  green: {
    bg: "bg-emerald-500/[0.08] border-emerald-500/10",
    label: "text-emerald-700 dark:text-emerald-400",
    value: "text-emerald-800 dark:text-emerald-300",
  },
} as const;

const SPRING_CONFIG = { damping: 25, stiffness: 140, mass: 0.6 } as const;

const CHART_LINE_PATH =
  "M 10 110 L 48 85 L 82 98 L 122 60 L 158 78 L 198 42 L 235 54 L 275 22 L 315 36 L 355 5 L 390 18";

const CHART_AREA_PATH =
  "M 10 110 L 48 85 L 82 98 L 122 60 L 158 78 L 198 42 L 235 54 L 275 22 L 315 36 L 355 5 L 390 18 L 390 120 L 10 120 Z";

export interface HeroProps {
  data?: HeroConfig;
  className?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export function Hero({
  data = siteConfig.hero,
  className = "",
  onPrimaryClick,
  onSecondaryClick,
}: HeroProps) {
  const { badge, title, description, primaryCta, secondaryCta, dashboard } = data;
  const sectionRef = useRef<HTMLElement>(null);

  // Ensure page always starts at top on initial load / refresh
  useEffect(() => {
    resetScrollToTop();
  }, []);

  // --- 1. Mouse Pointer Tracking & Smooth Spring Parallax ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, SPRING_CONFIG);
  const smoothMouseY = useSpring(mouseY, SPRING_CONFIG);

  // Mouse Parallax Offsets
  const mouseRightX = useTransform(smoothMouseX, [-0.5, 0.5], [-45, 45]);
  const mouseRightY = useTransform(smoothMouseY, [-0.5, 0.5], [-45, 45]);

  const mouseLeftX = useTransform(smoothMouseX, [-0.5, 0.5], [40, -40]);
  const mouseLeftY = useTransform(smoothMouseY, [-0.5, 0.5], [40, -40]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const { x, y } = getNormalizedMousePosition(e, sectionRef.current);
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // --- 2. Scroll-Based Circle Position Swap (Left <-> Right) ---
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Top-Right Circle moves to bottom-left on scroll
  const scrollRightX = useTransform(scrollYProgress, [0, 1], ["0vw", "-80vw"]);
  const scrollRightY = useTransform(scrollYProgress, [0, 1], ["0px", "420px"]);

  // Bottom-Left Circle moves to top-right on scroll
  const scrollLeftX = useTransform(scrollYProgress, [0, 1], ["0vw", "80vw"]);
  const scrollLeftY = useTransform(scrollYProgress, [0, 1], ["0px", "-420px"]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative bg-linear-to-br from-[#121330] via-[#1d194c] to-[#601fb5] py-20 text-white sm:py-24 lg:py-32",
        className
      )}
    >
      {/* 1. Top-Right Circle: Zoom Entrance + Mouse Parallax + Scroll Swap to Left */}
      <motion.div
        style={{ x: scrollRightX, y: scrollRightY }}
        className="pointer-events-none absolute top-0 -right-12 sm:-right-16 z-0 -translate-y-1/3"
      >
        <motion.div
          style={{ x: mouseRightX, y: mouseRightY }}
          variants={animationVariants.circleZoom}
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0}
          className="h-96 md:h-160 w-96 md:w-160 rounded-full bg-purple-300/18"
          aria-hidden="true"
        />
      </motion.div>

      {/* 2. Bottom-Left Circle: Zoom Entrance + Mouse Parallax + Scroll Swap to Right */}
      <motion.div
        style={{ x: scrollLeftX, y: scrollLeftY }}
        className="pointer-events-none absolute bottom-0 -left-40 z-0 translate-y-1/3"
      >
        <motion.div
          style={{ x: mouseLeftX, y: mouseLeftY }}
          variants={animationVariants.circleZoom}
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={1}
          className="h-96  w-96  rounded-full border border-white/[0.07] bg-white/2"
          aria-hidden="true"
        />
      </motion.div>

      {/* --- Hero Main Content --- */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Hero Content with Sliding Up Animation (Entry & Exit) */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animationVariants.staggerContainer}
            className="flex flex-col items-start text-left lg:col-span-6 xl:col-span-7"
          >
            {/* Badge */}
            {badge && (
              <motion.div variants={animationVariants.heroSlideUp} custom={0}>
                <Badge variant="hero" className="mb-5">
                  {badge}
                </Badge>
              </motion.div>
            )}

            {/* Main Headline */}
            <motion.h1
              variants={animationVariants.heroSlideUp}
              custom={1}
              className="text-4xl font-extrabold tracking-tight text-white leading-[1.12] sm:text-5xl lg:text-6xl font-sans"
            >
              {title}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={animationVariants.heroSlideUp}
              custom={2}
              className="mt-6 max-w-lg text-base leading-relaxed text-purple-100/75 sm:text-lg font-sans"
            >
              {description}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={animationVariants.heroSlideUp}
              custom={3}
              className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10"
            >
              <Button
                variant="white"
                size="pill-lg"
                onClick={onPrimaryClick}
              >
                {primaryCta.label}
              </Button>
              <Button
                variant="glass"
                size="pill-lg"
                onClick={onSecondaryClick}
              >
                {secondaryCta.label}
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column: Main Dashboard Container with Slide-in from Right (Entry & Exit) */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animationVariants.heroSlideFromRight}
            className="w-full lg:col-span-6 xl:col-span-5"
          >
            <Card
              variant="dashboard"
              className="relative mx-auto w-full max-w-lg gap-0 p-0 shadow-2xl"
            >
              {/* Browser Window Header */}
              <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-5 py-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              </div>

              {/* Dashboard Content */}
              <CardContent className="p-6 sm:p-7 text-card-foreground">
                {/* Header Title & Date */}
                <CardHeader className="p-0 gap-0">
                  <CardTitle className="text-base font-bold sm:text-lg font-sans">
                    {dashboard.title}
                  </CardTitle>
                  <CardDescription className="mt-0.5 text-xs font-sans">
                    {dashboard.date}
                  </CardDescription>
                </CardHeader>

                {/* 3 Metric Cards with Clean Spacing & Sans Typography */}
                <div className="mt-6 grid grid-cols-3 gap-2.5 sm:gap-3.5">
                  {dashboard.stats.map((stat, idx) => {
                    const style =
                      STAT_COLOR_STYLES[stat.colorScheme] ||
                      STAT_COLOR_STYLES.purple;
                    return (
                      <Card
                        key={idx}
                        variant="metric"
                        className={cn(style.bg, "rounded-2xl p-3.5 sm:p-4 border")}
                      >
                        <p className={cn("text-[11px] sm:text-xs font-semibold leading-tight tracking-normal font-sans", style.label)}>
                          {stat.label}
                        </p>
                        <p className={cn("mt-2 text-xl sm:text-2xl font-extrabold tracking-tight font-sans", style.value)}>
                          <Counter value={stat.value} />
                        </p>
                      </Card>
                    );
                  })}
                </div>

                {/* Animated Upward Trending Chart Section */}
                <div className="mt-6 sm:mt-7">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-card-foreground font-sans">
                      {dashboard.chartTitle}
                    </h3>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 font-sans"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live
                    </motion.span>
                  </div>

                  {/* Upward Stair-Stepped Chart Line Canvas */}
                  <div className="relative mt-2 w-full pt-2">
                    <svg
                      viewBox="0 0 400 130"
                      className="h-28 sm:h-32 w-full overflow-visible"
                    >
                      <defs>
                        {/* Gradient for area fill under the line */}
                        <linearGradient
                          id="chartAreaGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.0" />
                        </linearGradient>

                        {/* Gradient for the line stroke */}
                        <linearGradient
                          id="chartLineStroke"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="70%" stopColor="#7c3aed" />
                          <stop offset="100%" stopColor="#6d28d9" />
                        </linearGradient>
                      </defs>

                      {/* Baseline horizontal line */}
                      <line
                        x1="0"
                        y1="120"
                        x2="400"
                        y2="120"
                        stroke="currentColor"
                        strokeOpacity="0.12"
                        strokeWidth="1"
                      />

                      {/* Area Fill under curve */}
                      <motion.path
                        d={CHART_AREA_PATH}
                        fill="url(#chartAreaGradient)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.4, delay: 0.5 }}
                      />

                      {/* Animated Upward Zigzag Line Path */}
                      <motion.path
                        d={CHART_LINE_PATH}
                        fill="none"
                        stroke="url(#chartLineStroke)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 1.8,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.25,
                        }}
                      />

                      {/* Highest Peak Pulsing Radar Dot at (355, 5) */}
                      <g transform="translate(355, 5)">
                        <circle
                          r="6"
                          className="fill-purple-500/40 animate-ping"
                        />
                        <circle
                          r="3.5"
                          fill="#7c3aed"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
