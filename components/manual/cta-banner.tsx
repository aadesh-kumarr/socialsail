"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig, type CtaBannerConfig } from "@/config";
import { animationVariants, viewportConfig } from "@/animation-config";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CtaBannerProps {
  data?: CtaBannerConfig;
  className?: string;
  onCtaClick?: () => void;
}

export function CtaBanner({
  data = siteConfig.ctaBanner,
  className = "",
  onCtaClick,
}: CtaBannerProps) {
  const { title, description, cta } = data;

  return (
    <section className={cn("w-full bg-background py-16 sm:py-20 lg:py-24", className)}>
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={animationVariants.scaleUp}
        >
          <Card
            variant="dark"
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#121330] via-[#1d194c] to-[#601fb5] py-16 px-8 text-center shadow-2xl sm:rounded-[2.5rem] sm:py-20 sm:px-12"
          >
            {/* Subtle Ambient Radial Glow */}
            <motion.div
              variants={animationVariants.ambientFloat}
              animate="animate"
              className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-brand/30 blur-3xl"
              aria-hidden="true"
            />

            <CardContent className="relative z-10 p-0">
              {/* Main Headline */}
              <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white leading-tight sm:text-4xl lg:text-5xl">
                {title}
              </h2>

              {/* Description */}
              {description && (
                <p className="mx-auto mt-4 max-w-md text-sm text-purple-100/80 sm:text-base leading-relaxed">
                  {description}
                </p>
              )}

              {/* CTA Button */}
              <div className="mt-8 flex justify-center">
                <Button
                  variant="white"
                  size="pill-lg"
                  onClick={onCtaClick}
                >
                  {cta.label}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default CtaBanner;
