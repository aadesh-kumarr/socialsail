"use client";

import React, { createContext, useContext, useState } from "react";
import { Navbar } from "@/components/manual/navbar";

interface LayoutContextType {
  hasRightMargin: boolean;
  toggleRightMargin: () => void;
  removeRightMargin: () => void;
}

const LayoutContext = createContext<LayoutContextType>({
  hasRightMargin: true,
  toggleRightMargin: () => {},
  removeRightMargin: () => {},
});

export const useLayout = () => useContext(LayoutContext);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [hasRightMargin, setHasRightMargin] = useState(true);

  const toggleRightMargin = () => setHasRightMargin((prev) => !prev);
  const removeRightMargin = () => setHasRightMargin(false);

  return (
    <LayoutContext.Provider
      value={{ hasRightMargin, toggleRightMargin, removeRightMargin }}
    >
      <div
        className={`min-h-full flex flex-col transition-all duration-300 overflow-x-clip relative ${
          hasRightMargin ? "md:mr-10 mr-0" : "mr-0"
        }`}
      >
        <Navbar onCtaClick={toggleRightMargin} />
        {children}
      </div>
    </LayoutContext.Provider>
  );
}
