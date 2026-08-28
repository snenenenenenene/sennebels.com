"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Cat } from "@phosphor-icons/react";
import { GLASS } from "./ui";

/**
 * iOS 26 navigation bar. It floats in the functional layer with the page
 * scrolling underneath, which is the only way glass reads as glass: the
 * content passing behind it is what gets blurred and re-luminated.
 *
 * It condenses on scroll, the way a large title collapses into a compact bar.
 * Scroll progress is a MotionValue, so the bar never re-renders React.
 */
export function TopBar({ name }: { name: string }) {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  const opacity = useTransform(scrollY, [0, 90], [0, 1]);
  const y = useTransform(scrollY, [0, 90], [-14, 0]);

  return (
    <motion.header
      style={reduce ? undefined : { opacity, y }}
      className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-3.5"
    >
      <div
        className={`pointer-events-auto flex items-center gap-2.5 rounded-full px-5 py-2.5 ${GLASS}`}
      >
        <Cat size={19} weight="fill" className="text-moss" aria-hidden />
        <span className="text-callout font-semibold tracking-[-0.01em] text-ink">{name}</span>
      </div>
    </motion.header>
  );
}
