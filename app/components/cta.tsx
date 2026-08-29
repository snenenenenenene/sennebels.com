"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

/**
 * Case-study pill. The badge holds a dot at rest and swaps to an arrow when
 * the pointer is on the button itself, not on the card around it: the card and
 * the button are separate hover targets, so the arrow means "this control",
 * not "somewhere in this region".
 */
export function CaseStudyButton({ label }: { label: string }) {
  const [hot, setHot] = useState(false);
  const reduce = useReducedMotion();
  const spring = { type: "spring", bounce: 0, duration: 0.35 } as const;

  return (
    <span
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
      className="inline-flex min-h-tap w-fit items-center gap-3 rounded-full bg-ink py-2.5 pl-2.5 pr-6 text-paper transition-transform duration-200 ease-out active:scale-[0.98]"
    >
      <span className="relative grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-paper">
        <motion.span
          className="absolute size-2 rounded-full bg-ink"
          animate={reduce ? undefined : { scale: hot ? 0 : 1, opacity: hot ? 0 : 1 }}
          transition={spring}
        />
        <motion.span
          className="absolute grid place-items-center text-ink"
          initial={false}
          animate={reduce ? undefined : { scale: hot ? 1 : 0.4, opacity: hot ? 1 : 0 }}
          transition={spring}
        >
          <ArrowRight size={15} weight="bold" aria-hidden />
        </motion.span>
      </span>
      <span className="text-body font-medium">{label}</span>
    </span>
  );
}
