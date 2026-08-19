"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import { siteConfig, type NavItem } from "@/config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  brandName?: string;
  brandHref?: string;
  navItems?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  className?: string;
}

export function Navbar({
  brandName = siteConfig.navbar.brandName,
  brandHref = siteConfig.navbar.brandHref,
  navItems = siteConfig.navbar.items,
  ctaLabel = siteConfig.navbar.cta.label,
  ctaHref = siteConfig.navbar.cta.href,
  onCtaClick,
  className = "",
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>(navItems[0]?.label || "Platform");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50 transition-colors",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0">
            <Link
              href={brandHref}
              className="font-sans text-xl font-extrabold tracking-tight text-foreground transition-opacity hover:opacity-90 sm:text-2xl"
            >
              {brandName}
            </Link>
          </div>

          {/* Desktop Navigation Links with Smooth Active Marker */}
          <nav
            onMouseLeave={() => setHoveredItem(null)}
            className="hidden items-center gap-1 md:flex lg:gap-1.5"
          >
            {navItems.map((item) => {
              const isActive = activeItem === item.label;
              const isHovered = hoveredItem === item.label;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveItem(item.label)}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  className={cn(
                    "relative px-4 py-2 text-[14px] font-medium transition-colors duration-200 rounded-full select-none",
                    isActive
                      ? "text-brand font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {/* Active Indicator Background Pill */}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-full bg-brand/10 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover Indicator Background (on inactive items) */}
                  {isHovered && !isActive && (
                    <motion.span
                      layoutId="navbar-hover-pill"
                      className="absolute inset-0 rounded-full bg-muted/70 -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {item.label}

                  {/* Active Micro Dot Marker */}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-brand"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="relative z-10 hidden items-center md:flex">
            {onCtaClick ? (
              <Button
                variant="default"
                size="pill"
                onClick={onCtaClick}
              >
                {ctaLabel}
              </Button>
            ) : (
              <Link href={ctaHref}>
                <Button variant="default" size="pill">
                  {ctaLabel}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="relative z-10 flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Zero-Jitter Inner Padding Wrap */}
      <AnimatePresence initial={false}>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="relative z-20 overflow-hidden border-t border-border bg-background/95 shadow-lg backdrop-blur-lg md:hidden"
          >
            <div className="space-y-4 px-6 pt-4 pb-6">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item, idx) => {
                  const isActive = activeItem === item.label;

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => {
                          setActiveItem(item.label);
                          setIsMobileMenuOpen(false);
                        }}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-2 text-base font-medium transition-colors",
                          isActive
                            ? "bg-brand/10 text-brand font-semibold"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <span>{item.label}</span>
                        {isActive && <span className="h-1.5 w-1.5 rounded-full bg-brand" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="pt-2">
                {onCtaClick ? (
                  <Button
                    variant="default"
                    size="pill"
                    className="w-full"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onCtaClick();
                    }}
                  >
                    {ctaLabel}
                  </Button>
                ) : (
                  <Link
                    href={ctaHref}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full"
                  >
                    <Button variant="default" size="pill" className="w-full">
                      {ctaLabel}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
