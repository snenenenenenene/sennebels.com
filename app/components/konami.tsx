"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Cat } from "@phosphor-icons/react";

/**
 * The site says he builds things people poke at instead of scroll past, so it
 * should reward being poked at.
 *
 * Four cats walk across the footer when the Konami code is entered. It listens
 * on keydown only, adds nothing to first paint, and does nothing at all under
 * prefers-reduced-motion, where a surprise animation is the last thing wanted.
 */

const CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const CATS = [
  { tint: "text-tone-red", delay: 0, size: 30 },
  { tint: "text-tone-blue", delay: 0.45, size: 24 },
  { tint: "text-tone-yellow", delay: 0.9, size: 34 },
  { tint: "text-tone-red", delay: 1.3, size: 20 },
];

export function Konami() {
  const [run, setRun] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let at = 0;
    const onKey = (e: KeyboardEvent) => {
      const want = CODE[at];
      const got = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      at = got === want ? at + 1 : got === CODE[0] ? 1 : 0;
      if (at === CODE.length) {
        at = 0;
        setRun(true);
        window.setTimeout(() => setRun(false), 7000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reduce]);

  return (
    <AnimatePresence>
      {run && (
        <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-6 z-30 overflow-hidden">
          {CATS.map((c, i) => (
            <motion.span
              key={i}
              initial={{ x: "-12vw" }}
              animate={{ x: "112vw" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 5.5, delay: c.delay, ease: "linear" }}
              className={`absolute bottom-0 ${c.tint}`}
              style={{ bottom: i * 14 }}
            >
              <Cat size={c.size} weight="fill" />
            </motion.span>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
