// src/utils/variants.js

/**
 * 1. Directional Fades
 * Ideal for headers, text blocks, and general entry animations.
 * Uses 'spring' for a more tactile, professional feel.
 */
export const fadeIn = (direction = "up", delay = 0) => ({
  hidden: {
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    opacity: 0,
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1.2,
      delay: delay,
      bounce: 0.2,
    },
  },
});

/**
 * 2. Parent Container Orchestration
 * Wrap multiple motion children in this to trigger them in sequence.
 */
export const staggerContainer = (staggerChildren = 0.2, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/**
 * 3. Glass Reveal
 * Specifically tuned for Glassmorphism cards (Projects/Tech Stack).
 * Uses a premium cubic-bezier ease for a "lens" opening effect.
 */
export const glassReveal = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  show: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

/**
 * 4. Timeline Draw
 * Animates the vertical purple line in your Journey section.
 */
export const drawLine = {
  hidden: { height: 0, opacity: 0 },
  show: { 
    height: "100%", 
    opacity: 0.5,
    transition: { 
        duration: 2, 
        ease: "easeInOut" 
    } 
  }
};

/**
 * 5. Pulse Glow
 * Constant "breathing" effect for AI logos or active indicators.
 */
export const pulseGlow = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

/**
 * 6. Ambient Float
 * For the purple background blur orbs to make them feel organic.
 */
export const float = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};