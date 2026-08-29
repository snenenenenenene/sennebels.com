"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Hello, cycling through writing systems.
 *
 * The point is the shapes, so each greeting is set in the script's own
 * characters rather than transliterated. Romanisation sits underneath as a
 * caption, which also gives a screen reader something to say: the greeting
 * itself is aria-hidden, because a screen reader announcing Korean glyphs in
 * an English page voice is noise rather than information.
 */
const GREETINGS = [
  { text: "Hallo", roman: "Dutch", lang: "nl" },
  { text: "Hello", roman: "English", lang: "en" },
  { text: "Bonjour", roman: "French", lang: "fr" },
  { text: "こんにちは", roman: "Konnichiwa · Japanese", lang: "ja" },
  { text: "Привет", roman: "Privet · Russian", lang: "ru" },
  { text: "你好", roman: "Nǐ hǎo · Chinese", lang: "zh" },
  { text: "안녕하세요", roman: "Annyeonghaseyo · Korean", lang: "ko" },
  { text: "مرحبا", roman: "Marhaba · Arabic", lang: "ar" },
  { text: "Γειά σου", roman: "Yia sou · Greek", lang: "el" },
];

export function Greeting() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setI((n) => (n + 1) % GREETINGS.length), 2300);
    return () => clearTimeout(t);
  }, [i, reduce]);

  const g = GREETINGS[i];

  return (
    <div className="flex flex-col gap-1.5">
      {/* Fixed height, so the line below does not jump as scripts change
          height: CJK glyphs sit taller than Latin at the same font size. */}
      <div className="relative h-[3.2rem] sm:h-[3.8rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            lang={g.lang}
            aria-hidden
            initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? undefined : { opacity: 0, y: -14, filter: "blur(4px)" }}
            transition={{ type: "spring", bounce: 0, duration: 0.45 }}
            className="absolute inset-0 flex items-center font-display text-[2.4rem] font-medium leading-none text-ink sm:text-[2.9rem]"
          >
            {g.text}
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="text-caption text-ink-3">
        <span className="sr-only">Hello in nine languages. Currently: </span>
        {g.roman}
      </p>
    </div>
  );
}
