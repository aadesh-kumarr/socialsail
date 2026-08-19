import type { Variants, Transition } from "framer-motion";

/**
 * Standard transition presets - Calibrated to be smooth, elegant, and slower
 */
export const transitions = {
  smooth: {
    duration: 1.0,
    ease: [0.16, 1, 0.3, 1],
  } as Transition,
  spring: {
    type: "spring",
    damping: 28,
    stiffness: 180,
  } as Transition,
  bouncy: {
    type: "spring",
    damping: 18,
    stiffness: 220,
  } as Transition,
  slow: {
    duration: 1.4,
    ease: [0.16, 1, 0.3, 1],
  } as Transition,
};

/**
 * Common Viewport Trigger Presets
 */
export const viewportConfig = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -60px 0px",
};

/**
 * Global Animation Variants with Entry and Exit states
 */
export const animationVariants: Record<string, Variants> = {
  // Fade in only (Entry & Exit)
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: transitions.smooth,
    },
    exit: {
      opacity: 0,
      transition: transitions.smooth,
    },
  },

  // Fade in and slide up (Entry & Exit)
  fadeInUp: {
    hidden: { opacity: 0, y: 35 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        ...transitions.smooth,
        delay: custom * 0.16,
      },
    }),
    exit: {
      opacity: 0,
      y: -25,
      transition: transitions.smooth,
    },
  },

  // Fade in and slide down (Entry & Exit)
  fadeInDown: {
    hidden: { opacity: 0, y: -28 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        ...transitions.smooth,
        delay: custom * 0.16,
      },
    }),
    exit: {
      opacity: 0,
      y: -28,
      transition: transitions.smooth,
    },
  },

  // Fade in from left (Entry & Exit)
  fadeInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: (custom = 0) => ({
      opacity: 1,
      x: 0,
      transition: {
        ...transitions.smooth,
        delay: custom * 0.18,
      },
    }),
    exit: {
      opacity: 0,
      x: -50,
      transition: transitions.smooth,
    },
  },

  // Fade in from right (Entry & Exit)
  fadeInRight: {
    hidden: { opacity: 0, x: 70 },
    visible: (custom = 0) => ({
      opacity: 1,
      x: 0,
      transition: {
        ...transitions.smooth,
        delay: custom * 0.18,
      },
    }),
    exit: {
      opacity: 0,
      x: 70,
      transition: transitions.smooth,
    },
  },

  // Hero Right Container Slide in from right (Entry & Exit)
  heroSlideFromRight: {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.25,
      },
    },
    exit: {
      opacity: 0,
      x: 80,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    },
  },

  // Hero Left Text Slide Up (Entry & Exit)
  heroSlideUp: {
    hidden: { opacity: 0, y: 45 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.05,
        ease: [0.16, 1, 0.3, 1],
        delay: custom * 0.18,
      },
    }),
    exit: (custom = 0) => ({
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        delay: custom * 0.08,
      },
    }),
  },

  // Dedicated Zoom Animation for Hero Background Circles (Entry & Exit)
  circleZoom: {
    hidden: { opacity: 0, scale: 0.35 },
    visible: (custom = 0) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        delay: custom * 0.2,
      },
    }),
    exit: {
      opacity: 0,
      scale: 0.35,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  },

  // Scale in / Zoom (Entry & Exit)
  scaleUp: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: (custom = 0) => ({
      opacity: 1,
      scale: 1,
      transition: {
        ...transitions.smooth,
        delay: custom * 0.16,
      },
    }),
    exit: {
      opacity: 0,
      scale: 0.92,
      transition: transitions.smooth,
    },
  },

  // Parent container that staggers its children (Entry & Exit)
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: (staggerVal = 0.18) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerVal,
        delayChildren: 0.1,
      },
    }),
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.08,
        staggerDirection: -1,
      },
    },
  },

  // Interactive Card Hover
  cardHover: {
    initial: { y: 0 },
    hover: {
      y: -6,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  },

  // Ambient floating pulse for background decorative circles
  ambientFloat: {
    animate: {
      scale: [1, 1.06, 1],
      opacity: [0.15, 0.24, 0.15],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  // Ascending bar chart animation for Platform section
  barGrowth: {
    hidden: { scaleY: 0, originY: 1 },
    visible: (custom = 0) => ({
      scaleY: 1,
      originY: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.3 + custom * 0.18,
      },
    }),
    exit: {
      scaleY: 0,
      originY: 1,
      transition: { duration: 0.4 },
    },
  },

  // Timeline Connector Line Growth for Platform Workflow
  timelineLineGrowth: {
    hidden: { scaleX: 0, originX: 0 },
    visible: (custom = 0) => ({
      scaleX: 1,
      originX: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2 + custom * 0.25,
      },
    }),
  },

  // Timeline Node Pop & Sequential Glow
  timelineNode: {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom = 0) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
        delay: custom * 0.25,
      },
    }),
  },
};

export default animationVariants;
