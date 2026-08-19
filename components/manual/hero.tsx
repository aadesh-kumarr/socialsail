"use client";

import React, { useRef, useCallback, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { TbChartLine } from "react-icons/tb";
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
    bg: "bg-brand/10",
    label: "text-brand",
    value: "text-brand",
  },
  blue: {
    bg: "bg-sky-500/10",
    label: "text-sky-600 dark:text-sky-400",
    value: "text-sky-600 dark:text-sky-400",
  },
  green: {
    bg: "bg-emerald-500/10",
    label: "text-emerald-600 dark:text-emerald-400",
    value: "text-emerald-600 dark:text-emerald-400",
  },
} as const;

const SPRING_CONFIG = { damping: 25, stiffness: 140, mass: 0.6 } as const;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

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
        "relative bg-gradient-to-br from-[#121330] via-[#1d194c] to-[#601fb5] py-20 text-white sm:py-24 lg:py-32 mr-10",
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
          className="h-[640px] w-[640px] rounded-full bg-purple-300/[0.18]"
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
          className="h-[600px] w-[600px] rounded-full border border-white/[0.07] bg-white/[0.02]"
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
              className="text-4xl font-extrabold tracking-tight text-white leading-[1.12] sm:text-5xl lg:text-6xl"
            >
              {title}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={animationVariants.heroSlideUp}
              custom={2}
              className="mt-6 max-w-lg text-base leading-relaxed text-purple-100/75 sm:text-lg"
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
                  <CardTitle className="text-base font-bold sm:text-lg">
                    {dashboard.title}
                  </CardTitle>
                  <CardDescription className="mt-0.5 text-xs">
                    {dashboard.date}
                  </CardDescription>
                </CardHeader>

                {/* 3 Metric Cards */}
                <div className="mt-6 grid grid-cols-3 gap-2.5 sm:gap-3">
                  {dashboard.stats.map((stat, idx) => {
                    const style =
                      STAT_COLOR_STYLES[stat.colorScheme] ||
                      STAT_COLOR_STYLES.purple;
                    return (
                      <Card
                        key={idx}
                        variant="metric"
                        className={style.bg}
                      >
                        <p className={`text-[11px] font-medium leading-tight sm:text-xs ${style.label}`}>
                          {stat.label}
                        </p>
                        <p className={`mt-1.5 text-xl font-bold tracking-tight sm:text-2xl ${style.value}`}>
                          <Counter value={stat.value} />
                        </p>
                      </Card>
                    );
                  })}
                </div>

                {/* Animated Chart Section */}
                <div className="mt-6 sm:mt-7">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-card-foreground">
                      {dashboard.chartTitle}
                    </h3>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live
                    </motion.span>
                  </div>

                  {/* Chart Visual with Reveal Draw and Scanning Light Beam */}
                  <div className="relative mt-3 overflow-hidden rounded-xl bg-brand/5 border border-brand/10 p-3 pt-4">
                    {/* Glowing light beam sweep across the chart */}
                    <motion.div
                      animate={{ x: ["-100%", "300%"] }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut",
                        repeatDelay: 1.5,
                      }}
                      className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-brand/15 to-transparent blur-md"
                      aria-hidden="true"
                    />

                    {/* Chart Line Drawing Animation */}
                    <motion.div
                      initial={{ clipPath: "inset(0 100% 0 0)" }}
                      animate={{ clipPath: "inset(0 0% 0 0)" }}
                      transition={{
                        duration: 1.6,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.3,
                      }}
                      className="relative flex h-24 w-full items-center justify-center"
                    >
                      <TbChartLine className="h-full w-full text-brand drop-shadow-sm" strokeWidth={1.8} />

                      {/* Peak Glowing Data Point Indicator */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.5, ease: "backOut" }}
                        className="absolute top-2 right-1/4 flex items-center justify-center"
                      >
                        <span className="absolute h-4 w-4 rounded-full bg-brand/30 animate-ping" />
                        <span className="h-2 w-2 rounded-full bg-brand ring-2 ring-white shadow-sm" />
                      </motion.div>
                    </motion.div>

                    {/* Days of Week Axis */}
                    <div className="mt-2 flex justify-between border-t border-border/50 pt-1.5 text-[10px] text-muted-foreground/70">
                      {DAYS.map((day, idx) => (
                        <motion.span
                          key={day}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + idx * 0.08, duration: 0.4 }}
                        >
                          {day}
                        </motion.span>
                      ))}
                    </div>
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
