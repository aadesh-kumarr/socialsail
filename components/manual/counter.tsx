"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { parseNumericValue, formatCounterNumber } from "@/lib/utils";

export interface CounterProps {
  value: string | number;
  duration?: number;
  className?: string;
}

export function Counter({ value, duration = 2.4, className = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const [displayValue, setDisplayValue] = useState("0");

  const parsed = parseNumericValue(value);

  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    duration: duration * 1000,
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView && parsed.isValid) {
      motionVal.set(parsed.rawNumber);
    }
  }, [isInView, motionVal, parsed.isValid, parsed.rawNumber]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (latest) => {
      setDisplayValue(formatCounterNumber(latest, parsed));
    });

    return () => unsubscribe();
  }, [springVal, parsed]);

  if (!parsed.isValid) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {displayValue}
      {parsed.suffix}
    </span>
  );
}

export default Counter;
