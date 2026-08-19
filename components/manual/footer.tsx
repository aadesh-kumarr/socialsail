"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig, type FooterConfig } from "@/config";
import { animationVariants, viewportConfig } from "@/animation-config";
import { cn } from "@/lib/utils";

export interface FooterProps {
  data?: FooterConfig;
  className?: string;
}

export function Footer({
  data = siteConfig.footer,
  className = "",
}: FooterProps) {
  const { brandName, tagline, columns, copyright, bottomLinks } = data;

  return (
    <footer className={cn("w-full bg-[#0b0f19] text-white", className)}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={animationVariants.fadeIn}
        className="mx-auto max-w-7xl px-6 pt-16 pb-12 sm:px-8 sm:pt-20 sm:pb-16 lg:px-12"
      >
        {/* Top Area: Brand info and Link columns */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-16">
          {/* Brand Info */}
          <div className="md:col-span-5 lg:col-span-5">
            <Link
              href="/"
              className="font-sans text-xl font-extrabold tracking-tight text-white transition-opacity hover:opacity-90 sm:text-2xl"
            >
              {brandName}
            </Link>
            {tagline && (
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
                {tagline}
              </p>
            )}
          </div>

          {/* Navigation Link Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7 lg:col-span-7">
            {columns.map((column, idx) => (
              <div key={idx}>
                <p className="text-xs font-bold tracking-wider text-white uppercase mb-4">
                  {column.title}
                </p>
                <ul className="space-y-2.5">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 transition-colors duration-150 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider & Bottom Copyright / Privacy Terms */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:mt-20 sm:flex-row text-xs text-slate-500">
          <p>{copyright}</p>
          <div className="flex items-center gap-4">
            {bottomLinks.map((link, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>·</span>}
                <Link
                  href={link.href}
                  className="transition-colors hover:text-slate-400"
                >
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

export default Footer;
