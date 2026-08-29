"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Motion lives in thin client wrappers that take server-rendered children,
 * so the markup still ships in the HTML.
 *
 * Everything is a spring, never a fixed-duration curve. Apple's parameters are
 * damping and response, not duration: damping 1.0 (critically damped, no
 * overshoot) with a 0.4s response is their default for a move. In Framer
 * Motion that maps to bounce: 0 and duration: 0.4.
 *
 * Bounce stays at 0 across the page. Overshoot is only honest when the user's
 * own gesture carried momentum, and nothing here is dragged or flicked.
 */

const SPRING = { type: "spring", bounce: 0, duration: 0.55 } as const;
const SPRING_QUICK = { type: "spring", bounce: 0, duration: 0.4 } as const;

/** Reveals children as they enter the viewport. Fires once. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px 200px 0px" }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </motion.div>
  );
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

const riseItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: SPRING },
};

/** Page-load stagger for the hero. Children must be <Rise> elements. */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={stagger}
      initial={reduce ? false : "hidden"}
      animate="show"
    >
      {children}
    </motion.div>
  );
}

export function Rise({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={riseItem}>
      {children}
    </motion.div>
  );
}

/** Cards acknowledge the pointer. Quick response: hover feedback must not lag. */
export function LiftOnHover({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : { y: -3 }}
      transition={SPRING_QUICK}
    >
      {children}
    </motion.div>
  );
}
