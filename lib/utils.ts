import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ParsedNumber {
  prefix: string;
  rawNumber: number;
  suffix: string;
  isPadded: boolean;
  hasDecimal: boolean;
  decimalPlaces: number;
  isValid: boolean;
}

/**
 * Parses numeric strings with prefixes, decimals, suffixes, and padding
 * Example: "+28% efficiency" -> prefix: "+", rawNumber: 28, suffix: "% efficiency"
 */
export function parseNumericValue(value: string | number): ParsedNumber {
  const valueString = String(value);
  const match = valueString.match(/^([^\d.]*)(\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return {
      prefix: "",
      rawNumber: 0,
      suffix: valueString,
      isPadded: false,
      hasDecimal: false,
      decimalPlaces: 0,
      isValid: false,
    };
  }

  const prefix = match[1];
  const rawNumber = parseFloat(match[2]);
  const suffix = match[3];
  const isPadded = match[2].length > 1 && match[2].startsWith("0");
  const hasDecimal = match[2].includes(".");
  const decimalPlaces = hasDecimal ? match[2].split(".")[1]?.length || 1 : 0;

  return {
    prefix,
    rawNumber,
    suffix,
    isPadded,
    hasDecimal,
    decimalPlaces,
    isValid: true,
  };
}

/**
 * Formats a raw number according to its parsed template specifications
 */
export function formatCounterNumber(
  latest: number,
  parsed: ParsedNumber
): string {
  let formatted = parsed.hasDecimal
    ? latest.toFixed(parsed.decimalPlaces)
    : Math.round(latest).toString();

  if (parsed.isPadded && !parsed.hasDecimal && formatted.length < 2) {
    formatted = "0" + formatted;
  }

  return formatted;
}

/**
 * Calculates normalized mouse coordinates (-0.5 to 0.5) inside a container
 */
export function getNormalizedMousePosition(
  e: React.MouseEvent<HTMLElement>,
  element: HTMLElement | null
) {
  if (!element) return { x: 0, y: 0 };
  const rect = element.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) / rect.width - 0.5,
    y: (e.clientY - rect.top) / rect.height - 0.5,
  };
}

/**
 * Resets window scroll position to top
 */
export function resetScrollToTop() {
  if (typeof window !== "undefined") {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }
}
